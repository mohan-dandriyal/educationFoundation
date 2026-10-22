"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "motion/react";
import {
    FaArrowRight,
    FaCircleCheck,
    FaLocationDot,
    FaPhone,
    FaRegClock,
    FaRegEnvelope,
} from "react-icons/fa6";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";

/* ---------- Types (match contact.json) ---------- */

type FieldType = "text" | "email" | "tel" | "textarea" | "select";
type RuleName = "required" | "minLength" | "pattern";

export type FormField = {
    name: string;
    label: string;
    type: FieldType;
    placeholder?: string;
    required?: boolean;
    autoComplete?: string;
    rows?: number;
    minLength?: number;
    pattern?: string; // regular expression, as a string
    options?: string[]; // for type "select"
    width?: "half" | "full";
};

export type ContactContent = {
    label?: string;
    title: string;
    description?: string;
    email?: string;
    mobileNo?: string;
    address?: string;
    officeHours?: string;
    formTitle?: string;
    submitButton?: string;
    sendingText?: string;
    successTitle?: string;
    successMessage?: string;
    sendAnotherText?: string;
    errorMessage?: string;
    formFields: FormField[];
    validationErrors: Record<string, Partial<Record<RuleName, string>>>;
};

type ContactSectionProps = {
    content: ContactContent;
    /** Where the form is sent. Ignored when onSubmit is given. */
    endpoint?: string;
    /** Replace the default fetch(endpoint) with your own sending code. Throw to show the error message. */
    onSubmit?: (values: Record<string, string>) => Promise<void>;
};

type Status = "idle" | "sending" | "success" | "error";

/* ---------- Animation ---------- */

const EASE = [0.2, 0.7, 0.2, 1] as const;

const columnVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
// Title: words slide up out of a mask, one after another
const titleVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } },
};
const wordVariants: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

/* ---------- Validation (rules and messages come from the JSON) ---------- */

function validateField(
    field: FormField,
    value: string,
    messages: ContactContent["validationErrors"]
): string {
    const text = value.trim();
    const m = messages[field.name] ?? {};

    if (field.required && !text) return m.required ?? "This field is required.";
    if (!text) return ""; // optional and empty: nothing more to check

    if (field.minLength && text.length < field.minLength)
        return m.minLength ?? `Please enter at least ${field.minLength} characters.`;

    if (field.pattern && !new RegExp(field.pattern).test(text))
        return m.pattern ?? "Please check this field.";

    return "";
}

/* ---------- Small pieces ---------- */

const inputBase =
    "w-full border bg-transparent px-4 py-3 text-base leading-normal text-[#252d4a] outline-none transition-colors duration-300 placeholder:text-[#252d4a]/50 focus:bg-[#e6f5ae]/40 focus-visible:ring-2 focus-visible:ring-[#252d4a]";

// Underline draws in from the left on hover
const linkClass =
    "bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-0.5 transition-[background-size] duration-500 hover:bg-[length:100%_1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a] motion-reduce:transition-none";

type DetailProps = {
    icon: ReactNode;
    label: string;
    text: string;
    href?: string;
    external?: boolean;
};

function Detail({ icon, label, text, href, external }: DetailProps) {
    return (
        <motion.li variants={riseVariants} className="flex items-start gap-5">
            <span
                aria-hidden="true"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#252d4a]"
            >
                {icon}
            </span>
            <div className="min-w-0">
                <p className="m-0 font-mono text-xs uppercase leading-none">{label}</p>
                {href ? (
                    <a
                        href={href}
                        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className={`mt-2 inline-block break-words text-[clamp(1rem,1.2vw,1.2rem)] leading-snug ${linkClass}`}
                    >
                        {text}
                    </a>
                ) : (
                    <p className="m-0 mt-2 text-[clamp(1rem,1.2vw,1.2rem)] leading-snug">{text}</p>
                )}
            </div>
        </motion.li>
    );
}

type FieldProps = {
    field: FormField;
    value: string;
    error: string;
    onChange: (name: string, value: string) => void;
    onBlur: (name: string) => void;
};

