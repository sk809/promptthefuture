import { ChevronDown } from 'lucide-react';
import AnimatedShaderBackground from '@/components/ui/AnimatedShaderBackground';
import { Button } from '@/components/ui/button';
import { SplineScene } from '@/components/ui/splite';
import { Spotlight } from '@/components/ui/spotlight';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Shader Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedShaderBackground />
      </div>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 z-[1] bg-background/40" />
      
      {/* Spotlight effect */}
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(var(--gradient-purple))" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pointer-events-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-4">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left space-y-6 max-w-2xl">
            {/* Date Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-gradient-pink animate-pulse-glow" />
              <span className="text-sm font-medium text-muted-foreground">
                12 – 13 February • 24 Hours
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-display tracking-tight animate-slide-up">
              <span className="gradient-text text-glow">PROMPT THE FUTURE</span>
            </h1>

            {/* Subheading */}
            <p className="text-lg md:text-xl lg:text-2xl text-foreground/90 font-light animate-slide-up delay-100">
              Where we build what matters
            </p>

            {/* Description */}
            <p className="text-base md:text-lg text-muted-foreground animate-slide-up delay-200">
              24-Hour Vibe Coding Hackathon — Two days full of chaos and creativity
            </p>

            {/* Tagline */}
            <p className="text-sm md:text-base text-primary font-medium tracking-widest uppercase animate-slide-up delay-300">
              Prompt it. Build it. Showcase it.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center pt-2 animate-slide-up delay-400">
              <Button variant="gradient" size="lg" className="w-full sm:w-auto">
                Register Now — ₹500/team
              </Button>
              <Button variant="glass" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </div>

            {/* Prize Pool */}
            <div className="pt-4 animate-slide-up delay-500">
              <p className="text-muted-foreground text-sm mb-1">Total Prize Pool</p>
              <p className="text-3xl md:text-4xl font-bold gradient-text">₹50,000</p>
            </div>
          </div>

          {/* Right side - 3D Spline Scene */}
          <div className="flex-1 w-full h-[400px] lg:h-[600px] relative">
            <SplineScene 
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
            />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float z-10">
        <a href="#overview" className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
