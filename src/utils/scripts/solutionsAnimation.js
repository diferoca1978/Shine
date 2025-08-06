import { gsap } from "gsap";
import {SplitText} from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger , MotionPathPlugin, DrawSVGPlugin, SplitText);

export const solutionsAnimation = () => {
  
  const linePath = document.querySelector("#path");

  gsap.set(linePath, { drawSVG: "0%" });
  
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".solution-way",
      start: "center bottom",
      end: "bottom bottom",
      scrub: 2,
      markers: false,
    },
  })
  
  tl.to(linePath, {
    drawSVG: "100%",
  }, "<");

  tl.to("#arrow", {
    opacity: 1,
    duration: 0.1,
  }, "<");

  tl.to("#arrow", {
   motionPath: {
      path: "#path",
      align: "#path",
      alignOrigin: [0.5, 0.5],
      autoRotate: -5,
    },
  },0);
};