import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, SplitText);

export const solutionsAnimation = () => {
  const linePath = document.querySelector("#path");
  const arrow = document.querySelector("#arrow");
  const solutionContent = document.querySelector(".solution-content p");

  if (!linePath) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      // Define colors for both themes
      const colors = {
        light: {
          default: "oklch(96.8% 0.007 247.896)",
          divHighlight: "oklch(0.3052 0 0)",
          spanHighlight: "oklch(0.3911 0.0534 7.52)",
        },
        dark: {
          default: "oklch(0.3052 0 0)",
          divHighlight: "oklch(96.8% 0.007 247.896)",
          spanHighlight: "oklch(0.8987 0.119 87.54)",
        }
      };

      const getCurrentColors = () => {
        const isDark = document.documentElement.classList.contains("dark");
        return isDark ? colors.dark : colors.light;
      };

      let currentColors = getCurrentColors();

      if (reducedMotion) {
        gsap.set(linePath, { drawSVG: "100%", clearProps: "all" });
        if (arrow) gsap.set(arrow, { autoAlpha: 1, clearProps: "all" });

        if (solutionContent) {
          const quoteSplit = SplitText.create(".solution-content p", { type: "words", aria: false });
          gsap.set(quoteSplit.words, {
            color: currentColors.divHighlight,
            clearProps: "all",
          });
        }

        // Theme change listener (non-motion, always needed)
        window.addEventListener("themechange", () => {
          currentColors = getCurrentColors();
          if (solutionContent) {
            const quoteSplit = SplitText.create(".solution-content p", { type: "words", aria: false });
            quoteSplit.words.forEach((word) => {
              if (word.parentElement.nodeName === "P") {
                gsap.set(word, { color: currentColors.divHighlight });
              } else {
                gsap.set(word, { color: currentColors.spanHighlight });
              }
            });
          }
        });

        return () => {
          // Cleanup on media query change
        };
      }

      // Full motion animation
      gsap.set(linePath, { drawSVG: "0%" });

      const svgTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".solution-way",
          start: "center bottom",
          end: "bottom bottom",
          scrub: 2,
          markers: false,
        },
      });

      svgTimeline.to(linePath, {
        drawSVG: "100%",
      }, "<");

      if (arrow) {
        svgTimeline.to("#arrow", {
          autoAlpha: 1,
          duration: 0.1,
        }, "<");
      }

      if (arrow) {
        svgTimeline.to("#arrow", {
          motionPath: {
            path: "#path",
            align: "#path",
            alignOrigin: [0.5, 0.5],
            autoRotate: -5,
          },
        }, 0);
      }

      const quoteSplit = SplitText.create(".solution-content p", { type: "words", aria: false });

      gsap.set(quoteSplit.words, { color: currentColors.default });

      function animateWord(word) {
        if (st.direction === 1) {
          if (word.parentElement.nodeName === "P") {
            gsap.to(word, { color: currentColors.divHighlight });
          } else {
            gsap.to(word, { color: currentColors.spanHighlight });
          }
        } else {
          gsap.to(word, { color: currentColors.default });
        }
      }

      const tl = gsap.timeline();

      quoteSplit.words.forEach((word, index) => {
        tl.call(animateWord, [word], (index * 1) + 0.01);
      });

      tl.set({}, {}, "+=0.05");

      function applyWordColors(progress, animate = false) {
        const maxTime = tl.duration();
        quoteSplit.words.forEach((word, index) => {
          const wordTime = (index * 1) + 0.01;
          const wordProgress = maxTime > 0 ? wordTime / maxTime : 0;
          const isRevealed = progress >= wordProgress;
          const isSpan = word.parentElement.nodeName !== "P";
          const targetColor = isSpan
            ? (isRevealed ? currentColors.spanHighlight : currentColors.default)
            : (isRevealed ? currentColors.divHighlight : currentColors.default);
          if (animate) {
            gsap.to(word, { color: targetColor, duration: 0.2, overwrite: "auto" });
          } else {
            gsap.set(word, { color: targetColor });
          }
        });
      }

      const st = ScrollTrigger.create({
        trigger: ".solution-content",
        start: "top 70%",
        end: "bottom 80%",
        scrub: true,
        animation: tl,
        onRefresh: () => {
          applyWordColors(st.progress);
        },
      });

      ScrollTrigger.refresh();

      window.addEventListener("themechange", () => {
        currentColors = getCurrentColors();
        applyWordColors(st.progress, true);
      });
    }
  );

  return () => mm.revert();
};