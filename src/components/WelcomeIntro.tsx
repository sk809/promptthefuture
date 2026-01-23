import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WelcomeIntroProps {
  onComplete: () => void;
}

const greetings = [
  { text: "नमस्ते", subtitle: "Namaste" },
  { text: "வணக்கம்", subtitle: "Vanakkam" },
  { text: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ", subtitle: "Sat Sri Akal" },
  { text: "سلام", subtitle: "Salaam" },
  { text: "કેમ છો", subtitle: "Kem Cho" },
  { text: "Hello", subtitle: "" },
];

const WelcomeIntro = ({ onComplete }: WelcomeIntroProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const greetingDuration = 800; // Duration each greeting is shown
  const transitionDuration = 400; // Fade transition duration

  useEffect(() => {
    if (currentIndex < greetings.length) {
      const timer = setTimeout(() => {
        if (currentIndex === greetings.length - 1) {
          // Last greeting, start fade out
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, greetingDuration);
        } else {
          setCurrentIndex((prev) => prev + 1);
        }
      }, greetingDuration + transitionDuration);

      return () => clearTimeout(timer);
    }
  }, [currentIndex, onComplete]);

  const handleSkip = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* Skip Button */}
          <motion.button
            onClick={handleSkip}
            className="absolute top-6 right-6 text-muted-foreground hover:text-foreground text-sm font-medium transition-colors duration-200 px-4 py-2 rounded-full border border-border/50 hover:border-border backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            Skip
          </motion.button>

          {/* Greeting Animation */}
          <div className="relative flex flex-col items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="flex flex-col items-center gap-3"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{
                  duration: 0.5,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {/* Main Greeting Text */}
                <h1
                  className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-bold text-center leading-tight"
                  style={{
                    background: "linear-gradient(135deg, hsl(330 80% 60%) 0%, hsl(270 70% 60%) 50%, hsl(210 90% 55%) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 0 30px hsl(270 70% 60% / 0.4)) drop-shadow(0 0 60px hsl(330 80% 60% / 0.3))",
                  }}
                >
                  {greetings[currentIndex].text}
                </h1>

                {/* Subtitle */}
                {greetings[currentIndex].subtitle && (
                  <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light tracking-wider"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.3 }}
                  >
                    {greetings[currentIndex].subtitle}
                  </motion.p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Subtle glow orbs in background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-20"
                style={{
                  background: "radial-gradient(circle, hsl(270 70% 60% / 0.3) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full opacity-15"
                style={{
                  background: "radial-gradient(circle, hsl(330 80% 60% / 0.4) 0%, transparent 70%)",
                }}
                animate={{
                  scale: [1.1, 1, 1.1],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* Progress indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {greetings.map((_, index) => (
              <motion.div
                key={index}
                className="w-1.5 h-1.5 rounded-full"
                initial={{ opacity: 0.3 }}
                animate={{
                  opacity: index === currentIndex ? 1 : 0.3,
                  scale: index === currentIndex ? 1.2 : 1,
                  backgroundColor: index === currentIndex 
                    ? "hsl(270 70% 60%)" 
                    : "hsl(0 0% 30%)",
                }}
                transition={{ duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeIntro;
