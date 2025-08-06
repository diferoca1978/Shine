import { gsap } from "gsap";
import {SplitText} from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger , MotionPathPlugin, DrawSVGPlugin, SplitText);

export const solutionsAnimation = () => {

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
  },0);
  // End svg animation

  // Content animation setup
  const defaultColor = "oklch(96.8% 0.007 247.896)";
  const divHighlight = "oklch(0.3052 0 0)";
  const spanHighlight = "oklch(0.3911 0.0534 7.52)";

  const quoteSplit = SplitText.create(".solution-content p", { type: "words" });
  const numWords = quoteSplit.words.length;

  // IMMEDIATELY set initial state to prevent flicker
  gsap.set(quoteSplit.words, { color: defaultColor });

  // Quote animation function - defined BEFORE timeline creation
  function animateWord(word) {
    
    if (st.direction == 1) {
      if (word.parentElement.nodeName == "P") {
        gsap.to(word, { color: divHighlight });
      } else {
        gsap.to(word, { color: spanHighlight });
      }
    } else {
      gsap.to(word, { color: defaultColor });
    }
  }

  const tl = gsap.timeline();

  // Apply timeline logic for first and last words only
  quoteSplit.words.forEach((word, index) => {
    tl.call(animateWord, [word], (index * 1) + 0.01)
  })

  tl.set({}, {}, "+=0.01");

  // Create ScrollTrigger for quote animation - defined AFTER timeline
  const st = ScrollTrigger.create({
    trigger: ".solution-content",
    start: "top 80%",
    end: "bottom 80%",
    scrub: true,
    animation: tl,
    onRefresh: () => {
      // Ensure initial state is maintained on refresh
      gsap.set(quoteSplit.words, { color: defaultColor });
    }
  });

  // Immediate refresh without delay to prevent flicker
  ScrollTrigger.refresh();
  
};
