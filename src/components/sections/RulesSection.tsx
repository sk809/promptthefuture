import { AlertTriangle, IdCard, Users, Scale } from 'lucide-react';
const RulesSection = () => {
  const rules = [{
    icon: IdCard,
    text: 'College ID cards are mandatory'
  }, {
    icon: Users,
    text: 'Teams must be present and active in all phases'
  }, {
    icon: AlertTriangle,
    text: 'Mismatch between Ideathon claims and final build may lead to disqualification'
  }, {
    icon: Scale,
    text: "Organizers' and judges' decisions will be final"
  }];
  return <section id="rules" className="py-24 md:py-[80px]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Rules & Guidelines</span>
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-8">
            <ul className="space-y-6">
              {rules.map((rule, index) => <li key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <rule.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-muted-foreground text-lg pt-1.5">{rule.text}</span>
                </li>)}
            </ul>
          </div>

          {/* Eligibility */}
          <div className="mt-8 text-center">
            <h3 className="text-xl font-bold mb-4">Eligibility</h3>
            <p className="text-muted-foreground">
              Open to students, developers, designers, and builders.
              <br />
              Teams from same or different colleges are allowed.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default RulesSection;