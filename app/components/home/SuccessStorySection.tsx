"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  type Variants,
} from "motion/react";
import { SectionLabel, SectionInnerTitle } from "@/app/components/ui/SectionTitle";
import { PrimaryButton } from "../ui/PrimaryButton";
import MainContainer from "../ui/MainContainer";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const impactStats = [
  { value: "1,200+", label: "students supported" },
  { value: "24", label: "learning centers" },
  { value: "87%", label: "school attendance" },
];

// Image: unveils from the bottom while the photo zoom settles
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.2, ease: EASE },
  },
};
const photoVariants: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
};

// Text column: label, title, paragraph, stats and button appear one after another
const columnVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.2, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Counts a number up once when it scrolls into view, e.g. "1,200+" or "87%"
function CountUp({ value }: { value: string }) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  const match = value.match(/^([\d,]+)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  const suffix = match ? match[2] : "";

  const [display, setDisplay] = useState(match ? `0${suffix}` : value);

  useEffect(() => {
    if (!match) return;
    if (reduceMotion) return;
    if (!inView) return;

    const controls = animate(0, target, {
      duration: 1.6,
      ease: EASE,
      onUpdate: (v) =>
        setDisplay(`${Math.round(v).toLocaleString("en-US")}${suffix}`),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduceMotion, value]);

  const renderedDisplay = reduceMotion ? value : display;

  return (
    <span ref={ref} aria-label={value}>
      <span aria-hidden="true">{renderedDisplay}</span>
    </span>
  );
}

export function SuccessStorySection() {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      aria-labelledby="success-story-title"
      className="overflow-hidden bg-[#fdfbf3] py-16 text-[#252d4a] md:py-24"
    >
      <MainContainer>
      <div className="mx-auto grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16 lg:gap-24">
        {/* Image: outer wrapper only watches the scroll, inner frame does the clip reveal */}
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative min-h-[360px] md:min-h-[740px]"
        >
          <motion.div
            variants={frameVariants}
            className="absolute inset-0 overflow-hidden"
          >
            <motion.div variants={photoVariants} className="absolute inset-0">
              <Image
                src="/program-2.png"
                alt="Children learning together with school supplies"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={columnVariants}
          className="px-5"
        >
          <SectionLabel>A success story</SectionLabel>

          <SectionInnerTitle>
            Small steps, lasting change.
          </SectionInnerTitle>

          <motion.p
            variants={riseVariants}
            className="mb-0 mt-7 max-w-[48ch] text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.7]"
          >
            When Maya joined our learning center, she was struggling to keep up
            in class. With a quiet place to study, patient mentors, and the
            right supplies, she found her confidence again—and now helps her
            younger classmates do the same.
          </motion.p>

          <motion.dl
            variants={riseVariants}
            className="m-0 mt-10 grid grid-cols-3 gap-4 border-y border-[#252d4a] py-6 sm:gap-8"
          >
            {impactStats.map((stat) => (
              <div key={stat.label} className="flex min-w-0 flex-col-reverse justify-end">
                <dt className="mt-2 max-w-[14ch] text-sm leading-5">
                  {stat.label}
                </dt>
                <dd className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,2.8vw,2.75rem)] font-normal leading-none text-[#4a5d2e]">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </motion.dl>

          <motion.div variants={riseVariants}>
            <PrimaryButton href="/our-program">Read More Stories</PrimaryButton>
          </motion.div>
        </motion.div>
      </div>
      </MainContainer>
    </section>
  );
}
