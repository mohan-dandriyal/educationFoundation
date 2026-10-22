"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionTitle } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";

export type FaqItem = { question: string; answer: string };

type FaqGridProps = {
  heading?: string;
  items?: FaqItem[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const DEFAULT_ITEMS: FaqItem[] = [
  {
    question: "Why is Sustainability So Important for the Future?",
    answer:
      "Sustainability is crucial for ensuring a healthy planet for future generations. It involves responsible resource management and reducing environmental impact.",
  },
  {
    question: "How Can I Effectively Reduce Plastic Use?",
    answer:
      "Reducing single-use plastics and opting for reusable alternatives are effective ways to minimize plastic waste and protect the environment for the long term.",
  },
  {
    question: "How Does Deforestation Affect the Environment?",
    answer:
      "Deforestation leads to habitat loss, biodiversity decline, soil erosion, and significantly contributes to climate change by releasing stored carbon into the atmosphere.",
  },
  {
    question: "How can I help protect the environment?",
    answer:
      "Individual actions like reducing waste, supporting eco-friendly businesses, and advocating for policies can significantly impact protection.",
  },
];

// Heading: slides up out of a mask
const titleVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};

// Grid: items rise one after another
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function FaqSection({
  heading = "FAQs",
  items = DEFAULT_ITEMS,
}: FaqGridProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      aria-labelledby="faq-title"
      className="px-6 py-16 text-[#1f4a2c] md:px-[6%] md:py-24"
    >
      <MainContainer>
        {/* Heading */}
        
        <div className="text-center flex justify-center">
        <SectionTitle>
              {heading}
        </SectionTitle>
        </div>

        {/* Questions */}
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          className="mt-16 grid grid-cols-1 gap-x-16 gap-y-16 md:mt-28 md:grid-cols-2 md:gap-y-28"
        >
          {items.map((item) => (
            <motion.article
              key={item.question}
              variants={itemVariants}
              className="mx-auto w-full max-w-[490px] text-center"
            >
              <h3 className="m-0 text-[clamp(1.15rem,1.4vw,1.45rem)] font-normal leading-[1.35]">
                {item.question}
              </h3>
              <p className="mx-auto mb-0 mt-6 text-[clamp(0.95rem,1.05vw,1.1rem)] font-light leading-[1.7]">
                {item.answer}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </MainContainer>
    </section>
  );
}