"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionHeading } from "../Ourimpact/Sectionheading";
import { ActionLink } from "../Ourimpact/Actionlink";
import { getIcon } from "./Iconmap";

export type TransparencyContent = {
  label?: string;
  title: string;
  description?: string;
  points: { id: number; title: string; description: string; icon?: string }[];
  button?: { text: string; linkTo: string };
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Everything appears one after another when the section scrolls into view
const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
// Divider lines draw in from the left
const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: EASE } },
};

export default function TransparencySection({ content }: { content: TransparencyContent }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="transparency-title"
      className="border-y border-[#252d4a] bg-[#e6f5ae] px-6 py-16 text-[#252d4a] md:px-[6%] md:py-28"
    >
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={wrapVariants}
        className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20"
      >
        {/* Heading + button */}
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading
            id="transparency-title"
            label={content.label}
            title={content.title}
            description={content.description}
          />
          {content.button && (
            <motion.div variants={riseVariants} className="mt-10">
              <ActionLink href={content.button.linkTo}>{content.button.text}</ActionLink>
            </motion.div>
          )}
        </div>

        {/* Trust points */}
        <ul className="m-0 list-none self-end p-0">
          {content.points.map((point, i) => {
            const Icon = getIcon(point.icon);
            return (
              <motion.li
                key={point.id}
                variants={riseVariants}
                className="relative flex items-start gap-5 py-8 md:gap-6 md:py-10"
              >
                <motion.span
                  aria-hidden="true"
                  variants={lineVariants}
                  className="absolute left-0 top-0 h-px w-full origin-left bg-[#252d4a]"
                />
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#252d4a]"
                >
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="m-0 text-[clamp(1.2rem,1.6vw,1.5rem)] font-normal leading-[1.3]">
                    {point.title}
                  </h3>
                  <p className="mb-0 mt-3 max-w-[46ch] text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.7]">
                    {point.description}
                  </p>
                </div>

                {i === content.points.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    variants={lineVariants}
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#252d4a]"
                  />
                )}
              </motion.li>
            );
          })}
        </ul>
      </motion.div>
    </section>
  );
}
