import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesLandingAnimation = () => {
  const services = document.querySelector(".services");
  const servicesContainer = document.querySelector(".services-container");

  if (!services || !servicesContainer) return;

  const mm = gsap.matchMedia();

  mm.add(
    {
      reducedMotion: "(prefers-reduced-motion: reduce)",
      fullMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      const { reducedMotion } = context.conditions;

      if (reducedMotion) {
        gsap.set(services, { x: 0, autoAlpha: 1, clearProps: "all" });
        ScrollTrigger.getAll().forEach((st) => {
          if (st.trigger === services || st.trigger === servicesContainer) {
            st.kill();
          }
        });
        return;
      }

      const getAmountToScroll = () => {
        let servicesWidth = services.scrollWidth;
        return -(servicesWidth - window.innerWidth / 2);
      };

      const tween = gsap.to(services, {
        x: getAmountToScroll,
        duration: 3,
        ease: "none",
      });

      ScrollTrigger.create({
        trigger: ".services-container",
        start: "top top",
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
            autoAlpha: 0,
            scale: 0.5,
          }),
          scrub: true,
          start: "left 50%",
          end: "right 50%",
          markers: false,
        });
      });
    }
  );

  return () => mm.revert();
};