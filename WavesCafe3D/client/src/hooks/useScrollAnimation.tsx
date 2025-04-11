import { useCallback } from "react";

export const useScrollAnimation = () => {
  const elementInView = useCallback((el: Element, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    
    return (
      elementTop <= 
      ((window.innerHeight || document.documentElement.clientHeight) * (percentageScroll/100))
    );
  }, []);
  
  const displayScrollElement = useCallback((element: Element) => {
    const animationType = element.getAttribute('data-scroll-animation');
    const delay = Number(element.getAttribute('data-delay') || 0);
    
    setTimeout(() => {
      if (animationType) {
        element.classList.add(`animate-${animationType}`);
      }
      element.classList.add('active');
    }, delay * 1000);
  }, []);
  
  const handleScrollAnimation = useCallback(() => {
    const scrollElements = document.querySelectorAll('[data-scroll-animation]');
    
    scrollElements.forEach((el) => {
      if (elementInView(el, 90) && !el.classList.contains('active')) {
        displayScrollElement(el);
      }
    });
  }, [elementInView, displayScrollElement]);
  
  return { handleScrollAnimation };
};
