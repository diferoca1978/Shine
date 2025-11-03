import {gsap} from "gsap";
import {SplitText} from "gsap/SplitText";

// Register the SplitText plugin with GSAP
gsap.registerPlugin(SplitText);

export const globalHeroAnimation = () => {

    let subtitleSplitText = new SplitText(".subtitle-wrapper h2", {
      type: "lines",
      autoSplit: true,
      onSplit: (self) => {
      gsap.set(".subtitle-wrapper", {opacity:1})
      return gsap.from(self.lines, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      stagger: 0.5,
      onComplete: () => self.revert(),
      });
    }});

    let descriptionSplitText = document.querySelector(".description-wrapper p");
    
    if (descriptionSplitText) {
      gsap.set(".description-wrapper", {opacity:1})
      descriptionSplitText = new SplitText(".description-wrapper p", {
        type: "lines",
        autoSplit: true,
        onSplit: (self) => {
        return gsap.from(self.lines, {
        y:20,
        opacity:0,
        stagger:0.5,
        duration: 0.5,
        onComplete: () => self.revert(),
        }, "+=0.5");
      }});
    };

}
