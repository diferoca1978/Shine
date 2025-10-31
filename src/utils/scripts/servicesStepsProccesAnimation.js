import {gsap} from "gsap";
import {GSDevTools} from "gsap/GSDevTools";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(DrawSVGPlugin, GSDevTools, ScrollTrigger);

export const gsapProcessStepsAnimation = () => {
  const isDesktop = window.innerWidth >= 1024;

  // Desktop animations (1024px+)
  if (isDesktop) {
    gsap.set("#path-highlight", {drawSVG:"0% 25%"})

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#process",
        start: "top 80%",
        once: true,
        markers: false,
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

    const positions = ["0% 24%", "26% 48%", "52% 70%", "75% 100%"];
    const numbers = gsap.utils.toArray(".numbers");

    numbers.forEach((number, i) => {
      number.addEventListener("mouseenter", () => {
        gsap.to("#path-highlight", {drawSVG:positions[i], duration:1, ease:"power2.out"});
        gsap.to(number, {opacity:0, duration:0.3})
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
        gsap.to(numbers[i], {opacity:1, duration:0.3})
      })

      stage.addEventListener("mouseleave", () => {
        tl.reverse();
        gsap.to(numbers[i], {opacity:0, duration:0.3})
      })
    })
  }

  // Mobile/Tablet carousel functionality (< 1024px)
  if (!isDesktop) {
    let currentStep = 0;
    const mobileStages = gsap.utils.toArray(".mobile-stage");
    const prevBtn = document.getElementById("prev-step");
    const nextBtn = document.getElementById("next-step");
    const totalSteps = mobileStages.length;

    // Initial title animation
    gsap.timeline({
      scrollTrigger: {
        trigger: "#process",
        start: "top 80%",
        once: true,
        markers: false,
      }
    }).to(".title", {opacity:1, duration:0.8})

    // Show first step initially
    function showStep(index, direction = 1) {
      currentStep = index;

      // Update stages
      mobileStages.forEach((stage, i) => {
        if (i === index) {
          gsap.to(stage, {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: "auto"
          });
        } else {
          gsap.to(stage, {
            opacity: 0,
            x: direction * -20,
            duration: 0.5,
            ease: "power2.out",
            pointerEvents: "none"
          });
        }
      });

      // Update button states
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === totalSteps - 1;
    }

    // Initialize first step
    showStep(0);

    // Next button
    nextBtn.addEventListener("click", () => {
      if (currentStep < totalSteps - 1) {
        showStep(currentStep + 1, 1);
      }
    });

    // Previous button
    prevBtn.addEventListener("click", () => {
      if (currentStep > 0) {
        showStep(currentStep - 1, -1);
      }
    });

    // Swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    const container = document.querySelector(".mobile-stages-container");

    container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    container.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentStep < totalSteps - 1) {
          // Swiped left - go to next
          showStep(currentStep + 1, 1);
        } else if (diff < 0 && currentStep > 0) {
          // Swiped right - go to previous
          showStep(currentStep - 1, -1);
        }
      }
    }
  }

  // GSDevTools.create();
};