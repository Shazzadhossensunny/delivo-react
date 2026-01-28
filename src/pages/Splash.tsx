import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useOnboardingStatus } from "@/hooks/useLocalStorage";

export default function Splash() {
  const navigate = useNavigate();
  const { hasSeenOnboarding } = useOnboardingStatus();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      // Navigate after fade out animation
      setTimeout(() => {
        if (hasSeenOnboarding) {
          navigate("/signin", { replace: true });
        } else {
          navigate("/onboarding", { replace: true });
        }
      }, 300);
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate, hasSeenOnboarding]);

  return (
    <motion.div
      className="min-h-screen bg-background flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center"
      >
        {/* Logo icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-primary flex items-center justify-center shadow-glow"
        >
          <span className="text-5xl">🍔</span>
        </motion.div>

        {/* Logo text */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-4xl font-bold text-foreground mb-2"
        >
          <span className="text-primary">Deli</span>vo
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-muted-foreground text-sm"
        >
          Delicious food delivered fast
        </motion.p>
      </motion.div>

      {/* Loading indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="absolute bottom-20 flex gap-1"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}
