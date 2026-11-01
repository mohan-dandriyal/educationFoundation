"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";
import { type BreadcrumbItem } from "../Breadcrumb";
import { FaXmark, FaChevronLeft, FaChevronRight } from "react-icons/fa6";

export type GalleryItem = {
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
  breadcrum?: BreadcrumbItem[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function GallerySection({ eyebrow, heading, intro, items }: GallerySectionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const openLightbox = (index: number) => setActiveIdx(index);
  const closeLightbox = () => setActiveIdx(null);

  const prevImage = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + items.length) % items.length);
  }, [activeIdx, items.length]);

  const nextImage = useCallback(() => {
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % items.length);
  }, [activeIdx, items.length]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, prevImage, nextImage]);

  return (
    <section aria-labelledby="gallery-section-title" className="bg-[#fdfbf3] px-6 py-18 text-[#15452e] md:px-[6%]">
      <MainContainer>
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={gridVariants}
          className="flex flex-col items-center gap-6 border-b border-[#15452e]/15 text-center lg:pb-14 pb-8"
        >
          <div className="flex flex-col items-center">
            <SectionLabel>{eyebrow}</SectionLabel>
            <SectionInnerTitle>{heading}</SectionInnerTitle>
          </div>
          <motion.div variants={itemVariants} className="flex max-w-[44ch] flex-col items-center gap-4">
            <p className="m-0 text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7] text-[#4a5d2e]">{intro}</p>
            <p className="m-0 font-[Arial,Helvetica,sans-serif] text-xs font-bold uppercase tracking-[0.18em] text-[#8a6b36]">
              {items.length} Moments From Our Community • Click Any Photo To Enlarge
            </p>
          </motion.div>
        </motion.div>

        {/* Gallery Grid */}
        <motion.ul
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={gridVariants}
          className="m-0 mt-10 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 md:mt-16 md:grid-cols-3 md:auto-rows-[240px] md:gap-5"
        >
          {items.map((item, index) => (
            <motion.li
              key={item.src + index}
              variants={itemVariants}
              style={{ height: item.height }}
              className={`group relative min-h-[280px] cursor-pointer overflow-hidden rounded-[1.25rem] bg-[#15452e]/10 ring-1 ring-[#15452e]/10 md:min-h-0 ${
                item.className ?? ""
              }`}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  openLightbox(index);
                }
              }}
              aria-label={`Open photo: ${item.caption}`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                priority={index === 0}
                sizes="(min-width: 768px) 33vw, 100vw"
                style={{ objectPosition: item.objectPosition ?? "center" }}
                className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-108 motion-reduce:transition-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a2015]/95 via-[#0a2015]/20 to-transparent opacity-85 transition-opacity duration-300 group-hover:opacity-95" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <p className="m-0 max-w-[24ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-lg leading-tight text-[#fdfbf3] sm:text-xl">
                  {item.caption}
                </p>
                <span
                  aria-hidden="true"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#fdfbf3]/60 bg-[#15452e]/60 text-sm font-bold text-[#e6f5ae] backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 group-hover:bg-[#e6f5ae] group-hover:text-[#15452e]"
                >
                  ↗
                </span>
              </div>
            </motion.li>
          ))}
        </motion.ul>
      </MainContainer>

      {/* Lightbox Modal Popup */}
      <AnimatePresence>
        {activeIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#07170f]/92 p-4 backdrop-blur-md sm:p-6 md:p-10"
            onClick={closeLightbox}
          >
            {/* Modal Content Container */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.94, opacity: 0, y: 15 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-[#fdfbf3]/15 bg-[#0e2a1d] text-[#fdfbf3] shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-[#15452e]/80 text-[#fdfbf3] backdrop-blur-sm transition-colors hover:bg-[#e6f5ae] hover:text-[#15452e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e6f5ae]"
                aria-label="Close dialog"
              >
                <FaXmark className="h-5 w-5" />
              </button>

              {/* Prev Button */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#15452e]/80 text-[#fdfbf3] backdrop-blur-sm transition-colors hover:bg-[#e6f5ae] hover:text-[#15452e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e6f5ae]"
                aria-label="Previous photo"
              >
                <FaChevronLeft className="h-4 w-4" />
              </button>

              {/* Next Button */}
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-[#15452e]/80 text-[#fdfbf3] backdrop-blur-sm transition-colors hover:bg-[#e6f5ae] hover:text-[#15452e] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#e6f5ae]"
                aria-label="Next photo"
              >
                <FaChevronRight className="h-4 w-4" />
              </button>

              {/* Image Preview Container */}
              <div className="relative h-[55vh] min-h-[300px] w-full bg-[#0a2015] sm:h-[65vh]">
                <Image
                  src={items[activeIdx].src}
                  alt={items[activeIdx].alt}
                  fill
                  sizes="(min-width: 1024px) 900px, 95vw"
                  className="object-contain"
                  priority
                />
              </div>

              {/* Caption & Counter Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#fdfbf3]/10 bg-[#0a2015]/90 px-6 py-4">
                <div>
                  <h4 className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-xl font-normal text-[#fdfbf3]">
                    {items[activeIdx].caption}
                  </h4>
                  <p className="m-0 mt-1 text-xs text-[#e6f5ae]">
                    {items[activeIdx].alt}
                  </p>
                </div>
                <div className="text-xs font-semibold tracking-wider text-[#b49358]">
                  {activeIdx + 1} / {items.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
