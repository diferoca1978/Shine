import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const contactHeroAnimation = () => {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".description-text");

  const elements = [heroTitle, heroSubtitle, heroDescription].filter(Boolean);

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
        // No clearProps: the `invisible` class would hide them again.
        gsap.set(elements, { autoAlpha: 1 });
        return;
      }

      // Full motion: prevent FOUC then animate
      gsap.set(elements, { autoAlpha: 1 });

      if (heroTitle) {
        const splitTitle = SplitText.create(heroTitle, { type: "words" });
        splitInstances.push(splitTitle);

        gsap.from(splitTitle.words, {
          yPercent: "random(-100, 100)",
          rotation: "random(-30, 30)",
          ease: "back.out(2)",
          autoAlpha: 0,
          stagger: {
            amount: 0.7,
            from: "random",
          },
        });
      }

      if (heroSubtitle) {
        // Line-by-line fade up from the bottom. autoSplit re-splits on resize /
        // font load; returning the tween from onSplit keeps its progress in sync.
        const splitSubtitle = SplitText.create(heroSubtitle, {
          type: "lines",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              y: 40,
              autoAlpha: 0,
              duration: 0.8,
              delay: 0.3,
              stagger: 0.15,
              ease: "power3.out",
            }),
        });
        splitInstances.push(splitSubtitle);
      }

      if (heroDescription) {
        const splitDescription = SplitText.create(heroDescription, { type: "words" });
        splitInstances.push(splitDescription);

        gsap.from(splitDescription.words, {
          yPercent: "random(-100, 100)",
          rotation: "random(-30, 30)",
          ease: "back.out(2)",
          autoAlpha: 0,
          delay: 0.6,
          stagger: {
            amount: 0.7,
            from: "random",
          },
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
