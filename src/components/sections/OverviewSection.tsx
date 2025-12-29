import { Brain, Rocket, Trophy } from 'lucide-react';

const OverviewSection = () => {
  return (
    <section id="overview" className="py-24 md:py-32 relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">What is Prompt the Future?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            A 24-hour hackathon focused on AI-first thinking, vibe coding, and real-world problem solving. 
            Build fully functional, user-ready digital products backed by strong consumer insights and clear execution.
          </p>
        </div>

        {/* Three Phases */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {/* Ideathon */}
          <div className="phase-card group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gradient-purple to-gradient-pink flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Brain className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Ideathon</h3>
            <p className="text-muted-foreground leading-relaxed">
              Problem identification and validation. Consumer and market insight analysis. 
              Clear definition of expected features and outcomes.
            </p>
          </div>

          {/* VibeCode */}
          <div className="phase-card group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gradient-pink to-gradient-blue flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Rocket className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">VibeCode</h3>
            <p className="text-muted-foreground leading-relaxed">
              Rapid development using coding, AI tools, and prototyping. 
              Focus on functionality, usability, and deployment readiness.
            </p>
          </div>

          {/* Project Showcase */}
          <div className="phase-card group">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-gradient-blue to-gradient-purple flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-foreground">Showcase</h3>
            <p className="text-muted-foreground leading-relaxed">
              Live demo of the product. Explain how the final build 
              matches the Ideathon plan and delivers real value.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OverviewSection;
