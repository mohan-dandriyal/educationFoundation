"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionHeading } from "./Sectionheading";
import { ActionLink } from "./Actionlink";
import MainContainer from "../ui/MainContainer";
import { PrimaryButton } from "../ui/PrimaryButton";

export type CtaButton = {
    text: string;
    linkTo: string;
    variant?: string; // "primary" or "secondary"
};

export type CtaContent = {
    label?: string;
    title: string;
    description?: string;
    image: { src: string; alt: string };
    buttons: CtaButton[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Text side: heading and buttons appear one after another
const wrapVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Image: opens from the left edge while the photo zoom settles
const frameVariants: Variants = {
    hidden: { clipPath: "inset(0% 100% 0% 0%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.3, ease: EASE },
    },
};
const photoVariants: Variants = {
    hidden: { scale: 1.2 },
    show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

export default function FinalCtaSection({ content }: { content: CtaContent }) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <div className="bg-[#fdfbf3]">
            <MainContainer>
                <section
                    aria-labelledby="cta-title"
                    className="grid min-h-[560px] grid-cols-1  text-[#15452e] md:grid-cols-2"
                >

                    {/* Image: outer wrapper only watches the scroll, inner frame does the clip reveal */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.1 }}
                        className="relative min-h-[360px] border-b border-[#15452e] md:min-h-0 md:border-b-0 md:border-r"
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
                                    sizes="(min-width: 768px) 50vw, 100vw"
                                    className="object-cover"
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Text */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={wrapVariants}
                        className="flex flex-col justify-center px-6 py-16 md:px-[8%] md:py-24"
                    >
                        <SectionHeading
                            id="cta-title"
                            label={content.label}
                            title={content.title}
                            description={content.description}
                            size="xl"
                        />

                        <div className="mt-10 flex flex-wrap items-center gap-4">
                            {content.buttons.map((button) => (
                                <motion.div key={button.text} variants={riseVariants}>
                                    <PrimaryButton href={button.linkTo}>
                                        {button.text}
                                    </PrimaryButton>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </section>
            </MainContainer>
        </div>
    );
}
