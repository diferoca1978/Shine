import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function backgroundAnimation() {
    gsap.to("body", {
        scrollTrigger: {
            trigger: ".hero-section",
            start: "bottom bottom",
            end: "bottom 70%",
            scrub: 0.5,
            markers: false,
            immediateRender: false,
        },
        ease: "none",
        backgroundColor: "#c3bceb", // softLavender
    });
}