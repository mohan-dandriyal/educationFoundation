

"use client"

import React, { ReactNode } from 'react'
import { motion, type Variants } from "motion/react";


interface sectionTitleProps {
    children: ReactNode
}

const EASE = [0.2, 0.7, 0.2, 1] as const;


export const SectionTitle = ({ children }: sectionTitleProps) => {
    // Heading: words slide up out of a mask, one after another
    const headingVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };

    const wordVariants: Variants = {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
    };

    return (

        <motion.h2
            id="hero-title"
            variants={headingVariants}
            // aria-label={content.title}
            className="m-0 max-w-120 text-[#252d4a] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(3rem,5vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] max-[900px]:text-[clamp(3.25rem,12vw,5.5rem)]"
        >
            <span aria-hidden="true">
                {/* mask: clips the word while it slides up (padding keeps descenders) */}
                <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                        {children}
                    </motion.span>
                </span>
            </span>
        </motion.h2>
    )
}


export const SectionInnerTitle = ({ children }: sectionTitleProps) => {
    // Heading: words slide up out of a mask, one after another
    const headingVariants: Variants = {
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
    };

    const wordVariants: Variants = {
        hidden: { y: "110%" },
        show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
    };

    return (

        <motion.h2
            id="hero-title"
            variants={headingVariants}
            className="mt-3 max-w-[28ch] text-[#252d4a] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,2.9vw,2.2rem)] font-normal leading-[1.3] tracking-[-0.01em]"
        >
            <span aria-hidden="true">
                {/* mask: clips the word while it slides up (padding keeps descenders) */}
                <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                        {children}
                    </motion.span>
                </span>
            </span>
        </motion.h2>
    )
}


export const SectionLabel = ({ children }: sectionTitleProps) => {
    // Heading: words slide up out of a mask, one after another
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
            id="hero-title"
            variants={headingVariants}
                                className="m-0 text-[#252d4a] font-mono text-[clamp(0.85rem,1.1vw,1.1rem)] uppercase leading-none"
        >
            <span aria-hidden="true">
                {/* mask: clips the word while it slides up (padding keeps descenders) */}
                <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                        {children}
                    </motion.span>
                </span>
            </span>
        </motion.p>
    )
}
