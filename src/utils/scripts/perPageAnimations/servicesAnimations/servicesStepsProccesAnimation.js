import {gsap} from "gsap";
import {GSDevTools} from "gsap/GSDevTools";
import {DrawSVGPlugin} from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins for advanced animations
gsap.registerPlugin(DrawSVGPlugin, GSDevTools, ScrollTrigger);

/**
 * Main animation controller for the Services Process Steps section
 * Handles both desktop (1024px+) and mobile/tablet (<1024px) experiences
 */
export const gsapProcessStepsAnimation = () => {
  // Detect device type based on viewport width
  // Desktop: 1024px and above - gets hover interactions with SVG progress bar
  // Mobile/Tablet: Below 1024px - gets carousel with button navigation
  const isDesktop = window.innerWidth >= 1024;

  // ========================================
  // DESKTOP ANIMATIONS (1024px+)
  // ========================================
  if (isDesktop) {
    // Initialize the SVG highlight path to start at 0-25% of the line
    gsap.set("#path-highlight", {drawSVG:"0% 25%"})

    // Create the main timeline that triggers when section comes into view
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#process",           // Element that triggers the animation
        start: "top 80%",               // Animation starts when top of #process reaches 80% down the viewport
        once: true,                     // Animation only runs once (doesn't reverse on scroll up)
        markers:false,                 // Set to true for debugging scroll trigger positions
      }
    })

    // STEP 1: Fade in and slide up the title
    .to(".process-heading", {opacity:1, yPercent:-80})

    // STEP 2: Draw the SVG path from a point to a horizontal line
    // This creates the visual effect of the progress bar "growing" across the screen
    .to("#path-full, #path-highlight", {
      attr:{
        d:"M 100 100 L 1100 100"     // SVG path data: moves from point (100,100) to (1100,100)
      },
      duration: 2,                    // Takes 2 seconds to complete
      ease: "power2.inOut"            // Smooth acceleration and deceleration
    })

    // STEP 3: Animate the highlight segment along the path
    // First animation: Move highlight from middle to end of path
    .to("#path-highlight", {drawSVG:"50% 100%", duration:1.5}, "+=0.5")
    // Second animation: Move highlight back to beginning of path
    .to("#path-highlight", {drawSVG:"0% 20%", duration:1.5}, "+=0.5")

    // Define progress bar positions for each of the 4 steps
    // Each position corresponds to where the highlight should be for that step
    const positions = ["0% 24%", "26% 48%", "52% 70%", "75% 100%"];
    const numbers = gsap.utils.toArray(".numbers");

    // Setup hover interactions for step numbers
    numbers.forEach((number, i) => {
      number.addEventListener("mouseenter", () => {
        // Move the highlight to the corresponding position for this step
        gsap.to("#path-highlight", {drawSVG:positions[i], duration:1, ease:"power2.out"});
        // Hide the number on hover
        gsap.to(number, {opacity:0, duration:0.3})
      });
    });

    // Make all step descriptions visible by default
    gsap.set(".stage p", {opacity:1})

    // Get all stage cards
    const stages = gsap.utils.toArray(".stage");

    // Setup hover animations for each stage card
    stages.forEach( (stage, i) => {
      // Create a paused timeline for this specific card
      // This allows us to play/reverse the animation on hover enter/leave
      const tl = gsap.timeline({defaults:{ease:"power2.inOut"}, paused:true})

      // Card hover animation sequence:
      // 1. Slide the headings container up by 50% to reveal the colored title
      .to(stage.querySelector(".headings"), {yPercent:-50})
      // 2. Fade in the description text (starting at 0 time, so it happens simultaneously)
      .from(stage.querySelector("p"), {y:10, opacity: 0}, 0)

      // When mouse enters the card
      stage.addEventListener("mouseenter", () => {
        tl.play()                     // Play the card's hover animation forward
        // Move the progress bar highlight to this step's position
        gsap.to("#path-highlight", {drawSVG:positions[i], duration:1, ease:"power2.out"});
        // Show this step's number
        gsap.to(numbers[i], {opacity:1, duration:0.3})
      })

      // When mouse leaves the card
      stage.addEventListener("mouseleave", () => {
        tl.reverse();                 // Reverse the card's hover animation
        // Hide this step's number
        gsap.to(numbers[i], {opacity:0, duration:0.3})
      })
    })
  }

  // ========================================
  // MOBILE/TABLET CAROUSEL (< 1024px)
  // ========================================
  if (!isDesktop) {
    // Track which step is currently visible
    let currentStep = 0;

    // Get all carousel step elements
    const mobileStages = gsap.utils.toArray(".mobile-stage");

    // Get navigation button elements
    const prevBtn = document.getElementById("prev-step");
    const nextBtn = document.getElementById("next-step");

    // Calculate total number of steps
    const totalSteps = mobileStages.length;

    // Animate title when section comes into view
    gsap.timeline({
      scrollTrigger: {
        trigger: "#process",           // Element that triggers the animation
        start: "top 80%",               // Animation starts when top of #process reaches 80% down the viewport
        once: true,                     // Animation only runs once
        markers: false,                 // Set to true for debugging
      }
    }).to(".process-heading", {opacity:1, duration:0.8})

    /**
     * Core function to transition between carousel steps
     * @param {number} index - The step index to show (0-based)
     * @param {number} direction - Direction of transition: 1 for forward, -1 for backward
     */
    function showStep(index, direction = 1) {
      // Update the current step tracker
      currentStep = index;

      // Animate all stages: show the selected one, hide the others
      mobileStages.forEach((stage, i) => {
        if (i === index) {
          // SHOW: Animate the active step into view
          gsap.to(stage, {
            opacity: 1,                 // Fully visible
            x: 0,                       // Centered position
            duration: 0.5,              // Animation duration
            ease: "power2.out",         // Smooth deceleration
            pointerEvents: "auto"       // Enable touch/click interactions
          });
        } else {
          // HIDE: Animate inactive steps out of view
          gsap.to(stage, {
            opacity: 0,                 // Fully transparent
            x: direction * -20,         // Slight horizontal offset based on direction
            duration: 0.5,              // Animation duration
            ease: "power2.out",         // Smooth deceleration
            pointerEvents: "none"       // Disable interactions on hidden steps
          });
        }
      });

      // Update navigation button states
      // Disable prev button on first step, disable next button on last step
      prevBtn.disabled = index === 0;
      nextBtn.disabled = index === totalSteps - 1;
    }

    // Show the first step when page loads
    showStep(0);

    // ========================================
    // BUTTON NAVIGATION
    // ========================================

    // Next button: Advance to the next step
    nextBtn.addEventListener("click", () => {
      // Only advance if not already on the last step
      if (currentStep < totalSteps - 1) {
        showStep(currentStep + 1, 1);  // 1 = forward direction
      }
    });

    // Previous button: Go back to the previous step
    prevBtn.addEventListener("click", () => {
      // Only go back if not already on the first step
      if (currentStep > 0) {
        showStep(currentStep - 1, -1);  // -1 = backward direction
      }
    });

    // ========================================
    // TOUCH SWIPE GESTURES
    // ========================================

    // Variables to track touch positions
    let touchStartX = 0;   // Where the user started touching
    let touchEndX = 0;     // Where the user lifted their finger

    // Get the carousel container element
    const container = document.querySelector(".mobile-stages-container");

    // Record the starting position when user touches the screen
    container.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    // Handle swipe when user lifts their finger
    container.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();  // Process the swipe gesture
    });

    /**
     * Detect and handle swipe gestures
     * Determines if the user swiped left or right with enough force
     */
    function handleSwipe() {
      // Minimum distance (in pixels) required to register as a swipe
      const swipeThreshold = 50;

      // Calculate the distance swiped
      // Positive = swiped left, Negative = swiped right
      const diff = touchStartX - touchEndX;

      // Check if swipe was strong enough
      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0 && currentStep < totalSteps - 1) {
          // User swiped LEFT → go to NEXT step
          showStep(currentStep + 1, 1);
        } else if (diff < 0 && currentStep > 0) {
          // User swiped RIGHT → go to PREVIOUS step
          showStep(currentStep - 1, -1);
        }
      }
    }
  }

  // Uncomment to enable GSAP DevTools for debugging animations
  // GSDevTools.create();
};