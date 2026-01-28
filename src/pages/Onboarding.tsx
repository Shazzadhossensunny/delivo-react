import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useSwipe } from "@/hooks/useSwipe";
import { useOnboardingStatus } from "@/hooks/useLocalStorage";
import { onboardingSlides } from "@/data/mockData";
import { DelivoButton } from "@/components/common/Button";
import { cn } from "@/lib/utils";

export default function Onboarding() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { setHasSeenOnboarding } = useOnboardingStatus();
  const isLastSlide = currentSlide === onboardingSlides.length - 1;

  const goToNext = useCallback(() => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    }
  }, [currentSlide]);

  const goToPrev = useCallback(() => {
    if (currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1);
    }
  }, [currentSlide]);

  const handleComplete = useCallback(() => {
    setHasSeenOnboarding(true);
    navigate("/signin", { replace: true });
  }, [navigate, setHasSeenOnboarding]);

  const handleSkip = useCallback(() => {
    setHasSeenOnboarding(true);
    navigate("/signin", { replace: true });
  }, [navigate, setHasSeenOnboarding]);

  const swipeHandlers = useSwipe({
    onSwipeLeft: goToNext,
    onSwipeRight: goToPrev,
    threshold: 50,
  });

  const slide = onboardingSlides[currentSlide];

  return (
    <div
      className="min-h-screen bg-background relative overflow-hidden"
      {...swipeHandlers}
    >
      {/* Background Image */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt={slide.subtitle}
            className="w-full h-full object-cover"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Skip button */}
      <div className="absolute top-12 right-5 z-10">
        <button
          onClick={handleSkip}
          className="text-sm text-foreground/80 hover:text-foreground transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pb-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="text-center mb-8"
          >
            {/* Logo */}
            <h1 className="text-3xl font-bold text-foreground mb-2">
              <span className="text-primary">Deli</span>vo
            </h1>

            {/* Subtitle */}
            <h2 className="text-xl font-semibold text-foreground mb-3">
              {slide.subtitle}
            </h2>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
              {slide.description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Pagination dots */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {onboardingSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>

        {/* Action button */}
        <DelivoButton
          onClick={isLastSlide ? handleComplete : goToNext}
          className="w-full h-14"
        >
          {isLastSlide ? "Get Started" : "Continue"}
        </DelivoButton>

        {/* Sign in link */}
        <p className="text-center text-sm text-muted-foreground mt-4">
          Already have an account?{" "}
          <button
            onClick={handleSkip}
            className="text-primary font-semibold hover:underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
