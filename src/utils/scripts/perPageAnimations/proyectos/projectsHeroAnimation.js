import { gsap } from "gsap";

export const projectsHeroAnimation = () => {
  const elements = gsap.utils.toArray("[data-hero-reveal]");
  if (!elements.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set(elements, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      gsap.set(elements, { autoAlpha: 0, y: 16 });
      gsap.to(elements, {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
  );

  return () => mm.revert();
};
