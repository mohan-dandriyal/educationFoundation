"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";
import { FaCheck } from "react-icons/fa6";

export type AboutSplitData = {
  eyebrow?: string;
  title: string;
  description: string;
  cta?: string;
  ctaHref?: string;
  stats?: Array<{ value: string; label: string }>;
  thumbs?: Array<{ src: string; alt: string }>;
  mainImage?: { src: string; alt: string };
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const columnVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function AboutSplitSection({
  eyebrow = "WHO WE ARE",
  title,
  description,
  cta = "Explore Our Programs",
  ctaHref = "/our-program",
  stats,
  thumbs,
  mainImage,
}: AboutSplitData) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section className="bg-[#fff] px-6 py-16 text-[#15452e] md:px-[6%]">
      <MainContainer>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Visual Collage */}
          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={columnVariants}
            className="lg:col-span-6 relative"
          >
            {/* Main Featured Photo */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl ring-1 ring-[#15452e]/10 sm:aspect-[16/11]">
              <Image
                src={mainImage?.src || "/images/about-main.jpg"}
                alt={mainImage?.alt || "Dedicated educators teaching children"}
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2015]/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping Thumbnails & Stat Badge */}
            {thumbs && thumbs.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:-mt-12 sm:ml-6 sm:max-w-md">
                {thumbs.map((thumb, idx) => (
                  <motion.div
                    key={thumb.src}
                    variants={riseVariants}
                    className="relative aspect-[4/3] overflow-hidden rounded-xl border-4 border-[#fdfbf3] bg-[#15452e]/10 shadow-lg ring-1 ring-[#15452e]/10 sm:aspect-[3/2]"
                  >
                    <Image
                      src={thumb.src}
                      alt={thumb.alt}
                      fill
                      sizes="(min-width: 768px) 20vw, 45vw"
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Right Column: Story & Highlights */}
          <motion.div
            initial={initial}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={columnVariants}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <motion.div variants={riseVariants}>
              <SectionLabel>{eyebrow}</SectionLabel>
            </motion.div>

            <motion.div variants={riseVariants} className="mt-3">
              <SectionInnerTitle>{title}</SectionInnerTitle>
            </motion.div>

            <motion.p
              variants={riseVariants}
              className="mt-6 text-[clamp(1.05rem,1.15vw,1.2rem)] leading-relaxed text-[#15452e]/85"
            >
              {description}
            </motion.p>

            {/* Core Values checklist */}
            <motion.div variants={riseVariants} className="mt-8 space-y-3">
              {[
                "100% Free grassroots learning centers in underserved neighborhoods",
                "Qualified teachers, bilingual storybooks & STEAM learning kits",
                "Holistic nourishment with daily mid-day snacks and health checks",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#15452e] text-[#e6f5ae]">
                    <FaCheck className="h-3 w-3" />
                  </span>
                  <span className="text-sm font-medium leading-6 text-[#15452e]/90">
                    {point}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Impact Stats Grid */}
            {stats && stats.length > 0 && (
              <motion.div
                variants={riseVariants}
                className="mt-10 grid grid-cols-3 gap-4 border-y border-[#15452e]/15 py-6"
              >
                {stats.map((st) => (
                  <div key={st.label}>
                    <p className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-2xl font-bold text-[#15452e] sm:text-3xl">
                      {st.value}
                    </p>
                    <p className="m-0 mt-1 text-xs font-semibold uppercase tracking-wider text-[#8a6b36]">
                      {st.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Action CTA */}
            <motion.div variants={riseVariants} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={ctaHref}
                className="inline-flex items-center justify-center rounded-full bg-[#15452e] px-7 py-3 text-sm font-semibold capitalize text-[#e6f5ae] shadow-md transition-all hover:bg-[#b49358] hover:text-[#fdfbf3]"
              >
                {cta}
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex items-center justify-center rounded-full border border-[#15452e]/30 bg-transparent px-7 py-3 text-sm font-semibold capitalize text-[#15452e] transition-all hover:border-[#15452e] hover:bg-[#15452e]/5"
              >
                Partner With Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </MainContainer>
    </section>
  );
}
