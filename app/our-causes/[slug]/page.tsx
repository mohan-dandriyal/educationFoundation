
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Adjust this path to wherever your ourCauses JSON lives
import data from "@/app/data/cause.json";
import { Breadcrumb } from "@/app/components/Breadcrumb";

const { causes, causeDetails } = data.ourCauses;
type Cause = (typeof causes)[number];
type CauseDetail = (typeof causeDetails)[number];

const CURRENCY = "INR";
const LOCALE = "en-IN";

const money = (value: number) =>
  new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency: CURRENCY,
    maximumFractionDigits: 0,
  }).format(value);

const percent = (c: Cause) =>
  Math.min(100, Math.round((c.raised / c.goal) * 100));

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return causes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cause = causes.find((c) => c.slug === slug);
  if (!cause) return { title: "Cause not found" };

  return {
    title: `${cause.title} | ${data.ourCauses.title}`,
    description: cause.description,
    openGraph: {
      title: cause.title,
      description: cause.description,
      images: [{ url: cause.image, alt: cause.imageAlt }],
    },
  };
}

export default async function CauseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cause = causes.find((c) => c.slug === slug);
  if (!cause) notFound();

  const causeDetail: CauseDetail | undefined = causeDetails.find(
    (detail) => detail.slug === slug,
  );
  if (!causeDetail) notFound();

  const isActive = cause.status === "active";
  const others = causes
    .filter((c) => c.slug !== cause.slug && c.status === "active")
    .slice(0, 3);

  return (
    <main className="bg-[#fdfbf3] text-[#15452e]">
      <article className="mx-auto w-full max-w-7xl px-5 pb-20 pt-8 sm:px-8 lg:pb-28">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="font-[Arial,Helvetica,sans-serif] text-sm">
          <ol className="m-0 flex list-none flex-wrap items-center gap-2 p-0 text-[#15452e]/70">
            <li>
              <Link
                href="/our-causes"
                className="rounded-sm underline-offset-4 transition-colors hover:text-[#8a6b36] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
              >
                Our causes
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[#15452e]">
              {cause.title}
            </li>
          </ol>
        </nav>

        <div className="mt-10">
          {/* Main column */}
          <div>
            <div className="relative h-[clamp(300px,48vw,620px)] w-full overflow-hidden rounded-[1.5rem] bg-[#15452e]/10">
              <Image
                src={cause.image}
                alt={cause.imageAlt}
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 font-[Arial,Helvetica,sans-serif] text-sm font-semibold">
              <span className="flex items-center gap-3 text-[#8a6b36]">
                <span aria-hidden="true" className="h-[2px] w-8 bg-[#b49358]" />
                {cause.category}
              </span>
              {!isActive && (
                <span className="rounded-full border border-[#15452e]/30 px-3 py-0.5 text-xs">
                  Closed
                </span>
              )}
            </div>

            <h1 className="mb-0 mt-5 max-w-[18ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2.5rem,5.5vw,4.5rem)] font-normal leading-[1] tracking-[-0.035em]">
              {cause.title}
            </h1>

            <p className="mb-0 mt-8 max-w-[60ch] text-[clamp(1.05rem,1.2vw,1.25rem)] leading-[1.75] text-[#15452e]/85">
              {cause.description}
            </p>
          </div>

        </div>

        <section className="mt-20 border-t border-[#15452e]/15 pt-16 lg:mt-28 lg:pt-20">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)] lg:gap-20">
            <div>
              <p className="mb-0 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.16em] text-[#8a6b36]">
                {causeDetail.tagline}
              </p>
              <h2 className="mb-0 mt-5 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.03em]">
                Why this work matters
              </h2>
              <div className="mt-8 space-y-5 text-[1.08rem] leading-[1.8] text-[#15452e]/80">
                {causeDetail.overview.map((paragraph) => (
                  <p key={paragraph} className="mb-0">{paragraph}</p>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-[1.25rem] bg-[#15452e] p-7 text-[#fdfbf3] sm:p-9">
              <p className="mb-0 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.16em] text-[#e6f5ae]">
                The challenge
              </p>
              <h3 className="mb-0 mt-5 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-3xl font-normal leading-tight tracking-[-0.02em]">
                {causeDetail.challenge.title}
              </h3>
              <p className="mb-0 mt-5 leading-[1.75] text-[#fdfbf3]/75">{causeDetail.challenge.text}</p>
            </aside>
          </div>

          <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="mb-0 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.16em] text-[#8a6b36]">Our approach</p>
              <h2 className="mb-0 mt-4 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.05] tracking-[-0.03em]">
                {causeDetail.approach.title}
              </h2>
            </div>

            <ol className="m-0 list-none divide-y divide-[#15452e]/15 border-y border-[#15452e]/15 p-0">
              {causeDetail.approach.steps.map((step, index) => (
                <li key={step.title} className="grid gap-4 py-7 sm:grid-cols-[3rem_1fr] sm:gap-6">
                  <span className="font-[Arial,Helvetica,sans-serif] text-sm font-bold text-[#b49358]">0{index + 1}</span>
                  <div>
                    <h3 className="mb-0 text-xl font-semibold leading-tight">{step.title}</h3>
                    <p className="mb-0 mt-3 leading-[1.7] text-[#15452e]/75">{step.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="mb-0 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.16em] text-[#8a6b36]">The impact</p>
              <h2 className="mb-0 mt-4 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.05] tracking-[-0.03em]">What your support makes possible</h2>
              <ul className="m-0 mt-8 list-none space-y-4 p-0">
                {causeDetail.outcomes.map((outcome) => (
                  <li key={outcome} className="flex gap-4 leading-[1.6] text-[#15452e]/80">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#b49358]" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-[#15452e]/15 pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="mb-0 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.16em] text-[#8a6b36]">Who we help</p>
              <p className="mb-0 mt-5 max-w-[38ch] font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-3xl leading-tight tracking-[-0.02em]">{causeDetail.whoWeHelp}</p>
            </div>
          </div>

          <div className="mt-20 lg:mt-28">
            <div className="flex flex-wrap items-end justify-between gap-5">
              <div>
                <p className="mb-0 font-[Arial,Helvetica,sans-serif] text-sm font-bold uppercase tracking-[0.16em] text-[#8a6b36]">Ways to give</p>
                <h2 className="mb-0 mt-4 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(2rem,3.5vw,3rem)] font-normal leading-[1.05] tracking-[-0.03em]">Every gift has a purpose</h2>
              </div>
              <Link href="/donate" className="font-[Arial,Helvetica,sans-serif] text-sm font-bold underline underline-offset-4 transition-colors hover:text-[#8a6b36] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]">Donate now</Link>
            </div>

            <ul className="m-0 mt-10 grid list-none gap-5 p-0 md:grid-cols-3">
              {causeDetail.donationTiers.map((tier) => (
                <li key={tier.label} className="rounded-[1.25rem] border border-[#15452e]/15 bg-white/45 p-6">
                  <p className="mb-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-3xl text-[#15452e]">{money(tier.amount)}</p>
                  <h3 className="mb-0 mt-6 text-lg font-semibold">{tier.label}</h3>
                  <p className="mb-0 mt-3 text-sm leading-[1.65] text-[#15452e]/70">{tier.description}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Other causes */}
        {others.length > 0 && (
          <section aria-labelledby="other-causes" className="mt-24 lg:mt-32">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2
                id="other-causes"
                className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.75rem,3vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.03em]"
              >
                More causes you can support
              </h2>
              <Link
                href="/our-causes"
                className="font-[Arial,Helvetica,sans-serif] text-sm font-semibold underline underline-offset-4 transition-colors hover:text-[#8a6b36] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
              >
                View all causes
              </Link>
            </div>

            <ul className="m-0 mt-10 grid list-none gap-8 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {others.map((c) => (
                <li key={c.id}>
                  <Link
                    href={c.buttonLink}
                    className="group block focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b49358]"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm bg-[#15452e]/10">
                      <Image
                        src={c.image}
                        alt={c.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                      />
                    </div>
                    <p className="mb-0 mt-4 font-[Arial,Helvetica,sans-serif] text-sm font-semibold text-[#8a6b36]">
                      {c.category}
                    </p>
                    <h3 className="mb-0 mt-1 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-2xl font-normal leading-tight tracking-[-0.02em] group-hover:underline group-hover:underline-offset-4">
                      {c.title}
                    </h3>
                    <p className="mb-0 mt-2 font-[Arial,Helvetica,sans-serif] text-sm text-[#15452e]/75">
                      {percent(c)}% funded &middot; {c.donors} donors
                    </p>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}
