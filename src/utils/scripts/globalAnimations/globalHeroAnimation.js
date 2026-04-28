import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const globalHeroAnimation = () => {
  const heroTitle = document.querySelector(".hero-title");
  const heroSubtitle = document.querySelector(".hero-subtitle");
  const heroDescription = document.querySelector(".description-text");

  gsap.set([heroTitle, heroSubtitle, heroDescription], { autoAlpha: 1 });

  const tl = gsap.timeline({
    defaults: { duration: 1, ease: "power3.out" },
  });

  // Each onSplit fires synchronously, so tweens are added to tl in order.
  // "-=0.7" overlaps the next animation with the previous one for a fluid feel.
  SplitText.create(heroTitle, {
    type: "chars",
    autoSplit: true,
    onSplit(self) {
      tl.from(self.chars, { opacity: 0, yPercent: 100, stagger: 0.05 });
    },
  });

  SplitText.create(heroSubtitle, {
    type: "chars",
    autoSplit: true,
    onSplit(self) {
      tl.from(
        self.chars,
        { opacity: 0, yPercent: 100, stagger: 0.04 },
        "-=0.7",
      );
    },
  });

  SplitText.create(heroDescription, {
    type: "words,chars",
    autoSplit: true,
    wordsClass: "inline-block overflow-hidden",
    onSplit(self) {
      tl.from(
        self.words,
        { opacity: 0, yPercent: 100, stagger: 0.02 },
        "-=1.2",
      );
    },
  });
};
