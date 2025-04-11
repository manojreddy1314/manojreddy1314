export type MenuCategory = "tea" | "sandwiches" | "burgers" | "drinks" | "softdrinks";

export interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
}

export const menuItems: MenuItem[] = [
  // Tea Category
  {
    id: 1,
    name: "Green Tea",
    description: "Refreshing green tea brewed to perfection, served hot or cold.",
    price: 120,
    image: "https://images.pexels.com/photos/1417945/pexels-photo-1417945.jpeg",
    category: "tea"
  },
  {
    id: 2,
    name: "Masala Chai",
    description: "Traditional Indian spiced tea with ginger, cardamom, and cinnamon.",
    price: 100,
    image: "https://images.pexels.com/photos/5946630/pexels-photo-5946630.jpeg",
    category: "tea"
  },
  {
    id: 3,
    name: "Earl Grey",
    description: "Classic black tea infused with bergamot oil for a fragrant citrus aroma.",
    price: 130,
    image: "https://images.pexels.com/photos/1872895/pexels-photo-1872895.jpeg",
    category: "tea"
  },
  
  // Sandwiches Category
  {
    id: 4,
    name: "Grilled Veggie Sandwich",
    description: "Grilled vegetables with pesto and mozzarella on artisanal bread.",
    price: 220,
    image: "https://images.pexels.com/photos/1647163/pexels-photo-1647163.jpeg",
    category: "sandwiches"
  },
  {
    id: 5,
    name: "Chicken Club Sandwich",
    description: "Triple-decker sandwich with grilled chicken, bacon, and avocado.",
    price: 250,
    image: "https://images.pexels.com/photos/1600711/pexels-photo-1600711.jpeg",
    category: "sandwiches"
  },
  {
    id: 6,
    name: "Mediterranean Wrap",
    description: "Falafel, hummus, and fresh vegetables wrapped in a whole wheat tortilla.",
    price: 200,
    image: "https://images.pexels.com/photos/2955819/pexels-photo-2955819.jpeg",
    category: "sandwiches"
  },
  
  // Burgers Category
  {
    id: 7,
    name: "Classic Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, and signature sauce.",
    price: 280,
    image: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
    category: "burgers"
  },
  {
    id: 8,
    name: "Veggie Burger",
    description: "Plant-based patty with fresh toppings and vegan mayo.",
    price: 240,
    image: "https://images.pexels.com/photos/1251198/pexels-photo-1251198.jpeg",
    category: "burgers"
  },
  {
    id: 9,
    name: "Spicy Chicken Burger",
    description: "Crispy spiced chicken fillet with coleslaw and pickles.",
    price: 260,
    image: "https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg",
    category: "burgers"
  },
  
  // Drinks Category
  {
    id: 10,
    name: "Cappuccino",
    description: "Espresso with steamed milk and velvety foam.",
    price: 150,
    image: "https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg",
    category: "drinks"
  },
  {
    id: 11,
    name: "Cold Brew",
    description: "Smooth, slow-steeped coffee served over ice.",
    price: 170,
    image: "https://images.pexels.com/photos/2128027/pexels-photo-2128027.jpeg",
    category: "drinks"
  },
  {
    id: 12,
    name: "Hot Chocolate",
    description: "Rich chocolate with steamed milk and whipped cream.",
    price: 160,
    image: "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg",
    category: "drinks"
  },
  
  // Soft Drinks Category
  {
    id: 13,
    name: "Fresh Lemonade",
    description: "Freshly squeezed lemons with a hint of mint.",
    price: 120,
    image: "https://images.pexels.com/photos/2109099/pexels-photo-2109099.jpeg",
    category: "softdrinks"
  },
  {
    id: 14,
    name: "Berry Smoothie",
    description: "Mixed berries blended with yogurt and honey.",
    price: 180,
    image: "https://images.pexels.com/photos/1346063/pexels-photo-1346063.jpeg",
    category: "softdrinks"
  },
  {
    id: 15,
    name: "Mango Lassi",
    description: "Creamy yogurt drink with fresh mango and cardamom.",
    price: 140,
    image: "https://images.pexels.com/photos/8963961/pexels-photo-8963961.jpeg",
    category: "softdrinks"
  }
];