function Field({ field, value, error, onChange, onBlur }: FieldProps) {
    const id = `contact-${field.name}`;
    const errorId = `${id}-error`;
    const border = error ? "border-[#b42318]" : "border-[#252d4a]";

    const shared = {
        id,
        name: field.name,
        value,
        autoComplete: field.autoComplete,
        "aria-required": field.required || undefined,
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
        onBlur: () => onBlur(field.name),
        className: `${inputBase} ${border}`,
    } as const;

    return (
        <div className={field.width === "full" ? "sm:col-span-2" : ""}>
            <label htmlFor={id} className="mb-2 block text-sm">
                {field.label}
                {field.required ? (
                    <span aria-hidden="true"> *</span>
                ) : (
                    <span className="text-[#252d4a]/70"> (optional)</span>
                )}
            </label>

            {field.type === "textarea" ? (
                <textarea
                    {...shared}
                    rows={field.rows ?? 5}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                    className={`${shared.className} resize-y`}
                />
            ) : field.type === "select" ? (
                <select {...shared} onChange={(e) => onChange(field.name, e.target.value)}>
                    <option value="">{field.placeholder ?? "Select"}</option>
                    {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            ) : (
                <input
                    {...shared}
                    type={field.type}
                    placeholder={field.placeholder}
                    onChange={(e) => onChange(field.name, e.target.value)}
                />
            )}

            {error && (
                <p id={errorId} role="alert" className="m-0 mt-2 text-sm text-[#b42318]">
                    {error}
                </p>
            )}
        </div>
    );
}

/* ---------- Section ---------- */

export default function ContactSection({
    content,
    endpoint = "/api/contact",
    onSubmit,
}: ContactSectionProps) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";
    const words = content.title.split(" ");

    const emptyValues = Object.fromEntries(
        content.formFields.map((f) => [f.name, ""])
    ) as Record<string, string>;

    const [values, setValues] = useState<Record<string, string>>(emptyValues);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [status, setStatus] = useState<Status>("idle");
    const successRef = useRef<HTMLDivElement>(null);

    // Move focus to the confirmation so screen reader users hear it
    useEffect(() => {
        if (status === "success") successRef.current?.focus();
    }, [status]);

    const handleChange = (name: string, value: string) => {
        setValues((v) => ({ ...v, [name]: value }));
        // Once a field shows an error, re-check it as the person types
        if (errors[name]) {
            const field = content.formFields.find((f) => f.name === name)!;
            setErrors((e) => ({
                ...e,
                [name]: validateField(field, value, content.validationErrors),
            }));
        }
    };

    const handleBlur = (name: string) => {
        const field = content.formFields.find((f) => f.name === name)!;
        setErrors((e) => ({
            ...e,
            [name]: validateField(field, values[name] ?? "", content.validationErrors),
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Check every field, then focus the first one with a problem
        const nextErrors: Record<string, string> = {};
        for (const field of content.formFields) {
            const message = validateField(field, values[field.name] ?? "", content.validationErrors);
            if (message) nextErrors[field.name] = message;
        }
        setErrors(nextErrors);

        const firstInvalid = content.formFields.find((f) => nextErrors[f.name]);
        if (firstInvalid) {
            document.getElementById(`contact-${firstInvalid.name}`)?.focus();
            return;
        }

        // Hidden field that only bots fill in: pretend it worked and send nothing
        if (new FormData(e.currentTarget).get("website")) {
            setStatus("success");
            return;
        }

        setStatus("sending");
        try {
            if (onSubmit) {
                await onSubmit(values);
            } else {
                const res = await fetch(endpoint, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(values),
                });
                if (!res.ok) throw new Error("Request failed");
            }
            setValues(emptyValues);
            setErrors({});
            setStatus("success");
        } catch {
            setStatus("error");
        }
    };

    const phoneHref = content.mobileNo
        ? `tel:${content.mobileNo.replace(/[^\d+]/g, "")}`
        : undefined;
    const mapHref = content.address
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(content.address)}`
        : undefined;

    const sending = status === "sending";

    return (
        <section
            aria-labelledby="contact-title"
            className="grid grid-cols-1 border-b border-[#252d4a] text-[#252d4a] md:grid-cols-2"
        >
            {/* Left: contact details */}
            <motion.div
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={columnVariants}
                className="border-b border-[#252d4a] bg-[#fdfbf3] px-6 py-16 md:border-b-0 md:border-r md:px-[8%] md:py-24"
            >


                <SectionLabel>
                    {content.label}
                </SectionLabel>

                <SectionInnerTitle>
                    {content.title}
                </SectionInnerTitle>



                {content.description && (
                    <motion.p
                        variants={riseVariants}
                        className="mb-0 mt-6 max-w-[42ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7]"
                    >
                        {content.description}
                    </motion.p>
                )}

                <ul className="m-0 mt-12 flex list-none flex-col gap-8 p-0">
                    {content.email && (
                        <Detail
                            icon={<FaRegEnvelope className="h-4 w-4" />}
                            label="Email"
                            text={content.email}
                            href={`mailto:${content.email}`}
                        />
                    )}
                    {content.mobileNo && (
                        <Detail
                            icon={<FaPhone className="h-4 w-4" />}
                            label="Phone"
                            text={content.mobileNo}
                            href={phoneHref}
                        />
                    )}
                    {content.address && (
                        <Detail
                            icon={<FaLocationDot className="h-4 w-4" />}
                            label="Address"
                            text={content.address}
                            href={mapHref}
                            external
                        />
                    )}
                    {content.officeHours && (
                        <Detail
                            icon={<FaRegClock className="h-4 w-4" />}
                            label="Hours"
                            text={content.officeHours}
                        />
                    )}
                </ul>
            </motion.div>

            {/* Right: contact form */}
            <motion.div
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.15 }}
                variants={riseVariants}
                className="bg-[#fdfbf3] px-6 py-16 md:px-[8%] md:py-24"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            ref={successRef}
                            tabIndex={-1}
                            role="status"
                            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="flex flex-col items-start outline-none"
                        >
                            <FaCircleCheck aria-hidden="true" className="h-10 w-10 text-[#4a5d2e]" />
                            <h3 className="mb-0 mt-6 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,2.6vw,2.5rem)] font-normal leading-[1.15]">
                                {content.successTitle ?? "Message sent"}
                            </h3>
                            <p className="mb-0 mt-4 max-w-[42ch] leading-[1.7]">
                                {content.successMessage}
                            </p>
                            <button
                                type="button"
                                onClick={() => setStatus("idle")}
                                className={`mt-8 text-sm ${linkClass}`}
                            >
                                {content.sendAnotherText ?? "Send another message"}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={reduceMotion ? undefined : { opacity: 0, y: -16 }}
                            transition={{ duration: 0.5, ease: EASE }}
                        >
                            <div className="mb-8">
                                <SectionInnerTitle>
                                    {content.formTitle}
                                </SectionInnerTitle>
                            </div>

                            <form noValidate onSubmit={handleSubmit} aria-busy={sending}>
                                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                                    {content.formFields.map((field) => (
                                        <Field
                                            key={field.name}
                                            field={field}
                                            value={values[field.name] ?? ""}
                                            error={errors[field.name] ?? ""}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                        />
                                    ))}
                                </div>

                                {/* Spam trap: hidden from people, bots tend to fill it in */}
                                <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                                    <label htmlFor="contact-website">Leave this field empty</label>
                                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
                                </div>

                                {status === "error" && (
                                    <p role="alert" className="mb-0 mt-6 border border-[#b42318] px-4 py-3 text-sm text-[#b42318]">
                                        {content.errorMessage ?? "Something went wrong. Please try again."}
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={sending}
                                    className="group relative mt-8 inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-[#252d4a] bg-[#252d4a] px-10 py-4 text-[clamp(1rem,1.05vw,1.15rem)] text-[#e6f5ae] transition-colors duration-500 hover:text-[#252d4a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit motion-reduce:transition-none"
                                >
                                    {/* lime fill sweeps in from the left on hover */}
                                    <span
                                        aria-hidden="true"
                                        className="absolute inset-0 origin-left scale-x-0 bg-[#e6f5ae] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 group-disabled:scale-x-0 motion-reduce:transition-none"
                                    />
                                    <span className="relative">
                                        {sending
                                            ? content.sendingText ?? "Sending…"
                                            : content.submitButton ?? "Send Message"}
                                    </span>
                                    <FaArrowRight
                                        aria-hidden="true"
                                        className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                                    />
                                </button>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}