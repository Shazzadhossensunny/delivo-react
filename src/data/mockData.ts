// Delivo Mock Data - Complete dummy data for the food delivery app

export interface Category {
  id: string;
  name: string;
  icon: string;
  count?: number;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  deliveryTime: string;
  distance: string;
  restaurant: string;
  category: string;
  isPopular?: boolean;
  isFavorite?: boolean;
  sizes?: { name: string; price: number }[];
  addons?: { name: string; price: number; selected?: boolean }[];
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  distance: string;
  categories: string[];
}

export interface OnboardingSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

// Categories
export const categories: Category[] = [
  { id: "all", name: "All", icon: "🍽️", count: 120 },
  { id: "burger", name: "Burgers", icon: "🍔", count: 25 },
  { id: "pizza", name: "Pizza", icon: "🍕", count: 18 },
  { id: "cookies", name: "Cookies", icon: "🍪", count: 12 },
  { id: "drinks", name: "Drinks", icon: "🥤", count: 30 },
  { id: "dessert", name: "Desserts", icon: "🍰", count: 15 },
  { id: "asian", name: "Asian", icon: "🍜", count: 22 },
  { id: "mexican", name: "Mexican", icon: "🌮", count: 14 },
];

// Food Items with Unsplash images
export const foodItems: FoodItem[] = [
  {
    id: "1",
    name: "Classic Cheese Burger",
    description:
      "Juicy beef patty with melted cheddar cheese, fresh lettuce, tomatoes, pickles, and our signature sauce on a toasted brioche bun.",
    price: 8.99,
    originalPrice: 12.99,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 234,
    deliveryTime: "15-20 min",
    distance: "1.2 km",
    restaurant: "Burger Kingdom",
    category: "burger",
    isPopular: true,
    sizes: [
      { name: "S", price: 0 },
      { name: "M", price: 2 },
      { name: "L", price: 4 },
      { name: "XL", price: 6 },
    ],
    addons: [
      { name: "Extra Cheese", price: 1.5 },
      { name: "Bacon", price: 2.0 },
      { name: "Jalapeños", price: 0.75 },
      { name: "Onion Rings", price: 1.25 },
    ],
  },
  {
    id: "2",
    name: "Pepperoni Pizza",
    description:
      "Hand-tossed pizza with premium pepperoni, mozzarella cheese, and our homemade tomato sauce.",
    price: 14.99,
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 456,
    deliveryTime: "25-30 min",
    distance: "2.1 km",
    restaurant: "Pizza Palace",
    category: "pizza",
    isPopular: true,
    sizes: [
      { name: "S", price: 0 },
      { name: "M", price: 4 },
      { name: "L", price: 8 },
      { name: "XL", price: 12 },
    ],
    addons: [
      { name: "Extra Pepperoni", price: 2.5 },
      { name: "Mushrooms", price: 1.5 },
      { name: "Olives", price: 1.0 },
      { name: "Bell Peppers", price: 1.0 },
    ],
  },
  {
    id: "3",
    name: "Chocolate Chip Cookies",
    description:
      "Freshly baked chocolate chip cookies, crispy on the outside and gooey on the inside.",
    price: 4.99,
    image:
      "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 189,
    deliveryTime: "10-15 min",
    distance: "0.8 km",
    restaurant: "Sweet Treats",
    category: "cookies",
    isPopular: true,
  },
  {
    id: "4",
    name: "Double Bacon Burger",
    description:
      "Two beef patties with crispy bacon, American cheese, lettuce, and BBQ sauce.",
    price: 11.99,
    originalPrice: 15.99,
    image:
      "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 312,
    deliveryTime: "15-20 min",
    distance: "1.5 km",
    restaurant: "Burger Kingdom",
    category: "burger",
    sizes: [
      { name: "S", price: 0 },
      { name: "M", price: 3 },
      { name: "L", price: 5 },
      { name: "XL", price: 7 },
    ],
    addons: [
      { name: "Extra Bacon", price: 2.5 },
      { name: "Fried Egg", price: 1.5 },
      { name: "Avocado", price: 2.0 },
    ],
  },
  {
    id: "5",
    name: "Margherita Pizza",
    description:
      "Classic Italian pizza with fresh mozzarella, tomatoes, and basil on a thin crust.",
    price: 12.99,
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 278,
    deliveryTime: "20-25 min",
    distance: "2.0 km",
    restaurant: "Pizza Palace",
    category: "pizza",
  },
  {
    id: "6",
    name: "Strawberry Milkshake",
    description:
      "Creamy milkshake made with fresh strawberries and vanilla ice cream.",
    price: 5.99,
    image:
      "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?w=400&h=300&fit=crop",
    rating: 4.5,
    reviews: 156,
    deliveryTime: "5-10 min",
    distance: "0.5 km",
    restaurant: "Shake Shack",
    category: "drinks",
  },
  {
    id: "7",
    name: "Chicken Tacos",
    description:
      "Three soft corn tortillas filled with grilled chicken, salsa, and fresh cilantro.",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=400&h=300&fit=crop",
    rating: 4.7,
    reviews: 203,
    deliveryTime: "15-20 min",
    distance: "1.8 km",
    restaurant: "Taco Fiesta",
    category: "mexican",
  },
  {
    id: "8",
    name: "Pad Thai",
    description:
      "Traditional Thai stir-fried rice noodles with shrimp, eggs, peanuts, and lime.",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&h=300&fit=crop",
    rating: 4.9,
    reviews: 345,
    deliveryTime: "20-25 min",
    distance: "2.5 km",
    restaurant: "Thai Garden",
    category: "asian",
    isPopular: true,
  },
  {
    id: "9",
    name: "Tiramisu",
    description:
      "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cream.",
    price: 7.99,
    image:
      "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop",
    rating: 4.8,
    reviews: 167,
    deliveryTime: "10-15 min",
    distance: "1.0 km",
    restaurant: "Sweet Treats",
    category: "dessert",
  },
  {
    id: "10",
    name: "Veggie Supreme Pizza",
    description:
      "Loaded with bell peppers, mushrooms, onions, olives, and tomatoes on a thick crust.",
    price: 13.99,
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop",
    rating: 4.6,
    reviews: 198,
    deliveryTime: "25-30 min",
    distance: "2.3 km",
    restaurant: "Pizza Palace",
    category: "pizza",
  },
];

