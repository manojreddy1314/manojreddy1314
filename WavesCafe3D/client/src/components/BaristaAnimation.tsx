// BaristaAnimation.tsx - A CSS-based animation of a barista pouring coffee

const BaristaAnimation = () => {
  return (
    <div className="barista-animation w-48 h-48 relative">
      {/* Barista figure */}
      <div className="barista absolute w-32 h-40 left-0 bottom-0">
        {/* Head */}
        <div className="head absolute w-16 h-16 bg-[#F8D0A0] rounded-full top-0 left-8 z-20">
          {/* Face */}
          <div className="eyes flex justify-center gap-6 pt-5">
            <div className="eye w-1.5 h-0.5 bg-[#000042] rounded-full"></div>
            <div className="eye w-1.5 h-0.5 bg-[#000042] rounded-full"></div>
          </div>
          <div className="smile w-5 h-2 border-b-2 border-[#000042] rounded-full absolute left-5.5 top-7"></div>
          
          {/* Chef hat */}
          <div className="chef-hat absolute -top-10 left-0 w-16 h-12">
            <div className="hat-base w-16 h-3 bg-white absolute bottom-0"></div>
            <div className="hat-top w-14 h-10 bg-white rounded-t-full absolute bottom-2 left-1"></div>
          </div>
        </div>
        
        {/* Body - shirt */}
        <div className="body absolute w-24 h-24 bg-white top-12 left-4 rounded-t-lg z-10">
          {/* Arm holding coffee pot */}
          <div className="arm-right absolute w-20 h-6 bg-white top-3 -right-16 rounded-full z-30 arm-pouring"></div>
        </div>
        
        {/* Coffee pot */}
        <div className="coffee-pot absolute w-10 h-14 bg-[#6F4E37] top-10 right-0 rounded-md z-20">
          {/* Pot handle */}
          <div className="handle absolute w-3 h-8 border-2 border-[#6F4E37] right-8 top-3 rounded-l-lg"></div>
          
          {/* Pot spout */}
          <div className="spout absolute w-3 h-5 bg-[#6F4E37] -right-2 top-2 rounded-r-md"></div>
          
          {/* Coffee pouring animation */}
          <div className="coffee-stream absolute w-1.5 bg-[#6F4E37] -right-3 top-4 h-20 coffee-pour"></div>
          
          {/* Coffee drops */}
          <div className="coffee-drop absolute w-1.5 h-1.5 bg-[#6F4E37] rounded-full -right-3 top-10 coffee-drop-1"></div>
          <div className="coffee-drop absolute w-1 h-1 bg-[#6F4E37] rounded-full -right-2 top-14 coffee-drop-2"></div>
          <div className="coffee-drop absolute w-1 h-1 bg-[#6F4E37] rounded-full -right-4 top-16 coffee-drop-3"></div>
        </div>
      </div>
      
      {/* Coffee cup receiving the pour */}
      <div className="coffee-cup absolute w-14 h-16 right-4 bottom-2 z-10">
        <div className="cup-body absolute w-14 h-16 bg-[#000042] bottom-0 right-0 rounded-b-lg rounded-t-sm overflow-hidden">
          {/* Cup logo */}
          <div className="logo absolute w-8 h-8 bg-white rounded-full top-4 left-3 flex items-center justify-center">
            <span className="text-[#000042] text-xs font-bold">WAE'S</span>
          </div>
          
          {/* Coffee filling animation */}
          <div className="coffee-fill absolute bottom-0 w-full bg-[#6F4E37] h-0 coffee-filling"></div>
        </div>
        
        {/* Cup handle */}
        <div className="handle absolute w-3 h-8 border-2 border-[#000042] -right-3 top-4 rounded-r-lg"></div>
      </div>
    </div>
  );
};

export default BaristaAnimation;