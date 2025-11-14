import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesTechStackAnimation = () => {


  const container = document.querySelector(".techStack-section .tech-rotator");
  const hero = document.querySelector(".techStack-section .stack-hero");

  if (!container || !hero) {
    console.log("Missing elements:", { container: !!container, hero: !!hero });
    return;
  }

  gsap.set(hero, { opacity: 1 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".techStack-section",
      start: "top 80%",
      end: "bottom 20%",
      markers: false,
    },
  })

  .to(hero, {yPercent: -20, duration: 1, ease: "power2.out" });

  const stackItems = Array.from(container.querySelectorAll(":scope > a"));

  if (stackItems.length < 2) {
    container.classList.add("loaded");
    gsap.set(stackItems, { opacity: 1, yPercent: 0 });
    return;
  }

  const firstClone = stackItems[0].cloneNode(true);
  container.appendChild(firstClone);

  const items = Array.from(container.querySelectorAll(":scope > a"));

  container.classList.add("loaded");

  gsap.set(items, {
    position: "absolute",
    opacity: 0,
    yPercent: 100
  });

  gsap.set(items[0], { opacity: 1, yPercent: 0 });

  const rotatorTimeline = gsap.timeline({
    repeat: -1,
    defaults: { duration: 1, ease: "power2.out" }
  }).timeScale(0.5);

  for (let i = 0; i < items.length - 1; i++) {
    const current = items[i];
    const next = items[i + 1];

    rotatorTimeline.fromTo(next,
      { yPercent: 100, opacity: 0 },
      { yPercent: 0, opacity: 1 }
    );

    rotatorTimeline.to(current,
      { yPercent: -100, opacity: 0 },
      "<0.0"
    );
  }
}

  