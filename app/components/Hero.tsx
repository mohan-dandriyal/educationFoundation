"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { HeroContent } from "../data/home";

type HeroProps = { content: HeroContent };

const EASE = [0.2, 0.7, 0.2, 1] as const;

// One orchestrated entrance: heading words rise out of a mask,
// then the description and CTA follow. Nothing loops afterwards.
const textVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
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
    <main className="bg-[#fdfbf3] text-[#15452e]">
      <section
        className="relative isolate flex min-h-dvh items-end overflow-hidden bg-[#0e2a1d]"
        aria-labelledby="hero-title"
      >
        {/* Image: settles in once on load */}
        <motion.div
          className="absolute inset-0 -z-20"
          initial={reduceMotion ? false : { scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.6, ease: EASE }}
        >
          <Image
            src={content.leftImage.src}
            alt={content.leftImage.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        {/* Scrim is heavier where the text sits (bottom-left) and fades out
            toward the top-right so the photo stays visible. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_top_right,rgba(14,42,29,0.92)_0%,rgba(14,42,29,0.6)_45%,rgba(14,42,29,0.1)_100%)]"
        />

        <div className="mx-auto w-full max-w-7xl px-5 pb-14 pt-0 sm:px-8 sm:pb-20 lg:pb-24">
          <motion.div
            variants={textVariants}
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            className="max-w-3xl text-left text-[#fdfbf3]"
          >
            <h1
              id="hero-title"
              aria-label={content.title}
              className="m-0 max-w-[13ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(3rem,8.5vw,7.5rem)] font-normal leading-[0.95] tracking-[-0.04em]"
            >
              {words.map((word, i) => (
                <span key={i} aria-hidden="true">
                  {/* mask clips each word while it slides up; padding keeps descenders */}
                  <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
                    <motion.span variants={wordVariants} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                  {i < words.length - 1 && " "}
                </span>
              ))}
            </h1>

            {/* Gold rule ties the hero to the header's underline accent */}
            <motion.span
              aria-hidden="true"
              variants={riseVariants}
              className="mt-8 block h-[2px] w-16 bg-[#b49358]"
            />

            <motion.p
              variants={riseVariants}
              className="mb-0 mt-6 max-w-[48ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7] text-[#fdfbf3]/90"
            >
              {content.description}
            </motion.p>

            <motion.a
              href={content.ctaHref}
              variants={riseVariants}
              whileTap={{ scale: 0.97 }}
              className="group relative isolate mt-10 inline-flex items-center overflow-hidden rounded-full bg-[#fdfbf3] px-8 py-3.5 font-[Arial,Helvetica,sans-serif] text-[0.95rem] font-semibold tracking-[0.03em] text-[#15452e] transition-colors duration-500 hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
            >
              {/* green fill sweeps in from the left on hover */}
              <span
                aria-hidden="true"
                className="absolute inset-0 z-0 origin-left scale-x-0 bg-[#15452e] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 motion-reduce:transition-none"
              />
              <span className="relative z-10">{content.cta}</span>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}