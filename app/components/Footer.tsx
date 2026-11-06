"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "motion/react";
import {
  FaArrowRight,
  FaArrowUp,
  FaFacebookF,
  FaHeart,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaRegClock,
  FaRegEnvelope,
  FaXTwitter,
} from "react-icons/fa6";
import footer from "@/app/data/footer.json";
import MainContainer from "./ui/MainContainer";

const EASE = [0.2, 0.7, 0.2, 1] as const;

const wrapVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.1 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

export function Footer() {
  const reduceMotion = useReducedMotion();

  const getSocialIcon = (label: string) => {
    switch (label.toLowerCase()) {
      case "facebook":
        return <FaFacebookF className="h-3.5 w-3.5" />;
      case "instagram":
        return <FaInstagram className="h-3.5 w-3.5" />;
      case "linkedin":
        return <FaLinkedinIn className="h-3.5 w-3.5" />;
      default:
        return <FaXTwitter className="h-3.5 w-3.5" />;
    }
  };

  return (
    <footer className="bg-[#0e2a1d] text-[#fdfbf3] px-5 sm:px-8">
      <MainContainer>
      <motion.div
        initial={reduceMotion ? false : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        variants={wrapVariants}
        className=""
      >
        {/* Top Call-To-Action Banner */}
        <motion.div
          variants={riseVariants}
          className="flex flex-col justify-between gap-8 border-b border-[#fdfbf3]/15 py-14 lg:flex-row lg:items-end lg:py-20"
        >
          <div className="max-w-2xl">
            <p className="m-0 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[#e6f5ae]">
              <span className="h-px w-8 bg-[#e6f5ae]" />
              {footer.eyebrow}
            </p>
            <h2 className="m-0 mt-4 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal leading-[1.06] tracking-[-0.02em] text-[#fdfbf3]">
              {footer.heading}
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={footer.cta.href}
              className="group inline-flex items-center gap-3 rounded-full bg-[#e6f5ae] px-7 py-4 text-sm font-bold uppercase tracking-[0.12em] text-[#15452e] transition-all duration-300 hover:bg-[#b49358] hover:text-[#fdfbf3]"
            >
              <FaHeart className="h-4 w-4 text-[#d97706] group-hover:text-[#fdfbf3]" />
              <span>{footer.cta.label}</span>
              <FaArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
        
          </div>
        </motion.div>

        {/* Main 4-Column Footer Grid */}
        <motion.div
          variants={riseVariants}
          className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_0.85fr_1fr_1.1fr] lg:py-16"
        >
          {/* Column 1: Logo, Mission & Socials */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <Link
                href={footer.logoHref}
                aria-label={`${footer.logoAlt} home`}
                className="inline-block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6f5ae]"
              >
                <Image
                  src={footer.logoLight || footer.logo}
                  alt={footer.logoAlt}
                  width={230}
                  height={62}
                  className="h-auto w-38 sm:w-48 object-contain object-left"
                  unoptimized
                />
              </Link>
              <p className="mb-0 mt-5 max-w-[38ch] text-sm leading-[1.75] text-[#fdfbf3]/75">
                {footer.description}
              </p>
            </div>

            {footer.socials && (
              <div className="flex items-center gap-3 pt-2">
                {footer.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-[#fdfbf3]/20 text-[#fdfbf3]/85 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#e6f5ae] hover:bg-[#e6f5ae] hover:text-[#15452e]"
                  >
                    {getSocialIcon(s.label)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[#e6f5ae]">
              Explore
            </h3>
            <ul className="m-0 mt-6 grid grid-cols-2 gap-x-4 gap-y-3 list-none p-0 text-sm sm:grid-cols-1">
              {footer.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[#fdfbf3]/80 transition-colors hover:text-[#e6f5ae]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Programs */}
          <div>
            <h3 className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[#e6f5ae]">
              Our Programs
            </h3>
            <ul className="m-0 mt-6 flex flex-col gap-3 list-none p-0 text-sm">
              {footer.programLinks?.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-[#fdfbf3]/80 transition-colors hover:text-[#e6f5ae]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Info */}
          <div>
            <h3 className="m-0 text-xs font-bold uppercase tracking-[0.2em] text-[#e6f5ae]">
              Contact Us
            </h3>
            <ul className="m-0 mt-6 flex flex-col gap-4 list-none p-0 text-sm text-[#fdfbf3]/80">
              {footer.contact.address && (
                <li className="flex items-start gap-3">
                  <FaLocationDot className="mt-1 h-4 w-4 shrink-0 text-[#e6f5ae]" />
                  <span>{footer.contact.address}</span>
                </li>
              )}
              <li className="flex items-center gap-3">
                <FaRegEnvelope className="h-4 w-4 shrink-0 text-[#e6f5ae]" />
                <a
                  href={`mailto:${footer.contact.email}`}
                  className="transition-colors hover:text-[#e6f5ae]"
                >
                  {footer.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="h-4 w-4 shrink-0 text-[#e6f5ae]" />
                <a
                  href={footer.contact.phoneHref}
                  className="transition-colors hover:text-[#e6f5ae]"
                >
                  {footer.contact.phone}
                </a>
              </li>
              {footer.contact.hours && (
                <li className="flex items-center gap-3">
                  <FaRegClock className="h-4 w-4 shrink-0 text-[#e6f5ae]" />
                  <span>{footer.contact.hours}</span>
                </li>
              )}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Copyright & Back to Top */}
        <motion.div
          variants={riseVariants}
          className="flex flex-col items-center justify-between gap-4 border-t border-[#fdfbf3]/15 py-7 text-xs text-[#fdfbf3]/65 sm:flex-row"
        >
          <p className="m-0 text-center sm:text-left">{footer.copyright}</p>

          <button
            type="button"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reduceMotion ? "auto" : "smooth",
              })
            }
            className="group flex items-center gap-2 font-semibold uppercase tracking-[0.18em] text-[#e6f5ae] transition-colors hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e6f5ae]"
          >
            <span>{footer.backToTopLabel}</span>
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[#e6f5ae]/40 transition-transform duration-300 group-hover:-translate-y-1">
              <FaArrowUp aria-hidden="true" className="h-3 w-3" />
            </span>
          </button>
        </motion.div>
      </motion.div>
      </MainContainer>
    </footer>
  );
}
