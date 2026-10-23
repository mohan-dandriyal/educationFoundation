"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
// import { SectionHeading } from "@/app/components/";
// import { ActionLink } from "./ActionLink";

import { PrimaryButton } from '@/app/components/ui/PrimaryButton'

/* ---------- Types (match the "ourCauses" JSON) ---------- */

export type Cause = {
    id: number;
    title: string;
    slug?: string;
    category: string;
    description: string;
    image: string;
    imageAlt: string;
    raised: number;
    goal: number;
    donors: number;
    featured?: boolean;
    status?: string; // "active" shows no badge, anything else (e.g. "completed") does
    buttonText: string;
    buttonLink: string;
};

export type OurCausesContent = {
    tag?: string;
    title: string;
    description?: string;
    buttonText?: string;
    buttonLink?: string;
    causes: Cause[];
    bottomCta?: {
        title: string;
        description?: string;
        primaryButton: string;
        primaryLink: string;
        secondaryButton?: string;
        secondaryLink?: string;
    };
};

type OurCausesSectionProps = {
    content: OurCausesContent;
    /** The JSON has no currency, so it is set here */
    currencySymbol?: string;
};

/* ---------- Animation ---------- */

const EASE = [0.2, 0.7, 0.2, 1] as const;

const headerVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};


// Each card rises in as it is scrolled to
const cardVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
// Photo: unveils from the bottom while the zoom settles
const frameVariants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.1, ease: EASE, delay: 0.1 },
    },
};
const photoVariants: Variants = {
    hidden: { scale: 1.25 },
    show: { scale: 1, transition: { duration: 1.5, ease: EASE, delay: 0.1 } },
};
// Progress bar fills up to its percentage
const barVariants: Variants = {
    hidden: { scaleX: 0 },
    show: (pct: number) => ({
        scaleX: pct / 100,
        transition: { duration: 1.4, ease: EASE, delay: 0.5 },
    }),
};

/* ---------- Section ---------- */

export default function OurCausesSection({
    content,
    currencySymbol = "₹",
}: OurCausesSectionProps) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    const money = (n: number) =>
        `${currencySymbol}${new Intl.NumberFormat("en-IN").format(n)}`;

    // Featured causes first, the rest keep their order
    const causes = [...content.causes].sort(
        (a, b) => Number(!!b.featured) - Number(!!a.featured)
    );

    return (
        <section
            aria-labelledby="causes-title"
            className="bg-[#fdfbf3] px-6  text-[#15452e] md:px-[6%]"
        >
            <div className="mx-auto max-w-[1200px]">
                {/* Header */}
                <motion.div
                    initial={initial}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={headerVariants}
                    className="flex flex-col items-center gap-8 text-center"
                >
                    {/* <SectionHeading
            id="causes-title"
            label={content.tag}
            title={content.title}
            description={content.description}
            className="max-w-[780px]"
          /> */}

                    <div className="flex max-w-[58ch] flex-col items-center">
                        <SectionLabel>
                            {content.tag}
                        </SectionLabel>

                        <SectionInnerTitle>
                            {content.title}
                        </SectionInnerTitle>
                        {content.description && (
                            <p className="mb-0 mt-5 text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.7] text-[#4a5d2e]">
                                {content.description}
                            </p>
                        )}
                    </div>


                </motion.div>

                {/* Causes */}
                <ul className="m-0 mt-14 grid list-none gap-8 p-0 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
                    {causes?.slice(0.3).map((cause) => {
                        const pct = Math.min(
                            100,
                            Math.round((cause.raised / Math.max(cause.goal, 1)) * 100)
                        );
                        const showStatus = cause.status && cause.status !== "active";

                        return (
                            <motion.li
                                key={cause.id}
                                initial={initial}
                                whileInView="show"
                                viewport={{ once: true, amount: 0.2 }}
                                variants={cardVariants}
                            >
                                <article className="group flex h-full flex-col overflow-hidden border border-[#15452e]/15 bg-[#fdfbf3] shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-[#15452e]/10">
                                    {/* Photo, with tags */}
                                    <Link
                                        href={cause.buttonLink}
                                        tabIndex={-1}
                                        aria-hidden="true"
                                        className="block border-b border-[#15452e]/15"
                                    >
                                        <motion.div
                                            variants={frameVariants}
                                            className="relative aspect-[4/3] w-full overflow-hidden"
                                        >
                                            <motion.div variants={photoVariants} className="absolute inset-0">
                                                <Image
                                                    src={cause.image}
                                                    alt={cause.imageAlt}
                                                    fill
                                                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                                                />
                                            </motion.div>

                                            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
                                                <span className="rounded-full border border-[#15452e]/15 bg-[#e5ff7a] px-3 py-1 text-xs font-medium text-[#15452e]">
                                                    {cause.category}
                                                </span>
                                                {cause.featured && (
                                                    <span className="rounded-full border border-[#15452e] bg-[#15452e] px-3 py-1 text-xs text-[#e5ff7a]">
                                                        Featured
                                                    </span>
                                                )}
                                                {showStatus && (
                                                    <span className="rounded-full border border-[#15452e]/15 bg-[#fdfbf3] px-3 py-1 text-xs capitalize text-[#15452e]">
                                                        {cause.status}
                                                    </span>
                                                )}
                                            </div>
                                        </motion.div>
                                    </Link>

                                    {/* Text and progress */}
                                    <div className="flex flex-1 flex-col p-6">
                                        <h3 className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.4rem,1.9vw,1.75rem)] font-normal leading-[1.2]">
                                            <Link
                                                href={cause.buttonLink}
                                                className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#15452e] motion-reduce:transition-none"
                                            >
                                                {cause.title}
                                            </Link>
                                        </h3>

                                        <p className="mb-0 mt-3 text-sm leading-[1.7]">{cause.description}</p>

                                        <div className="mt-auto pt-6">
                                            {/* <div className="flex items-baseline justify-between gap-4 text-sm">
                                                <span>
                                                    <strong className="font-medium">{money(cause.raised)}</strong> raised
                                                </span>
                                                <span aria-hidden="true">{pct}%</span>
                                            </div>

                                            <div
                                                role="progressbar"
                                                aria-label={`${cause.title} funding progress`}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={pct}
                                                className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#15452e]/10"
                                            >
                                                <motion.div
                                                    custom={pct}
                                                    variants={barVariants}
                                                    className="h-full w-full origin-left rounded-full bg-[#6f984b]"
                                                />
                                            </div>

                                            <p className="m-0 mt-2 text-xs">
                                                of {money(cause.goal)} goal · {cause.donors} donors
                                            </p> */}

                                            <Link href={cause.buttonLink} className="group mt-6 inline-flex items-center text-sm font-semibold text-[#15452e] transition-colors hover:text-[#8a6b36]">
                                                {cause.buttonText}
                                                <span aria-hidden="true" className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            </motion.li>
                        );
                    })}
                </ul>

                {content.buttonText && content.buttonLink && (
                    <div className="-mt-2 flex justify-center">
                        <PrimaryButton href={content.buttonLink}>
                            {content.buttonText}
                        </PrimaryButton>
                    </div>
                )}
            </div>
        </section>
    );
}
