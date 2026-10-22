"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PrimaryButton } from "../ui/PrimaryButton";
import { SectionTitle } from "../ui/SectionTitle";

type Img = { src: string; alt: string };

type contactHeroSectionProps = {
    title?: string;
    description?: string;
    button: {
        linkTo?: string;
        text?: string;
    };
    /** The large photo on the right */
    mainImag: Img;
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Left column: title, text, photos and button appear one after another
const columnVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.15, staggerChildren: 0.16 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};



// Large photo: opens from the right edge while the zoom settles
const mainFrameVariants: Variants = {
    hidden: { clipPath: "inset(0% 0% 0% 100%)" },
    show: {
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.3, ease: EASE },
    },
};
const mainPhotoVariants: Variants = {
    hidden: { scale: 1.2 },
    show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

export default function HeroSection({
    title,
    description,
    mainImag,
    button
}: contactHeroSectionProps) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <section
            aria-labelledby="about-split-title"
            className="grid min-h-svh grid-cols-1 bg-[#fdfbf3] text-[#252d4a] md:grid-cols-2"
        >
            {/* Left column */}
            <motion.div
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.25 }}
                variants={columnVariants}
                className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-12"
            >
                <SectionTitle>
                    {title}
                </SectionTitle>

                <motion.p
                    variants={riseVariants}
                    className="mb-0 mt-8 max-w-[28ch] text-[clamp(1rem,1.1vw,1.25rem)] leading-normal"
                >
                    {description}
                </motion.p>

                <PrimaryButton href={button?.linkTo || "/about"}>
                    {button?.text ?? ""}
                </PrimaryButton>

            </motion.div>

            {/* Right column: outer wrapper only watches the scroll, inner frame does the clip reveal */}
            <motion.div
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.1 }}
                className="relative min-h-[420px] md:min-h-0"
            >
                <motion.div
                    variants={mainFrameVariants}
                    className="absolute inset-0 overflow-hidden"
                >
                    <motion.div variants={mainPhotoVariants} className="absolute inset-0">
                        <Image
                            src={mainImag.src}
                            alt={mainImag.alt}
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
