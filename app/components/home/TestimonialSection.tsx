"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { A11y, Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";

export type Testimonial = {
  id: number;
  name: string;
  quote: string;
  image: { src: string; alt: string };
};

type TestimonialSectionProps = {
  eyebrow?: string;
  heading?: string;
  items?: Testimonial[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

export function TestimonialSection({
  eyebrow = "Testimonials",
  heading = "What people say",
  items = [],
}: TestimonialSectionProps) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="testimonials-title"
      className="bg-[#fdfbf3] px-6 py-16 text-[#15452e] md:px-[6%] md:py-24"
    >
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="mx-auto max-w-[900px] text-center"
      >


        <div className="text-center flex justify-center">
          <SectionLabel>
            {eyebrow}
          </SectionLabel>
        </div>

        <div className="text-center flex justify-center">
          <SectionInnerTitle>
            {heading}
          </SectionInnerTitle>
        </div>

        {/* Slider */}
        <div className="relative mt-14 md:mt-20">
          <Swiper
            modules={[A11y, Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            loop
            speed={800}
            slidesPerView={1}
            grabCursor
            autoplay={
              reduceMotion
                ? false
                : { delay: 6500, disableOnInteraction: false, pauseOnMouseEnter: true }
            }
            navigation={{ prevEl: ".testimonial-prev", nextEl: ".testimonial-next" }}
            pagination={{ clickable: true, el: ".testimonial-pagination" }}
            a11y={{
              prevSlideMessage: "Previous testimonial",
              nextSlideMessage: "Next testimonial",
              paginationBulletMessage: "Go to testimonial {{index}}",
            }}
            className="!px-0"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id} className="!h-auto">
                <figure className="m-0 flex flex-col items-center px-2 md:px-16">
                  <div className="relative h-20 w-20 overflow-hidden rounded-[1.25rem]">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <blockquote className="m-0 mt-8 max-w-[62ch] text-[clamp(0.95rem,1.1vw,1.1rem)] leading-[1.8] text-[#4a5d2e]">
                    <p className="m-0">“{item.quote}”</p>
                  </blockquote>

                  <figcaption className="mt-6 font-[cursive] text-[clamp(1.5rem,2vw,2rem)] italic leading-none">
                    {item.name}
                  </figcaption>
                </figure>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Arrows (hidden on small screens, dots are enough there) */}
          <button
            type="button"
            aria-label="Previous testimonial"
            className="testimonial-prev absolute left-0 z-10 top-1/3 hidden h-11 w-11 items-center justify-center rounded-full border border-[#252d4a] transition-colors duration-300 hover:bg-[#252d4a] hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a] disabled:opacity-30 md:flex"
          >
            <FaArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next testimonial"
            className="testimonial-next absolute right-0 z-10 top-1/3 hidden h-11 w-11 items-center justify-center rounded-full border border-[#252d4a] transition-colors duration-300 hover:bg-[#252d4a] hover:text-[#fdfbf3] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a] disabled:opacity-30 md:flex"
          >
            <FaArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>

          {/* Dots */}
          <div className="testimonial-pagination mt-10 flex justify-center gap-2 [&_.swiper-pagination-bullet]:m-0 [&_.swiper-pagination-bullet]:h-2 [&_.swiper-pagination-bullet]:w-2 [&_.swiper-pagination-bullet]:rounded-full [&_.swiper-pagination-bullet]:bg-[#252d4a] [&_.swiper-pagination-bullet]:opacity-25 [&_.swiper-pagination-bullet]:transition-opacity [&_.swiper-pagination-bullet-active]:opacity-100" />
        </div>
      </motion.div>
    </section>
  );
}
