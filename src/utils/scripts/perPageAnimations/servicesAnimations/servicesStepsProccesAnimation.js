import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, ScrollTrigger);

export const gsapProcessStepsAnimation = () => {
  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;
      const isDesktop = window.innerWidth >= 1024;

      if (reducedMotion) {
        if (isDesktop) {
          const numbers = gsap.utils.toArray(".numbers");
          const stages = gsap.utils.toArray(".stage");
          gsap.set("#path-highlight", { drawSVG: "0% 25%" });
          gsap.set(".process-heading", { autoAlpha: 1, clearProps: "all" });
          gsap.set("#path-full, #path-highlight", { autoAlpha: 1 });
          gsap.set(numbers, { autoAlpha: 1, clearProps: "all" });
          gsap.set(stages, { autoAlpha: 1, clearProps: "all" });
          gsap.set(".stage p", { autoAlpha: 1 });
        } else {
          gsap.set(".process-heading", { autoAlpha: 1, clearProps: "all" });
          const mobileStages = gsap.utils.toArray(".mobile-stage");
          mobileStages.forEach((stage, i) => {
            gsap.set(stage, {
              autoAlpha: i === 0 ? 1 : 0,
              x: 0,
              clearProps: i === 0 ? "x" : "all",
            });
          });
          const prevBtn = document.getElementById("prev-step");
          const nextBtn = document.getElementById("next-step");
          if (prevBtn) prevBtn.disabled = true;
          if (nextBtn) nextBtn.disabled = false;
        }
        return;
      }

      // ========================================
      // DESKTOP ANIMATIONS (1024px+)
      // ========================================
      if (isDesktop) {
        gsap.set("#path-highlight", { drawSVG: "0% 25%" });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: "#process",
            start: "top 80%",
            once: true,
            markers: false,
          },
        });

        tl.to(".process-heading", { autoAlpha: 1, yPercent: -20 });

        tl.to("#path-full, #path-highlight", {
          attr: { d: "M 100 100 L 1100 100" },
          duration: 2,
          ease: "power2.inOut",
        });

        tl.to("#path-highlight", { drawSVG: "50% 100%", duration: 1.5 }, "+=0.5");
        tl.to("#path-highlight", { drawSVG: "0% 20%", duration: 1.5 }, "+=0.5");

        const positions = ["0% 24%", "26% 48%", "52% 70%", "75% 100%"];
        const numbers = gsap.utils.toArray(".numbers");

        numbers.forEach((number, i) => {
          number.addEventListener("mouseenter", () => {
            gsap.to("#path-highlight", { drawSVG: positions[i], duration: 1, ease: "power2.out" });
            gsap.to(number, { autoAlpha: 0, duration: 0.3 });
          });
        });

        gsap.set(".stage p", { autoAlpha: 1 });

        const stages = gsap.utils.toArray(".stage");

        stages.forEach((stage, i) => {
          const stageTl = gsap.timeline({ defaults: { ease: "power2.inOut" }, paused: true });

          stageTl
            .to(stage.querySelector(".headings"), { yPercent: -50 })
            .from(stage.querySelector("p"), { y: 10, autoAlpha: 0 }, 0);

          stage.addEventListener("mouseenter", () => {
            stageTl.play();
            gsap.to("#path-highlight", { drawSVG: positions[i], duration: 1, ease: "power2.out" });
            gsap.to(numbers[i], { autoAlpha: 1, duration: 0.3 });
          });

          stage.addEventListener("mouseleave", () => {
            stageTl.reverse();
            gsap.to(numbers[i], { autoAlpha: 0, duration: 0.3 });
          });
        });
      }

      // ========================================
      // MOBILE/TABLET CAROUSEL (< 1024px)
      // ========================================
      if (!isDesktop) {
        let currentStep = 0;
        const mobileStages = gsap.utils.toArray(".mobile-stage");
        const prevBtn = document.getElementById("prev-step");
        const nextBtn = document.getElementById("next-step");
        const totalSteps = mobileStages.length;

        gsap.timeline({
          scrollTrigger: {
            trigger: "#process",
            start: "top 80%",
            once: true,
            markers: false,
          },
        }).to(".process-heading", { autoAlpha: 1, duration: 0.8 });

        function showStep(index, direction = 1) {
          currentStep = index;

          mobileStages.forEach((stage, i) => {
            if (i === index) {
              gsap.to(stage, {
                autoAlpha: 1,
                x: 0,
                duration: 0.5,
                ease: "power2.out",
                pointerEvents: "auto",
              });
            } else {
              gsap.to(stage, {
                autoAlpha: 0,
                x: direction * -20,
                duration: 0.5,
                ease: "power2.out",
                pointerEvents: "none",
              });
            }
          });

          if (prevBtn) prevBtn.disabled = index === 0;
          if (nextBtn) nextBtn.disabled = index === totalSteps - 1;
        }

        showStep(0);

        if (nextBtn) {
          nextBtn.addEventListener("click", () => {
            if (currentStep < totalSteps - 1) showStep(currentStep + 1, 1);
          });
        }

        if (prevBtn) {
          prevBtn.addEventListener("click", () => {
            if (currentStep > 0) showStep(currentStep - 1, -1);
          });
        }

        const container = document.querySelector(".mobile-stages-container");
        if (container) {
          let touchStartX = 0;
          let touchEndX = 0;

          container.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
          });

          container.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const diff = touchStartX - touchEndX;
            const swipeThreshold = 50;

            if (Math.abs(diff) > swipeThreshold) {
              if (diff > 0 && currentStep < totalSteps - 1) {
                showStep(currentStep + 1, 1);
              } else if (diff < 0 && currentStep > 0) {
                showStep(currentStep - 1, -1);
              }
            }
          });
        }
      }
    }
  );

  return () => mm.revert();
};