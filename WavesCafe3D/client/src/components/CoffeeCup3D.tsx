// CoffeeCup3D - using a simplified version to avoid Three.js errors

const CoffeeCup3D = () => {
  return (
    <div className="coffee-cup w-32 h-32 absolute top-[20%] right-[10%] animate-float z-10">
      <div className="w-full h-full relative">
        <div className="absolute inset-0 bg-[#000042] rounded-b-full rounded-t-lg transform skew-x-6">
          <div className="absolute top-0 left-0 right-0 h-4 bg-white rounded-t-lg"></div>
          <div className="absolute inset-2 top-5 bottom-1 bg-[#6F4E37] rounded-b-full"></div>
          <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
            <div className="w-1 h-4 bg-white/60 rounded-full animate-steam1"></div>
            <div className="w-1 h-3 bg-white/60 rounded-full ml-2 animate-steam2"></div>
            <div className="w-1 h-5 bg-white/60 rounded-full ml-1 animate-steam3"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCup3D;
