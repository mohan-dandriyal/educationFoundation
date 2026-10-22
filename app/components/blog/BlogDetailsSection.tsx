"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  type Variants,
} from "motion/react";
import {
  FaFacebookF,
  FaHeart,
  FaLink,
  FaLinkedinIn,
  FaRegComment,
  FaRegEye,
  FaRegHeart,
  FaXTwitter,
} from "react-icons/fa6";
import MainContainer from "../ui/MainContainer";
import { BlogCard, type BlogPost } from "@/app/components/ui/BlogCard"; // adjust path if needed
import { SectionInnerTitle } from "../ui/SectionTitle";

export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export type BlogDetail = {
  id: number;
  slug: string;
  title: string;
  author: { name: string; initials: string };
  date: string; // ISO, e.g. 2025-03-20
  dateLabel: string; // e.g. Mar 20, 2025
  readTime: string;
  image: { src: string; alt: string }; // cover, used for sharing previews
  views: number;
  comments: number;
  likes: number;
  content: ContentBlock[];
};

type BlogDetailsSectionProps = {
  post: BlogDetail;
  /** Other posts shown under the article */
  recent?: BlogPost[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Top of the article: breadcrumb, meta and title appear one after another
const headerVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Image inside the article: unveils from the bottom while the zoom settles
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE, delay: 0.15 },
  },
};
const photoVariants: Variants = {
  hidden: { scale: 1.2 },
  show: { scale: 1, transition: { duration: 1.5, ease: EASE, delay: 0.15 } },
};

const iconButton =
  "grid h-9 w-9 place-items-center rounded-full border border-[#252d4a]/40 transition-colors duration-300 hover:bg-[#252d4a] hover:text-[#e6f5ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252d4a]";

// One piece of the article body, revealed as it is scrolled to
function Block({ block, reduce }: { block: ContentBlock; reduce: boolean }) {
  const common = {
    initial: reduce ? false : "hidden",
    whileInView: "show",
    viewport: { once: true, amount: 0.2 },
    variants: riseVariants,
  } as const;

  switch (block.type) {
    case "paragraph":
      return (
        <motion.p
          {...common}
          className="m-0 text-[clamp(1rem,1.1vw,1.15rem)] leading-[1.8]"
        >
          {block.text}
        </motion.p>
      );

    case "heading":
      return (
        <SectionInnerTitle>
          {block.text}
        </SectionInnerTitle>
      );

    case "quote":
      return (
        <motion.blockquote
          {...common}
          className="m-0 my-2 border-l-2 border-[#252d4a] pl-6"
        >
          <p className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.25rem,1.8vw,1.6rem)] italic leading-[1.5]">
            “{block.text}”
          </p>
          {block.cite && (
            <footer className="mt-3 text-sm">{block.cite}</footer>
          )}
        </motion.blockquote>
      );

    case "image":
      return (
        <motion.figure {...common} className="m-0 my-2">
          <motion.div
            variants={frameVariants}
            className="relative aspect-[4/3] w-full overflow-hidden border border-[#252d4a]"
          >
            <motion.div variants={photoVariants} className="absolute inset-0">
              <Image
                src={block.src}
                alt={block.alt}
                fill
                sizes="(min-width: 1024px) 800px, 100vw"
                className="object-cover"
              />
            </motion.div>
          </motion.div>
          {block.caption && (
            <figcaption className="mt-3 text-sm">{block.caption}</figcaption>
          )}
        </motion.figure>
      );
  }
}

