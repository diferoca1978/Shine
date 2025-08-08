import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesLandingAnimation = () => {

  const services = document.querySelector(".services");
  const bodyElement = document.querySelector("body");

  const getAmountToScroll = () => {
    let servicesWidth = services.scrollWidth;
    return -(servicesWidth - window.innerWidth/2);
  };

  const tween = gsap.to(services, {
    x: getAmountToScroll,
    duration: 3,
    ease: "none",
  });

  ScrollTrigger.create({
    trigger: ".services-container",
    start: "top top", // Cambiar a "top top" para eliminar el gap
    end: () => `+=${getAmountToScroll() * -1}`,
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true,
    markers: false,
    animation: tween,
  });

  const images = gsap.utils.toArray(".image");

  images.forEach((image) => {
    ScrollTrigger.create({
      trigger: image,
      containerAnimation: tween,
      animation: gsap.from(image, {
        opacity: 0,
        scale: 0.5,
      }),
      scrub:true,
      start: "left 50%",
      end: "right 50%",
      markers: false,
    });
  });
}