
"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { SectionInnerTitle, SectionLabel } from "../ui/SectionTitle";
import MainContainer from "../ui/MainContainer";

type TeamMember = {
  name: string;
  role: string;
  image: { src: string; alt: string };
};

type OurTeamSectionProps = {
  eyebrow?: string;
  heading?: string;
  intro?: string;
  members?: TeamMember[];
};

const EASE = [0.2, 0.7, 0.2, 1] as const;

// Placeholder people and photos: replace with your real team
const DEFAULT_MEMBERS: TeamMember[] = [
  {
    name: "Priya Nair",
    role: "Founder and Director",
    image: { src: "/pro-1.jpg", alt: "Portrait of Priya Nair" },
  },
  {
    name: "Samuel Mensah",
    role: "Head of Programs",
    image: { src: "/pro-2.jpg", alt: "Portrait of Samuel Mensah" },
  },
  {
    name: "Elena Duarte",
    role: "Teacher Training Lead",
    image: { src: "/pro-3.jpg", alt: "Portrait of Elena Duarte" },
  },
  {
    name: "Amir Hassan",
    role: "Community Partnerships",
    image: { src: "/pro-1.jpg", alt: "Portrait of Amir Hassan" },
  },
];

// Header and members appear one after another when scrolled into view
const headerVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const gridVariants: Variants = {
  hidden: {},
  show: { transition: { delayChildren: 0.1, staggerChildren: 0.14 } },
};
const riseVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

// Portrait: unveils from the bottom while the photo zoom settles
const frameVariants: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    transition: { duration: 1.1, ease: EASE },
  },
};
const photoVariants: Variants = {
  hidden: { scale: 1.25 },
  show: { scale: 1, transition: { duration: 1.5, ease: EASE } },
};

export function OurTeamSection({
  eyebrow,
  heading,
  intro,  members,
}: OurTeamSectionProps) {
  const reduceMotion = useReducedMotion();
  const initial = reduceMotion ? false : "hidden";

  return (
    <section
      aria-labelledby="team-title"
      className="bg-[#fdfbf3] px-6  text-[#15452e] md:px-[6%] "
    >
      <MainContainer>
        {/* Header */}
        <motion.div
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={headerVariants}
          className="mx-auto flex max-w-[58rem] flex-col items-center gap-7 text-center md:gap-8"
        >
          <div className="flex flex-col items-center">
            <SectionLabel>{eyebrow}</SectionLabel>
            <SectionInnerTitle>{heading}</SectionInnerTitle>
          </div>

          <motion.p
            variants={riseVariants}
            className="m-0 max-w-[50ch] text-[clamp(1rem,1.1vw,1.2rem)] leading-[1.7] text-[#4a5d2e]"
          >
            {intro}
          </motion.p>
        </motion.div>

        {/* Members: every second person sits lower, so the row reads as a staggered line */}
        <motion.ul
          initial={initial}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={gridVariants}
          className="m-0 mt-14 grid list-none grid-cols-2 gap-x-6 gap-y-12 p-0 md:mt-20 md:grid-cols-4 md:gap-x-8"
        >
          {members && members.map((member) => (
            <motion.li
              key={member.name}
              variants={riseVariants}
              className="group even:mt-10 md:even:mt-14"
            >
              <figure className="m-0">
                <motion.div
                  variants={frameVariants}
                  className="relative aspect-[3/4] w-full overflow-hidden border border-[#252d4a]"
                >
                  <motion.div variants={photoVariants} className="absolute inset-0">
                    <Image
                      src={member.image.src}
                      alt={member.image.alt}
                      fill
                      sizes="(min-width: 768px) 22vw, 45vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none"
                    />
                  </motion.div>
                </motion.div>

                <figcaption className="mt-5">
                  <p className="m-0 font-[Iowan_Old_Style,Baskerville,Times_New_Roman,serif] text-[clamp(1.2rem,1.6vw,1.5rem)] leading-[1.2]">
                    {member.name}
                  </p>
                  <p className="m-0 mt-1 text-sm leading-6 text-[#4a5d2e]">
                    {member.role}
                  </p>
                </figcaption>
              </figure>
            </motion.li>
          ))}
        </motion.ul>
      </MainContainer>
    </section>
  );
}
