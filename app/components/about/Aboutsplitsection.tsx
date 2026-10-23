"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionTitle } from "../ui/SectionTitle";
import { Breadcrumb, type BreadcrumbItem } from "../Breadcrumb";

type Img = { src: string; alt: string };

type AboutSplitSectionProps = {
  title?: string;
  description?: string;
  cta?: string;
  ctaHref?: string;
  /** The two small portrait photos in the middle of the left column */
  thumbs?: [Img, Img];
  /** The large photo on the right */
  mainImage?: { src: string, alt: string } | undefined;
  breadCrumb: BreadcrumbItem[]
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Left column: title, text, photos and button appear one after another
const columnVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.15, staggerChildren: 0.16 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};



// Small photos: unveil from the bottom while the photo zoom settles
const thumbFrameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE },
  },
};
const thumbPhotoVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.5, ease: EASE } },
};

// Large photo: opens from the right edge while the zoom settles
const mainFrameVariants: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 100%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.3, ease: EASE },
  },
};
const mainPhotoVariants: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.8, ease: EASE } },
};

export function AboutSplitSection({
  title,
  description,
  thumbs,
  breadCrumb,
  mainImage,
}: AboutSplitSectionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      aria-labelledby="about-split-title"
      className="grid min-h-svh grid-cols-1 bg-[#fdfbf3] text-[#15452e] md:grid-cols-2"
    >
      {/* Left column */}
      <motion.div
        initial={initial}
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        variants={columnVariants}
        className="flex flex-col items-center justify-center px-6 py-16 text-center md:py-12"
      >
        <div className="mb-10">
          <Breadcrumb items={breadCrumb} />
        </div>

        <SectionTitle>
          {title}
        </SectionTitle>

        <motion.p
          variants={riseVariants}
          className="mb-0 mt-8 max-w-[28ch] text-[clamp(1rem,1.1vw,1.25rem)] leading-normal"
        >
          {description}
        </motion.p>

        {/* Two photos, the right one sits higher than the left */}
        <div className="mt-16 grid w-full max-w-[485px] grid-cols-2 items-start gap-[29px] md:mt-20">
          {thumbs?.map((img, i) => (
            <motion.div
              key={img.src}
              variants={thumbFrameVariants}
              className={`relative aspect-[228/307] w-full overflow-hidden ${i === 0 ? "mt-8 md:mt-11" : ""
                }`}
            >
              <motion.div variants={thumbPhotoVariants} className="absolute inset-0">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 14vw, 40vw"
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right column: outer wrapper only watches the scroll, inner frame does the clip reveal */}
      <motion.div
        initial={initial}
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        className="relative min-h-[420px] md:min-h-0 md:block hidden"
      >
        <motion.div
          variants={mainFrameVariants}
          className="absolute inset-0 overflow-hidden"
        >
          <motion.div variants={mainPhotoVariants} className="absolute inset-0 ">
            {
              mainImage &&
              <Image
                src={mainImage.src ?? ""}
                alt={mainImage.alt ?? ''}
                fill
                priority
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover"
              />
            }
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}