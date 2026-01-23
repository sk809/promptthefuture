import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedShaderBackground from '@/components/ui/AnimatedShaderBackground';
import { Button } from '@/components/ui/button';
import { ParticleTextEffect } from '@/components/ui/particle-text-effect';

const HeroSection = () => {
  const particleWords = ["Hello coders !", "Are you ready To", "Prompt the future"];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedShaderBackground />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-background/40" />
      
      {/* Content with entrance animation synced to intro exit */}
      <motion.div 
        className="relative z-10 container mx-auto px-4 text-center pointer-events-auto"
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        transition={{ 
          duration: 1,
          delay: 0.1,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Date Badge */}
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="w-2 h-2 rounded-full bg-gradient-pink animate-pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground">
              19 – 20 February • 24 Hours
            </span>
          </motion.div>

          {/* Particle Text Effect - Replaces Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <ParticleTextEffect 
              words={particleWords} 
              intervalMs={4000}
              className="min-h-[80px] md:min-h-[120px]"
            />
          </motion.div>

          {/* Subheading */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-foreground/90 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            Where we build what matters
          </motion.p>

          {/* Description */}
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            24-Hour Vibe Coding Hackathon — Two days full of chaos and creativity
          </motion.p>

          {/* Tagline */}
          <motion.p 
            className="text-sm md:text-base text-primary font-medium tracking-widest uppercase"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Prompt it. Build it. Showcase it.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfvogyfhIzO5ORYlpK72nTJ8Vb__9oEohW4Yh98bnegDQXNXA/viewform?usp=header" target="_blank" rel="noopener noreferrer">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Register Now — ₹500/team
              </Button>
            </a>
            <a href="https://drive.google.com/drive/folders/1v2KlicbZSfszDpedRClFsONPmwTPPMLg?usp=sharing" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Preview Rulebook
              </Button>
            </a>
          </motion.div>

          {/* Mandatory Registration Notice */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <p className="text-base md:text-lg font-semibold gradient-text px-4 py-2 rounded-lg border border-primary/30 bg-primary/5 inline-block">
              It is mandatory to fill both Google Form and Devfolio for registration
            </p>
          </motion.div>

          {/* Prize Pool */}
          <motion.div 
            className="pt-8"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 1 }}
          >
            <p className="text-muted-foreground text-sm mb-2">Total Prize Pool Worth</p>
            <p className="text-4xl md:text-5xl font-bold gradient-text">₹1,00,000</p>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <a href="#overview" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors animate-float">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
