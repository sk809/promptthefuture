import { Users, Palette, Code, Megaphone } from 'lucide-react';

const TeamSection = () => {
  const roles = [
    {
      icon: Megaphone,
      title: 'Marketer',
      description: 'Consumer insights, positioning, and final pitch',
      required: true,
    },
    {
      icon: Palette,
      title: 'UI/UX Designer',
      description: 'User experience and interface design',
      required: true,
    },
    {
      icon: Code,
      title: 'Vibe Coder',
      description: 'Technical development and deployment',
      required: true,
    },
    {
      icon: Users,
      title: 'Flex Role',
      description: "Role of the team's choice",
      required: false,
    },
  ];

  return (
    <section id="team" className="py-24 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Build Your Dream Team</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Team size: <span className="text-foreground font-semibold">2–4 members</span>
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {roles.map((role, index) => (
            <div
              key={role.title}
              className="glass-card p-6 text-center group hover:border-primary/50 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative mx-auto mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gradient-purple via-gradient-pink to-gradient-blue p-[2px] mx-auto">
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <role.icon className="w-7 h-7 text-primary" />
                  </div>
                </div>
                {role.required && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold text-accent-foreground">
                    ★
                  </span>
                )}
              </div>
              <h3 className="font-bold text-lg mb-2">{role.title}</h3>
              <p className="text-sm text-muted-foreground">{role.description}</p>
              {role.required && (
                <span className="inline-block mt-3 text-xs text-primary font-medium uppercase tracking-wider">
                  Required
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-muted-foreground mt-8 text-sm">
          Assigned roles must be clearly mentioned while filling the registration form
        </p>
      </div>
    </section>
  );
};

export default TeamSection;
