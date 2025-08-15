import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const latestProjectsAnimation = () => {
  // Animate section header elements
  const headerElements = gsap.utils.toArray(".latest-projects-section h2, .latest-projects-section h3, .latest-projects-section p");
  
  headerElements.forEach((element, index) => {
    gsap.fromTo(element, 
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.2,
      }
    );
  });

  // Animate project cards with stagger effect
  const projectCards = gsap.utils.toArray(".project-card");
  
  gsap.fromTo(projectCards,
    {
      opacity: 0,
      y: 60,
      scale: 0.9,
    },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
      stagger: {
        amount: 0.6,
        from: "start",
      },
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 75%",
        end: "bottom 25%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Add hover animations for project cards
  projectCards.forEach((card) => {
    const image = card.querySelector("img");
    const content = card.querySelector(".p-6");
    
    if (image && content) {
      // Image hover effect
      card.addEventListener("mouseenter", () => {
        gsap.to(image, {
          scale: 1.1,
          duration: 0.6,
          ease: "power2.out",
        });
        
        gsap.to(card, {
          y: -8,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(image, {
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        });
        
        gsap.to(card, {
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        });
      });
    }
  });

  // Animate footer CTA section
  const footerElements = gsap.utils.toArray(".latest-projects-section .text-center:last-child p, .latest-projects-section .text-center:last-child .flex");
  
  footerElements.forEach((element, index) => {
    gsap.fromTo(element,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: "play none none reverse",
        },
        delay: index * 0.3,
      }
    );
  });

  // Animate technology tags on scroll
  const techTags = gsap.utils.toArray(".project-card span");
  
  gsap.fromTo(techTags,
    {
      opacity: 0,
      scale: 0.8,
    },
    {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "back.out(1.7)",
      stagger: {
        amount: 0.8,
        from: "random",
      },
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 60%",
        end: "bottom 40%",
        toggleActions: "play none none reverse",
      },
    }
  );

  // Add subtle floating animation for category badges
  const categoryBadges = gsap.utils.toArray(".project-image-container span");
  
  categoryBadges.forEach((badge) => {
    gsap.to(badge, {
      y: -5,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  });

  // Refresh ScrollTrigger to ensure proper positioning
  ScrollTrigger.refresh();
};