import { SVGProps } from "react";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className, width = 150, height = 150 }: LogoProps) => {
  return (
    <div className={`logo ${className || ""}`} style={{ width: `${width}px`, height: `${height}px` }}>
      <img
        src="/attached_assets/WhatsApp Image 2025-04-07 at 08.07.37_e4d10290.jpg"
        alt="Waes Café Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export default Logo;