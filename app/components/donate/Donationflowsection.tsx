"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { FaArrowRight, FaLock } from "react-icons/fa6";
import { SectionHeading } from "../Ourimpact/Sectionheading";

/* ---------- Types (match the "donationOptions" and "donorDetails" JSON) ---------- */

export type DonationOptionsContent = {
  label?: string;
  title: string;
  description?: string;
  currency: string; // e.g. "INR"
  currencySymbol: string; // e.g. "₹"
  donationTypes: { id: string; label: string }[];
  amounts: { id: number; value: number; title: string; description: string }[];
  customAmount?: {
    enabled: boolean;
    label: string;
    placeholder: string;
    minimumAmount: number;
  };
  button: { text: string; linkTo: string };
  // "note" in the JSON is an internal reminder for you, so it is never shown on the page
  note?: string;
};

export type DonorField = {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea";
  placeholder?: string;
  required?: boolean;
};

export type DonorDetailsContent = {
  label?: string;
  title: string;
  description?: string;
  fields: DonorField[];
  button: { text: string; linkTo: string };
  privacyNote?: string;
};

export type DonationPayload = {
  amount: number;
  currency: string;
  donationType: string;
  donor: Record<string, string>;
};

type DonationFlowProps = {
  options: DonationOptionsContent;
  details: DonorDetailsContent;
  /**
   * Called when the donor presses the final button. Start your payment here.
   * Without it, the details are saved in sessionStorage ("donation-draft")
   * and the page goes to details.button.linkTo.
   */
  onProceed?: (payload: DonationPayload) => void | Promise<void>;
};

/* ---------- Animation ---------- */

const EASE = [0.2, 0.7, 0.2, 1] as const;

const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

/* ---------- Validation ---------- */

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^[0-9+()\-\s]{7,20}$/;
const PAN = /^[A-Z]{5}[0-9]{4}[A-Z]$/; // Indian PAN, like ABCDE1234F

function validateDonorField(field: DonorField, value: string): string {
  const text = value.trim();
  if (field.required && !text) return `Please enter your ${field.label.toLowerCase()}.`;
  if (!text) return "";
  if (field.type === "email" && !EMAIL.test(text)) return "Please enter a valid email address.";
  if (field.type === "tel" && !PHONE.test(text)) return "Please enter a valid phone number.";
  if (field.name === "panNumber" && !PAN.test(text.toUpperCase()))
    return "Please enter a valid PAN, like ABCDE1234F.";
  return "";
}

/* ---------- Small pieces ---------- */

const inputBase =
  "w-full border bg-[#fdfbf3]/40 px-4 py-3 text-base leading-normal text-[#15452e] outline-none transition-colors duration-300 placeholder:text-[#15452e]/50 focus:bg-[#e6f5ae]/40 focus-visible:ring-2 focus-visible:ring-[#15452e]";

/**
 * Error text that eases open and closed instead of popping in,
 * so the fields and buttons below it glide rather than jump.
 */
function Message({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      id={id}
      role="alert"
      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
      transition={{ duration: 0.25, ease: EASE }}
      className="overflow-hidden"
    >
      <p className={`m-0 text-sm text-[#b42318] ${className}`}>{children}</p>
    </motion.div>
  );
}

