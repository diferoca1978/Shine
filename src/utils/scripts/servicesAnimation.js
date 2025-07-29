import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const servicesAnimation = () => {
  const services = gsap.utils.toArray('.individual-service');
  const indicators = gsap.utils.toArray('.indicator');

  gsap.set(indicators, { display: 'flex' });

  // Create the scroll trigger for each service
  services.forEach((service, i) => {
    ScrollTrigger.create({
      trigger: service,
      start: "top 50%",
      end: "bottom 50%",
      markers: true,
      animation: gsap.timeline()
      .to(indicators[i], {
						duration: 0.3,
						backgroundColor: "black",
					})
					.to(service, {
						duration: 0.3,
						backgroundColor: "white",
					}, 0), // Start at the same time as the indicator animation
          onToggle: (self) => {
            self.animation.reversed(!self.isActive)
          },
       })
    })
}

// Cleanup function to remove the animations
export function cleanupServicesAnimations() {
    ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.id === "services") {
            trigger.kill();
        }
    });
}

