"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { FaArrowRight } from "react-icons/fa6";

interface PrimaryButtonProps {
  children: ReactNode;
  href: string;
}

export const PrimaryButton = ({ children, href }: PrimaryButtonProps) => {
  const reduceMotion = useReducedMotion();

  return (
    // Lift on hover and press on tap, using a spring so it feels physical
    <motion.div
      className="mt-16 w-fit"
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { scale: 0.96, y: 0 }}
      transition={{ type: "spring", stiffness: 400, damping: 22 }}
    >
      <Link
        href={href ?? "/"}
        className="group relative flex w-fit items-center gap-3 overflow-hidden bg-[#252d4a] px-10 py-4 text-[clamp(1rem,1.05vw,1.15rem)] text-[#e6f5ae] shadow-md transition-[color,box-shadow] duration-500 hover:text-[#252d4a] hover:shadow-lg hover:ring-1 hover:ring-[#252d4a] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
      >
        {/* Lime fill sweeps in from the left on hover */}
        <span
          aria-hidden="true"
          className="absolute inset-0 origin-left scale-x-0 bg-[#e6f5ae] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 motion-reduce:transition-none"
        />

        <span className="relative">{children}</span>

        {/* Arrow swap: the arrow exits up-right while a copy enters from the bottom-left */}
        <span
          aria-hidden="true"
          className="relative block h-4 w-4 overflow-hidden"
        >
          <FaArrowRight className="absolute inset-0 h-4 w-4 -rotate-45 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-x-full group-hover:-translate-y-full motion-reduce:transition-none" />
          <FaArrowRight className="absolute inset-0 h-4 w-4 -translate-x-full translate-y-full -rotate-45 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:translate-x-0 group-hover:translate-y-0 motion-reduce:transition-none" />
        </span>
      </Link>
    </motion.div>
  );
};