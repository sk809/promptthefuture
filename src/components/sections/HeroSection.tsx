import { ChevronDown } from 'lucide-react';
import AnimatedShaderBackground from '@/components/ui/AnimatedShaderBackground';
import { Button } from '@/components/ui/button';
import { ShimmerButton } from '@/components/ui/shimmer-button';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedShaderBackground />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-background/40" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pointer-events-auto">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Date Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-gradient-pink animate-pulse-glow" />
            <span className="text-sm font-medium text-muted-foreground">
              19 – 20 February • 24 Hours
            </span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display tracking-tight animate-slide-up">
            <span className="gradient-text text-glow">PROMPT THE FUTURE</span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 font-light animate-slide-up delay-100">
            Where we build what matters
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-slide-up delay-200">
            24-Hour Vibe Coding Hackathon — Two days full of chaos and creativity
          </p>

          {/* Tagline */}
          <p className="text-sm md:text-base text-primary font-medium tracking-widest uppercase animate-slide-up delay-300">
            Prompt it. Build it. Showcase it.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center pt-4 animate-slide-up delay-400">
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSfvogyfhIzO5ORYlpK72nTJ8Vb__9oEohW4Yh98bnegDQXNXA/viewform?usp=header" target="_blank" rel="noopener noreferrer">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Register Now — ₹500/team
              </Button>
            </a>
          </div>

          {/* Prize Pool */}
          <div className="pt-8 animate-slide-up delay-500">
            <p className="text-muted-foreground text-sm mb-2">Total Prize Pool</p>
            <p className="text-4xl md:text-5xl font-bold gradient-text">₹50,000</p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
        <a href="#overview" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
