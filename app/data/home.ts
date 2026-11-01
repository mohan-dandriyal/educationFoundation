export type HeroStat = {
  value: string;
  label: string;
};

export type HeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
  ctaHref: string;
  secondaryCta?: string;
  secondaryCtaHref?: string;
  stats?: HeroStat[];
  leftImage: { src: string; alt: string };
  rightImage: { src: string; alt: string };
};

export type HeaderContent = {
  logo: string;
  logoHref: string;
  links: Array<{ label: string; href: string }>;
  cta: { label: string; href: string };
};
