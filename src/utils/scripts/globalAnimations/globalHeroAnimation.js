import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const globalHeroAnimation = () => {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".description-text");

  const elements = [heroTitle, heroSubtitle, heroDescription].filter(Boolean);

  // Create matchMedia instance
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
        // No animation — just make elements visible immediately
        gsap.set(elements, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      // Full motion: prevent FOUC then animate
      gsap.set(elements, { autoAlpha: 1 });

      if (heroTitle) {
        const splitTitle = SplitText.create(heroTitle, { type: "words, chars" });
        splitInstances.push(splitTitle);

        gsap.from(splitTitle.chars, {
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
        const splitSubtitle = SplitText.create(heroSubtitle, { type: "words, chars" });
        splitInstances.push(splitSubtitle);

        gsap.from(splitSubtitle.chars, {
          yPercent: "random(-100, 100)",
          rotation: "random(-30, 30)",
          ease: "back.out(2)",
          autoAlpha: 0,
          delay: 0.3,
          stagger: {
            amount: 0.7,
            from: "random",
          },
        });
      }

      if (heroDescription) {
        const splitDescription = SplitText.create(heroDescription, { type: "words, chars" });
        splitInstances.push(splitDescription);

        gsap.from(splitDescription.chars, {
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