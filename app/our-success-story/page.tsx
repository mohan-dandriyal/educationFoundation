import type { Metadata } from "next";
import stories from "@/app/data/success-stories.json";
import { SuccessStoriesContent } from "@/app/components/success/SuccessStoriesContent";
import PageBanner from "../components/ui/PageBanner";

export const metadata: Metadata = {
  title: "Success Stories | Educare Foundation",
  description: stories.hero.description,
};

export default function SuccessStoriesPage() {
  return (
    <div className="bg-[#fdfbf3]">
      {/* Dedicated Page Hero Banner powered by dynamic data */}
      <PageBanner
        eyebrow={stories.hero.label}
        title={stories.hero.title}
        description={stories.hero.description}
        image={stories.hero.image}
        imageAlt={stories.hero.imageAlt}
        breadcrumb={stories.breadcrum}
        stats={stories.hero.stats}
        actions={stories.hero.actions as {
          label: string;
          href: string;
          variant?: "primary" | "secondary";
        }[]}
      />

      {/* Main Content driven 100% by success-stories.json */}
      <SuccessStoriesContent data={stories} />
    </div>
  );
}
