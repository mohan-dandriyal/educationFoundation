"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { FaHeart, FaRegEye, FaRegHeart } from "react-icons/fa6";

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
  const [liked, setLiked] = useState(false);

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
      <motion.div variants={detailsVariants} className="px-6 pt-8">
        <motion.div variants={detailVariants} className="text-xs leading-[1.5]">
          <p className="m-0">{post.author}</p>
          <p className="m-0 flex items-center gap-2">
            <time dateTime={post.date}>{post.dateLabel}</time>
            <span aria-hidden="true">•</span>
            <span>{post.readTime}</span>
          </p>
        </motion.div>

        <motion.h3
          variants={detailVariants}
          className="mb-0 mt-5 min-h-[4.5rem] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.35rem,1.8vw,1.75rem)] font-normal leading-[1.35]"
        >
          <Link
            href={post.href}
            className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1f4a2c]"
          >
            {post.title}
          </Link>
        </motion.h3>

        {/* Footer: views + like */}
        <motion.div
          variants={detailVariants}
          className="mt-10 flex items-center justify-between border-t border-[#1f4a2c]/30 pt-5 text-xs"
        >
          <span className="flex items-center gap-2">
            <FaRegEye aria-hidden="true" className="h-4 w-4" />
            <span aria-label={`${post.views} views`}>{post.views}</span>
          </span>

          <motion.button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={liked ? "Unlike this post" : "Like this post"}
            whileTap={reduceMotion ? undefined : { scale: 0.8 }}
            className="text-[#e5484d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e5484d]"
          >
            {/* Heart pops when it becomes liked */}
            <motion.span
              key={String(liked)}
              initial={reduceMotion ? false : { scale: 0.6 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500, damping: 14 }}
              className="block"
            >
              {liked ? (
                <FaHeart className="h-4 w-4" />
              ) : (
                <FaRegHeart className="h-4 w-4" />
              )}
            </motion.span>
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.article>
  );
}