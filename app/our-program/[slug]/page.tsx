import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import details from "@/app/data/program-details.json";
import { PrimaryButton } from "@/app/components/ui/PrimaryButton";
import {
  SectionInnerTitle,
  SectionLabel,
  SectionTitle,
} from "@/app/components/ui/SectionTitle";

type ProgramDetail = (typeof details.programs)[number];
type PageProps = { params: Promise<{ slug: string }> };

const getProgram = (slug: string) =>
  details.programs.find((program) => program.slug === slug);

export function generateStaticParams() {
  return details.programs.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const program = getProgram(slug);

  return program
    ? {
        title: `${program.title} | D. Sullivan`,
        description: program.intro,
      }
    : {};
}

export default function ProgramDetailsPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <main className="min-h-[60vh] bg-[#fdfbf3] px-6 py-24 md:px-[6%]" />
      }
    >
      {params.then(({ slug }) => <ProgramDetailsContent slug={slug} />)}
    </Suspense>
  );
}

function ProgramDetailsContent({ slug }: { slug: string }) {
  const program = getProgram(slug) as ProgramDetail | undefined;

  if (!program) notFound();

  return (
    <main className="bg-[#f4f4f4] text-[#252d4a]">
      <section className="px-6 py-16 md:px-[6%] md:py-24">
        <div className="mx-auto grid max-w-[1200px] items-center gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={program.image}
              alt={program.imageAlt}
              fill
              priority
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>

          <div>
            <Link
              href="/our-program"
              className="text-xs font-medium uppercase tracking-[0.2em] text-[#4a5d2e] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#252d4a]"
            >
              ← All programs
            </Link>

            <div className="mb-3 mt-10">
              <SectionLabel>{program.category}</SectionLabel>
            </div>

            <SectionTitle>
              <span className="text-[#252d4a]">{program.title}</span>
            </SectionTitle>

            <p className="mt-8 max-w-[52ch] text-[clamp(1rem,1.2vw,1.2rem)] leading-8">
              {program.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#fffaf0] px-6 py-16 md:px-[6%] md:py-24">
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-2 md:gap-20">
          <div>
            <SectionLabel>Why it matters</SectionLabel>
            <SectionInnerTitle>Learning creates possibility.</SectionInnerTitle>
          </div>
          <div>
            <p className="m-0 text-lg leading-8 text-[#252d4a]/90">
              {program.story}
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {program.features.map((feature) => (
                <div
                  key={feature}
                  className="border-t border-[#252d4a]/25 pt-4 text-sm text-[#252d4a]"
                >
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-[6%] md:py-24">
        <div className="mx-auto max-w-[1200px]">
          <SectionLabel>What changes</SectionLabel>
          <SectionInnerTitle>A stronger start for every child.</SectionInnerTitle>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {program.outcomes.map((outcome, index) => (
              <div key={outcome} className="border-t border-[#252d4a]/25 pt-5">
                <span className="text-sm text-[#252d4a]">0{index + 1}</span>
                <p className="mt-8 max-w-[18ch] text-lg leading-7">{outcome}</p>
              </div>
            ))}
          </div>

          <PrimaryButton href="/contact">Support this program</PrimaryButton>
        </div>
      </section>
    </main>
  );
}
