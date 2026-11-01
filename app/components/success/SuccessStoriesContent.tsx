import Image from "next/image";
import Link from "next/link";

import MainContainer from "@/app/components/ui/MainContainer";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton";
import {
  SectionInnerTitle,
  SectionLabel,
} from "@/app/components/ui/SectionTitle";

export type SuccessStoriesData = {
  featured: {
    label: string;
    title: string;
    person: string;
    quote: string;
    description: string;
    image: string;
    imageAlt: string;
  };
  storiesSection?: {
    label: string;
    title: string;
  };
  stories: Array<{
    title: string;
    person: string;
    description: string;
    tag: string;
    image: string;
    imageAlt: string;
  }>;
  impact: Array<{
    value: string;
    label: string;
  }>;
  ctaSection?: {
    label: string;
    heading: string;
    primaryButton: string;
    primaryHref: string;
    secondaryButton: string;
    secondaryHref: string;
  };
};

export function SuccessStoriesContent({ data }: { data: SuccessStoriesData }) {
  const { featured, storiesSection, stories, impact, ctaSection } = data;

  return (
    <main className="bg-[#fdfbf3] text-[#15452e]">
      {/* Featured Story Spotlight */}
      {featured && (
        <section className="px-6 py-18 md:px-[6%]">
          <MainContainer>
            <div className="grid items-center gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl shadow-lg ring-1 ring-[#15452e]/10">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  sizes="(min-width: 768px) 35vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div>
                <SectionLabel>{featured.label}</SectionLabel>
                <div className="mt-2">
                  <SectionInnerTitle>
                    <span className="text-[#15452e]">{featured.title}</span>
                  </SectionInnerTitle>
                </div>
                <blockquote className="mt-8 border-l-2 border-[#b49358] pl-5 text-xl italic leading-8 text-[#15452e]/90">
                  “{featured.quote}”
                </blockquote>
                <p className="mt-6 max-w-[52ch] leading-8 text-[#15452e]/80">
                  {featured.description}
                </p>
                <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#8a6b36]">
                  {featured.person}
                </p>
              </div>
            </div>
          </MainContainer>
        </section>
      )}

      {/* Grid of Student Stories */}
      {stories && stories.length > 0 && (
        <section className="border-t border-[#15452e]/15 bg-[#f4f7f2] px-6 py-18 md:px-[6%]">
          <MainContainer>
            <div className="text-center max-w-2xl mx-auto lg:pb-14 pb-8">
              <div className="text-center flex justify-center">
                <SectionLabel>{storiesSection?.label || "Community Voices"}</SectionLabel>
              </div>
              <div className="mt-2">
                <SectionInnerTitle>
                  {storiesSection?.title || "Change Grows One Story At A Time"}
                </SectionInnerTitle>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              {stories.map((story) => (
                <article
                  key={story.title}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-[#fdfbf3] shadow-sm ring-1 ring-[#15452e]/10 transition-shadow duration-300 hover:shadow-md"
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={story.image}
                      alt={story.imageAlt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8a6b36]">
                        {story.tag}
                      </span>
                      <span className="text-xs font-medium text-[#15452e]/60">
                        {story.person}
                      </span>
                    </div>
                    <h3 className="mt-4 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-2xl font-normal leading-tight text-[#15452e]">
                      {story.title}
                    </h3>
                    <p className="mt-4 flex-1 text-sm leading-7 text-[#15452e]/80">
                      {story.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </MainContainer>
        </section>
      )}

      {/* Impact Numbers & CTA */}
      {impact && impact.length > 0 && (
        <section className="bg-[#fdfbf3] px-6 py-16 md:px-[6%]">
          <MainContainer>
            <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
              <div>
                <SectionLabel>{ctaSection?.label || "Our impact"}</SectionLabel>
                <div className="mt-2">
                  <SectionInnerTitle>
                    {ctaSection?.heading || "Help Create The Next Success Story"}
                  </SectionInnerTitle>
                </div>
              </div>
              <PrimaryButton href={ctaSection?.primaryHref || "/contact-us"}>
                {ctaSection?.primaryButton || "Get involved"}
              </PrimaryButton>
            </div>
            <div className="mt-12 grid grid-cols-3 gap-4 border-y border-[#15452e]/20 py-8 sm:gap-8">
              {impact.map((item) => (
                <div key={item.label}>
                  <p className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,4.5vw,3.75rem)] font-bold text-[#15452e]">
                    {item.value}
                  </p>
                  <p className="m-0 mt-2 max-w-[16ch] text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-[#15452e]/70">
                    {item.label}
                  </p>
                </div>
              ))}
            </div>
            {ctaSection?.secondaryHref && (
              <Link
                href={ctaSection.secondaryHref}
                className="mt-8 inline-block text-sm font-semibold text-[#8a6b36] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#8a6b36]"
              >
                {ctaSection.secondaryButton || "Explore our programs →"}
              </Link>
            )}
          </MainContainer>
        </section>
      )}
    </main>
  );
}
