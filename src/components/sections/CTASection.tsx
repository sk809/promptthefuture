import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CTASection = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
      <div className="max-w-4xl mx-auto text-center">
          {/* Mandatory Registration Notice - Top */}
          <div className="mb-6 inline-block">
            <p className="text-base md:text-lg font-semibold gradient-text px-4 py-2 rounded-lg border border-primary/30 bg-primary/5">
              It is mandatory to fill both Google Form and Devfolio for registration
            </p>
          </div>

          {/* Prize Highlight */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card border-primary/30 mb-8">
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium">
              Win from a prize pool worth <span className="text-primary font-bold">₹1,00,000</span>
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display mb-6">
            <span className="gradient-text">Ready to Shape the Future?</span>
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Gather your team, bring your ideas, and build something extraordinary in 24 hours.
          </p>

          {/* Registration Info */}
          <div className="glass-card inline-block p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="text-center md:text-left">
                <p className="text-sm text-muted-foreground mb-1">Registration Fee</p>
                <p className="text-3xl font-bold text-foreground">₹500<span className="text-lg text-muted-foreground">/team</span></p>
              </div>
              <div className="hidden md:block w-px h-12 bg-border" />
              <p className="text-sm text-muted-foreground max-w-xs">
                Fee covers food and accommodation for the entire 24-hour event
              </p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="gradient" size="xl" className="group">
              Register Your Team
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Mandatory Registration Notice */}
          <div className="mt-8 inline-block">
            <p className="text-base md:text-lg font-semibold gradient-text px-4 py-2 rounded-lg border border-primary/30 bg-primary/5">
              It is mandatory to fill both Google Form and Devfolio for registration
            </p>
          </div>

          {/* Tagline */}
          <p className="mt-12 text-primary font-medium tracking-widest uppercase text-sm">
            Prompt it. Build it. Showcase it.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
