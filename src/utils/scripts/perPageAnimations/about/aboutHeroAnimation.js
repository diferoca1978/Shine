import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export const aboutHeroAnimation = () => {
  const mainImage = document.querySelector("#diegorochiblack");
  const secondaryImage = document.querySelector("#diegorochi");
  const title = document.querySelector(".split-title");
  const subTitle = document.querySelector(".split-subtitle");
   
  gsap.set([title, subTitle], { autoAlpha: 1 });// Set autoAlpha to 1 to prevent "FOUC"


  let splitTitle = SplitText.create(title, { type: "words, chars" });
  let splitSubTitle = SplitText.create(subTitle, { type: "words, chars" });

  gsap.from(splitTitle.chars, {
    yPercent: "random(-100, 100)",
    rotation: "random(-30, 30)",
    ease: "back.out(2)",
    autoAlpha: 0,
    stagger: {
      amount: 0.7,
      from: "random",
    },
  })
  gsap.from(splitSubTitle.chars, {
    yPercent: "random(-100, 100)",
    rotation: "random(-30, 30)",
    ease: "back.out(2)",
    autoAlpha: 0,
    stagger: {
      amount: 0.7,
      from: "random",
    },
  })


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

    