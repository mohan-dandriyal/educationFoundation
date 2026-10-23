"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { PrimaryButton } from "../ui/PrimaryButton";
import MainContainer from "../ui/MainContainer";
import { BlogCard, type BlogPost } from "@/app/components/ui/BlogCard"; // adjust path if needed
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";

type BlogSectionProps = {
    eyebrow?: string;
    heading?: string;
    post: BlogPost[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Eyebrow: simple fade + rise
const eyebrowVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

// Heading: words slide up out of a mask, one after another
const headingVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.035, delayChildren: 0.15 } },
};
const wordVariants: Variants = {
    hidden: { y: "110%" },
    show: { y: "0%", transition: { duration: 0.75, ease: EASE } },
};

export default function BlogSection({ eyebrow, heading, post }: BlogSectionProps) {
    const reduceMotion = useReducedMotion();
    const words = heading?.split(" ");

    // Skip all motion for people who prefer reduced motion
    const initial = reduceMotion ? false : "hidden";

    return (
        <section
            aria-labelledby="blog-title"
            className=" px-6  text-[#0b2a12] md:px-[3.15%] "
        >
            <MainContainer>
                <div className="">
                    {/* Text column */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        className="flex flex-col justify-between"
                    >
                        <div>

                            <div>
                                <SectionLabel>
                                    {eyebrow}
                                </SectionLabel>
                            </div>

                            <div>
                                <SectionInnerTitle>
                                    {heading}
                                </SectionInnerTitle>
                            </div>
                        </div>

                    </motion.div>

                    {/* Right column: one post, one row */}
                    <div className=" flex mt-15 gap-10 flex-col lg:flex-row">
                        {
                            post?.slice(0, 2)?.map((po, i) => (<BlogCard key={i + 1} post={po} />))
                        }
                    </div>

                    <div className="flex justify-center ">
                        <PrimaryButton href="/blog">Explore All Post</PrimaryButton>
                    </div>
                </div>
            </MainContainer>
        </section>
    );
}
