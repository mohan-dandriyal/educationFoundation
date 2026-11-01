"use client";

import dynamic from "next/dynamic";

const TestimonialSection = dynamic(
  () =>
    import("./TestimonialSection").then(
      ({ TestimonialSection: Component }) => Component,
    ),
  {
    ssr: false,
    loading: () => (
      <section
        aria-hidden="true"
        className="min-h-[420px] px-6 py-16 md:px-[6%] md:py-18"
      />
    ),
  },
);

export { TestimonialSection };
