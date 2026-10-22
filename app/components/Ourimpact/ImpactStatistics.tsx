"use client";

import { useEffect, useRef, useState } from "react";
import {
    animate,
    motion,
    useInView,
    useReducedMotion,
    type Variants,
} from "motion/react";
import { SectionHeading } from "./Sectionheading";
import { getIcon } from "./Iconmap";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";

export type ImpactStat = {
    id: number;
    value: string; // e.g. "1200+", "25+", "87%"
    title: string;
    description: string;
    icon?: string;
};

export type ImpactContent = {
    label?: string;
    title: string;
    description?: string;
    statistics: ImpactStat[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Everything appears one after another when the section scrolls into view
const wrapVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Counts a number up once when it scrolls into view, e.g. "1200+" shows as 1,200+
function CountUp({ value }: { value: string }) {
    const reduceMotion = useReducedMotion();
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });

    const match = value.match(/^([\d,]+)(.*)$/);
    const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
    const suffix = match ? match[2] : "";

    const [display, setDisplay] = useState(match ? `0${suffix}` : value);

    useEffect(() => {
        if (!match) return;
        if (reduceMotion) return;
        if (!inView) return;

        const controls = animate(0, target, {
            duration: 1.8,
            ease: EASE,
            onUpdate: (v) =>
                setDisplay(`${Math.round(v).toLocaleString("en-US")}${suffix}`),
        });
        return () => controls.stop();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView, reduceMotion, value]);

    const renderedDisplay = reduceMotion
        ? `${target.toLocaleString("en-US")}${suffix}`
        : display;

    return (
        <span ref={ref} aria-label={value}>
            <span aria-hidden="true">{renderedDisplay}</span>
        </span>
    );
}

export default function ImpactStatisticsSection({
    content,
}: {
    content: ImpactContent;
}) {
    const reduceMotion = useReducedMotion();

    return (
        <section
            aria-labelledby="impact-title"
            className="bg-[#fdfbf3] px-6 py-16 text-[#252d4a] md:px-[6%] md:py-28"
        >
            <MainContainer>
                <motion.div
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={wrapVariants}
                    className="mx-auto"
                >


                    <SectionHeading
                        id="impact-title"
                        label={content.label}
                        title={content.title}
                        description={content.description}
                    />

                    <ul className="m-0 mt-14 grid list-none gap-x-8 gap-y-12 p-0 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
                        {content.statistics.map((stat) => {
                            const Icon = getIcon(stat.icon);
                            return (
                                <motion.li
                                    key={stat.id}
                                    variants={riseVariants}
                                    className="border-t border-[#252d4a]/30 pt-6"
                                >
                                    <Icon aria-hidden="true" className="h-5 w-5 text-[#252d4a]" />

                                    <p className="m-0 mt-6 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(3rem,4.8vw,4.75rem)] leading-none text-[#252d4a]">
                                        <CountUp value={stat.value} />
                                    </p>

                                    <h3 className="mb-0 mt-5 text-[clamp(1.1rem,1.4vw,1.35rem)] font-normal leading-[1.3]">
                                        {stat.title}
                                    </h3>

                                    <p className="mb-0 mt-2 max-w-[28ch] text-sm leading-[1.7] text-[#252d4a]/75">
                                        {stat.description}
                                    </p>
                                </motion.li>
                            );
                        })}
                    </ul>
                </motion.div>
            </MainContainer>
        </section>
    );
}
