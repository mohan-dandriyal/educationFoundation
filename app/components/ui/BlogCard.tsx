"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  author: string;
  date: string; // ISO, e.g. 2025-03-20
  dateLabel: string; // e.g. Mar 20, 2025
  readTime: string;
  image: { src: string; alt: string };
  views: number;
  href: string;
  cta: { label: string }
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Image frame: unveils from the bottom
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE },
  },
};
// Photo inside the frame: slow zoom settles while it is revealed
const photoVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.6, ease: EASE } },
};
// Details (meta, title, footer): rise one after another
const detailsVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.6, staggerChildren: 0.12 } },
};
const detailVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function BlogCard({ post }: { post: BlogPost }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      initial={reduceMotion ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className="group w-full bg-[#fffaf0] grid sm:grid-cols-2 text-[#1f4a2c]"
    >
      {/* Image */}
      <Link href={post.href} className="block" aria-label={post.title}>
        <motion.div
          variants={frameVariants}
          className="relative aspect-4/3 lg:h-80 w-full overflow-hidden"
        >
          <motion.div variants={photoVariants} className="absolute inset-0 ">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
            />
          </motion.div>
        </motion.div>
      </Link>

      {/* Details */}
      <motion.div variants={detailsVariants} className="px-6  lg:py-4  flex flex-col justify-between py-5">
        <div>


          <motion.h3
            variants={detailVariants}
            className="mb-0  font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.35rem,1.6vw,1.75rem)] font-normal leading-[1.35]"
          >
            <Link
              href={post.href}
              className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f4a2c]"
            >
              {post.title?.length > 100 ? `${post.title.slice(0, 100)}...` : post.title}
            </Link>
          </motion.h3>

          {/* <motion.div variants={detailVariants} className="text-xs flex justify-between flex-wrap  mt-3 leading-[1.5]">
            <p className="m-0 font-bold text-[#15452e]">{post.author}</p>
            <p className="m-0 flex items-center gap-2">
              <time dateTime={post.date}>{post.dateLabel}</time>
            </p>
          </motion.div> */}
        </div>

        {/* Footer: views + like */}
        <motion.div
          variants={detailVariants}
          className="flex items-center justify-between text-xs border-t pt-3 gap-3 border-gray-300"
        >

          <motion.div className="flex jus items-center gap-4">
            <span
              aria-hidden="true"
              className="grid h-10 w-10 place-items-center rounded-full bg-[#15452e] text-lg font-semibold tracking-wide text-[#e6f5ae]"
            >
              {post.author?.slice(0, 1)}
            </span>
            <div className="text-sm">
              <p className="m-0 font-bold text-[#15452e]">{post.author}</p>
              <p className="m-0 flex items-center gap-2 text-xs text-[#8a6b36]">
                <time dateTime={post.date}>{post.dateLabel}</time>
              </p>
            </div>
          </motion.div>

          <Link href={post.href} className="w-fit border-b-2 border-[#15452e] pb-1 text-sm font-semibold text-[#15452e] transition-colors hover:border-[#4a5d2e] hover:text-[#4a5d2e]">
            {post.cta?.label || ""}
          </Link>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}