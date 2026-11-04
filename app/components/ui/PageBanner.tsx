"use client";

import Image from "next/image";
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
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};

const riseVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export default function PageBanner({
  title,
  description,
  image,
  imageAlt = "Page header banner",
  breadcrumb,
  stats,
}: PageBannerProps) {
  const reduceMotion = useReducedMotion();

  // Ensure description is cleanly capped at max 100 characters if dynamic text exceeds it
  const cleanDescription =
    description && description.length > 100
      ? `${description.slice(0, 97).trim()}...`
      : description;

  return (
    <section className="relative isolate flex min-h-[340px] items-center overflow-hidden bg-[#07170f] text-[#fdfbf3] sm:min-h-[380px] lg:min-h-[500px]">
      {/* Background Banner Image with gentle cinematic zoom */}
      <motion.div
        className="absolute inset-0 -z-30"
        initial={reduceMotion ? false : { scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: EASE }}
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

      {/* Layer 1: Dark botanical scrim for crisp contrast */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[linear-gradient(115deg,rgba(7,23,15,0.96)_0%,rgba(10,32,21,0.88)_45%,rgba(14,42,29,0.72)_75%,rgba(14,42,29,0.52)_100%)]"
      />

      {/* Layer 2: Subtle golden ambient light bloom in top-left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 -top-24 -z-10 h-96 w-96 rounded-full bg-[#e6f5ae]/10 blur-3xl"
      />

      {/* Layer 3: Subtle accent glow behind the stats card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 right-0 -z-10 h-96 w-96 rounded-full bg-[#b49358]/15 blur-3xl"
      />

      {/* Bottom subtle gradient divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-8 bg-gradient-to-t from-[#07170f]/40 to-transparent"
      />

      <MainContainer className="relative w-full">
        <div className="w-full px-4 py-10 sm:px-8 sm:py-14 lg:py-16">
        


          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Left Content Column */}

            <motion.div
              variants={textVariants}
              initial={reduceMotion ? false : "hidden"}
              animate="show"
              className={stats && stats.length > 0 ? "lg:col-span-7" : "lg:col-span-10 max-w-3xl"}
            >
                {/* Breadcrumb Navigation Pill */}
              {breadcrumb && breadcrumb.length > 0 && (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mb-8 inline-flex items-center rounded-full border border-[#e6f5ae]/20 bg-[#15452e]/70 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#e6f5ae] shadow-inner backdrop-blur-md"
                >
                  <Breadcrumb items={breadcrumb} />
                </motion.div>
              )}

              <motion.h1
                variants={riseVariants}
                className="m-0 max-w-full break-words text-pretty font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,3.8vw,3rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[#fdfbf3] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]"
              >
                {title}
              </motion.h1>

              {/* Decorative Accent Ribbon */}
              <motion.div
                aria-hidden="true"
                variants={riseVariants}
                className="mt-4 flex items-center gap-2"
              >
                <span className="block h-[3px] w-12 rounded-full bg-[#b49358]" />
                <span className="block h-[3px] w-2.5 rounded-full bg-[#e6f5ae]" />
              </motion.div>

              {cleanDescription && (
                <motion.p
                  variants={riseVariants}
                  className="mb-0 mt-4 max-w-[56ch] break-words text-[clamp(0.95rem,1.05vw,1.1rem)] font-normal leading-[1.65] text-[#fdfbf3]/90 drop-shadow-sm"
                >
                  {cleanDescription}
                </motion.p>
              )}
            </motion.div>

            {/* Right Side: Attractive Stats Card with Glassmorphic Depth */}
            {stats && stats.length > 0 && (
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.75, delay: 0.2, ease: EASE }}
                className="relative lg:col-span-5"
              >
                {/* Decorative glow backing */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#e6f5ae]/20 to-[#b49358]/25 blur-lg opacity-70"
                />

                <div className="relative overflow-hidden rounded-2xl border border-[#fdfbf3]/20 bg-[#0e2a1d]/85 p-6 shadow-2xl backdrop-blur-xl sm:p-7">
                  {/* Card Header Tag */}
                  <div className="mb-4 flex items-center justify-between border-b border-[#fdfbf3]/15 pb-3">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#e6f5ae]">
                      Our Community Impact
                    </span>
                    <span className="flex h-2 w-2 rounded-full bg-[#e6f5ae]" />
                  </div>

                  <dl className="m-0 grid grid-cols-2 gap-x-5 gap-y-5">
                    {stats.map((st) => (
                      <div key={st.label} className="group">
                        <dd className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-2xl font-bold tracking-tight text-[#e6f5ae] transition-colors group-hover:text-[#b49358] sm:text-3xl">
                          {st.value}
                        </dd>
                        <dt className="mt-1 text-xs font-semibold uppercase tracking-wider text-[#fdfbf3]/80">
                          {st.label}
                        </dt>
                      </div>
                    ))}
                  </dl>

                  {/* Micro Trust Badge inside Stats Box */}
                  <div className="mt-5 flex items-center gap-2 rounded-xl bg-[#0a2015]/60 px-3.5 py-2 text-xs text-[#fdfbf3]/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#10b981]" />
                    <span>Verified Grassroots Program Metric</span>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </MainContainer>
    </section>
  );
}
