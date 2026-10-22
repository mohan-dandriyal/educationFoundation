"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion, useScroll, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";

type Milestone = {
    year: string;
    title: string;
    text: string;
    image: { src: string; alt: string };
};

type OurJourneySectionProps = {
    eyebrow?: string;
    heading?: string;
    intro?: string;
    milestones?: Milestone[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Placeholder story and photos: replace with your real milestones and images
const DEFAULT_MILESTONES: Milestone[] = [
    {
        year: "2012",
        title: "The first classroom",
        text: "One room, one volunteer teacher and twenty children began learning together under a tin roof.",
        image: { src: "/program-2.png", alt: "Children learning together with school supplies" },
    },
    {
        year: "2015",
        title: "Free learning centers",
        text: "We opened five centers and gave every child books, uniforms and a daily meal.",
        image: {
            src: "/program-1.png",
            alt: "Girl in a school uniform holding a chalkboard that reads Right to Education",
        },
    },
    {
        year: "2018",
        title: "Teacher training",
        text: "Local teachers joined our training program, so good lessons could reach more villages.",
        image: {
            src: "/post-1.png",
            alt: "Teacher helping a student at a computer in a learning center",
        },
    },
    {
        year: "2021",
        title: "Learning goes digital",
        text: "Computer labs and online lessons kept children learning, even when schools were closed.",
        image: {
            src: "/post-2.png",
            alt: "Students working at computers in a learning center",
        },
    },
    {
        year: "2024",
        title: "A growing movement",
        text: "Today 24 centers support more than 1,200 students, and 87% of them attend school regularly.",
        image: { src: "/program-2.png", alt: "Children smiling in a classroom with their teacher" },
    },
];

// Left column: label, title and text appear one after another
const columnVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Each milestone rises in as it is scrolled to, and its dot pops in
const itemVariants: Variants = {
    hidden: { opacity: 0, y: 32 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};
const dotVariants: Variants = {
    hidden: { scale: 0 },
    show: {
        scale: 1,
        transition: { type: "spring", stiffness: 400, damping: 18, delay: 0.15 },
    },
};

// Milestone photo: unveils from the bottom while the zoom settles
const frameVariants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.1, ease: EASE, delay: 0.3 },
    },
};
const photoVariants: Variants = {
    hidden: { scale: 1.25 },
    show: { scale: 1, transition: { duration: 1.5, ease: EASE, delay: 0.3 } },
};

export function OurJourneySection({
    eyebrow = "Our Journey",
    heading = "From one classroom to a movement.",
    intro = "Every step began with a child who wanted to learn and a community that wanted to help.",
    milestones = DEFAULT_MILESTONES,
}: OurJourneySectionProps) {
    const reduceMotion = useReducedMotion();
    const listRef = useRef<HTMLOListElement>(null);

    // The dark line grows down the timeline as the person scrolls
    const { scrollYProgress } = useScroll({
        target: listRef,
        offset: ["start 65%", "end 65%"],
    });

    return (
        <section
            aria-labelledby="journey-title"
            className="border-b border-[#252d4a] bg-[#f4f4f4] px-6 py-16 text-[#252d4a] md:px-[6%] md:py-28"
        >
            <MainContainer>
                <div className="mx-auto grid  gap-14 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
                    {/* Intro (stays in view while the timeline scrolls on desktop) */}
                    <motion.div
                        initial={reduceMotion ? false : "hidden"}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={columnVariants}
                        className="self-start md:sticky md:top-28"
                    >
                        <SectionLabel>
                            <span className="text-[#252d4a]">
                                {eyebrow}
                            </span>
                        </SectionLabel>

                        <SectionInnerTitle>{heading}</SectionInnerTitle>

                        <motion.p
                            variants={riseVariants}
                            className="mb-0 mt-6 max-w-[38ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7]"
                        >
                            {intro}
                        </motion.p>
                    </motion.div>

                    {/* Timeline */}
                    <ol ref={listRef} className="relative m-0 list-none p-0 pl-10 md:pl-14">
                        {/* Light track, with a dark line drawn over it on scroll */}
                        <span
                            aria-hidden="true"
                            className="absolute bottom-0 left-[7px] top-0 w-px bg-[#252d4a]/25"
                        />
                        <motion.span
                            aria-hidden="true"
                            style={{ scaleY: reduceMotion ? 1 : scrollYProgress }}
                            className="absolute bottom-0 left-[7px] top-0 w-px origin-top bg-[#252d4a]"
                        />

                        {milestones.map((item) => (
                            <motion.li
                                key={item.year}
                                initial={reduceMotion ? false : "hidden"}
                                whileInView="show"
                                viewport={{ once: true, amount: 0.3 }}
                                variants={itemVariants}
                                className="relative pb-16 last:pb-0 md:pb-24"
                            >
                                <motion.span
                                    aria-hidden="true"
                                    variants={dotVariants}
                                    className="absolute -left-10 top-3 h-[15px] w-[15px] rounded-full border border-[#252d4a] bg-[#252d4a] md:-left-14"
                                />

                                <time
                                    dateTime={item.year}
                                    className="block font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2.25rem,3.8vw,3.5rem)] leading-none text-[#252d4a]"
                                >
                                    {item.year}
                                </time>
                                <h3 className="m-0 mt-4 text-[clamp(1.2rem,1.6vw,1.5rem)] font-normal leading-[1.3]">
                                    {item.title}
                                </h3>
                                <p className="mb-0 mt-3 max-w-[44ch] text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.7]">
                                    {item.text}
                                </p>

                                {/* Photo for this milestone */}
                                <motion.div
                                    variants={frameVariants}
                                    className="relative mt-8 aspect-[16/10] w-full max-w-[540px] overflow-hidden border border-[#252d4a]"
                                >
                                    <motion.div variants={photoVariants} className="absolute inset-0">
                                        <Image
                                            src={item.image.src}
                                            alt={item.image.alt}
                                            fill
                                            sizes="(min-width: 768px) 40vw, 90vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </motion.div>
                            </motion.li>
                        ))}
                    </ol>
                </div>
            </MainContainer>
        </section>
    );
}