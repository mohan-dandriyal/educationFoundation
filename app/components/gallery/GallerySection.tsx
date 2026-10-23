"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";
import { Breadcrumb, type BreadcrumbItem } from "../Breadcrumb";

type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
  height: string;
  objectPosition?: string;
  className?: string;
};

type GallerySectionProps = {
  eyebrow: string;
  heading: string;
  intro: string;
  items: GalleryItem[];
  breadcrum: BreadcrumbItem[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function GallerySection({ eyebrow, breadcrum, heading, intro, items }: GallerySectionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section aria-labelledby="hero-title" className="bg-[#fdfbf3] px-6 py-16 text-[#15452e] md:px-[6%] md:py-28">
      <MainContainer>
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={gridVariants}
          className="flex flex-col items-center gap-8 border-b border-[#15452e]/15 pb-10 text-center md:pb-14"
        >
          <div className="flex flex-col items-center">
            <div className='flex justify-center mb-7'>
              <Breadcrumb items={breadcrum} />
            </div>
            <SectionLabel>{eyebrow}</SectionLabel>
            <SectionInnerTitle>{heading}</SectionInnerTitle>
          </div>
          <motion.div variants={itemVariants} className="flex max-w-[44ch] flex-col items-center gap-6 md:pb-1">
            <p className="m-0 text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7] text-[#4a5d2e]">{intro}</p>
            <p className="m-0 font-[Arial,Helvetica,sans-serif] text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b36]">
              {items.length} moments from our community
            </p>
          </motion.div>
        </motion.div>

        <motion.ul
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
          className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:auto-rows-[220px] md:gap-5"
        >
          {items.map((item, index) => (
            <motion.li key={index +  1} variants={itemVariants} style={{ height: item.height }} className={`group relative min-h-[280px] overflow-hidden rounded-[1.25rem] bg-[#15452e]/10 ring-1 ring-[#15452e]/10 md:min-h-0 ${item.className ?? ""}`}>
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 33vw, 100vw"
                style={{ objectPosition: item.objectPosition ?? "center" }}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#102f22]/95 via-[#102f22]/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <p className="m-0 max-w-[24ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-lg leading-tight text-[#fdfbf3] sm:text-xl">{item.caption}</p>
                <span aria-hidden="true" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#fdfbf3]/60 text-sm text-[#fdfbf3] transition-transform duration-500 group-hover:-translate-y-1">
                  ↗
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </MainContainer>
    </section>
  );
}
