import { useEffect, useState } from "react";

const ScrollProgress = () => {
  const [scrolled, setScrolled] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const windowScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = (windowScroll / height) * 100;
      
      setScrolled(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className="scroll-indicator" 
      style={{ width: `${scrolled}%` }}
    ></div>
  );
};

export default ScrollProgress;
