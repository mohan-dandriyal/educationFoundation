import type { Metadata } from "next";

import stories from "@/app/data/success-stories.json";
import { SuccessStoriesContent } from "@/app/components/success/SuccessStoriesContent";

export const metadata: Metadata = {
  title: "Success Stories | D. Sullivan",
  description: stories.hero.description,
};

export default function SuccessStoriesPage() {
  return <SuccessStoriesContent />;
}
