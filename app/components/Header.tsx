"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHeart, FaPhone, FaRegEnvelope } from "react-icons/fa6";
import MainContainer from "./ui/MainContainer";

import header from "@/app/data/header.json";

const content = header;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = (e: MediaQueryListEvent) => e.matches && setMenuOpen(false);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      id="top"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-[#15452e]/15 bg-[#fdfbf3]/95 shadow-[0_8px_30px_-12px_rgba(21,69,46,0.22)] backdrop-blur-md"
          : "border-b border-[#15452e]/10 bg-[#fdfbf3]"
      }`}
    >


      {/* Primary Navigation */}
      <div className={`px-5 transition-all duration-300 sm:px-8 ${scrolled ? "py-2" : "py-3"}`}>
        <MainContainer>
          <nav
            className="mx-auto flex items-center justify-between gap-4"
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
                width={230}
                height={60}
                className={`h-auto object-contain transition-[width] duration-300 ${
                  scrolled ? "w-36 sm:w-48" : "w-36 sm:w-56"
                }`}
                priority
                unoptimized
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-5 text-[15px] font-semibold tracking-[0.02em] xl:flex 2xl:gap-7">
              {content.links.map((link) => {
                const active =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={`group relative inline-block whitespace-nowrap py-2 transition-colors hover:text-[#8a6b36] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358] ${
                        active ? "text-[#15452e] font-bold" : "text-[#15452e]/85"
                      }`}
                    >
                      {link.label}
                      <span
                        aria-hidden="true"
                        className={`absolute inset-x-0 bottom-0.5 h-[2.5px] origin-left rounded-full bg-[#b49358] transition-transform duration-300 ${
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

            {/* Desktop CTA buttons */}
            <div className="hidden shrink-0 items-center gap-3 xl:flex">
              {content.secondaryCta && (
                <Link
                  href={content.secondaryCta.href}
                  className="inline-flex items-center rounded-full border border-[#15452e]/25 px-4 py-2 text-[0.8rem] font-semibold tracking-[0.02em] text-[#15452e] transition-all hover:border-[#15452e] hover:bg-[#15452e]/5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
                >
                  {content.secondaryCta.label}
                </Link>
              )}
              <Link
                href={content.cta.href}
                className="inline-flex items-center gap-2 rounded-full bg-[#15452e] px-5 py-2.5 text-[0.82rem] font-semibold tracking-[0.03em] text-[#e6f5ae] shadow-sm transition-all hover:-translate-y-0.5 hover:bg-[#b49358] hover:text-[#15452e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
              >
                <FaHeart className="h-3.5 w-3.5 text-[#f59e0b]" />
                <span>{content.cta.label}</span>
              </Link>
            </div>

            {/* Mobile toggle */}
            <div className="flex items-center gap-2.5 xl:hidden">
              <Link
                href={content.cta.href}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#15452e] px-4 py-2 text-xs font-semibold text-[#e6f5ae] sm:px-5 sm:py-2.5 sm:text-sm"
              >
                <FaHeart className="h-3 w-3 sm:flex hidden text-[#f59e0b]" />
                <span>{content.cta.label}</span>
              </Link>

              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                onClick={() => setMenuOpen((open) => !open)}
                className="inline-flex sm:h-11 sm:w-11 h-8 w-8 flex-col items-center justify-center gap-1.5 rounded-full border border-[#15452e]/25 transition-colors hover:border-[#15452e] hover:bg-[#15452e]/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b49358]"
              >
                <span
                  className={`h-0.5 sm:w-5 w-4 bg-[#15452e] transition-transform duration-300 ${
                    menuOpen ? "translate-y-[8px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`h-0.5 sm:w-5 w-4 bg-[#15452e] transition-opacity duration-200 ${
                    menuOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`h-0.5 sm:w-5 w-4 bg-[#15452e] transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[8px] -rotate-45" : ""
                  }`}
                />
              </button>
            </div>
          </nav>

          {/* Mobile panel */}
          <div
            id="mobile-navigation"
            className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none xl:hidden ${
              menuOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <ul className="mt-3 grid grid-cols-1 border-t border-[#15452e]/10 pb-3 pt-2 sm:grid-cols-2 sm:gap-x-6">
                {content.links.map((link) => {
                  const active =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname === link.href || pathname.startsWith(`${link.href}/`);
                  return (
                    <li
                      key={link.label}
                      className="border-b border-[#15452e]/10 last:border-b-0"
                    >
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        tabIndex={menuOpen ? 0 : -1}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-3.5 text-base font-semibold tracking-[0.02em] transition-colors hover:text-[#8a6b36] ${
                          active ? "text-[#8a6b36]" : "text-[#15452e]"
                        }`}
                      >
                        {link.label}
                        {active && (
                          <span
                            aria-hidden="true"
                            className="h-2 w-2 rounded-full bg-[#b49358]"
                          />
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="mb-4 mt-2 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={content.cta.href}
                  onClick={closeMenu}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#15452e] px-6 py-3.5 text-base font-semibold text-[#e6f5ae] transition-colors hover:bg-[#b49358] hover:text-[#15452e]"
                >
                  <FaHeart className="h-4 w-4 text-[#f59e0b]" />
                  <span>{content.cta.label}</span>
                </Link>

                {content.secondaryCta && (
                  <Link
                    href={content.secondaryCta.href}
                    onClick={closeMenu}
                    tabIndex={menuOpen ? 0 : -1}
                    className="flex flex-1 items-center justify-center rounded-full border border-[#15452e] px-6 py-3.5 text-base font-semibold text-[#15452e] transition-colors hover:bg-[#15452e]/10"
                  >
                    {content.secondaryCta.label}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </MainContainer>
      </div>
    </header>
  );
}
