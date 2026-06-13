import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const aboutHeroAnimation = () => {
  const mainImage = document.querySelector("#diegorochiblack");
  const secondaryImage = document.querySelector("#diegorochi");
  const title = document.querySelector(".split-title");
  const subTitle = document.querySelector(".split-subtitle");

  if (!title && !subTitle) return;

  const elements = [title, subTitle].filter(Boolean);

  // Store split instances for cleanup
  let splitInstances = [];

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

      // FOUC prevention
      gsap.set(elements, { autoAlpha: 1 });

      if (title) {
        const splitTitle = SplitText.create(title, { type: "words, chars" });
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

      if (subTitle) {
        const splitSubTitle = SplitText.create(subTitle, { type: "words, chars" });
        splitInstances.push(splitSubTitle);

        gsap.from(splitSubTitle.chars, {
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

      // Image hover functionality with opacity
      if (mainImage && secondaryImage) {
        mainImage.addEventListener("mouseover", () => {
          gsap.to(mainImage, { opacity: 0, duration: 0.3 });
          gsap.to(secondaryImage, { opacity: 1, duration: 0.3 });
          secondaryImage.style.pointerEvents = "auto";
        });

        mainImage.addEventListener("mouseout", () => {
          gsap.to(mainImage, { opacity: 1, duration: 0.3 });
          gsap.to(secondaryImage, { opacity: 0, duration: 0.3 });
          secondaryImage.style.pointerEvents = "none";
        });

        secondaryImage.addEventListener("mouseover", () => {
          gsap.to(mainImage, { opacity: 0, duration: 0.3 });
          gsap.to(secondaryImage, { opacity: 1, duration: 0.3 });
          secondaryImage.style.pointerEvents = "auto";
        });

        secondaryImage.addEventListener("mouseout", () => {
          gsap.to(mainImage, { opacity: 1, duration: 0.3 });
          gsap.to(secondaryImage, { opacity: 0, duration: 0.3 });
          secondaryImage.style.pointerEvents = "none";
        });
      }

      return () => {
        splitInstances.forEach((split) => {
          if (split && split.revert) split.revert();
        });
        splitInstances = [];
      };
    }
  );

  return () => mm.revert();
};