"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import MainContainer from "../ui/MainContainer";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import { PrimaryButton } from "../ui/PrimaryButton";

type AboutUsProps = {
    label?: string;
    title?: string;
    description?: string;
    cta?: string;
    ctaHref?: string;
    image?: { src: string; alt: string };
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Text column: title, paragraph and button appear one after another
const columnVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.15, staggerChildren: 0.18 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 26 },
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

export function AboutUsSection({
    label,
    title,
    description,
    cta,
    ctaHref,
    image,
}: AboutUsProps) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <section
            aria-labelledby="about-title"
            className="relative border-b border-[#15452e] text-[#15452e]"
        >
            <MainContainer>
                <motion.div
                    initial={initial}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={columnVariants}
                    className="px-5 py-16 flex justify-center flex-col items-center md:py-20"
                >
                    <div>

                        <div className="mt-4 text-center">
                            <SectionInnerTitle>{title}</SectionInnerTitle>
                        </div>
                    </div>

                    <motion.p
                        variants={riseVariants}
                        className="mt-16 max-w-[34ch] text-[clamp(1rem,1.1vw,1.25rem)] leading-normal md:mt-8 md:max-w-[76ch] text-center"
                    >
                        {description}
                    </motion.p>

                    <motion.div variants={riseVariants}>
                        <PrimaryButton href={ctaHref ?? ""}>{cta}</PrimaryButton>
                    </motion.div>
                </motion.div>
            </MainContainer>

            <motion.div
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="relative h-[clamp(280px,38vw,560px)] w-full"
            >
                <motion.div
                    variants={frameVariants}
                    role="img"
                    aria-label={image?.alt ?? ""}
                    className="absolute inset-0 overflow-hidden bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url(${image?.src ?? ""})` }}
                >
                    <motion.div
                        variants={photoVariants}
                        className="absolute inset-0 bg-cover bg-center"
                        style={{
                            backgroundImage: `url(${image?.src ?? ""})`,
                            backgroundAttachment: "fixed",
                        }}
                    />
                </motion.div>
            </motion.div>

            
        </section>
    );
}
