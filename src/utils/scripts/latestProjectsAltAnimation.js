import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const latestProjectsAltAnimation = () => {
  const projectsInner = document.querySelector(".projects-inner");

  const getAmountToScroll = () => {
    let projectsWidth = projectsInner.scrollWidth;
    return -(projectsWidth - window.innerWidth / 2);
  };

  const tween = gsap.to(projectsInner, {
    x: getAmountToScroll,
    duration: 3,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".projects-section",
    start: "top top",
    end: () => `+=${getAmountToScroll() * -1}`,
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true,
    markers: true,
    animation: tween,
  });
}