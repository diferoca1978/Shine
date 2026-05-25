import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function backgroundAnimation() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set("body", {
          backgroundColor: "oklch(0.98 0.0157 106.42)",
          clearProps: "all",
        });
        return;
      }

      gsap.to("body", {
        scrollTrigger: {
          trigger: ".hero-services",
          start: "bottom bottom",
          end: "bottom 70%",
          scrub: 0.5,
          markers: false,
          immediateRender: false,
        },
        ease: "none",
        backgroundColor: "oklch(0.98 0.0157 106.42)",
      });
    }
  );

  return () => mm.revert();
}