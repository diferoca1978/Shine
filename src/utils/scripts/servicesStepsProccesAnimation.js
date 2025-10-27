import {gsap} from "gsap";
import {GSDevTools} from "gsap/GSDevTools";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, GSDevTools, ScrollTrigger);

export const gsapProcessStepsAnimation = () => {
  gsap.set("#path-highlight", {drawSVG:"0% 25%"})

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#process",
      start: "top 80%",
      once: true,
      markers: true, // Remove this in production
    }
  })

  .to(".title", {opacity:1, yPercent:-80})

  // Grow the path from left to right
  .to("#path-full, #path-highlight", {
    attr:{
      d:"M 100 100 L 1100 100"
    },
    duration: 2,
    ease: "power2.inOut"
  })

  // Animate the highlight along the path
  .to("#path-highlight", {drawSVG:"50% 100%", duration:1.5}, "+=0.5")
  .to("#path-highlight", {drawSVG:"0% 20%", duration:1.5}, "+=0.5")

  const positions = ["0% 24%", "26% 48%", "52% 73%", "75% 100%"];
  const buttons = gsap.utils.toArray("#button rect");

  buttons.forEach((btn, i) => {
    btn.addEventListener("mouseenter", () => {
      gsap.to("#path-highlight", {drawSVG:positions[i], duration:1, ease:"power2.out"});
    });
  });

  gsap.set(".stage p", {opacity:1})

  const stages = gsap.utils.toArray(".stage");

  stages.forEach( (stage, i) => {
    const tl = gsap.timeline({defaults:{ease:"power2.inOut"}, paused:true})

// animate headings of the cards
  .to(stage.querySelector(".headings"), {yPercent:-50})
  .from(stage.querySelector("p"), {y:10, opacity: 0}, 0)

  
    stage.addEventListener("mouseenter", () => {
      tl.play()
      gsap.to("#path-highlight", {drawSVG:positions[i], duration:1, ease:"power2.out"});
    })

    stage.addEventListener("mouseleave", () => {
      tl.reverse();
    });
  })

  // GSDevTools.create();
};