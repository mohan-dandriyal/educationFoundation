"use client"

import React, { ReactNode } from 'react'
import { motion, type Variants } from "motion/react";

interface sectionTitleProps {
    children: ReactNode
    className : string
}

const EASE = [0.2, 0.7, 0.2, 1] as const;

export const SectionTitle = ({ children }: sectionTitleProps) => {
    // Heading: words slide up out of a mask, one after another
    const headingVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
    };

    const wordVariants: Variants = {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
    };

    return (
        <motion.h2
            id="hero-title"
            variants={headingVariants}
            className="m-0 max-w-full break-words text-pretty font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,3.6vw,3.25rem)] font-normal leading-[1.08] tracking-[-0.03em] text-[#15452e]"
        >
            <span aria-hidden="true" className="inline-block max-w-full">
                {/* mask: clips the word while it slides up (padding keeps descenders) */}
                <span className="mb-[-0.15em] inline-block max-w-full overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block max-w-full break-words">
                        {children}
                    </motion.span>
                </span>
            </span>
        </motion.h2>
    )
}

export const SectionInnerTitle = ({ children, className }: sectionTitleProps) => {
    // Heading: words slide up out of a mask, one after another
    const headingVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
    };

    const wordVariants: Variants = {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
    };

    return (
        <motion.h2
            id="hero-title"
            variants={headingVariants}
            className={`mt-3 max-w-full break-words text-pretty font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.5rem,3vw,2.65rem)] font-medium leading-[1.14] tracking-[-0.025em] text-[#15452e] ${className || ""}`}
        >
            <span aria-hidden="true" className="inline-block max-w-full">
                {/* mask: clips the word while it slides up (padding keeps descenders) */}
                <span className="mb-[-0.15em] inline-block max-w-full overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block max-w-full break-words">
                        {children}
                    </motion.span>
                </span>
            </span>
        </motion.h2>
    )
}

export const SectionLabel = ({ children }: sectionTitleProps) => {
    const headingVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };

    const wordVariants: Variants = {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
    };

    return (
        <motion.p
            id="section-label"
            variants={headingVariants}
            className="m-0 flex items-center gap-3 text-[clamp(0.68rem,0.8vw,0.82rem)] font-semibold uppercase leading-none tracking-[0.22em] text-[#8a6b36] before:h-px before:w-8 before:shrink-0 before:bg-[#6f984b]"
        >
            <span aria-hidden="true">
                <span className="mb-[-0.15em] text-[#6f984b] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                        {children}
                    </motion.span>
                </span>
            </span>
        </motion.p>
    )
}
