import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const aboutStatsAnimation = () => {
  const section = document.querySelector(".stats-section");
  const stats = document.querySelectorAll(".about-stat");
  const counters = document.querySelectorAll(".stat-count");

  if (!section || !stats.length) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      motion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reduceMotion } = context.conditions;

      if (reduceMotion) {
        // Remove CSS hidden state immediately without motion
        gsap.set(stats, { autoAlpha: 1, clearProps: "transform" });
        return;
      }

      // Set transform-only initial state (opacity/visibility come from CSS utility classes)
      gsap.set(stats, { y: 48, scale: 0.96 });

      // Cards stagger entrance
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });

      tl.to(stats, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.65,
        ease: "power3.out",
        stagger: { amount: 0.35, from: "start" },
      });

      // Count-up for each number
      counters.forEach((el) => {
        const end = parseInt(el.dataset.countTo, 10);
        if (isNaN(end)) return;

        const obj = { val: 0 };

        gsap.to(obj, {
          val: end,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
          onUpdate() {
            el.textContent = Math.round(obj.val);
          },
          onReverseComplete() {
            el.textContent = 0;
          },
        });
      });
    }
  );
};
