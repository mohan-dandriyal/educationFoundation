"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";

export type OurVisionContent = {
    tag: string;
    title: string;
    description: string;
    highlight: string;
    image: string;
    imageAlt: string;
    buttonText: string;
    buttonLink: string;
};

type OurVisionProps = { content: OurVisionContent };

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function OurVision({ content }: OurVisionProps) {
    const reduceMotion = useReducedMotion();

    return (
        <section
            id="our-vision"
            aria-labelledby="our-vision-title"
            className="bg-[#fdfbf3] px-5 py-20 text-[#15452e] sm:px-8 lg:py-15"
        >
            {/* One reveal for the whole section, played once when it scrolls into view */}
            <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.9, ease: EASE }}
                className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-20"
            >
                {/* Image: arch-shaped frame with the highlight pinned to its corner */}
                <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                    <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-sm bg-[#15452e]/10">
                        <Image
                            src={content.image}
                            alt={content.imageAlt}
                            fill
                            sizes="(min-width: 1024px) 40vw, 90vw"
                            className="object-cover"
                        />
                    </div>

                    <p className="absolute inset-x-4 bottom-4 m-0 bg-[#15452e] px-6 py-5 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-lg leading-snug text-[#fdfbf3] shadow-[0_18px_40px_-18px_rgba(21,69,46,0.7)] sm:inset-x-auto sm:-bottom-8 sm:-right-6 sm:max-w-[17rem] sm:text-xl lg:-right-10">
                        <span
                            aria-hidden="true"
                            className="mb-3 block h-[2px] w-10 bg-[#b49358]"
                        />
                        {content.highlight}
                    </p>
                </div>

                {/* Text */}
                <div className="max-w-xl lg:pl-4">

                    <div>
                        <SectionLabel>
                        {content.tag}
                        </SectionLabel>
                    </div>

                    
                    <div>
                        <SectionInnerTitle>
                            {content.title}
                        </SectionInnerTitle>
                    </div>

                    <p className="mb-0 mt-7 max-w-[56ch] text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.75] text-[#15452e]/85">
                        {content.description}
                    </p>

                    {
                        content.buttonLink &&
                        <Link
                            href={content.buttonLink}
                            className="mt-10 inline-flex items-center rounded-full bg-[#15452e] px-8 py-3.5 font-[Arial,Helvetica,sans-serif] text-[0.95rem] font-semibold tracking-[0.03em] text-[#fdfbf3] transition-colors duration-300 hover:bg-[#b49358] hover:text-[#15452e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
                        >
                            {content.buttonText}
                        </Link>
                    }
                </div>
            </motion.div>
        </section>
    );
}