export default function BlogDetailsSection({
  post,
  recent = [],
}: BlogDetailsSectionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  const articleRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: articleRef,
    offset: ["start start", "end end"],
  });

  // Share links need the page address, which is only known in the browser
  const [url] = useState(() =>
    typeof window === "undefined" ? "" : window.location.href
  );
  const [copied, setCopied] = useState(false);

  const [liked, setLiked] = useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url || window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; nothing else to do
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <section className="bg-[#f4f4f4] px-6 py-8 text-[#252d4a] md:px-[3.15%] md:py-12">
      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[#252d4a]"
      />

      <MainContainer>
        <div className="mx-auto max-w-[900px]">
          <Link
            href="/blog"
            className="text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
          >
            All Posts
          </Link>

          <article
            ref={articleRef}
            aria-labelledby="post-title"
            className="mt-8 border border-[#252d4a] p-6 md:p-14"
          >
            {/* Meta + title */}
            <motion.header
              initial={initial}
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              variants={headerVariants}
            >
              <motion.div variants={riseVariants} className="flex items-center gap-3">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-full bg-[#4a5d2e] text-xs font-medium tracking-wide text-[#fdfbf3]"
                >
                  {post.author.initials}
                </span>
                <div className="text-xs leading-5">
                  <p className="m-0">{post.author.name}</p>
                  <p className="m-0 flex items-center gap-2">
                    <time dateTime={post.date}>{post.dateLabel}</time>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime}</span>
                  </p>
                </div>
              </motion.div>

              <motion.h1
                id="post-title"
                variants={riseVariants}
                className="mb-0 mt-8 max-w-[22ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,3.8vw,3.4rem)] font-normal leading-[1.1] tracking-[-0.02em]"
              >
                {post.title}
              </motion.h1>
            </motion.header>

            {/* Body */}
            <div className="mt-10 flex flex-col gap-6 md:mt-12">
              {post.content.map((block, i) => (
                <Block key={i} block={block} reduce={!!reduceMotion} />
              ))}
            </div>

            {/* Share */}
            <div className="mt-12 flex items-center gap-3 border-t border-[#252d4a]/30 pt-6">
              <span className="mr-2 text-sm">Share</span>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook"
                className={iconButton}
              >
                <FaFacebookF aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X"
                className={iconButton}
              >
                <FaXTwitter aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on LinkedIn"
                className={iconButton}
              >
                <FaLinkedinIn aria-hidden="true" className="h-3.5 w-3.5" />
              </a>
              <button
                type="button"
                onClick={copyLink}
                aria-label="Copy link"
                className={iconButton}
              >
                <FaLink aria-hidden="true" className="h-3.5 w-3.5" />
              </button>
              <span role="status" aria-live="polite" className="text-sm">
                {copied ? "Link copied" : ""}
              </span>
            </div>

            {/* Views, comments, like */}
            <div className="mt-6 flex items-center justify-between border-t border-[#252d4a]/30 pt-5 text-xs">
              <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                  <FaRegEye aria-hidden="true" className="h-4 w-4" />
                  {post.views} views
                </span>
                <span className="flex items-center gap-2">
                  <FaRegComment aria-hidden="true" className="h-4 w-4" />
                  {post.comments} comments
                </span>
              </div>

              <motion.button
                type="button"
                onClick={() => setLiked((v) => !v)}
                aria-pressed={liked}
                aria-label={liked ? "Unlike this post" : "Like this post"}
                whileTap={reduceMotion ? undefined : { scale: 0.8 }}
                className="flex items-center gap-2 text-[#c2412d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#c2412d]"
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
                <span className="text-[#252d4a]">{post.likes + (liked ? 1 : 0)}</span>
              </motion.button>
            </div>
          </article>
        </div>

        {/* Recent posts */}
        {recent.length > 0 && (
          <div className="mx-auto mt-20 md:mt-28">
            <div className="flex items-end justify-between gap-6">
              <h2 className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.5rem,2.4vw,2.25rem)] font-normal">
                Recent Posts
              </h2>
              <Link
                href="/blog"
                className="text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
              >
                See All
              </Link>
            </div>

            <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-2">
              {recent.map((p) => (
                <BlogCard key={p.id} post={p} />
              ))}
            </div>
          </div>
        )}
      </MainContainer>
    </section>
  );
}
