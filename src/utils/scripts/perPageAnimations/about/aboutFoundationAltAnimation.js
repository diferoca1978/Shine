import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const foundationAltAnimation = () => {
  const title = document.querySelector(".foundations-alt-section h2");
  const cards = document.querySelectorAll(".foundation-card-wrap");

  if (!title || !cards.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;

      if (reduceMotion) {
        gsap.set([title, ...cards], { autoAlpha: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".foundations-alt-section",
          start: "top 80%",
          toggleActions: "play none none none",
          markers: false
        },
      });

      // Title rises from below
      tl.fromTo(
        title,
        { autoAlpha: 0, y: 48 },
        { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" }
      );

      // Cards drop from above, staggered
      tl.fromTo(
        cards,
        { autoAlpha: 0, y: 56, rotateX: -90, z: 30 },
        {
          autoAlpha: 1,
          y: 0,
          rotateX: 0,
          z: 0,
          duration: 1.5,
          ease: "power3.out",
          stagger: 0.5,
        },
        "<1.8"
      );
    }
  );
};
