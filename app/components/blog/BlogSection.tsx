"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import {
    AnimatePresence,
    motion,
    useReducedMotion,
    type Variants,
} from "motion/react";
import {
    FaArrowLeft,
    FaArrowRight,
    FaMagnifyingGlass,
    FaXmark,
} from "react-icons/fa6";
import MainContainer from "../ui/MainContainer";
import { BlogCard, type BlogPost } from "@/app/components/ui/BlogCard"; // adjust path if needed
import { SectionInnerTitle } from "../ui/SectionTitle";
import { Breadcrumb, type BreadcrumbItem } from "../Breadcrumb";

type BlogSectionProps = {
    /** Small label at the top left (the breadcrumb in the design) */
    eyebrow?: string;
    /** Large page title */
    heading?: string;
    post: BlogPost[];
    /** How many posts show on each page */
    perPage?: number;
    breadcrum : BreadcrumbItem[]
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Header: label, search and title appear one after another
const headerVariants: Variants = {
    hidden: {},
    show: { transition: { delayChildren: 0.1, staggerChildren: 0.12 } },
};
const riseVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};


// Page numbers to show, with gaps for long lists: 1 … 4 5 6 … 12
function getPages(current: number, total: number): (number | "gap")[] {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const sorted = Array.from(new Set([1, total, current - 1, current, current + 1]))
        .filter((p) => p >= 1 && p <= total)
        .sort((a, b) => a - b);

    const out: (number | "gap")[] = [];
    sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) out.push("gap");
        out.push(p);
    });
    return out;
}

