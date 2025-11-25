import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin, DrawSVGPlugin, SplitText);

export const solutionsAnimation = () => {
  // Define colors for both themes
  const colors = {
    light: {
      default: "oklch(96.8% 0.007 247.896)",      // softWhite
      divHighlight: "oklch(0.3052 0 0)",          // smokyBlack
      spanHighlight: "oklch(0.3911 0.0534 7.52)", // deepplum
    },
    dark: {
      default: "oklch(0.3052 0 0)",                // smokyBlack
      divHighlight: "oklch(96.8% 0.007 247.896)",  // softWhite
      spanHighlight: "oklch(0.8987 0.119 87.54)",    // accentGold
    }
  };

  // Function to get current theme colors
  const getCurrentColors = () => {
    const isDark = document.documentElement.classList.contains('dark');
    return isDark ? colors.dark : colors.light;
  };

  let currentColors = getCurrentColors();

  // Initial setup to svg animation
  const linePath = document.querySelector("#path");

  gsap.set(linePath, { drawSVG: "0%" });


  const svgTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".solution-way",
      start: "center bottom",
      end: "bottom bottom",
      scrub: 2,
      markers: false,
    },
  })

  svgTimeline.to(linePath, {
    drawSVG: "100%",
  }, "<");

  svgTimeline.to("#arrow", {
    opacity: 1,
    duration: 0.1,
  }, "<");

  svgTimeline.to("#arrow", {
    motionPath: {
      path: "#path",
      align: "#path",
      alignOrigin: [0.5, 0.5],
      autoRotate: -5,
    },
  }, 0);
  // End svg animation

  // Content animation setup with theme-aware colors
  const quoteSplit = SplitText.create(".solution-content p", { type: "words" });

  // IMMEDIATELY set initial state to prevent flicker with theme-appropriate color
  gsap.set(quoteSplit.words, { color: currentColors.default });

  // Quote animation function - defined BEFORE timeline creation
  function animateWord(word) {

    if (st.direction == 1) {
      if (word.parentElement.nodeName == "P") {
        gsap.to(word, { color: currentColors.divHighlight });
      } else {
        gsap.to(word, { color: currentColors.spanHighlight });
      }
    } else {
      gsap.to(word, { color: currentColors.default });
    }
  }

  const tl = gsap.timeline();

  // Apply timeline logic for first and last words only
  quoteSplit.words.forEach((word, index) => {
    tl.call(animateWord, [word], (index * 1) + 0.01)
  })

  tl.set({}, {}, "+=0.05");

  // Create ScrollTrigger for quote animation - defined AFTER timeline
  const st = ScrollTrigger.create({
    trigger: ".solution-content",
    start: "top 70%",
    end: "bottom 80%",
    scrub: true,
    animation: tl,
    onRefresh: () => {
      // Ensure initial state is maintained on refresh
      gsap.set(quoteSplit.words, { color: currentColors.default });
    }
  });

  // Immediate refresh without delay to prevent flicker
  ScrollTrigger.refresh();

  // Listen for theme changes and update all word colors
  window.addEventListener("themechange", () => {
    currentColors = getCurrentColors();

    // Update all words based on current scroll position
    quoteSplit.words.forEach((word) => {
      if (word.parentElement.nodeName == "P") {
        gsap.to(word, { color: currentColors.divHighlight, duration: 0.3 });
      } else {
        gsap.to(word, { color: currentColors.spanHighlight, duration: 0.3 });
      }
    });
  });

  // Soft transition to next section
  // gsap.to(".to-smokyBlack-section", {
  //   scrollTrigger: {
  //     trigger: ".solution-section",
  //     start: "bottom bottom",
  //     end: "bottom 70%",
  //     scrub: 0.5,
  //     markers: false,
  //     immediateRender: false,
  //   },
  //   ease: "none",
  //   backgroundColor: "#2f2f2f",
  //   text: "#fefefe", // softLavender
  // })

};
