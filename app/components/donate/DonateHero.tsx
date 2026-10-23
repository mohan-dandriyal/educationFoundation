"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionTitle } from "../ui/SectionTitle";
import { PrimaryButton } from "../ui/PrimaryButton";
import { Breadcrumb, type BreadcrumbItem } from "../Breadcrumb";

export type DonateHeroContent = {
  image: { src: string; alt: string };
  title: string;
  description: string;
  buttons?: { text: string; linkTo: string };
  breadcrum :  BreadcrumbItem[]
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Text side: title, text and button appear one after another
const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.16 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};


// Image: opens from the right edge while the photo zoom settles
const frameVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.3, ease: EASE },
  },
};
const photoVariants: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

export default function DonateHeroSection({ content }: { content: DonateHeroContent }) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      aria-labelledby="donate-hero-title"
      className="grid min-h-[640px] grid-cols-1 border-b border-[#15452e] bg-[#fdfbf3] text-[#15452e] md:min-h-svh md:grid-cols-2"
    >
      {/* Text */}
      <motion.div
        initial={initial}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={wrapVariants}
        className="flex flex-col justify-center px-6 py-16 md:px-[8%] md:py-24"
      >
        <div className="mb-6">
          <Breadcrumb items={content?.breadcrum} />
        </div>

        <SectionTitle>
          {content.title}
        </SectionTitle>

        <motion.p
          variants={riseVariants}
          className="mb-0 mt-8 max-w-[46ch] text-[clamp(1rem,1.15vw,1.25rem)] leading-[1.7]"
        >
          {content.description}
        </motion.p>

        {content.buttons?.text && (
          <PrimaryButton href={content.buttons.linkTo}>
            {content.buttons?.text}
          </PrimaryButton>
        )}


      </motion.div>

      {/* Image: outer wrapper only watches the scroll, inner frame does the clip reveal */}
      <motion.div
        initial={initial}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative min-h-[420px] border-t border-[#15452e] md:min-h-0 md:border-l md:border-t-0"
      >
        <motion.div variants={frameVariants} className="absolute inset-0 overflow-hidden">
          <motion.div variants={photoVariants} className="absolute inset-0">
            <Image
              src={content.image.src}
              alt={content.image.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
