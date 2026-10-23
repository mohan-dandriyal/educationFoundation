"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { FaPlus } from "react-icons/fa6";
import { SectionHeading } from "../Ourimpact/Sectionheading";

export type DonationFaqContent = {
  label?: string;
  title: string;
  description?: string;
  items: { id: number; question: string; answer: string }[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Heading and rows appear one after another when scrolled into view
const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
// Divider lines draw in from the left
const lineVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: EASE } },
};

export default function DonationFaqSection({ content }: { content: DonationFaqContent }) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<number | null>(content.items[0]?.id ?? null);

  return (
    <section
      aria-labelledby="donation-faq-title"
      className="bg-[#fdfbf3] px-6 py-16 text-[#15452e] md:px-[6%] md:py-28"
    >
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={wrapVariants}
        className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20"
      >
        <div className="self-start lg:sticky lg:top-28">
          <SectionHeading
            id="donation-faq-title"
            label={content.label}
            title={content.title}
            description={content.description}
          />
        </div>

        <div>
          {content.items.map((item, i) => {
            const isOpen = openId === item.id;
            const buttonId = `donation-faq-button-${item.id}`;
            const panelId = `donation-faq-panel-${item.id}`;

            return (
              <motion.div key={item.id} variants={riseVariants} className="relative">
                <motion.span
                  aria-hidden="true"
                  variants={lineVariants}
                  className="absolute left-0 top-0 h-px w-full origin-left bg-[#15452e]"
                />

                <h3 className="m-0">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-6 py-6 text-left text-[clamp(1.1rem,1.5vw,1.4rem)] font-normal leading-[1.35] transition-colors duration-300 hover:text-[#8a6b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b49358]"
                  >
                    <span>{item.question}</span>
                    {/* Plus turns into a cross when open */}
                    <span
                      aria-hidden="true"
                      className={`shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
                        isOpen ? "rotate-45" : "rotate-0"
                      }`}
                    >
                      <FaPlus className="h-4 w-4" />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="m-0 max-w-[58ch] pb-7 text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.7]">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {i === content.items.length - 1 && (
                  <motion.span
                    aria-hidden="true"
                    variants={lineVariants}
                    className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#15452e]"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
