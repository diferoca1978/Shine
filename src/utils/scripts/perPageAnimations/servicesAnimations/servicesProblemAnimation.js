import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function gsapProblemAnimation() {
  const listItems = gsap.utils.toArray("#problem-hurts ul li");
  const allElements = gsap.utils.toArray(
    ".problem-heading, #problem-image, #problem-hurts h4"
  ).concat(listItems);

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
          trigger: "#problem-section",
          start: "top 80%",
          once: true,
          markers: false,
        },
      });

      tl.to(".problem-heading", {
        autoAlpha: 1,
        yPercent: -20,
        duration: 0.5,
        ease: "power2.out",
      });

      tl.to("#problem-image", {
        autoAlpha: 1,
        yPercent: 5,
        duration: 0.5,
        ease: "back",
      }, "+=0.2");

      tl.to("#problem-hurts h4", {
        autoAlpha: 1,
        duration: 0.4,
        ease: "power2.out",
      }, ">+=0.1");

      listItems.forEach((li) => {
        tl.to(li, {
          autoAlpha: 1,
          duration: 0.3,
          stagger: 0.05,
          ease: "power2.out",
        });
      });
    }
  );

  return () => mm.revert();
}