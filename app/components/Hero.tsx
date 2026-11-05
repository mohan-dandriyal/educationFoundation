"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FaArrowRight, FaHeart } from "react-icons/fa6";
import type { HeroContent } from "../data/home";

type HeroProps = { content: HeroContent };

const EASE = [0.2, 0.7, 0.2, 1] as const;

const textVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.1 } },
};

const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero({ content }: HeroProps) {
  const reduceMotion = useReducedMotion();
  const words = content.title.split(" ");

  return (
    <section
      className="relative isolate  flex sm:min-h-[88dvh] min-h-[40vh] items-end overflow-hidden bg-[#0e2a1d] text-[#fdfbf3]"
      aria-labelledby="hero-title"
    >
      {/* Background Hero Photo */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduceMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
      >
        <Image
          src={content.leftImage.src}
          alt={content.leftImage.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Rich layered gradient scrim for high contrast & warmth */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(10,32,21,0.94)_0%,rgba(14,42,29,0.78)_48%,rgba(14,42,29,0.35)_100%)]"
      />

    <div className="sm:px-8 px-5 w-full">
      <div className="mx-auto w-full max-w-[1366px] pb-16 sm:pt-28 pt-20 sm:pb-20 lg:pb-24">
        <div className="grid items-end gap-12">
          {/* Left Content Column */}
          <motion.div
            variants={textVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            className="max-w-6xl text-left"
          >
            {content.eyebrow && (
              <motion.div
                variants={riseVariants}
                className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-[#e6f5ae]/30 bg-[#15452e]/70 px-4 py-1.5 sm:text-xs text-[9px] font-bold uppercase tracking-[0.2em] text-[#e6f5ae] backdrop-blur-sm"
              >
                <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
                <span>{content.eyebrow}</span>
              </motion.div>
            )}

            <h1
              id="hero-title"
              aria-label={content.title}
              className="m-0 max-w-[18ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,5vw,3.75rem)] font-normal leading-[1.05] tracking-[-0.03em] break-words text-[#fdfbf3]"
            >
              {words.map((word, i) => (
                <span key={i} aria-hidden="true">
                  <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>

            <motion.span
              aria-hidden="true"
              variants={riseVariants}
              className="mt-7 block h-[3px] w-20 rounded-full bg-[#b49358]"
            />

            <motion.p
              variants={riseVariants}
              className="mb-0 mt-6 max-w-[68ch] text-[clamp(15px,16px,16px)] leading-[1.75] text-[#fdfbf3]/90"
            >
              {content.description}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={riseVariants}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Link
                href={content.ctaHref}
                className="group relative isolate inline-flex items-center gap-3 overflow-hidden rounded-full bg-[#e6f5ae] px-8 py-4 text-sm sm:text-[15px] font-bold tracking-[0.03em] text-[#15452e] shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#b49358] hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6f5ae]"
              >
                <FaHeart className="h-4 w-4 text-[#d97706] transition-colors group-hover:text-[#fdfbf3]" />
                <span>{content.cta}</span>
                <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>

              {content.secondaryCta && content.secondaryCtaHref && (
                <Link
                  href={content.secondaryCtaHref}
                  className="inline-flex items-center gap-2 rounded-full border border-[#fdfbf3]/40 bg-[#fdfbf3]/10 px-7 py-4 sm:text-[15px] text-sm font-semibold tracking-[0.03em] text-[#fdfbf3] backdrop-blur-sm transition-all duration-300 hover:border-[#e6f5ae] hover:bg-[#fdfbf3]/20"
                >
                  <span>{content.secondaryCta}</span>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Right Spotlight Card + Stats */}
          {/* <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: EASE }}
            className="flex flex-col gap-5 rounded-3xl border border-[#fdfbf3]/15 bg-[#0e2a1d]/80 p-6 backdrop-blur-md sm:p-7"
          >
            {content.rightImage?.src && (
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-[#fdfbf3]/15">
                <Image
                  src={content.rightImage.src}
                  alt={content.rightImage.alt}
                  fill
                  sizes="(min-width: 1024px) 32vw, 90vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 rounded-full bg-[#15452e]/90 px-3.5 py-1 text-xs font-semibold text-[#e6f5ae] backdrop-blur-sm">
                  100% Free Community Classrooms
                </div>
              </div>
            )}

            {content.stats && content.stats.length > 0 && (
              <dl className="m-0 grid grid-cols-3 gap-4 divide-x divide-[#fdfbf3]/15 pt-2">
                {content.stats.map((stat, idx) => (
                  <div
                    key={stat.label}
                    className={idx > 0 ? "pl-4" : ""}
                  >
                    <dd className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.6rem,2.4vw,2.35rem)] font-bold leading-none text-[#e6f5ae]">
                      {stat.value}
                    </dd>
                    <dt className="mt-2 text-xs font-medium uppercase tracking-wider text-[#fdfbf3]/75">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            )}
          </motion.div> */}
        </div>
      </div>
    </div>
    </section>
  );
}
