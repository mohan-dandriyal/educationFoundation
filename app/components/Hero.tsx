"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { HeroContent } from "../data/home";

type ImageBoxProps = {
  image: string;
  alt: string;
  className?: string;
  priority?: boolean;
  from: "left" | "right";
};

type HeroProps = { content: HeroContent };

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Card: opens like a curtain, staggers its children, then floats gently forever
const makeCardVariants = (float: boolean): Variants => ({
  hidden: { opacity: 0, clipPath: "inset(50% 0% 50% 0%)" },
  show: {
    opacity: 1,
    clipPath: "inset(0% 0% 0% 0%)",
    ...(float ? { y: [0, -10, 0] } : {}),
    transition: {
      duration: 0.9,
      ease: EASE,
      delayChildren: 0.5,
      staggerChildren: 0.14,
      ...(float
        ? { y: { duration: 7, ease: "easeInOut", repeat: Infinity, delay: 1.8 } }
        : {}),
    },
  },
});

// Generic child: rise + fade
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Heading: words slide up out of a mask, one after another
const headingVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

export function Hero({ content }: HeroProps) {
  return (
    <main className="min-h-screen bg-[#fdfbf3] text-[#3b4d28]">
      <section
        className="relative grid min-h-dvh grid-cols-2 overflow-hidden max-[900px]:grid-cols-1"
        aria-labelledby="hero-title"
      >
        <ImageBox
          image={content.leftImage.src}
          alt={content.leftImage.alt}
          className="col-start-1 row-start-1 max-[900px]:row-start-2 max-[900px]:min-h-[48vw] max-[560px]:min-h-[120vw]"
          priority
          from="left"
        />

        <ContentBox content={content} />

        <ImageBox
          image={content.rightImage.src}
          alt={content.rightImage.alt}
          className="col-start-2 row-start-1 max-[900px]:col-start-1 max-[900px]:row-start-3 max-[900px]:min-h-[48vw] max-[560px]:min-h-[120vw]"
          from="right"
        />
      </section>
    </main>
  );
}

function ImageBox({ image, alt, className = "", priority = false, from }: ImageBoxProps) {
  const reduceMotion = useReducedMotion();
  const dir = from === "left" ? -1 : 1;

  return (
    <div className={`relative sm:min-h-135 min-w-0 overflow-hidden ${className}`}>
      {/* Slides in from its side while a slow zoom settles */}
      <motion.div
        className="absolute inset-0 "
        initial={reduceMotion ? false : { opacity: 0, x: dir * 60, scale: 1.18 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.6, ease: EASE }}
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority={priority}
          sizes="50vw"
          className="object-cover h-dvh"
        />
      </motion.div>
    </div>
  );
}

const ContentBox = ({ content }: HeroProps) => {
  const reduceMotion = useReducedMotion();
  const words = content.title.split(" ");

  return (
    <motion.div
      variants={makeCardVariants(!reduceMotion)}
      initial={reduceMotion ? false : "hidden"}
      animate="show"
        className="absolute left-[50%]  top-[50%] w- z-10 flex w-[min(31%, 80%)]  -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center sm:bg-[#fdfbf3] bg-white/10 backdrop-blur-sm px-[4%] md:py-16 py-10 text-center sm:w-100 w-10/12
        "
    >
      {content.eyebrow && (
        <motion.p
          variants={itemVariants}
          className="mb-8 text-[10px] uppercase tracking-[0.18em] text-[#252d4a]"
        >
          {content.eyebrow}
        </motion.p>
      )}

      <motion.h1
        id="hero-title"
        variants={headingVariants}
        aria-label={content.title}
        className="m-0 max-w-120 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(3rem,4vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#252d4a] max-[900px]:text-[clamp(3.20rem,8vw,5.5rem)]"
      >
        {words.map((word, i) => (
          <span key={i} aria-hidden="true">
            {/* mask: clips the word while it slides up (padding keeps descenders) */}
            <span className="mb-[-0.15em] inline-block overflow-hidden pb-[0.15em] align-bottom">
              <motion.span variants={wordVariants} className="inline-block">
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </span>
        ))}
      </motion.h1>

      <motion.p
        variants={itemVariants}
        className="mx-0 mb-0 mt-14 max-w-120 text-[clamp(0.95rem,1.05vw,1.25rem)] leading-[1.6] max-[560px]:mt-10 max-[560px]:text-[0.9rem] text-[#252d4a]"
      >
        {content.description}
      </motion.p>

      <motion.a
        href={content.ctaHref}
        variants={itemVariants}
        whileTap={{ scale: 0.97 }}
        className="group relative mt-16 inline-flex items-center overflow-hidden border border-[#252d4a] bg-[#e5ff7a] px-8 py-3.5 text-[clamp(0.95rem,1.05vw,1.25rem)] transition-colors duration-500 hover:text-[#fdfbf3] max-[560px]:mt-10"
      >
        {/* dark fill sweeps in from the left on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-[#252d4a] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100"
        />
        <span className="relative">{content.cta}</span>
      </motion.a>
    </motion.div>
  );
};
