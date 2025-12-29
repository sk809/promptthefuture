import { Star, CheckCircle2, XCircle } from 'lucide-react';

const EvaluationSection = () => {
  const criteria = [
    'Alignment with Ideathon expectations',
    'Real consumer problem relevance',
    'Product functionality and deployment',
    'UI/UX quality and user flow',
    'Clarity of marketing and presentation',
  ];

  return (
    <section id="evaluation" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Evaluation & Scoring</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Judgement is strictly outcome-based, transparent, and fair
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Requirements */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </span>
              Mandatory Requirements
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  Only fully deployed and functional web/mobile applications will be evaluated
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  Final product must match the scope and features defined during Ideathon
                </span>
              </li>
              <li className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-destructive mt-0.5 shrink-0" />
                <span className="text-muted-foreground">
                  Partial builds, mockups, or non-functional prototypes will not be scored
                </span>
              </li>
            </ul>
          </div>

          {/* Criteria */}
          <div className="glass-card p-8">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Star className="w-5 h-5 text-primary" />
              </span>
              Evaluation Parameters
            </h3>
            <ul className="space-y-3">
              {criteria.map((criterion, index) => (
                <li key={index} className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-pink flex items-center justify-center text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <span className="text-muted-foreground">{criterion}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Star Scoring */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="glass-card p-8 text-center">
            <h3 className="text-xl font-bold mb-6">Star-Based Scoring System</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {['Ideathon', 'VibeCode', 'Showcase'].map((phase) => (
                <div key={phase} className="px-6 py-3 rounded-full gradient-border bg-card">
                  <span className="text-foreground font-medium">{phase}</span>
                  <span className="ml-2 text-primary">★★★★★</span>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground mt-6 text-sm">
              Final rankings are based on total stars accumulated across all phases
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EvaluationSection;
