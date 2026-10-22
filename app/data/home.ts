export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  leftImage: { src: string; alt: string };
  rightImage: { src: string; alt: string };
};

export type HeaderContent = {
  logo: string;
  logoHref: string;
  links: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
};



export const homeHero: HeroContent = {
  eyebrow: "D. Sullivan / AgriTech",
  title: "Leading the Change",
  description:
    "We develop cutting-edge agritech solutions that enhance sustainability and improve crop yield. Join us in our mission to revolutionize the future of agriculture.",
  cta: "Explore More",
  ctaHref: "#discover",
  leftImage: {
    src: "/hero-left.png",
    alt: "Researcher inspecting healthy crops in a green field",
  },
  rightImage: {
    src: "/hero-right.png",
    alt: "Drone flying above a sunlit agricultural field",
  },
};
