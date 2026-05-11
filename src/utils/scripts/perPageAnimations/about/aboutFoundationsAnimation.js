import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const foundationsRotatorAnimation = () => {
  const title = document.querySelector("#foundations h2");
  const container = document.querySelector("#foundations .text-rotator");

  if (!container || !title) return;

  // Kill any ScrollTriggers and tweens from a previous Astro re-mount
  ScrollTrigger.getAll()
    .filter((st) => st.trigger?.closest?.("#foundations"))
    .forEach((st) => st.kill());
  gsap.killTweensOf([title, container]);

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        // CSS already shows only the first principle statically — just reveal the title
        gsap.set(title, { opacity: 1, y: 0 });
        container.classList.add("loaded");
        return;
      }

      // --- Full motion path ---

      // Title entrance tied to scroll
      const titleTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: "#foundations",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      titleTimeline.fromTo(
        title,
        { opacity: 0, y: -50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      );

      const words = Array.from(container.querySelectorAll(":scope > span"));

      if (words.length < 2) {
        container.classList.add("loaded");
        gsap.set(words, { autoAlpha: 1, yPercent: 0 });
        return;
      }

      // Clone the first item so the loop ends seamlessly back at the start
      const firstClone = words[0].cloneNode(true);
      container.appendChild(firstClone);

      // Hand visibility control to GSAP
      container.classList.add("loaded");

      const items = Array.from(container.querySelectorAll(":scope > span"));

      // Stack all items below and invisible; show only the first
      gsap.set(items, { position: "absolute", autoAlpha: 0, yPercent: 100 });
      gsap.set(items[0], { autoAlpha: 1, yPercent: 0 });

      // Infinite rotator: each item enters from below, holds, then exits upward
      const rotatorTimeline = gsap.timeline({
        repeat: -1,
        defaults: { duration: 1, ease: "power2.out" },
      });

      for (let i = 0; i < items.length - 1; i++) {
        const current = items[i];
        const next = items[i + 1];

        // Hold the current item for 1.5s before transitioning
        rotatorTimeline.to({}, { duration: 1.5 });

        // Next enters from below while current exits upward simultaneously
        rotatorTimeline.fromTo(
          next,
          { yPercent: 100, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1 },
        );
        rotatorTimeline.to(current, { yPercent: -100, autoAlpha: 0 }, "<0.0");
      }
    },
  );
};