// Onboarding slides
export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: "Delivo",
    subtitle: "We serve incomparable delicacies",
    description:
      "All the best restaurants with their top menu waiting for you, they can't wait for your order!",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1200&fit=crop",
  },
  {
    id: 2,
    title: "Delivo",
    subtitle: "Best quality ingredients for you",
    description:
      "We carefully select the freshest ingredients to ensure every meal is perfect for you.",
    image:
      "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=800&h=1200&fit=crop",
  },
  {
    id: 3,
    title: "Delivo",
    subtitle: "Fast delivery to your doorstep",
    description:
      "Hot, fresh food delivered in minutes. Track your order in real-time and enjoy hassle-free delivery.",
    image:
      "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&h=1200&fit=crop",
  },
];

// Popular searches
export const popularSearches = [
  "Burger",
  "Pizza",
  "Sushi",
  "Tacos",
  "Pasta",
  "Salad",
  "Ice Cream",
  "Coffee",
];

// Filter options
export const filterOptions = {
  priceRange: { min: 0, max: 50 },
  distances: [
    { label: "Less than 1 KM", value: 1 },
    { label: "1 - 5 KM", value: 5 },
    { label: "5 - 10 KM", value: 10 },
    { label: "More than 10 KM", value: 999 },
  ],
  ratings: [
    { label: "4.5+", value: 4.5 },
    { label: "4.0+", value: 4.0 },
    { label: "3.5+", value: 3.5 },
    { label: "3.0+", value: 3.0 },
  ],
  sortOptions: [
    { label: "Recommended", value: "recommended" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
    { label: "Rating", value: "rating" },
    { label: "Delivery Time", value: "delivery_time" },
  ],
};

// User profile mock
export const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 234 567 890",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
  },
};

// Countries for phone input
export const countries = [
  { code: "US", name: "United States", dialCode: "+1", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", dialCode: "+44", flag: "🇬🇧" },
  { code: "CA", name: "Canada", dialCode: "+1", flag: "🇨🇦" },
  { code: "AU", name: "Australia", dialCode: "+61", flag: "🇦🇺" },
  { code: "DE", name: "Germany", dialCode: "+49", flag: "🇩🇪" },
  { code: "FR", name: "France", dialCode: "+33", flag: "🇫🇷" },
  { code: "IN", name: "India", dialCode: "+91", flag: "🇮🇳" },
  { code: "JP", name: "Japan", dialCode: "+81", flag: "🇯🇵" },
  { code: "BR", name: "Brazil", dialCode: "+55", flag: "🇧🇷" },
  { code: "MX", name: "Mexico", dialCode: "+52", flag: "🇲🇽" },
];

// Cart helper functions
export const calculateCartTotal = (
  items: {
    item: FoodItem;
    quantity: number;
    size?: string;
    addons?: string[];
  }[],
) => {
  return items.reduce((total, cartItem) => {
    let itemPrice = cartItem.item.price;

    // Add size price
    if (cartItem.size && cartItem.item.sizes) {
      const sizeOption = cartItem.item.sizes.find(
        (s) => s.name === cartItem.size,
      );
      if (sizeOption) itemPrice += sizeOption.price;
    }

    // Add addons price
    if (cartItem.addons && cartItem.item.addons) {
      cartItem.addons.forEach((addonName) => {
        const addon = cartItem.item.addons?.find((a) => a.name === addonName);
        if (addon) itemPrice += addon.price;
      });
    }

    return total + itemPrice * cartItem.quantity;
  }, 0);
};

// Format price helper
export const formatPrice = (price: number) => {
  return `$${price.toFixed(2)}`;
};

// Get discount percentage
export const getDiscountPercentage = (
  originalPrice: number,
  currentPrice: number,
) => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
