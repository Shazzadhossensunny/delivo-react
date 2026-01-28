import { useState, useMemo, Suspense } from "react";
import { motion } from "framer-motion";
import { HomeHeader } from "@/components/home/HomeHeader";
import { CategoryScroll } from "@/components/home/CategoryScroll";
import { FoodCard } from "@/components/home/FoodCard";
import { HotDealCard } from "@/components/home/HotDealCard";
import { AdBanner, SectionHeader } from "@/components/home/AdBanner";
import { BottomNav } from "@/components/layout/BottomNav";
import { HomeSkeleton } from "@/components/common/LoadingSkeleton";
import { foodItems, mockUser } from "@/data/mockData";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoaded, setIsLoaded] = useState(false);

  // Simulate loading
  useState(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  });

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "all") return foodItems;
    return foodItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  // Get super deals (items with discount)
  const superDeals = useMemo(() => {
    return foodItems.filter((item) => item.originalPrice);
  }, []);

  // Get hot deals (popular items)
  const hotDeals = useMemo(() => {
    return filteredItems.slice(0, 5);
  }, [filteredItems]);

  if (!isLoaded) {
    return <HomeSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      {/* Header */}
      <HomeHeader
        userName={mockUser.name.split(" ")[0]}
        userAvatar={mockUser.avatar}
        location={`${mockUser.address.street}, ${mockUser.address.city}`}
        notificationCount={3}
      />

      {/* Categories */}
      <CategoryScroll
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Super Deals Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <SectionHeader title="Super Deals" emoji="🔥" seeAllLink="/deals" />
        <div className="flex gap-4 overflow-x-auto hide-scrollbar px-5 pb-4">
          {superDeals.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
            >
              <FoodCard item={item} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Ad Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="my-6"
      >
        <AdBanner />
      </motion.div>

      {/* Hot Deals Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <SectionHeader title="Hot Deals" emoji="🌶️" seeAllLink="/deals" />
        <div className="px-5 space-y-3">
          {hotDeals.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <HotDealCard item={item} />
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
