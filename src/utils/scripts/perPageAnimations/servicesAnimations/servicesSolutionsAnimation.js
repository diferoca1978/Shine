import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function gsapSolutionAnimation() {
  const benefitsItems = gsap.utils.toArray("#solution-benefits .benefits-item");
  const checkmarksItems = gsap.utils.toArray("#solution-audience .checkmarks-item");
  const allElements = gsap.utils.toArray(
    "#solution-benefits h2, #solution-benefits h4, #solution-cta, #solution-audience h2, #solution-audience h4"
  ).concat(benefitsItems, checkmarksItems);

  if (!allElements.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set(allElements, { autoAlpha: 1, clearProps: "all" });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: "#solution-section",
          start: "top 80%",
          once: true,
          markers: false,
        },
      });

      tl.to("#solution-benefits h2", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      })
      .to("#solution-benefits h4", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

      benefitsItems.forEach((item) => {
        tl.to(item, {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");
      });

      tl.to("#solution-cta", {
        autoAlpha: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
      }, "-=0.2");

      tl.to("#solution-audience h2", {
        autoAlpha: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
      }, "-=1.5")
      .to("#solution-audience h4", {
        autoAlpha: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.4");

      checkmarksItems.forEach((item) => {
        tl.to(item, {
          autoAlpha: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");
      });
    }
  );

  return () => mm.revert();
}