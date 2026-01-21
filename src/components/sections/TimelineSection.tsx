import { Clock, Trophy, Rocket, Coffee, UtensilsCrossed, Users, Presentation, Flag, PartyPopper } from 'lucide-react';

const TimelineSection = () => {
  const day1Events = [
    { time: "09:00 - 11:00", event: "Registrations", note: "(close strictly at 11:00)", icon: Users },
    { time: "11:00 - 12:00", event: "Inauguration & Problem Statements Distribution", note: "", icon: Flag },
    { time: "12:00 - 15:00", event: "Round 1 - Hackathon Begins", note: "🚀", icon: Rocket },
    { time: "13:00 - 14:00", event: "Lunch", note: "🍎🥗", icon: UtensilsCrossed },
    { time: "15:00", event: "Round 1 Ends", note: "- First Evaluation (R1 + R2)", icon: Clock },
    { time: "17:00 - 17:30", event: "Snacks / Sponsor Engagement", note: "🍿🧃", icon: Coffee },
    { time: "16:00 - 19:00", event: "Round 2", note: "(Continues into Friday)", icon: Rocket },
  ];

  const day2Events = [
    { time: "05:00 - 07:00", event: "Evaluation & Shortlisting", note: "🏆📊", icon: Trophy },
    { time: "10:30 - 12:30", event: "Final Pitching & Evaluation", note: "(R1 + R2 + R3)", icon: Presentation },
  ];

  const prizes = [
    { place: "1st Prize", amount: "₹50,000", color: "from-yellow-300 via-yellow-400 to-amber-500", glow: "shadow-[0_0_30px_rgba(250,204,21,0.5)]" },
    { place: "2nd Prize", amount: "₹30,000", color: "from-slate-200 via-slate-300 to-slate-400", glow: "shadow-[0_0_30px_rgba(203,213,225,0.4)]" },
    { place: "3rd Prize", amount: "₹20,000", color: "from-amber-500 via-orange-500 to-amber-600", glow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]" },
  ];

  return (
    <section id="timeline" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-pink/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Hackathon Schedule</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Day 1 Card */}
          <div className="relative group">
            {/* Neon border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-purple via-gradient-pink to-gradient-purple rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-purple via-gradient-pink to-gradient-purple rounded-2xl opacity-50" />
            
            <div className="relative bg-background/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-purple/10 via-transparent to-gradient-pink/5 pointer-events-none" />
              
              {/* Day Header */}
              <div className="relative mb-8">
                <div className="inline-flex items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gradient-pink to-gradient-purple rounded-lg blur opacity-75" />
                    <div className="relative bg-gradient-to-r from-gradient-pink via-gradient-purple to-gradient-pink px-6 md:px-8 py-2 md:py-3 rounded-lg border border-white/20">
                      <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide">DAY 1 — THURSDAY</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical glowing line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-pink via-gradient-purple to-gradient-blue" />
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-pink via-gradient-purple to-gradient-blue blur-sm" />

                <div className="space-y-1">
                  {day1Events.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 md:gap-6 py-3 group/item hover:bg-white/5 rounded-xl transition-all px-2 -mx-2"
                      >
                        {/* Timeline node */}
                        <div className="relative flex-shrink-0 z-10">
                          <div className="absolute inset-0 bg-gradient-to-br from-gradient-pink to-gradient-purple rounded-full blur-md opacity-60 group-hover/item:opacity-100 transition-opacity" />
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gradient-pink to-gradient-purple flex items-center justify-center border-2 border-white/30 group-hover/item:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {item.time}
                          </span>
                          <span className="text-base md:text-lg text-foreground/90">
                            {item.event}
                          </span>
                          {item.note && (
                            <span className="text-sm text-muted-foreground">{item.note}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Day 2 Card */}
          <div className="relative group">
            {/* Neon border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-blue rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-blue rounded-2xl opacity-50" />
            
            <div className="relative bg-background/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-blue/10 via-transparent to-gradient-purple/5 pointer-events-none" />
              
              {/* Day Header */}
              <div className="relative mb-8">
                <div className="inline-flex items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gradient-blue to-gradient-purple rounded-lg blur opacity-75" />
                    <div className="relative bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-blue px-6 md:px-8 py-2 md:py-3 rounded-lg border border-white/20">
                      <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide">DAY 2 — FRIDAY</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical glowing line */}
                <div className="absolute left-5 top-0 bottom-24 w-0.5 bg-gradient-to-b from-gradient-blue via-gradient-purple to-gradient-pink" />
                <div className="absolute left-5 top-0 bottom-24 w-0.5 bg-gradient-to-b from-gradient-blue via-gradient-purple to-gradient-pink blur-sm" />

                <div className="space-y-1">
                  {day2Events.map((item, index) => {
                    const IconComponent = item.icon;
                    return (
                      <div 
                        key={index} 
                        className="flex items-center gap-4 md:gap-6 py-3 group/item hover:bg-white/5 rounded-xl transition-all px-2 -mx-2"
                      >
                        {/* Timeline node */}
                        <div className="relative flex-shrink-0 z-10">
                          <div className="absolute inset-0 bg-gradient-to-br from-gradient-blue to-gradient-purple rounded-full blur-md opacity-60 group-hover/item:opacity-100 transition-opacity" />
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gradient-blue to-gradient-purple flex items-center justify-center border-2 border-white/30 group-hover/item:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                          <span className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {item.time}
                          </span>
                          <span className="text-base md:text-lg text-foreground/90">
                            {item.event}
                          </span>
                          {item.note && (
                            <span className="text-sm text-muted-foreground">{item.note}</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hackathon Closes & Prize Distribution */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-gradient-pink to-gradient-purple rounded-full blur-md opacity-80" />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gradient-pink to-gradient-purple flex items-center justify-center border-2 border-white/30">
                        <PartyPopper className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <span className="text-lg font-bold text-foreground">13:00</span>
                    <span className="text-lg text-foreground">Hackathon Closes:</span>
                  </div>

                  {/* Prize Cards */}
                  <div className="grid gap-4 md:gap-6 ml-14">
                    {prizes.map((prize, index) => (
                      <div 
                        key={index}
                        className={`relative group/prize ${prize.glow} rounded-xl transition-all hover:scale-[1.02]`}
                      >
                        <div className={`absolute -inset-[1px] bg-gradient-to-r ${prize.color} rounded-xl opacity-40 blur-sm`} />
                        <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-white/10 flex items-center gap-4">
                          <Trophy className={`w-6 h-6 bg-gradient-to-r ${prize.color} bg-clip-text`} style={{ color: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : '#f59e0b' }} />
                          <span className="text-base font-medium text-foreground/80">{prize.place}</span>
                          <span className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent`}>
                            {prize.amount}
                          </span>
                          <span className="text-sm text-muted-foreground">INR</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
