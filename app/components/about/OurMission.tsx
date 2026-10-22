"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";

type Pillar = { title: string; text: string };

type OurMissionSectionProps = {
    eyebrow?: string;
    heading?: string;
    image?: { src: string; alt: string };
    pillars?: Pillar[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const DEFAULT_PILLARS: Pillar[] = [
    {
        title: "Access to learning",
        text: "We open free learning centers where schools are far away or out of reach, so no child is left behind.",
    },
    {
        title: "Quality teaching",
        text: "We train and support local teachers, and provide books, supplies and digital tools that make lessons stick.",
    },
    {
        title: "Community first",
        text: "Families, volunteers and local leaders shape every program, so the change lasts long after we leave.",
    },
];

// Everything appears one after another when the section scrolls into view
const wrapVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Image: unveils from the bottom while the photo zoom settles
const frameVariants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.2, ease: EASE },
    },
};
const photoVariants: Variants = {
    hidden: { scale: 1.2 },
    show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
};

// Divider lines draw in from the left
const lineVariants: Variants = {
    hidden: { scaleX: 0 },
    show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
};

export function OurMissionSection({
    eyebrow = "Our Mission",
    heading = "Every child deserves a chance to learn, grow, and lead.",
    image = {
        src: "/program-2.png", // swap for your own photo
        alt: "Children learning together with school supplies",
    },
    pillars = DEFAULT_PILLARS,
}: OurMissionSectionProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section
            aria-labelledby="mission-title"
            className="bg-[#fdfbf3]  md:px-[6%] px-6  py-16 text-[#252d4a] md:py-28"
        >
            <MainContainer>
                <motion.div
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.25 }}
                    variants={wrapVariants}
                    className="mx-auto grid  gap-12 md:grid-cols-[1fr_1.1fr] md:gap-20"
                >
                    {/* Statement + image */}
                    <div>
                        <SectionLabel>
                            <span className="text-[#252d4a]/90">{eyebrow}</span>
                        </SectionLabel>

                        <SectionInnerTitle>{heading}</SectionInnerTitle>

                        {/* Image, after the title */}
                        <motion.div
                            variants={frameVariants}
                            className="relative mt-10 aspect-4/3 w-full overflow-hidden md:mt-14"
                        >
                            <motion.div variants={photoVariants} className="absolute inset-0">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    sizes="(min-width: 768px) 45vw, 100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Focus areas */}
                    <ul className="m-0 list-none self-end p-0">
                        {pillars.map((pillar, i) => (
                            <motion.li
                                key={pillar.title}
                                variants={riseVariants}
                                className="relative py-8 first:pt-8 md:py-10"
                            >
                                <motion.span
                                    aria-hidden="true"
                                    variants={lineVariants}
                                    className="absolute left-0 top-0 h-px w-full origin-left bg-[#252d4a]"
                                />
                                <h3 className="m-0 text-[clamp(1.25rem,1.7vw,1.65rem)] font-normal leading-[1.3]">
                                    {pillar.title}
                                </h3>
                                <p className="mb-0 mt-3 max-w-[46ch] text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.7]">
                                    {pillar.text}
                                </p>

                                {i === pillars.length - 1 && (
                                    <motion.span
                                        aria-hidden="true"
                                        variants={lineVariants}
                                        className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#252d4a]"
                                    />
                                )}
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </MainContainer>
        </section>
    );
}
