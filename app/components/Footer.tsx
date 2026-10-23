"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FaArrowUp } from "react-icons/fa6";
import footer from "@/app/data/footer.json";

const EASE = [0.2, 0.7, 0.2, 1] as const;
const trackedText = "text-[13px] uppercase tracking-[0.2em]";
const linkClass = `w-fit bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 hover:bg-[length:100%_1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b4d28] motion-reduce:transition-none ${trackedText}`;

const wrapVariants: Variants = { hidden: {}, show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } } };
const riseVariants: Variants = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } } };
const slideVariants: Variants = { hidden: { y: "110%" }, show: { y: "0%", transition: { duration: 0.9, ease: EASE } } };

export function Footer() {
  const reduceMotion = useReducedMotion();

  return (
    <footer className="border-t border-[#3b4d28]/15 bg-[#fdfbf3] text-[#3b4d28]">
      <motion.div initial={reduceMotion ? false : "hidden"} whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={wrapVariants} className="mx-auto max-w-[1366px] px-6 md:px-[5%]">
        {/* <div className="flex flex-col gap-10 py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <h2 className="m-0 max-w-[12ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(3rem,6vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-[#4a5d2e]">
            <span className="inline-block overflow-hidden pb-[0.15em] align-bottom">
              <motion.span variants={slideVariants} className="inline-block">{footer.heading}</motion.span>
              </span>
          </h2>
          <motion.div variants={riseVariants}>
            <Link href={footer.cta.href} className={`group relative inline-flex items-center overflow-hidden border border-[#3b4d28] px-6 py-3 transition-colors duration-500 hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b4d28] motion-reduce:transition-none ${trackedText}`}>
              <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-[#3b4d28] transition-transform duration-500 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-x-100 motion-reduce:transition-none" />
              <span className="relative">{footer.cta.label}</span>
            </Link>
          </motion.div>
        </div> */}

        <motion.div variants={riseVariants} className="grid items-center gap-8 border-t border-[#3b4d28]/15 py-10 md:grid-cols-[1fr_auto_1fr]">
          <Link href={footer.logoHref} aria-label={`${footer.logoAlt} home`} className="flex w-fit items-center gap-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b4d28]">
          <Image src={footer.logo} alt={footer.logoAlt} width={108} height={88} className="w-50 object-contain" />
          </Link>
          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-10 gap-y-4">{footer.links.map((link) => <Link key={link.href} href={link.href} className={linkClass}>{link.label}</Link>)}</nav>
          <div className="flex flex-col gap-3 md:items-end"><a href={`mailto:${footer.contact.email}`} className={linkClass}>{footer.contact.email}</a><a href={footer.contact.phoneHref} className={linkClass}>{footer.contact.phone}</a></div>
        </motion.div>

        <motion.div variants={riseVariants} className="flex border-t border-[#3b4d28]/15 py-6 text-xs uppercase tracking-[0.2em]">
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" })} className="group flex w-fit items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#3b4d28]">
            {footer.backToTopLabel}<FaArrowUp aria-hidden="true" className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-1 motion-reduce:transition-none" />
          </button>
        </motion.div>
      </motion.div>
    </footer>
  );
}
