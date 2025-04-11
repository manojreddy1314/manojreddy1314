import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { MenuCategory, MenuItem } from "@/lib/data";
import { apiRequest } from "@/lib/queryClient";

interface MenuItemCardProps {
  item: MenuItem;
  delay?: string;
}

const MenuItemCard = ({ item, delay }: MenuItemCardProps) => {
  return (
    <div className="menu-item bg-white dark:bg-[#000042]/80 rounded-xl shadow-lg overflow-hidden" data-scroll-animation="fade-in" data-delay={delay}>
      <div className="h-48 overflow-hidden">
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-poppins font-semibold text-xl text-[#000042] dark:text-white">{item.name}</h3>
          <span className="font-poppins font-semibold text-[#FFDE6A]">₹{item.price}</span>
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{item.description}</p>
        <Button className="w-full py-6 bg-[#FFDE6A] text-[#000042] font-poppins font-medium rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105">
          Add to Order
        </Button>
      </div>
    </div>
  );
};

interface DeliveryOptionProps {
  type: "pickup" | "delivery";
  onOrderClick: (type: "pickup" | "delivery", platform?: "zomato" | "swiggy") => void;
}

const DeliveryOption = ({ type, onOrderClick }: DeliveryOptionProps) => {
  if (type === "pickup") {
    return (
      <div className="bg-white dark:bg-[#000042]/80 rounded-xl p-6 text-center shadow-lg flex-1 max-w-sm mx-auto transform transition hover:-translate-y-2">
        <i className="fas fa-store text-[#FFDE6A] text-4xl mb-4"></i>
        <h4 className="font-poppins font-semibold text-xl text-[#000042] dark:text-white mb-3">Pickup</h4>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Visit us in person and collect your order fresh from our café.</p>
        <Button 
          onClick={() => onOrderClick("pickup")}
          className="w-full py-6 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105"
        >
          Order for Pickup
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#000042]/80 rounded-xl p-6 text-center shadow-lg flex-1 max-w-sm mx-auto transform transition hover:-translate-y-2">
      <i className="fas fa-motorcycle text-[#FFDE6A] text-4xl mb-4"></i>
      <h4 className="font-poppins font-semibold text-xl text-[#000042] dark:text-white mb-3">Home Delivery</h4>
      <p className="text-gray-600 dark:text-gray-300 mb-6">Get your favorite items delivered right to your doorstep.</p>
      <div className="grid grid-cols-2 gap-4">
        <Button 
          onClick={() => onOrderClick("delivery", "zomato")}
          className="py-3 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105 flex items-center justify-center"
        >
          <img src="https://b.zmtcdn.com/images/logo/zomato_logo_2017.png" alt="Zomato" className="h-6" />
        </Button>
        <Button 
          onClick={() => onOrderClick("delivery", "swiggy")}
          className="py-3 bg-[#FFDE6A] text-[#000042] font-poppins font-semibold rounded-full hover:bg-[#FFDE6A]/90 transition transform hover:scale-105 flex items-center justify-center"
        >
          <img src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200,h_65/icon-192x192_2x_sxbcaq" alt="Swiggy" className="h-6" />
        </Button>
      </div>
    </div>
  );
};

const MenuSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>("tea");

  // Fetch menu items by category from API
  const { data: menuItems = [], isLoading, error } = useQuery({
    queryKey: ['/api/menu-items/category', selectedCategory],
    queryFn: async () => {
      const response = await apiRequest('GET', `/api/menu-items/category/${selectedCategory}`);
      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }
      return response.json();
    }
  });

  const handleCategoryChange = (category: MenuCategory) => {
    setSelectedCategory(category);
  };

  const handleOrder = (type: "pickup" | "delivery", platform?: "zomato" | "swiggy") => {
    if (type === "pickup") {
      // In a real app, navigate to a pickup ordering page or open modal
      alert("Opening pickup order form");
    } else if (type === "delivery") {
      // In a real app, redirect to the appropriate delivery platform
      if (platform === "zomato") {
        window.open("https://www.zomato.com/bangalore/restaurants", "_blank");
      } else if (platform === "swiggy") {
        window.open("https://www.swiggy.com/bangalore", "_blank");
      }
    }
  };

  return (
    <section id="menu" className="py-20 bg-white dark:bg-[#000042] theme-transition">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-poppins font-bold text-4xl text-[#000042] dark:text-white mb-4">
            Our <span className="text-[#FFDE6A]">Menu</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover our selection of delicious food and beverages, prepared with care using only the finest ingredients.
          </p>
        </div>
        
        {/* Menu Categories Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["tea", "sandwiches", "burgers", "drinks", "softdrinks"].map((category) => (
            <Button
              key={category}
              onClick={() => handleCategoryChange(category as MenuCategory)}
              className={`px-5 py-2 rounded-full font-poppins font-medium ${
                selectedCategory === category 
                  ? "bg-[#FFDE6A] text-[#000042]" 
                  : "bg-gray-200 dark:bg-[#000042]/60 text-[#000042] dark:text-white hover:bg-[#FFDE6A] hover:text-[#000042]"
              } transition`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Button>
          ))}
        </div>
        
        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {isLoading ? (
            // Show skeleton loaders while loading
            Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="bg-white dark:bg-[#000042]/80 rounded-xl shadow-lg overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-1/2 mb-3" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          ) : error ? (
            // Show error message
            <div className="col-span-3 text-center text-red-500">
              <p>Failed to load menu items. Please try again later.</p>
            </div>
          ) : (
            // Show menu items
            menuItems.map((item: MenuItem, index: number) => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                delay={(index * 0.1).toString()}
              />
            ))
          )}
        </div>
        
        {/* Order Options */}
        <div className="mt-16 bg-gray-100 dark:bg-[#000042]/60 rounded-2xl p-8" data-scroll-animation="slide-up">
          <h3 className="font-poppins font-bold text-2xl text-[#000042] dark:text-white mb-6 text-center">Ready to Order?</h3>
          
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <DeliveryOption type="pickup" onOrderClick={handleOrder} />
            <DeliveryOption type="delivery" onOrderClick={handleOrder} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuSection;
