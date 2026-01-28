import { useState } from "react";
import { cn } from "@/lib/utils";
import { categories } from "@/data/mockData";

interface CategoryScrollProps {
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryScroll({
  selectedCategory,
  onCategoryChange,
}: CategoryScrollProps) {
  return (
    <div className="py-4">
      <div className="flex gap-3 overflow-x-auto hide-scrollbar px-5">
        {categories.map((category) => {
          const isActive = selectedCategory === category.id;

          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2.5 rounded-full shrink-0 transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground hover:bg-muted",
              )}
            >
              <span className="text-base">{category.icon}</span>
              <span className="text-sm font-medium">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