export default function BlogSection({
    eyebrow = "All Posts",
    heading = "All Posts",
    post,
    perPage = 6,
    breadcrum,
}: BlogSectionProps) {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    const [page, setPage] = useState(1);
    const [query, setQuery] = useState("");
    const [searchOpen, setSearchOpen] = useState(false);
    const listRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (searchOpen) inputRef.current?.focus();
    }, [searchOpen]);

    // Search by title or author
    const filtered = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return post ?? [];
        return (post ?? []).filter(
            (p) =>
                p.title.toLowerCase().includes(q) ||
                p.author.toLowerCase().includes(q)
        );
    }, [post, query]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const currentPage = Math.min(page, totalPages);
    const visible = filtered.slice(
        (currentPage - 1) * perPage,
        currentPage * perPage
    );

    const goTo = (p: number) => {
        if (p < 1 || p > totalPages || p === currentPage) return;
        setPage(p);
        // Bring the top of the list back into view after changing page
        listRef.current?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
        });
    };

    const closeSearch = () => {
        setSearchOpen(false);
        setQuery("");
        setPage(1);
    };

    return (
        <section
            aria-labelledby="blog-title"
            className="bg-[#f4f4f4] px-6 pb-16 text-[#252d4a] md:px-[3.15%] md:pb-28"
        >
            <MainContainer>
                <div className="mx-auto md:w-8/12 lg:w-11/12">
                    {/* Header: label + search, then the title */}
                    <motion.div
                        initial={initial}
                        whileInView="show"
                        viewport={{ once: true, amount: 0.4 }}
                        variants={headerVariants}
                        className="pt-6"
                    >
                        <div className="flex items-center justify-between gap-6">
                            <motion.div variants={riseVariants}>
                                <Link
                                    href="/blog"
                                    className="text-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
                                >
                                    {eyebrow}
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={riseVariants}
                                className="flex items-center gap-3"
                            >
                                <AnimatePresence initial={false}>
                                    {searchOpen && (
                                        <motion.div
                                            key="search-field"
                                            initial={{ width: 0, opacity: 0 }}
                                            animate={{ width: "min(55vw, 260px)", opacity: 1 }}
                                            exit={{ width: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: EASE }}
                                            className="overflow-hidden"
                                        >
                                            <label htmlFor="blog-search" className="sr-only">
                                                Search posts
                                            </label>
                                            <input
                                                ref={inputRef}
                                                id="blog-search"
                                                type="search"
                                                value={query}
                                                onChange={(e) => {
                                                    setQuery(e.target.value);
                                                    setPage(1);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === "Escape") closeSearch();
                                                }}
                                                placeholder="Search posts"
                                                className="w-full border-b border-[#252d4a] bg-transparent py-1 text-sm text-[#252d4a] outline-none placeholder:text-[#252d4a]/50"
                                            />
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <button
                                    type="button"
                                    aria-label={searchOpen ? "Close search" : "Search posts"}
                                    aria-expanded={searchOpen}
                                    onClick={() => (searchOpen ? closeSearch() : setSearchOpen(true))}
                                    className="grid h-9 w-9 place-items-center rounded-full transition-colors duration-300 hover:bg-[#252d4a]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252d4a]"
                                >
                                    {searchOpen ? (
                                        <FaXmark aria-hidden="true" className="h-4 w-4" />
                                    ) : (
                                        <FaMagnifyingGlass aria-hidden="true" className="h-4 w-4" />
                                    )}
                                </button>
                            </motion.div>
                        </div>

                    </motion.div>

                    <SectionInnerTitle>
                        {heading}
                    </SectionInnerTitle>

                     <div className='mt-4'>
                        <Breadcrumb items={breadcrum} />
      </div>

                    {/* Posts */}
                    <div ref={listRef} className="mt-14 scroll-mt-24 md:mt-10">
                        {/* Announces results to screen readers */}
                        <p className="sr-only" aria-live="polite">
                            {filtered.length} {filtered.length === 1 ? "post" : "posts"}, page{" "}
                            {currentPage} of {totalPages}
                        </p>

                        {visible.length > 0 ? (
                            // key = page, so cards animate in again after changing page
                            <div
                                key={currentPage}
                                className="grid gap-10 lg:grid-cols-2 lg:w-full"
                            >
                                {visible.map((po) => (
                                    <BlogCard key={po.id} post={po} />
                                ))}
                            </div>
                        ) : (
                            <div className="border-y border-[#252d4a]/30 py-16 text-center">
                                <p className="m-0 text-lg">
                                    No posts match “{query}”.
                                </p>
                                <button
                                    type="button"
                                    onClick={closeSearch}
                                    className="mt-4 text-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
                                >
                                    Clear search
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <nav
                            aria-label="Pagination"
                            className="mt-16 flex flex-wrap items-center justify-center gap-2 border-t border-[#252d4a]/30 pt-8"
                        >
                            <button
                                type="button"
                                onClick={() => goTo(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                                className="grid h-10 w-10 place-items-center border border-[#252d4a]/40 transition-colors duration-300 hover:bg-[#252d4a] hover:text-[#fffaf0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252d4a] disabled:pointer-events-none disabled:opacity-30"
                            >
                                <FaArrowLeft aria-hidden="true" className="h-3.5 w-3.5" />
                            </button>

                            {getPages(currentPage, totalPages).map((p, i) =>
                                p === "gap" ? (
                                    <span key={`gap-${i}`} aria-hidden="true" className="px-1">
                                        …
                                    </span>
                                ) : (
                                    <button
                                        key={p}
                                        type="button"
                                        onClick={() => goTo(p)}
                                        aria-label={`Page ${p}`}
                                        aria-current={p === currentPage ? "page" : undefined}
                                        className={`h-10 min-w-10 border px-3 text-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252d4a] ${
                                            p === currentPage
                                                ? "border-[#252d4a] bg-[#252d4a] text-[#fffaf0]"
                                                : "border-transparent hover:border-[#252d4a]/50"
                                        }`}
                                    >
                                        {p}
                                    </button>
                                )
                            )}

                            <button
                                type="button"
                                onClick={() => goTo(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                                className="grid h-10 w-10 place-items-center border border-[#252d4a]/40 transition-colors duration-300 hover:bg-[#252d4a] hover:text-[#fffaf0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#252d4a] disabled:pointer-events-none disabled:opacity-30"
                            >
                                <FaArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                            </button>
                        </nav>
                    )}
                </div>
            </MainContainer>
        </section>
    );
}