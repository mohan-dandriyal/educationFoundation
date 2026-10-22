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
            className="relative border-b border-[#252d4a] text-[#252d4a]"
        >
            <MainContainer>
                <motion.div
                    initial={initial}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={columnVariants}
                    className="flex min-h-[520px] px-5  flex-col items-start justify-around py-16 md:h-dvh md:min-h-0 md:py-0"
                >
                    <div>
                        <SectionLabel>
                           <span className="text-[#252d4a]">{label}</span>
                        </SectionLabel>

                        <SectionInnerTitle>{title}</SectionInnerTitle>
                    </div>

                    <motion.p
                        variants={riseVariants}
                        className="mt-16 max-w-[34ch] text-[clamp(1rem,1.1vw,1.25rem)] leading-normal md:mt-20 md:max-w-[36ch]"
                    >
                        {description}
                    </motion.p>

                    <motion.div variants={riseVariants}>
                        <PrimaryButton href={ctaHref ?? ""}>{cta}</PrimaryButton>
                    </motion.div>
                </motion.div>
            </MainContainer>

            {/* Image column: outer wrapper only watches the scroll, inner frame does the clip reveal */}
            <motion.div
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="relative h-[min(110vw,520px)] w-full border-t border-[#252d4a] md:absolute md:right-0 md:top-0 md:h-full md:w-6/12 md:border-l md:border-t-0"
            >
                <motion.div
                    variants={frameVariants}
                    className="absolute inset-0 overflow-hidden"
                >
                    <motion.div variants={photoVariants} className="absolute inset-0">
                        <Image
                            src={image?.src ?? ""}
                            alt={image?.alt ?? ""}
                            fill
                            priority
                            sizes="(min-width: 768px) 50vw, 100vw"
                            className="object-cover"
                        />
                    </motion.div>
                </motion.div>
            </motion.div>
        </section>
    );
}