function ActionButton({
  children,
  type = "button",
  onClick,
  pending = false,
  pendingLabel,
}: {
  children: ReactNode;
  type?: "button" | "submit";
  onClick?: () => void;
  pending?: boolean;
  pendingLabel?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={pending}
      className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden border border-[#15452e] bg-[#15452e] px-8 py-4 text-[clamp(1rem,1.05vw,1.15rem)] text-[#e6f5ae] transition-colors duration-500 hover:text-[#15452e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358] disabled:cursor-not-allowed disabled:opacity-60 sm:w-fit motion-reduce:transition-none"
    >
      {/* lime fill sweeps in from the left on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-0 origin-left scale-x-0 bg-[#e6f5ae] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 group-disabled:scale-x-0 motion-reduce:transition-none"
      />
      {/* Both labels share one grid cell, so the button keeps the same width
          when the text swaps to the pending label. */}
      <span className="relative grid">
        <span
          className={`col-start-1 row-start-1 transition-opacity duration-200 ${
            pending && pendingLabel ? "opacity-0" : ""
          }`}
        >
          {children}
        </span>
        {pendingLabel && (
          <span
            aria-hidden={!pending}
            className={`col-start-1 row-start-1 transition-opacity duration-200 ${
              pending ? "" : "opacity-0"
            }`}
          >
            {pendingLabel}
          </span>
        )}
      </span>
      <FaArrowRight
        aria-hidden="true"
        className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </button>
  );
}

function DonorInput({
  field,
  value,
  error,
  onChange,
  onBlur,
}: {
  field: DonorField;
  value: string;
  error: string;
  onChange: (name: string, value: string) => void;
  onBlur: (name: string) => void;
}) {
  const id = `donor-${field.name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name: field.name,
    value,
    placeholder: field.placeholder,
    "aria-required": field.required || undefined,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    onBlur: () => onBlur(field.name),
    className: `${inputBase} ${error ? "border-[#b42318]" : "border-[#15452e]"}`,
  } as const;

  return (
    <div className={field.type === "textarea" ? "sm:col-span-2" : ""}>
      <label htmlFor={id} className="mb-2 block text-sm">
        {field.label}
        {field.required ? (
          <span aria-hidden="true"> *</span>
        ) : (
          <span className="text-[#15452e]/70"> (optional)</span>
        )}
      </label>

      {field.type === "textarea" ? (
        <textarea
          {...shared}
          rows={4}
          onChange={(e) => onChange(field.name, e.target.value)}
          className={`${shared.className} resize-y`}
        />
      ) : (
        <input
          {...shared}
          type={field.type}
          autoComplete={
            field.type === "email"
              ? "email"
              : field.type === "tel"
                ? "tel"
                : field.name === "fullName"
                  ? "name"
                  : "off"
          }
          maxLength={field.name === "panNumber" ? 10 : undefined}
          onChange={(e) => onChange(field.name, e.target.value)}
        />
      )}

      <AnimatePresence initial={false}>
        {error && (
          <Message id={errorId} className="pt-2">
            {error}
          </Message>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- Section ---------- */

export default function DonationFlowSection({
  options,
  details,
  onProceed,
}: DonationFlowProps) {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const initial = reduceMotion ? false : "hidden";
  const scrollBehavior: ScrollBehavior = reduceMotion ? "auto" : "smooth";

  // Step 1: amount
  const [donationType, setDonationType] = useState(options.donationTypes[0]?.id ?? "");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [amountError, setAmountError] = useState("");
  const customRef = useRef<HTMLInputElement>(null);

  // Step 2: donor details
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(details.fields.map((f) => [f.name, ""]))
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const symbol = options.currencySymbol;
  const money = (n: number) => `${symbol}${new Intl.NumberFormat("en-IN").format(n)}`;
  const minimum = options.customAmount?.minimumAmount ?? 1;

  const selected = options.amounts.find((a) => a.id === selectedId) ?? null;
  const customValue = custom ? parseInt(custom, 10) : null;
  const amount = custom ? customValue : selected?.value ?? null;
  const typeLabel = options.donationTypes.find((t) => t.id === donationType)?.label ?? "";

  const getAmountError = () => {
    if (amount === null) return "Please choose or enter an amount.";
    if (custom && (customValue ?? 0) < minimum)
      return `The minimum donation is ${money(minimum)}.`;
    return "";
  };

  /* ----- Scrolling and focus -----
     Focus is moved with preventScroll and the scroll is done separately with
     scrollIntoView, so the page glides instead of jumping to the element. */

  const scrollToId = (id: string) =>
    document.getElementById(id)?.scrollIntoView({
      behavior: scrollBehavior,
      block: "start",
    });

  const revealAndFocus = (el: HTMLElement | null | undefined) => {
    if (!el) return;
    el.scrollIntoView({ behavior: scrollBehavior, block: "center" });
    el.focus({ preventScroll: true });
  };

  const focusAmount = () => {
    if (custom) {
      revealAndFocus(customRef.current);
      return;
    }
    revealAndFocus(
      document.querySelector<HTMLInputElement>('input[name="donation-amount"]')
    );
  };

  const handleContinue = () => {
    const message = getAmountError();
    setAmountError(message);
    if (message) {
      focusAmount();
      return;
    }

    scrollToId("donor-details");

    // On touch screens, focusing an input opens the keyboard and cuts the
    // scroll short, so move focus to the section instead of the first field.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const first = details.fields[0];
    const target =
      finePointer && first
        ? document.getElementById(`donor-${first.name}`)
        : document.getElementById("donor-details");
    target?.focus({ preventScroll: true });
  };

  const handleDonorChange = (name: string, value: string) => {
    const next = name === "panNumber" ? value.toUpperCase() : value;
    setValues((v) => ({ ...v, [name]: next }));
    // Once a field shows an error, re-check it as the person types
    if (errors[name]) {
      const field = details.fields.find((f) => f.name === name)!;
      setErrors((e) => ({ ...e, [name]: validateDonorField(field, next) }));
    }
  };

  const handleDonorBlur = (name: string) => {
    const field = details.fields.find((f) => f.name === name)!;
    setErrors((e) => ({ ...e, [name]: validateDonorField(field, values[name] ?? "") }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError("");

    // The amount must be valid before anything else
    const amountMessage = getAmountError();
    if (amountMessage) {
      setAmountError(amountMessage);
      scrollToId("donation-flow");
      return;
    }

    const nextErrors: Record<string, string> = {};
    for (const field of details.fields) {
      const message = validateDonorField(field, values[field.name] ?? "");
      if (message) nextErrors[field.name] = message;
    }
    setErrors(nextErrors);

    const firstInvalid = details.fields.find((f) => nextErrors[f.name]);
    if (firstInvalid) {
      revealAndFocus(document.getElementById(`donor-${firstInvalid.name}`));
      return;
    }

    const payload: DonationPayload = {
      amount: amount as number,
      currency: options.currency,
      donationType,
      donor: values,
    };

    setSubmitting(true);
    try {
      if (onProceed) {
        await onProceed(payload);
        setSubmitting(false);
      } else {
        sessionStorage.setItem("donation-draft", JSON.stringify(payload));
        router.push(details.button.linkTo);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* ---------- Step 1: choose an amount ---------- */}
      <section
        id="donation-flow"
        aria-labelledby="donation-options-title"
        className="scroll-mt-24 border-b border-[#15452e] bg-[#fdfbf3] px-6 py-16 text-[#15452e] md:px-[6%] md:py-10"
      >
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={wrapVariants}
          className="mx-auto max-w-[1200px]"
        >
          <SectionHeading
            id="donation-options-title"
            label={options.label}
            title={options.title}
            description={options.description}
            className="max-w-[820px]"
          />

          {/* Donation type */}
          <motion.fieldset variants={riseVariants} className="m-0 mt-12 border-0 p-0">
            <legend className="sr-only">Donation type</legend>
            <div className="inline-flex divide-x divide-[#15452e] border border-[#15452e]">
              {options.donationTypes.map((type) => (
                <label key={type.id} className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="donation-type"
                    value={type.id}
                    checked={donationType === type.id}
                    onChange={() => setDonationType(type.id)}
                    className="peer sr-only"
                  />
                  <span className="block px-5 py-3 text-sm transition-colors duration-300 peer-checked:bg-[#15452e] peer-checked:text-[#e6f5ae] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#b49358] sm:px-6">
                    {type.label}
                  </span>
                </label>
              ))}
            </div>
          </motion.fieldset>

          {/* Amounts */}
          <motion.fieldset variants={riseVariants} className="m-0 mt-8 border-0 p-0">
            <legend className="sr-only">Donation amount</legend>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {options.amounts.map((a) => (
                <label key={a.id} className="relative block cursor-pointer">
                  <input
                    type="radio"
                    name="donation-amount"
                    value={a.id}
                    checked={selectedId === a.id}
                    onChange={() => {
                      setSelectedId(a.id);
                      setCustom("");
                      setAmountError("");
                    }}
                    className="peer sr-only"
                  />
                  <span className="flex h-full flex-col border border-[#15452e] bg-[#fdfbf3]/40 p-6 transition-[transform,background-color,color] duration-300 hover:-translate-y-1 peer-checked:bg-[#15452e] peer-checked:text-[#e6f5ae] peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#b49358] motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                    <span className="font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,3vw,2.75rem)] leading-none">
                      {money(a.value)}
                    </span>
                    <span className="mt-4 text-lg leading-snug">{a.title}</span>
                    <span className="mt-2 text-sm leading-[1.6] opacity-80">{a.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </motion.fieldset>

          {/* Custom amount */}
          {options.customAmount?.enabled && (
            <motion.div variants={riseVariants} className="mt-8 max-w-[420px]">
              <label htmlFor="custom-amount" className="mb-2 block text-sm">
                {options.customAmount.label}
              </label>
              <div
                className={`flex items-center border bg-[#fdfbf3]/40 transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#15452e] ${
                  amountError && custom ? "border-[#b42318]" : "border-[#15452e]"
                }`}
              >
                <span aria-hidden="true" className="px-4 text-lg">
                  {symbol}
                </span>
                <input
                  ref={customRef}
                  id="custom-amount"
                  inputMode="numeric"
                  autoComplete="off"
                  value={custom}
                  placeholder={options.customAmount.placeholder}
                  aria-describedby="amount-hint"
                  aria-invalid={amountError && custom ? true : undefined}
                  onChange={(e) => {
                    setCustom(e.target.value.replace(/\D/g, "").slice(0, 8));
                    setSelectedId(null);
                    setAmountError("");
                  }}
                  className="w-full bg-transparent py-3 pr-4 text-base outline-none placeholder:text-[#15452e]/50"
                />
              </div>
              <p id="amount-hint" className="m-0 mt-2 text-xs">
                Minimum {money(minimum)}
              </p>
            </motion.div>
          )}

          <AnimatePresence initial={false}>
            {amountError && <Message className="pt-4">{amountError}</Message>}
          </AnimatePresence>

          <motion.div
            variants={riseVariants}
            className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center"
          >
            <ActionButton onClick={handleContinue}>{options.button.text}</ActionButton>
            {/* min-h reserves the line so the layout doesn't shift when the text appears */}
            <p className="m-0 min-h-6 text-sm" aria-live="polite">
              {amount !== null && !getAmountError()
                ? `You’ve chosen ${money(amount)}, ${typeLabel.toLowerCase()}.`
                : ""}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ---------- Step 2: donor details ---------- */}
      <section
        id="donor-details"
        tabIndex={-1}
        aria-labelledby="donor-details-title"
        className="scroll-mt-24 bg-[#fdfbf3] px-6 py-16 text-[#15452e] outline-none md:px-[6%] md:py-28"
      >
        <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={wrapVariants}
          >
            <SectionHeading
              id="donor-details-title"
              label={details.label}
              title={details.title}
              description={details.description}
            />
            {details.privacyNote && (
              <motion.p
                variants={riseVariants}
                className="mb-0 mt-8 flex max-w-[44ch] items-start gap-3 text-sm leading-[1.7]"
              >
                <FaLock aria-hidden="true" className="mt-1 h-3.5 w-3.5 shrink-0" />
                {details.privacyNote}
              </motion.p>
            )}
          </motion.div>

          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={riseVariants}
          >
            {/* Summary of the chosen amount */}
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border border-[#15452e] bg-[#e6f5ae]/50 px-5 py-4">
              <div>
                <p className="m-0 font-mono text-xs uppercase leading-none">Your donation</p>
                <p className="m-0 mt-2 text-lg leading-snug">
                  {amount !== null && !getAmountError()
                    ? `${money(amount)} · ${typeLabel}`
                    : "No amount chosen yet"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => scrollToId("donation-flow")}
                className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
              >
                Change
              </button>
            </div>

            <form noValidate onSubmit={handleSubmit} aria-busy={submitting}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-2">
                {details.fields.map((field) => (
                  <DonorInput
                    key={field.name}
                    field={field}
                    value={values[field.name] ?? ""}
                    error={errors[field.name] ?? ""}
                    onChange={handleDonorChange}
                    onBlur={handleDonorBlur}
                  />
                ))}
              </div>

              <AnimatePresence initial={false}>
                {submitError && (
                  <Message className="pt-6">
                    <span className="block border border-[#b42318] px-4 py-3">
                      {submitError}
                    </span>
                  </Message>
                )}
              </AnimatePresence>

              <div className="mt-8">
                <ActionButton
                  type="submit"
                  pending={submitting}
                  pendingLabel="Please wait…"
                >
                  {details.button.text}
                </ActionButton>
              </div>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}