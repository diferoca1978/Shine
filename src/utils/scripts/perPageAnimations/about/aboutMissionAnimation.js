import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const aboutMissionAnimation = () => {
  const title = document.querySelector(".mission-title");
  const subtitle = document.querySelector(".mission-subtitle");
  const text = document.querySelector(".mission-text");
  const image = document.querySelector(".mission-image");

  gsap.set([title, subtitle, text, image], { opacity: 0, xPercent: -100 })

  if (!title || !subtitle || !text || !image) {
    console.warn('Animation elements not found:', { 
      title: !!title, 
      subtitle: !!subtitle, 
      text: !!text, 
      image: !!image 
    });
    return;
  }

  gsap.timeline({
    scrollTrigger: {
      trigger: ".mission-section",
      start: "top 80%",
      end: "bottom 20%",
      markers: false,
      toggleActions: "play none none reverse"
    }
  })
  .to(title, {
    opacity: 1,
    xPercent: 0,
    duration: 0.8,
    ease: "power2.out"
  })
  .to(subtitle, {
    opacity: 1,
    xPercent: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.4")
  .to(text, {
    opacity: 1,
    xPercent: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.4")
  .to(image, {
    opacity: 1,
    xPercent: 0,
    duration: 0.8,
    ease: "power2.out"
  }, "-=0.4");
}