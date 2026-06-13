import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export const whoAreAnimation = () => {
  const isMobile = window.innerWidth <= 768;
  const linePath = document.querySelector("#pathBio");
  const sectionTitle = document.querySelector(".bio-title");
  const descriptions = gsap.utils.toArray(".bio-desc");
  const names = gsap.utils.toArray(".bio-name");
  const firstDesc = descriptions[0];

  if (!sectionTitle) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set([sectionTitle, firstDesc, linePath].filter(Boolean), {
          autoAlpha: 1,
          clearProps: "all",
        });
        if (linePath) gsap.set(linePath, { drawSVG: "100%" });
        return;
      }

      gsap.set(sectionTitle, { opacity: 0, yPercent: -100 });

      // SVG animations only on desktop
      if (!isMobile) {
        if (linePath) gsap.set(linePath, { drawSVG: "0%" });
        if (firstDesc) gsap.set(firstDesc, { autoAlpha: 0 });

        const svgTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: ".bio-container",
            start: "top 70%",
            bottom: "bottom 30%",
            toggleActions: "restart none none reset",
            markers: false,
          },
        });
        svgTimeline.to(sectionTitle, {
          opacity: 1,
          yPercent: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        if (linePath) {
          svgTimeline.to(linePath, {
            drawSVG: "100%",
            duration: 1.5,
            ease: "power1.inOut",
          }, "+=0.4");
        }

        if (firstDesc) {
          svgTimeline.to(firstDesc, {
            autoAlpha: 1,
            duration: 1,
            ease: "power2.out",
          }, "-=0.3");
        }
      } else {
        gsap.to(sectionTitle, {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".bio-container",
            start: "top 80%",
            markers: false,
          },
        });
      }

      // Hover/tap interaction (not motion-related)
      if (descriptions.length && names.length) {
        let activeIndex = 0;

        const setActive = (index) => {
          if (index === activeIndex || !descriptions[index]) return;
          gsap.to(descriptions[activeIndex], { autoAlpha: 0, duration: 0.4, ease: "power2.inOut" });
          gsap.to(descriptions[index], { autoAlpha: 1, duration: 0.4, ease: "power2.inOut" });
          names[activeIndex]?.classList.remove("is-active");
          names[index]?.classList.add("is-active");
          activeIndex = index;
        };

        names.forEach((name, index) => {
          name.addEventListener("mouseenter", () => setActive(index));
          name.addEventListener("click", () => setActive(index));
          name.addEventListener("focus", () => setActive(index));
        });
      }
    }
  );

  return () => mm.revert();
};