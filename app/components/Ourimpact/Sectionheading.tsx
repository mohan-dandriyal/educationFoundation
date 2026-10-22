"use client";

import { motion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";

const EASE = [0.2, 0.7, 0.2, 1] as const;

// These follow the "hidden" / "show" labels of the nearest parent motion element
// (a wrapper with initial="hidden" and whileInView="show").
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
// Title: words slide up out of a mask, one after another
const titleVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const wordVariants: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: 0.85, ease: EASE } },
};

type SectionHeadingProps = {
  label?: string;
  title: string;
  description?: string;
  id?: string;
  /** Use on a dark background */
  onDark?: boolean;
  size?: "md" | "xl";
  className?: string;
};

export function SectionHeading({
  label,
  title,
  description,
  className = "",
}: SectionHeadingProps) {

  return (
    <div className={className}>
        <SectionLabel>
            {label}
        </SectionLabel>

      <SectionInnerTitle>
        {title}
      </SectionInnerTitle>


      {description && (
        <motion.p
          variants={riseVariants}
          className="mb-0 mt-6 max-w-[52ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7]"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}