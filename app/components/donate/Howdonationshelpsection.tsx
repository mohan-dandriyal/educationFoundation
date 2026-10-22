"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionHeading } from "../Ourimpact/Sectionheading";

export type HowDonationsHelpContent = {
  label?: string;
  title: string;
  description?: string;
  items: {
    id: number;
    title: string;
    description: string;
    image: { src: string; alt: string };
  }[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Heading and cards appear one after another when scrolled into view
const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.16 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Photo: unveils from the bottom while the zoom settles
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE },
  },
};
const photoVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.5, ease: EASE } },
};

export default function HowDonationsHelpSection({
  content,
}: {
  content: HowDonationsHelpContent;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="how-help-title"
      className="bg-[#252d4a] px-6 py-16 text-[#fdfbf3] md:px-[6%] md:py-28"
    >
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={wrapVariants}
        className="mx-auto max-w-[1200px]"
      >
        <SectionHeading
          id="how-help-title"
          label={content.label}
          title={content.title}
          description={content.description}
          onDark
          className="max-w-[820px]"
        />

        {/* The middle card sits lower on wide screens, so the row reads as a staggered line */}
        <ul className="m-0 mt-14 grid list-none gap-10 p-0 md:grid-cols-3 md:gap-8 lg:mt-20">
          {content.items.map((item) => (
            <motion.li key={item.id} variants={riseVariants} className="group md:even:mt-14">
              <motion.div
                variants={frameVariants}
                className="relative aspect-[4/5] w-full overflow-hidden"
              >
                <motion.div variants={photoVariants} className="absolute inset-0">
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    fill
                    sizes="(min-width: 768px) 30vw, 90vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                  />
                </motion.div>
              </motion.div>

              <h3 className="mb-0 mt-6 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.4rem,2vw,1.85rem)] font-normal leading-[1.2] text-[#e6f5ae]">
                {item.title}
              </h3>
              <p className="mb-0 mt-3 max-w-[36ch] text-sm leading-[1.7] text-[#fdfbf3]/80">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
}
