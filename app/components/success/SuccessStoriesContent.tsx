import Image from "next/image";
import Link from "next/link";

import stories from "@/app/data/success-stories.json";
import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton";
import {
  SectionInnerTitle,
  SectionLabel,
  SectionTitle,
} from "@/app/components/ui/SectionTitle";

export function SuccessStoriesContent() {
  return (
    <main className="bg-[#f4f4f4] text-[#252d4a]">
      <section className="px-6 py-16 md:px-[6%] md:py-24">
        <MainContainer>
          <div className="grid items-center gap-12 md:grid-cols-[1.05fr_0.95fr] md:gap-20">
            <div>
              <div className="mb-5">
                <SectionLabel>{stories.hero.label}</SectionLabel>
              </div>

              <SectionTitle>
                <span className="text-[#252d4a]">
                  {stories.hero.title}
                </span>
              </SectionTitle>
              <p className="mt-8 max-w-[48ch] text-[clamp(1rem,1.2vw,1.2rem)] leading-8 text-[#252d4a]/85">
                {stories.hero.description}
              </p>
            </div>
            <div className="relative aspect-4/3 overflow-hidden">
              <Image
                src={stories.hero.image}
                alt={stories.hero.imageAlt}
                fill
                priority
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </MainContainer>
      </section>

      <section className="px-6 py-16 text-[#252d4a] md:px-[6%] md:py-24">
        <MainContainer>
          <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src={stories.featured.image}
                alt={stories.featured.imageAlt}
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover"
              />
            </div>
            <div>
              <SectionLabel>{stories.featured.label}</SectionLabel>
              <SectionInnerTitle>
                <span className="text-[#252d4a]">{stories.featured.title}</span>
              </SectionInnerTitle>
              <blockquote className="mt-8 border-l-2 border-[#4a5d2e] pl-5 text-xl italic leading-8 text-[#4a5d2e]">
                “{stories.featured.quote}”
              </blockquote>
              <p className="mt-6 max-w-[52ch] leading-8 text-[#252d4a]/75">
                {stories.featured.description}
              </p>
              <p className="mt-6 text-sm uppercase tracking-[0.16em] text-[#252d4a]/60">
                {stories.featured.person}
              </p>
            </div>
          </div>
        </MainContainer>
      </section>

      <section className="px-6 py-16 md:px-[6%] md:py-24">
        <MainContainer>
          <SectionLabel>More stories</SectionLabel>
          <SectionInnerTitle>Change grows one story at a time.</SectionInnerTitle>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {stories.stories.map((story) => (
              <article key={story.title} className="group bg-[#fffaf0]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <p className="m-0 text-xs font-medium uppercase tracking-[0.16em] text-[#4a5d2e]">
                    {story.tag}
                  </p>
                  <h3 className="mt-4 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-2xl font-normal leading-tight text-[#4a5d2e]">
                    {story.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#252d4a]/75">
                    {story.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </MainContainer>
      </section>

      <section className="bg-[#fffaf0] px-6 py-16 md:px-[6%] md:py-24">
        <MainContainer>
          <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
            <div>
              <SectionLabel>Our impact</SectionLabel>
              <SectionInnerTitle>Help create the next success story.</SectionInnerTitle>
            </div>
            <PrimaryButton href="/contact">Get involved</PrimaryButton>
          </div>
          <div className="mt-12 grid grid-cols-3 gap-4 border-y border-[#252d4a]/20 py-6 sm:gap-8">
            {stories.impact.map((item) => (
              <div key={item.label}>
                <p className="m-0 text-[clamp(1.75rem,4vw,3.5rem)] font-medium text-[#252d4a]">
                  {item.value}
                </p>
                <p className="m-0 mt-2 max-w-[14ch] text-xs uppercase leading-5 tracking-[0.12em] text-[#252d4a]/65">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/our-program"
            className="mt-8 inline-block text-sm font-medium text-[#252d4a] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
          >
            Explore our programs →
          </Link>
        </MainContainer>
      </section>
    </main>
  );
}
