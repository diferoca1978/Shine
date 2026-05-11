import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function hurtsAnimation() {
  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      // Always reveal items — they start with autoAlpha: 0 in HTML
      gsap.set([".hurts-item", ".text-split"], { autoAlpha: 1 });

      if (reducedMotion) return;

      const hurtsItems = document.querySelectorAll(".hurts-item");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".client-hurts-section",
          start: "top 50%",
          end: "bottom 50%",
          once: true,
          markers: false,
        },
      });

      hurtsItems.forEach((item) => {
        tl.from(item, {
          autoAlpha: 0,
          y: 100,
          duration: 0.7,
          ease: "power3.out",
        });
      });
    },
  );
}
