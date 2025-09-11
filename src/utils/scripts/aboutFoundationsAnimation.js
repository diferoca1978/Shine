import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const foundationsRotatorAnimation = () => {
  const title = document.querySelector("#foundations h1");
  const container = document.querySelector("#foundations .text-rotator");
  
  if (!container || !title) {
    console.log("Missing elements:", { title: !!title, container: !!container });
    return;
  }

  // Title animation with ScrollTrigger
  const titleTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: "#foundations",
      start: "top 80%",
      end: "bottom 20%",
      markers: false,
      toggleActions: "play none none reverse",
    },
  });

  titleTimeline.fromTo(title, {
    opacity: 0,
    y: -50
  }, {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power3.out"
  });

  const words = Array.from(container.querySelectorAll(":scope > span"));
  
  if (words.length < 2) {
    // Add loaded class and show single word
    container.classList.add("loaded");
    gsap.set(words, { opacity: 1, yPercent: 0 });
    return;
  }

  // 1) Clone the first word and append it to the final
  const firstClone = words[0].cloneNode(true);
  container.appendChild(firstClone);

  // 2) Add loaded class to enable visibility for ALL spans (including clone)
  container.classList.add("loaded");

  // 3) Final list of items (includes the clone)
  const items = Array.from(container.querySelectorAll(":scope > span"));

    // 3) Initial states (stacked, hidden and below)
    gsap.set(items, {
      position: "absolute",
      opacity: 0,
      yPercent: 100
    });
    // The first visible in its place
    gsap.set(items[0], { opacity: 1, yPercent: 0 });

    // 4) Infinite timeline for text rotator
    const rotatorTimeline = gsap.timeline({
      repeat: -1,
      defaults: { duration: 1, ease: "power2.out" }
    }).timeScale(0.6); // Adjust global speed (1.0 normal, 0.6 slower)

    // 5) For each step: next enters and current exits with overlap
    for (let i = 0; i < items.length - 1; i++) {
      const current = items[i];
      const next = items[i + 1];

      // The next enters from below
      rotatorTimeline.fromTo(next,
        { yPercent: 100, opacity: 0 },
        { yPercent: 0, opacity: 1 }
      );

      // The current exits to the top
      rotatorTimeline.to(current,
        { yPercent: -100, opacity: 0 },
        "<0.0" // overlap with the next
      );
    }
  }
