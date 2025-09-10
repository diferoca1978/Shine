import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText, ScrollTrigger);

export const aboutHeroAnimation = () => {
  const mainImage = document.querySelector("#diegorochiblack");
  const secondaryImage = document.querySelector("#diegorochi");
  
  gsap.set(".split-text", { opacity: 1 }); 
  gsap.set(".split-title", { opacity: 1 });// Set opacity to 1 to prevent "FOUC"

  let tl = gsap.timeline({
    // scrollTrigger: {
    //   trigger: "#wrapper-about",
    //   start: "top top",
    //   end: "bottom top",
    //   markers: false,
    //   toggleActions: "play none none reverse",
    // },
  });

  let splittextWords = SplitText.create(".split-title", { type: "chars" });

  tl.from(splittextWords.chars, {
    y: -100,
    opacity: 0,
    stagger: 0.05,
    ease: "power2.out",
    
  })

  // let splitTextMask = SplitText.create(".split-text", { type: "chars, words", mask: "chars" });

  // tl.from(splitTextMask.chars, {
  //   yPercent: "random(-150, 150)",
  //   xPercent: "random(-150, 150)",
  //   stagger: {
  //     from: "random",
  //     amount: 0.8,
  //   },
  //   ease: "back.out(1.7)",
  //   duration: 1,
    
  // })

  // Image hover functionality with opacity
  if (mainImage && secondaryImage) {
    mainImage.addEventListener("mouseover", () => {
      gsap.to(mainImage, { opacity: 0, duration: 0.3 });
      gsap.to(secondaryImage, { opacity: 1, duration: 0.3 });
      // Enable pointer events on secondary image when visible
      secondaryImage.style.pointerEvents = "auto";
    });

    mainImage.addEventListener("mouseout", () => {
      gsap.to(mainImage, { opacity: 1, duration: 0.3 });
      gsap.to(secondaryImage, { opacity: 0, duration: 0.3 });
      // Disable pointer events on secondary image when hidden
      secondaryImage.style.pointerEvents = "none";
    });
    
    // Also add hover listeners to secondary image for smooth interaction
    secondaryImage.addEventListener("mouseover", () => {
      gsap.to(mainImage, { opacity: 0, duration: 0.3 });
      gsap.to(secondaryImage, { opacity: 1, duration: 0.3 });
      secondaryImage.style.pointerEvents = "auto";
    });

    secondaryImage.addEventListener("mouseout", () => {
      gsap.to(mainImage, { opacity: 1, duration: 0.3 });
      gsap.to(secondaryImage, { opacity: 0, duration: 0.3 });
      secondaryImage.style.pointerEvents = "none";
    });
  }
}

    