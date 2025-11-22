import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// Register plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

export default function hurtsAnimation() {
  const isMobile = window.innerWidth <= 768;
  const hurtsItems = document.querySelectorAll(".hurts-item ");
  let split = new SplitText(".text-split", { type: "words" });

  gsap.set([".hurts-item", ".text-split"], { opacity: 1 });

  const tl = gsap.timeline(
    {
      scrollTrigger: {
        trigger: ".client-hurts-section",
        start: "top 50%",
        end: "bottom 50%",
        once: true,
        markers: false,
      },
    }
  )

  hurtsItems.forEach((item) => {
    tl.from(item, {
      opacity: 0,
      y: 100,
      duration: 0.7,
      ease: "power3.out",
    })
  })

  // if (!isMobile) {
  //   tl.from(split.words, {
  //     opacity: 0,
  //     y: 50,
  //     x: 50,
  //     ease: "power3.out",
  //     stagger: 0.05,
  //   })
  // }
}
