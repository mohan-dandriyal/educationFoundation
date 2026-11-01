"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import MainContainer from "./MainContainer";
import { Breadcrumb, type BreadcrumbItem } from "../Breadcrumb";

export type PageBannerProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  image: string;
  imageAlt?: string;
  breadcrumb?: BreadcrumbItem[];
  actions?: Array<{
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  }>;
  stats?: Array<{
    value: string;
    label: string;
  }>;
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const textVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function PageBanner({
  eyebrow,
  title,
  description,
  image,
  imageAlt = "Page header banner",
  breadcrumb,
  actions,
  stats,
}: PageBannerProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[460px] items-center overflow-hidden bg-[#0a2015] text-[#fdfbf3] sm:min-h-[500px] lg:min-h-[520px]">
      {/* Background Banner Image */}
      <motion.div
        className="absolute inset-0 -z-20"
        initial={reduceMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: EASE }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Deep Gradient Scrim Overlay for high legibility */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgba(10,32,21,0.95)_0%,rgba(14,42,29,0.82)_55%,rgba(14,42,29,0.55)_100%)]"
      />

      <MainContainer className="w-full">
        <div className="w-full px-5 py-16 sm:px-8 sm:py-20 lg:py-24">
          {/* Breadcrumb row */}
          {breadcrumb && breadcrumb.length > 0 && (
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 flex items-center text-xs font-medium tracking-wider text-[#e6f5ae]"
            >
              <Breadcrumb items={breadcrumb} />
            </motion.div>
          )}

          <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">
            {/* Title & Description */}
            <motion.div
              variants={textVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              className="max-w-3xl"
            >
              {eyebrow && (
                <motion.div
                  variants={riseVariants}
                  className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#e6f5ae]/30 bg-[#15452e]/80 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.2em] text-[#e6f5ae] backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f59e0b]" />
                  <span>{eyebrow}</span>
                </motion.div>
              )}

              <motion.h1
                variants={riseVariants}
                className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1.04] tracking-[-0.03em] text-[#fdfbf3]"
              >
                {title}
              </motion.h1>

              <motion.span
                aria-hidden="true"
                variants={riseVariants}
                className="mt-6 block h-[3px] w-16 rounded-full bg-[#b49358]"
              />

              {description && (
                <motion.p
                  variants={riseVariants}
                  className="mb-0 mt-6 max-w-[56ch] text-[clamp(1rem,1.15vw,1.2rem)] leading-[1.75] text-[#fdfbf3]/90"
                >
                  {description}
                </motion.p>
              )}

              {/* Action Buttons */}
              {actions && actions.length > 0 && (
                <motion.div
                  variants={riseVariants}
                  className="mt-8 flex flex-wrap items-center gap-4"
                >
                  {actions.map((act) =>
                    act.variant === "secondary" ? (
                      <Link
                        key={act.label}
                        href={act.href}
                        className="inline-flex items-center rounded-full border border-[#fdfbf3]/40 bg-[#fdfbf3]/10 px-6 py-3 text-sm font-semibold capitalize text-[#fdfbf3] backdrop-blur-sm transition-all hover:border-[#e6f5ae] hover:bg-[#fdfbf3]/20"
                      >
                        {act.label}
                      </Link>
                    ) : (
                      <Link
                        key={act.label}
                        href={act.href}
                        className="inline-flex items-center rounded-full bg-[#e6f5ae] px-7 py-3 text-sm font-bold capitalize text-[#15452e] shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#b49358] hover:text-[#fdfbf3]"
                      >
                        {act.label}
                      </Link>
                    )
                  )}
                </motion.div>
              )}
            </motion.div>

            {/* Optional Stats Highlight Box */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
                className="rounded-2xl border border-[#fdfbf3]/15 bg-[#0e2a1d]/85 p-6 backdrop-blur-md"
              >
                <dl className="m-0 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-2">
                  {stats.map((st) => (
                    <div key={st.label}>
                      <dd className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-3xl font-bold text-[#e6f5ae]">
                        {st.value}
                      </dd>
                      <dt className="mt-1 text-xs uppercase tracking-wider text-[#fdfbf3]/75">
                        {st.label}
                      </dt>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
