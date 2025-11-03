import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const latestProjectsAltAnimation = () => {
  const projectsInner = document.querySelector(".projects-inner");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayYear = document.getElementById("overlay-year");
  const overlayLink = document.getElementById("overlay-link");
  const projectCards = document.querySelectorAll(".project-card");
  const projectInfoOverlay = document.querySelector(".project-info-overlay");
  const desktopTitle = document.querySelector(".desktop-title");

  const getAmountToScroll = () => {
    let projectsWidth = projectsInner.scrollWidth;
    return -(projectsWidth - window.innerWidth / 2);
  };

  const tween = gsap.to(projectsInner, {
    x: getAmountToScroll,
    duration: 3,
    ease: "none",
  });

  const updateOverlay = (progress) => {
    const totalProjects = projectCards.length;
    const currentProjectIndex = Math.min(
      Math.floor(progress * totalProjects),
      totalProjects - 1
    );

    const currentCard = projectCards[currentProjectIndex];
    if (currentCard) {
      const title = currentCard.dataset.projectTitle;
      const year = currentCard.dataset.projectYear;
      const link = currentCard.dataset.projectLink;

      if (overlayTitle && title) overlayTitle.textContent = title;
      if (overlayYear && year) overlayYear.textContent = year;
      if (overlayLink && link) overlayLink.href = link;
    }
  };

  // Create timeline for entrance animations
  const entranceTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".projects-section",
      start: "top center",
      toggleActions: "play none none reverse"
    }
  });

  // Add animations to timeline
  if (desktopTitle) {
    entranceTimeline.fromTo(desktopTitle, {
      x: "100vw",
      opacity: 0,
    }, {
      x: "0%",
      opacity: 1,
      duration: 1.0,
      ease: "back.out(1.7)",
    });
  }

  if (projectInfoOverlay) {
    entranceTimeline.fromTo(projectInfoOverlay, {
      width: "0%",
      x: "0%",
      opacity: 1,
    }, {
      width: "25vw",
      duration: 1.2,
      ease: "power2.out",
    }, "+=0.2"); // Start 0.2 seconds after previous animation ends
  }

  ScrollTrigger.create({
    trigger: ".projects-section",
    start: "top top",
    end: () => `+=${getAmountToScroll() * -1}`,
    scrub: 1,
    pin: true,
    invalidateOnRefresh: true,
    markers: false,
    animation: tween,
    onUpdate: (self) => {
      updateOverlay(self.progress);
    }
  });
}