import { Calendar, FileText, Users, CheckCircle, Clock, Rocket, Coffee, Presentation, Trophy, PartyPopper, Utensils, Megaphone } from 'lucide-react';
const TimelineSection = () => {
  const day1Events = [{
    time: "09:00 - 11:00",
    event: "Registrations",
    description: "Registration closes strictly at 11:00",
    tag: "CHECK-IN",
    icon: Users
  }, {
    time: "11:00 - 12:00",
    event: "Inauguration & Problem Statements Distribution",
    description: "Opening ceremony and problem statement reveal",
    tag: "CEREMONY",
    icon: Calendar
  }, {
    time: "12:00 - 15:00",
    event: "Round 1 (Hackathon Begins) 🚀",
    description: "The coding marathon officially kicks off",
    tag: "ROUND 1",
    icon: Rocket
  }, {
    time: "13:00 - 14:00",
    event: "Lunch 🍎🥭",
    description: "Refuel and recharge",
    tag: "BREAK",
    icon: Utensils
  }, {
    time: "15:00",
    event: "Round 1 Ends - First Evaluation (R1 + R2)",
    description: "First round submissions and evaluation begins",
    tag: "EVALUATION",
    icon: CheckCircle
  }, {
    time: "17:00 - 17:30",
    event: "Snacks / Sponsor Engagement 🧃🍕",
    description: "Networking with sponsors and snack break",
    tag: "NETWORKING",
    icon: Coffee
  }, {
    time: "16:00 - 19:00",
    event: "Round 2 (Continues into Friday) 🍿",
    description: "Second round of development continues overnight",
    tag: "ROUND 2",
    icon: Clock
  }, {
    time: "20:00 - 21:00",
    event: "Dinner",
    description: "Dinner break for all participants",
    tag: "BREAK",
    icon: Utensils
  }];
  const day2Events = [{
    time: "05:00 - 07:00",
    event: "Evaluation & Shortlisting 🧪📊",
    description: "Top 30 Teams Selected",
    tag: "SHORTLISTING",
    icon: CheckCircle
  }, {
    time: "08:00",
    event: "Shortlist Announcement 📢",
    description: "Top 30 teams announced",
    tag: "ANNOUNCEMENT",
    icon: Megaphone
  }, {
    time: "09:00 - 10:00",
    event: "Breakfast (Top 30 Teams) ☕",
    description: "Breakfast for shortlisted teams",
    tag: "BREAK",
    icon: Coffee
  }, {
    time: "10:30 - 12:30",
    event: "Final Round Showcase & Pitching 🏆📋",
    description: "Final Evaluation (R1 + R2 + R3)",
    tag: "FINAL ROUND",
    icon: Presentation
  }, {
    time: "13:00",
    event: "Hackathon Closes",
    description: "The coding battle concludes",
    tag: "FINALE",
    icon: Trophy
  }];
  const prizes = [{
    place: "1st Prize",
    title: "CHAMPION",
    amount: "₹50,000",
    color: "from-yellow-300 via-yellow-400 to-amber-500",
    glow: "shadow-[0_0_30px_rgba(250,204,21,0.5)]"
  }, {
    place: "2nd Prize",
    title: "SILVER SURVIVOR",
    amount: "₹30,000",
    color: "from-slate-200 via-slate-300 to-slate-400",
    glow: "shadow-[0_0_30px_rgba(203,213,225,0.4)]"
  }, {
    place: "3rd Prize",
    title: "BRONZE WARRIOR",
    amount: "₹20,000",
    color: "from-amber-500 via-orange-500 to-amber-600",
    glow: "shadow-[0_0_30px_rgba(245,158,11,0.4)]"
  }];
  return <section id="timeline" className="py-24 relative overflow-hidden md:py-[100px]">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-gradient-purple/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-gradient-pink/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-blue/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Hackathon Schedule</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Complete competition schedule from registration to grand finale
          </p>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {/* Phase 1 Card */}
          <div className="relative group">
            {/* Neon border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-purple via-gradient-pink to-gradient-purple rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-purple via-gradient-pink to-gradient-purple rounded-2xl opacity-50" />
            
            <div className="relative bg-background/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-purple/10 via-transparent to-gradient-pink/5 pointer-events-none" />
              
              {/* Phase Header */}
              <div className="relative mb-8">
                <div className="inline-flex items-center">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gradient-pink to-gradient-purple rounded-lg blur opacity-75" />
                    <div className="relative bg-gradient-to-r from-gradient-pink via-gradient-purple to-gradient-pink px-6 md:px-8 py-2 md:py-3 rounded-lg border border-white/20">
                      <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide">DAY 1 – THURSDAY</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical glowing line */}
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-pink via-gradient-purple to-gradient-blue" />
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gradient-pink via-gradient-purple to-gradient-blue blur-sm" />

                <div className="space-y-6">
                  {day1Events.map((item, index) => {
                  const IconComponent = item.icon;
                  return <div key={index} className="flex items-start gap-4 md:gap-6 py-3 group/item hover:bg-white/5 rounded-xl transition-all px-2 -mx-2">
                        {/* Timeline node */}
                        <div className="relative flex-shrink-0 z-10 mt-1">
                          <div className="absolute inset-0 bg-gradient-to-br from-gradient-pink to-gradient-purple rounded-full blur-md opacity-60 group-hover/item:opacity-100 transition-opacity" />
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gradient-pink to-gradient-purple flex items-center justify-center border-2 border-white/30 group-hover/item:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                              {item.time}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-gradient-pink/20 text-gradient-pink border border-gradient-pink/30 font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <h4 className="text-lg md:text-xl font-semibold text-foreground">
                            {item.event}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>;
                })}
                </div>
              </div>
            </div>
          </div>

          {/* Phase 2 Card */}
          <div className="relative group">
            {/* Neon border glow */}
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-blue rounded-2xl opacity-75 blur-sm group-hover:opacity-100 transition-opacity" />
            <div className="absolute -inset-[1px] bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-blue rounded-2xl opacity-50" />
            
            <div className="relative bg-background/90 backdrop-blur-xl rounded-2xl p-6 md:p-8 overflow-hidden">
              {/* Inner gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-gradient-blue/10 via-transparent to-gradient-purple/5 pointer-events-none" />
              
              {/* Phase Header */}
              <div className="relative mb-8">
                <div className="inline-flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-gradient-blue to-gradient-purple rounded-lg blur opacity-75" />
                    <div className="relative bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-blue px-6 md:px-8 py-2 md:py-3 rounded-lg border border-white/20">
                      <h3 className="text-lg md:text-2xl font-bold text-white tracking-wide">DAY 2 – FRIDAY</h3>
                    </div>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical glowing line */}
                <div className="absolute left-5 top-0 bottom-24 w-0.5 bg-gradient-to-b from-gradient-blue via-gradient-purple to-gradient-pink" />
                <div className="absolute left-5 top-0 bottom-24 w-0.5 bg-gradient-to-b from-gradient-blue via-gradient-purple to-gradient-pink blur-sm" />

                <div className="space-y-4">
                  {day2Events.map((item, index) => {
                  const IconComponent = item.icon;
                  return <div key={index} className="flex items-start gap-4 md:gap-6 py-3 group/item hover:bg-white/5 rounded-xl transition-all px-2 -mx-2">
                        {/* Timeline node */}
                        <div className="relative flex-shrink-0 z-10 mt-1">
                          <div className="absolute inset-0 bg-gradient-to-br from-gradient-blue to-gradient-purple rounded-full blur-md opacity-60 group-hover/item:opacity-100 transition-opacity" />
                          <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gradient-blue to-gradient-purple flex items-center justify-center border-2 border-white/30 group-hover/item:scale-110 transition-transform">
                            <IconComponent className="w-4 h-4 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center gap-3">
                            <span className="text-base md:text-lg font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                              {item.time}
                            </span>
                            <span className="text-xs px-2 py-1 rounded-full bg-gradient-blue/20 text-gradient-blue border border-gradient-blue/30 font-medium">
                              {item.tag}
                            </span>
                          </div>
                          <h4 className="text-base md:text-lg font-semibold text-foreground">
                            {item.event}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>;
                })}
                </div>

                {/* Prize Distribution */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-gradient-pink to-gradient-purple rounded-full blur-md opacity-80" />
                      <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-gradient-pink to-gradient-purple flex items-center justify-center border-2 border-white/30">
                        <PartyPopper className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <span className="text-xl font-bold text-foreground">Prize Distribution</span>
                  </div>

                  {/* Prize Cards */}
                  <div className="grid gap-4 md:gap-6 md:grid-cols-3 ml-0 md:ml-14">
                    {prizes.map((prize, index) => <div key={index} className={`relative group/prize ${prize.glow} rounded-xl transition-all hover:scale-[1.02]`}>
                        <div className={`absolute -inset-[1px] bg-gradient-to-r ${prize.color} rounded-xl opacity-40 blur-sm`} />
                        <div className="relative bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-white/10 text-center space-y-2">
                          <Trophy className="w-8 h-8 mx-auto" style={{
                        color: index === 0 ? '#fbbf24' : index === 1 ? '#94a3b8' : '#f59e0b'
                      }} />
                          <p className="text-xs text-muted-foreground uppercase tracking-wider">{prize.title}</p>
                          <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent`}>
                            {prize.amount}
                          </p>
                          <p className="text-sm text-muted-foreground">{prize.place}</p>
                        </div>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default TimelineSection;