"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionHeading } from "./Sectionheading";
import { ActionLink } from "./Actionlink";
import { getIcon } from "./Iconmap";
import MainContainer from "../ui/MainContainer";

export type FutureGoal = {
    id: number;
    title: string;
    description: string;
    icon?: string;
};

export type GoalsContent = {
    label?: string;
    title: string;
    description?: string;
    image: { src: string; alt: string };
    goals: FutureGoal[];
    button?: { text: string; linkTo: string };
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Text side: heading, goals and button appear one after another
const wrapVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Image: opens from the right edge while the photo zoom settles
const frameVariants: Variants = {
    hidden: { clipPath: "inset(0% 0% 0% 100%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.3, ease: EASE },
    },
};
const photoVariants: Variants = {
    hidden: { scale: 1.2 },
    show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

export default function FutureGoalsSection({ content }: { content: GoalsContent }) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <section
            aria-labelledby="goals-title"
            className="bg-[#fdfbf3] px-6 py-16 text-[#252d4a] md:px-[6%] md:py-28 "
        >
            <MainContainer>
                <div className="mx-auto grid  gap-14 lg:grid-cols-2 lg:gap-20">
                    {/* Text */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={wrapVariants}
                    >
                        <SectionHeading
                            id="goals-title"
                            label={content.label}
                            title={content.title}
                            description={content.description}
                        />

                        <ul className="m-0 mt-12 grid list-none gap-x-8 gap-y-10 p-0 sm:grid-cols-2">
                            {content.goals.map((goal) => {
                                const Icon = getIcon(goal.icon);
                                return (
                                    <motion.li key={goal.id} variants={riseVariants}>
                                        <span
                                            aria-hidden="true"
                                            className="grid h-11 w-11 place-items-center rounded-full border border-[#252d4a]"
                                        >
                                            <Icon className="h-4 w-4" />
                                        </span>
                                        <h3 className="mb-0 mt-5 text-[clamp(1.1rem,1.4vw,1.35rem)] font-normal leading-[1.3]">
                                            {goal.title}
                                        </h3>
                                        <p className="mb-0 mt-2 text-sm leading-[1.7]">{goal.description}</p>
                                    </motion.li>
                                );
                            })}
                        </ul>

                        {content.button && (
                            <motion.div variants={riseVariants} className="mt-12">
                                <ActionLink href={content.button.linkTo}>{content.button.text}</ActionLink>
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Image: outer wrapper only watches the scroll, inner frame does the clip reveal */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative min-h-[420px] border border-[#252d4a] lg:min-h-0"
                    >
                        <motion.div
                            variants={frameVariants}
                            className="absolute inset-0 overflow-hidden"
                        >
                            <motion.div variants={photoVariants} className="absolute inset-0">
                                <Image
                                    src={content.image.src}
                                    alt={content.image.alt}
                                    fill
                                    sizes="(min-width: 1024px) 45vw, 100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    );
}
