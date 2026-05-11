import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


export function gsapProblemAnimation() {

  const listItems = gsap.utils.toArray("#problem-hurts ul li");
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#problem-section",
      start: "top 80%",
      once: true,
      markers: false, // Set to true for debugging
    },
  })

  .to(".problem-heading", {
    autoAlpha: 1,
    yPercent: -20,
    duration: 1,
    ease: "power2.out",
  })

  .to("#problem-image", {
    autoAlpha: 1,
    yPercent: 5,
    duration: 1,
    ease: "back",
  },"+=0.5")

  .to("#problem-hurts h4", {
    autoAlpha: 1,
    duration: 1,
    ease: "power2.out",
  },">+=0.2")

  listItems.forEach((li, i) => {
    tl.to(li, {
      autoAlpha: 1,
      stagger: 0.02,
      ease: "power2.out",
    })
  })
}


