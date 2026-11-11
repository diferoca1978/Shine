import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const projectsHeroAnimation = () => {
  const heroTitle = document.querySelector(".hero-title");
  const heroDescription = document.querySelector(".description-text");
  const heroCta = document.querySelector("[data-hero-reveal]");

  const elements = [heroTitle, heroDescription, heroCta].filter(Boolean);

  const mm = gsap.matchMedia();

  // Store split instances for cleanup
  let splitInstances = [];

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        // No animation — just make elements visible immediately.
        // Keep the inline styles: the `invisible` class would hide them again.
        gsap.set(elements, { autoAlpha: 1 });
        return;
      }

      // Full motion: prevent FOUC then animate
      gsap.set(elements, { autoAlpha: 1 });

      if (heroTitle) {
        // Line-by-line slide in, alternating sides (line 1 from the left, line 2
        // from the right...). autoSplit re-splits on resize / font load; returning
        // the tween from onSplit keeps its progress in sync.
        const splitTitle = SplitText.create(heroTitle, {
          type: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              x: (i) => (i % 2 === 0 ? -120 : 120),
              autoAlpha: 0,
              duration: 0.8,
              ease: "power3.out",
              stagger: 0.12,
            }),
        });
        splitInstances.push(splitTitle);
      }

      if (heroDescription) {
        // Line-by-line slide in, alternating sides (restarts from the left),
        // starting after the title. autoSplit re-splits on resize / font load;
        // returning the tween from onSplit keeps its progress in sync.
        const splitDescription = SplitText.create(heroDescription, {
          type: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              x: (i) => (i % 2 === 0 ? -120 : 120),
              autoAlpha: 0,
              duration: 0.8,
              delay: 0.6,
              ease: "power3.out",
              stagger: 0.12,
            }),
        });
        splitInstances.push(splitDescription);
      }

      if (heroCta) {
        // Fade up after the description starts (reading order: title,
        // description, CTA). gsap.from renders its start state immediately, so
        // the CTA stays hidden during the delay.
        gsap.from(heroCta, {
          y: 16,
          autoAlpha: 0,
          duration: 0.6,
          delay: 0.9,
          ease: "power3.out",
        });
      }

      // Cleanup: revert all split text instances when media query no longer matches
      return () => {
        splitInstances.forEach((split) => {
          if (split && split.revert) {
            split.revert();
          }
        });
        splitInstances = [];
      };
    }
  );

  // Return cleanup function to revert matchMedia on component unmount
  return () => {
    mm.revert();
  };
};
