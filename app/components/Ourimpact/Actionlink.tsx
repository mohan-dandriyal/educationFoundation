
"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa6";

type ActionLinkProps = {
  href: string;
  variant?: "primary" | "secondary";
  children: ReactNode;
  className?: string;
};

// Primary: navy button. Secondary: outlined button.
// On hover a fill sweeps in from the left and the arrow slides forward.
const styles = {
  primary: {
    base: "bg-[#252d4a] text-[#e6f5ae] hover:text-[#252d4a]",
    fill: "bg-[#e6f5ae]",
  },
  secondary: {
    base: "bg-transparent text-[#252d4a] hover:text-[#e6f5ae]",
    fill: "bg-[#252d4a]",
  },
} as const;

export function ActionLink({
  href,
  variant = "primary",
  children,
  className = "",
}: ActionLinkProps) {
  const s = styles[variant];

  return (
    <Link
      href={href}
      className={`group relative inline-flex w-fit items-center gap-3 overflow-hidden border border-[#252d4a] px-8 py-3.5 text-[clamp(0.95rem,1.05vw,1.15rem)] transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a] motion-reduce:transition-none ${s.base} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 motion-reduce:transition-none ${s.fill}`}
      />
      <span className="relative">{children}</span>
      <FaArrowRight
        aria-hidden="true"
        className="relative h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
      />
    </Link>
  );
}