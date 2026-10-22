"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { PrimaryButton } from "../ui/PrimaryButton";
import MainContainer from "../ui/MainContainer";
import { SectionInnerTitle } from "../ui/SectionTitle";
import Link from "next/link";

type ServiceImage = { src: string; alt: string };
type ProgramImage = {
    id?: number;
    slug?: string;
    image: string;
    imageAlt?: string;
    title?: string;
};

type OurServicesProps = {
    eyebrow?: string;
    heading?: string;
    images?: ServiceImage[];
    program?: ProgramImage[];
    isShowMoreButton?: boolean;
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Eyebrow: simple fade + rise
const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Image frames: unveil from the bottom, staggered
const frameVariants: Variants = {
    hidden: { clipPath: "inset(100% 0% 0% 0%)" },
    show: (i: number) => ({
        clipPath: "inset(0% 0% 0% 0%)",
        transition: { duration: 1.1, ease: EASE, delay: 0.25 + i * 0.18 },
    }),
};
// Photo inside the frame: slow zoom settles while it is revealed
const photoVariants: Variants = {
    hidden: { scale: 1.25 },
    show: (i: number) => ({
        scale: 1,
        transition: { duration: 1.6, ease: EASE, delay: 0.25 + i * 0.18 },
    }),
};

export default function OurProgram({ eyebrow, heading, images, program, isShowMoreButton = true,
}: OurServicesProps) {
    const reduceMotion = useReducedMotion();
    const programImages: ProgramImage[] = program ?? images?.map((image, index) => ({
        id: index,
        image: image.src,
        imageAlt: image.alt,
    })) ?? [];

    // Skip all motion for people who prefer reduced motion
    const initial = reduceMotion ? false : "hidden";

    return (
        <section
            aria-labelledby="services-title"
            className=" px-6 py-12 text-[#0b2a12] md:px-[3.15%] md:py-[52px]"
        >
            <MainContainer>
                <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1.15fr] md:gap-8 lg:grid-cols-[1fr_1fr]">
                    {/* Text column */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="flex flex-col justify-between"
                    >
                        <div>
                            <motion.p
                                variants={eyebrowVariants}
                                className="m-0 font-mono text-[#252d4a] text-[clamp(0.85rem,1.1vw,1.1rem)] uppercase leading-none"
                            >
                                {eyebrow}
                            </motion.p>

                            <SectionInnerTitle>
                                {heading}
                            </SectionInnerTitle>
                        </div>

                        {isShowMoreButton && (
                            <PrimaryButton href="/our-program">
                                Show More
                            </PrimaryButton>
                        )}
                    </motion.div>

                    {/* Image column */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.25 }}
                        className="grid grid-cols-2 gap-4 md:ml-auto md:w-full md:max-w-[900px] md:gap-[29px]"
                    >
                        {programImages.map((pro, i) => (
                            <motion.div
                                key={pro.id ?? ""}
                                custom={i}
                                variants={frameVariants}
                                className="group relative aspect-424/626 max-h-80 w-full overflow-hidden"
                            >
                                {pro.slug ? (
                                    <Link href={`/our-program/${pro.slug}`} className="block h-full">
                                    <motion.div
                                        custom={i}
                                        variants={photoVariants}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={pro.image ?? ""}
                                            alt={pro.imageAlt ?? ""}
                                            fill
                                            sizes="(min-width: 768px) 25vw, 50vw"
                                            className="object-cover"
                                        />
                                    </motion.div>

                                    {pro.title && (
                                        <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-[#e6f5ae]/95 px-4 py-3 text-[#252d4a] opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100">
                                            <h3 className="m-0 text-sm font-medium">
                                                {pro.title}
                                            </h3>
                                        </div>
                                    )}
                                    </Link>
                                ) : (
                                    <motion.div
                                        custom={i}
                                        variants={photoVariants}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={pro.image}
                                            alt={pro.imageAlt ?? ""}
                                            fill
                                            sizes="(min-width: 768px) 25vw, 50vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </MainContainer>
        </section>
    );
}
