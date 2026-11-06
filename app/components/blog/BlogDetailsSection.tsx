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
  FaRegHeart,
  FaXTwitter,
} from "react-icons/fa6";
import MainContainer from "../ui/MainContainer";
import { BlogCard, type BlogPost } from "@/app/components/ui/BlogCard";
import PageBanner from "../ui/PageBanner";

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

const headerVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

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
  "grid h-9 w-9 place-items-center rounded-full border border-[#15452e]/30 transition-colors duration-300 hover:bg-[#15452e] hover:text-[#e6f5ae] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#15452e]";

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
          className="m-0 text-[clamp(1.05rem,1.15vw,1.2rem)] leading-[1.8] text-[#15452e]/85"
        >
          {block.text}
        </motion.p>
      );

    case "heading":
      return (
        <motion.h2
          {...common}
          className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.5rem,2.2vw,2rem)] font-normal text-[#15452e]"
        >
          {block.text}
        </motion.h2>
      );

    case "quote":
      return (
        <motion.blockquote
          {...common}
          className="m-0 border-l-2 border-[#b49358] pl-5 italic text-[#15452e]"
        >
          <p className="m-0 text-[clamp(1.15rem,1.4vw,1.35rem)] leading-[1.6]">
            “{block.text}”
          </p>
          {block.cite && (
            <cite className="mt-2 block text-xs not-italic uppercase tracking-wider text-[#8a6b36]">
              — {block.cite}
            </cite>
          )}
        </motion.blockquote>
      );

    case "image":
      return (
        <motion.figure {...common} className="m-0 my-3">
          <motion.div
            variants={frameVariants}
            className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-[#15452e]/20 shadow-md"
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
            <figcaption className="mt-3 text-center text-xs font-medium text-[#8a6b36]">{block.caption}</figcaption>
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
      // Clipboard blocked
    }
  };

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(post.title);

  return (
    <div className="bg-[#fdfbf3] text-[#15452e]">
      {/* Blog Detail Hero Banner */}
      <PageBanner
        eyebrow={`Field Notes `}
        title={"Blog Details"}
        description={`Published on ${post.dateLabel} by ${post.author.name}`}
        image={post.image.src}
        imageAlt={post.image.alt}
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: "Blog", href: "/blog" },
          { label: "Blog Details" },
        ]}
        stats={[
          { value: `${post.views}`, label: "Views" },
          { value: `${post.likes + (liked ? 1 : 0)}`, label: "Likes" },
          { value: `${post.comments}`, label: "Responses" },
        ]}
        actions={[
          { label: "All Field Notes", href: "/blog", variant: "primary" },
        ]}
      />

      {/* Reading progress bar */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: scrollYProgress }}
        className="fixed inset-x-0 top-0 z-50 h-[3px] origin-left bg-[#8a6b36]"
      />

      <section className="px-6 py-18 md:px-[6%]">
        <MainContainer>
          <div className="mx-auto max-w-[850px]">
            <article
              ref={articleRef}
              aria-labelledby="post-title"
              className="rounded-2xl border border-[#15452e]/15 bg-white/70 p-6 shadow-sm md:p-12"
            >
              {/* Meta info */}
              <motion.header
                initial={initial}
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                variants={headerVariants}
                className="border-b border-[#15452e]/15 pb-6"
              >
                <motion.div variants={riseVariants} className="flex items-center gap-4">
                  <span
                    aria-hidden="true"
                    className="grid h-12 w-12 place-items-center rounded-full bg-[#15452e] text-sm font-semibold tracking-wide text-[#e6f5ae]"
                  >
                    {post.author.initials}
                  </span>
                  <div className="text-sm">
                    <p className="m-0 font-bold text-[#15452e]">{post.author.name}</p>
                    <p className="m-0 flex items-center gap-2 text-xs text-[#8a6b36]">
                      <time dateTime={post.date}>{post.dateLabel}</time>
                    </p>
                  </div>
                </motion.div>
              </motion.header>

              {/* Body */}
              <div className="mt-8 flex flex-col gap-6">
                {post.content.map((block, i) => (
                  <Block key={i} block={block} reduce={!!reduceMotion} />
                ))}
              </div>

              {/* Share & Like Bar */}
              <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-[#15452e]/15 pt-6">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8a6b36]">Share</span>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconButton}
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconButton}
                    aria-label="Share on X"
                  >
                    <FaXTwitter className="h-3.5 w-3.5" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={iconButton}
                    aria-label="Share on LinkedIn"
                  >
                    <FaLinkedinIn className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={copyLink}
                    className={iconButton}
                    aria-label={copied ? "Link copied" : "Copy link"}
                  >
                    <FaLink className="h-3.5 w-3.5" />
                  </button>
                  {copied && (
                    <span role="status" className="text-xs font-semibold text-[#8a6b36]">
                      Copied!
                    </span>
                  )}
                </div>

                <motion.button
                  type="button"
                  onClick={() => setLiked((v) => !v)}
                  aria-pressed={liked}
                  aria-label={liked ? "Unlike this post" : "Like this post"}
                  whileTap={reduceMotion ? undefined : { scale: 0.8 }}
                  className="flex items-center gap-2 rounded-full border border-[#15452e]/20 bg-[#f4f7f2] px-4 py-2 text-sm font-semibold text-[#15452e] transition-colors hover:border-[#15452e]"
                >
                  <motion.span
                    key={String(liked)}
                    initial={reduceMotion ? false : { scale: 0.6 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 14 }}
                    className="block"
                  >
                    {liked ? (
                      <FaHeart className="h-4 w-4 text-[#c2412d]" />
                    ) : (
                      <FaRegHeart className="h-4 w-4 text-[#15452e]" />
                    )}
                  </motion.span>
                  <span>{post.likes + (liked ? 1 : 0)} Likes</span>
                </motion.button>
              </div>
            </article>
          </div>

          {/* Recent posts */}
          {recent.length > 0 && (
            <div className="mx-auto sm:mt-16 mt-14">
              <div className="flex items-end justify-between gap-6 border-b border-[#15452e]/15 pb-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8a6b36]">Keep Reading</span>
                  <h2 className="m-0 mt-2 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,2.8vw,2.5rem)] font-normal text-[#15452e]">
                    Recent Field Notes
                  </h2>
                </div>
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-[#8a6b36] underline underline-offset-4 hover:text-[#15452e]"
                >
                  View All Field Notes →
                </Link>
              </div>

              <div className="mt-8 grid gap-8 lg:grid-cols-2">
                {recent.map((p) => (
                  <BlogCard key={p.id} post={p} />
                ))}
              </div>
            </div>
          )}
        </MainContainer>
      </section>
    </div>
  );
}
