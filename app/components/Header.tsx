"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import MainContainer from "./ui/MainContainer";

import header from "@/app/data/header.json";

const content = header;

// Update the label/href here, or move them into header.json

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  // Compact the header and add a soft shadow once the page scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu when the viewport grows to desktop width.
  // Keep this value in sync with the min-[1220px] classes below.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1220px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      id="top"
      className={`sticky top-0 z-30 w-full border-b bg-[#fdfbf3]/90 px-5 text-[#15452e] backdrop-blur-lg transition-[padding,box-shadow,border-color] duration-300 sm:px-8 ${
        scrolled
          ? "border-[#15452e]/10 py-1 shadow-[0_6px_24px_-12px_rgba(21,69,46,0.35)] sm:py-1.5"
          : "border-transparent py-2 sm:py-3"
      }`}
    >
      <MainContainer>
        <nav
          className="mx-auto flex min-h-14 items-center justify-between gap-8"
          aria-label="Primary navigation"
        >
          <Link
            href={content.logoHref}
            className="flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
            aria-label={`${content.logoAlt} home`}
          >
            <Image
              src={content.logo}
              alt={content.logoAlt}
              width={220}
              height={220}
              className={`transition-[width] duration-300 ${
                scrolled ? "w-28 sm:w-32" : "w-32 sm:w-40"
              }`}
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-7 font-[Arial,Helvetica,sans-serif] text-[0.8rem] font-semibold tracking-[0.04em] min-[1220px]:flex min-[1220px]:gap-10">
            {content.links.map((link) => {
              const active = link.href === pathname;
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`group relative inline-block rounded-sm py-2 transition-colors hover:text-[#8a6b36] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358] ${
                      active ? "text-[#8a6b36]" : ""
                    }`}
                  >
                    {link.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-0 -bottom-0.5 h-[2px] origin-left bg-[#b49358] transition-transform duration-300 ${
                        active
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Desktop contact button */}
          <Link
            href={header.cta.href}
            className="hidden shrink-0 items-center rounded-full bg-[#15452e] px-6 py-2.5 font-[Arial,Helvetica,sans-serif] text-[0.8rem] font-semibold tracking-[0.04em] text-[#fdfbf3] transition-colors hover:bg-[#b49358] hover:text-[#15452e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358] min-[1220px]:inline-flex"
          >
            {header.cta.label}
          </Link>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-[#15452e]/25 transition-colors hover:border-[#15452e] hover:bg-[#15452e]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b49358] min-[1220px]:hidden"
          >
            <span
              className={`h-px w-5 bg-[#15452e] transition-transform duration-300 ${
                menuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-[#15452e] transition-opacity duration-200 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-[#15452e] transition-transform duration-300 ${
                menuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </nav>

        {/* Mobile panel: height animates open/closed */}
        <div
          id="mobile-navigation"
          className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none min-[1220px]:hidden ${
            menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <ul className="border-t border-[#15452e]/10 pb-3 pt-2">
              {content.links.map((link) => {
                const active = link.href === pathname;
                return (
                  <li key={link.label} className="border-b border-[#15452e]/10 last:border-b-0">
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      tabIndex={menuOpen ? 0 : -1}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between py-4 font-[Arial,Helvetica,sans-serif] text-base font-semibold tracking-[0.03em] transition-colors hover:text-[#8a6b36] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b49358] ${
                        active ? "text-[#8a6b36]" : ""
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[#b49358]"
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link
              href={header.cta.href}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="mb-4 mt-1 flex items-center justify-center rounded-full bg-[#15452e] px-6 py-3.5 font-[Arial,Helvetica,sans-serif] text-base font-semibold tracking-[0.03em] text-[#fdfbf3] transition-colors hover:bg-[#b49358] hover:text-[#15452e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b49358]"
            >
              {header.cta.label}
            </Link>
          </div>
        </div>
      </MainContainer>
    </header>
  );
}