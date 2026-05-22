import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

export const whoAreAnimation = () => {
  const isMobile = window.innerWidth <= 768;
  const linePath = document.querySelector("#pathBio");
  const sectionTitle = document.querySelector(".bio-title");
  const firstBio = document.querySelector(".bio-person-0");
  const secondBio = document.querySelector(".bio-person-1");

    gsap.set(sectionTitle, { opacity: 0, yPercent: -100 });

    // SVG animations only on desktop
    if (!isMobile) {
      gsap.set(linePath, { drawSVG: "0%" });

      const svgTimeline = gsap.timeline({
          scrollTrigger: {
              trigger: ".bio-container",
              start: "top 70%",
              bottom: "bottom 30%",
              markers: false,
          },
      })
      svgTimeline.to(sectionTitle, {
          opacity: 1,
          yPercent: 0,
          duration: 1.2,
          ease: "power3.out",
      });

      svgTimeline.to(linePath, {
          drawSVG: "100%",
          duration: 1.5,
          ease: "power1.inOut",
      },"+=0.4");
    } else {
      // Simple title animation on mobile
      gsap.to(sectionTitle, {
          opacity: 1,
          yPercent: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
              trigger: ".bio-container",
              start: "top 80%",
              markers: false,
          },
      });
    }

    // Bio transition
    if (firstBio && secondBio) {
        if (isMobile) {
            // On mobile bios are stacked — fade each in independently as they scroll into view
            gsap.fromTo(firstBio,
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: { trigger: firstBio, start: "top 85%", markers: false },
                }
            );
            gsap.fromTo(secondBio,
                { opacity: 0, y: 24 },
                {
                    opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
                    scrollTrigger: { trigger: secondBio, start: "top 85%", markers: false },
                }
            );
        } else {
            gsap.timeline({
                scrollTrigger: {
                    trigger: ".bio-wrapper",
                    start: "top 20%",
                    end: "bottom 80%",
                    scrub: 1.5,
                    markers: false,
                },
            })
            .to(firstBio, { opacity: 0, y: -30, duration: 2, ease: "power2.inOut" })
            .to(secondBio, { opacity: 1, y: 0, duration: 2, ease: "power2.inOut" }, "<");
        }
    }

}
