"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import MainContainer from "../ui/MainContainer";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";

type ServiceImage = { src: string; alt: string };

type ProgramImage = {
    id?: number;
    slug?: string;
    image: string;
    imageAlt?: string;
    title?: string;
    category?: string;
    description?: string;
    buttonText?: string;
    link?: string;
};

type OurServicesProps = {
    eyebrow?: string;
    heading?: string;
    dis?: string;
    images?: ServiceImage[];
    program?: ProgramImage[];
    isShowMoreButton?: boolean;
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const cardVariants: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

const imageVariants: Variants = {
    hidden: { scale: 1.12 },
    show: { scale: 1, transition: { duration: 1.4, ease: EASE } },
};

const cardColors = ["#fdfbf3", "#e7efdc", "#f3e9bd", "#dce9d8"];

export default function OurProgram({ eyebrow, heading, dis, images, program }: OurServicesProps) {
    const reduceMotion = useReducedMotion();
    const programImages: ProgramImage[] =
        program ?? images?.map((image, index) => ({ id: index, image: image.src, imageAlt: image.alt })) ?? [];

    return (
        <section aria-labelledby="services-title" className="bg-[#f4f4f4] px-5 text-[#15452e] md:px-[3.15%]">
            <MainContainer>
                <motion.header
                    initial={reduceMotion ? false : "hidden"}
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={cardVariants}
                    className="mx-auto mb-14 max-w-[42rem] text-center md:mb-20"
                >
                    <div className="text-center flex justify-center">
                        <SectionLabel>{eyebrow}</SectionLabel>
                    </div>

                    <div className="mt-4">
                        <SectionInnerTitle>{heading}</SectionInnerTitle>
                    </div>
                    {dis && <p className="mx-auto mt-6 max-w-[72ch] text-base leading-7 text-[#4a5d2e]">{dis}</p>}
                </motion.header>

                <div className="grid gap-5 md:gap-6">
                    {programImages.map((item, index) => {
                        const textFirst = index % 2 === 1;
                        const href = item.link ?? (item.slug ? `/our-program/${item.slug}` : "/our-program");

                        return (
                            <motion.article
                                key={item.id ?? item.slug ?? item.image}
                                initial={reduceMotion ? false : "hidden"}
                                whileInView="show"
                                viewport={{ once: true, amount: 0.18 }}
                                variants={cardVariants}
                                className="grid min-h-[clamp(360px,38vw,200px)] overflow-hidden rounded-[0.65rem] md:grid-cols-2"
                            >
                                <div className={`relative min-h-[200px] overflow-hidden ${textFirst ? "md:order-2" : "md:order-1"}`}>
                                    <motion.div variants={imageVariants} className="absolute inset-0">
                                        <Image src={item.image} alt={item.imageAlt ?? item.title ?? "Program image"} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                                    </motion.div>
                                </div>

                                <div
                                    className={`flex flex-col justify-between px-8 py-10 sm:px-12 sm:py-14 md:px-[7vw] md:py-[6vw] ${textFirst ? "md:order-1" : "md:order-2"}`}
                                    style={{ backgroundColor: cardColors[index % cardColors.length] }}
                                >
                                    <div>
                                        {item.category &&
                                            <p className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[#687451]">{item.category}</p>}

                                        <h3 className="mt-5 max-w-[12ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2.6rem,5vw,3.6rem)] font-normal leading-[0.9] tracking-[-0.045em] text-[#15452e]">
                                            {item.title}
                                        </h3>

                                        {item.description && <p className="mt-8 max-w-[40ch] text-[clamp(1rem,1.25vw,1.25rem)] leading-[1.55] text-[#15452e]/90">{item.description}</p>}
                                    </div>

                                    <Link href={href} className="mt-10 w-fit border-b-2 border-[#15452e] pb-1 text-sm font-semibold text-[#15452e] transition-colors hover:border-[#4a5d2e] hover:text-[#4a5d2e]">
                                        {item.buttonText ?? "Learn More"}
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>
            </MainContainer>
        </section>
    );
}
