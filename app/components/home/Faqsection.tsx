"use client";

import { AnimatePresence, motion, useReducedMotion, type Variants } from "motion/react";
import { useState } from "react";
import { SectionInnerTitle } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";
import data from '@/app/data/faq.json'
import { Breadcrumb } from "../Breadcrumb";

export type FaqItem = { question: string; answer: string };

const EASE = [0.2, 0.7, 0.2, 1] as const;

const items: FaqItem[] = data.faqs.faqsItems;

// Grid: items rise one after another
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.35, staggerChildren: 0.12 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function FaqSection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-title"
      className="bg-[#fdfbf3] px-6 py-16 text-[#15452e] md:px-[6%] md:py-24"
    >
      <MainContainer>
        {/* Heading */}

         <div className='flex justify-center mb-7'>
        <Breadcrumb items={data.breadcrum} />
      </div>

        <div className="flex justify-center items-center flex-col">
          <SectionInnerTitle>{data.faqs.title}</SectionInnerTitle>

          {
            data?.faqs.dis &&
            <p className="mx-auto mt-7 max-w-[72ch] text-base leading-7 text-[#4a5d2e]">{data?.faqs.dis} </p>
          }
        </div>

        {/* Questions */}
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          className="mt-14 grid grid-cols-1 items-start gap-5 md:mt-20 md:grid-cols-1 md:gap-6"
        >
          {items.map((item, index) => (
            <motion.article
              key={item.question}
              variants={itemVariants}
              className="group relative mx-auto h-fit w-full max-w-8/12 self-start overflow-hidden rounded-[1.25rem] border border-[#15452e]/15 bg-white/45 p-6 text-left transition-colors duration-300 hover:border-[#6f984b]/60 hover:bg-[#e8f1df]/60 sm:p-8"
            >
              <button
                type="button"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-start justify-between gap-6 border-b border-[#15452e]/15 pb-4 text-left"
              >
                <span className="text-xs font-bold tracking-[0.18em] text-[#8a6b36]">{String(index + 1).padStart(2, "0")}</span>
                <span role="heading" aria-level={3} className="flex-1 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.25rem,1.7vw,1.7rem)] font-normal leading-[1.2] text-[#15452e]">{item.question}</span>
                <span aria-hidden="true" className={`text-2xl font-light leading-none text-[#6f984b] transition-transform duration-300 ${openIndex === index ? "rotate-45" : ""}`}>+</span>
              </button>
              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.p
                    id={`faq-answer-${index}`}
                    initial={reduceMotion ? false : { opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 24 }}
                    exit={reduceMotion ? undefined : { opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="mb-0 max-w-[48ch] overflow-hidden text-[clamp(0.95rem,1.05vw,1.1rem)] leading-[1.65] text-[#4a5d2e]"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.article>
          ))}
        </motion.div>
      </MainContainer>
    </section>
  );
}
