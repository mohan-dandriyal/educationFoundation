"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import MainContainer from "./ui/MainContainer";

import header from '@/app/data/header.json'



const content = header

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header id="top" className="relative z-30 w-full border-b border-[#3b4d28]/15 bg-[#fdfbf3] px-5 py-1 text-[#3b4d28] sm:px-8 sm:py-2">
      <MainContainer>
        <nav className="mx-auto flex items-center justify-between" aria-label="Primary navigation">
         
          <Link href={content.logoHref} className="flex items-center gap-3 text-sm uppercase tracking-[0.18em]" aria-label={`${content.logoAlt} home`}>
            <Image src={content.logo} alt={content.logoAlt} width={88} height={88} className="w-50 object-contain" priority />
          </Link>

          <div className="hidden items-center gap-8 text-xs uppercase tracking-[0.16em] min-[701px]:flex">
            {content.links.map((link) => (
              <Link key={link.label} href={link.href} className="transition-opacity hover:opacity-60">
                {link.label}
              </Link>
            ))}
          </div>

          <Link href={content.cta.href} className="hidden border border-[#3b4d28]/50 px-4 py-2 text-xs uppercase tracking-[0.16em] transition-colors hover:bg-[#3b4d28] hover:text-[#fdfbf3] min-[701px]:block">
            {content.cta.label}
          </Link>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 flex-col items-center justify-center gap-1.5 border border-[#3b4d28]/50 min-[701px]:hidden"
          >
            <span className={`h-px w-5 bg-[#3b4d28] transition-transform ${menuOpen ? "translate-y-1 rotate-45" : ""}`} />
            <span className={`h-px w-5 bg-[#3b4d28] transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-5 bg-[#3b4d28] transition-transform ${menuOpen ? "-translate-y-1 -rotate-45" : ""}`} />
          </button>
        </nav>

        <div
          id="mobile-navigation"
          className={`${menuOpen ? "grid" : "hidden"} gap-2 border-t border-[#3b4d28]/15 pt-5 min-[701px]:hidden`}
        >
          {content.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              className="border-b border-[#3b4d28]/10 py-3 text-sm uppercase tracking-[0.16em]"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={content.cta.href}
            onClick={closeMenu}
            className="mt-2 border border-[#3b4d28] px-4 py-3 text-center text-xs uppercase tracking-[0.16em]"
          >
            {content.cta.label}
          </Link>
        </div>
      </MainContainer>
    </header>
  );
}
