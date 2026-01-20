import { Clock } from 'lucide-react';

const TimelineSection = () => {
  const day1Events = [
    { time: "09:00 - 11:00", event: "Registrations", note: "(close strictly at 11:00)" },
    { time: "11:00 - 12:00", event: "Inauguration & Problem Statements Distribution", note: "" },
    { time: "12:00 - 15:00", event: "Round 1", note: "(Hackathon Begins) 🚀" },
    { time: "13:00 - 14:00", event: "Lunch", note: "🍎🥗" },
    { time: "15:00", event: "Round 1 Ends", note: "- First Evaluation (R1 + R2)" },
    { time: "17:00 - 17:30", event: "Snacks / Sponsor Engagement", note: "🍿🧃" },
    { time: "16:00 - 19:00", event: "Round 2", note: "(Continues into Friday) 💻" },
    { time: "20:00 - 21:00", event: "Dinner", note: "" },
  ];

  const day2Events = [
    { time: "05:00 - 07:00", event: "Evaluation & Shortlisting", note: "Top 30 Teams Selected 🏆📊" },
    { time: "08:00", event: "Shortlist Announcement", note: "📢" },
    { time: "09:00 - 10:00", event: "Breakfast", note: "(Top 30 Teams) ☕" },
    { time: "10:30 - 12:30", event: "Final Round Showcase & Pitching", note: "Final Evaluation (R1 + R2 + R3) 🏆📋" },
    { time: "13:00", event: "Hackathon Closes", note: "" },
  ];

  const prizes = [
    { place: "1st Prize", amount: "₹50,000", color: "from-yellow-400 to-amber-500" },
    { place: "2nd Prize", amount: "₹30,000", color: "from-gray-300 to-gray-400" },
    { place: "3rd Prize", amount: "₹20,000", color: "from-amber-600 to-amber-700" },
  ];

  return (
    <section id="timeline" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Hackathon Schedule</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Day 1 */}
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-purple/10 via-gradient-pink/5 to-transparent pointer-events-none" />
            
            <div className="relative">
              <div className="inline-block mb-8">
                <div className="bg-gradient-to-r from-gradient-purple via-gradient-pink to-gradient-pink px-8 py-3 rounded-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-white">DAY 1 — THURSDAY</h3>
                </div>
              </div>

              <div className="space-y-4">
                {day1Events.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gradient-purple to-gradient-pink flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">{item.time}</span>
                        <span className="text-muted-foreground">—</span>
                        <span className="text-lg text-foreground">{item.event}</span>
                        {item.note && (
                          <span className="text-sm text-muted-foreground">{item.note}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Day 2 */}
          <div className="glass-card p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gradient-blue/10 via-gradient-purple/5 to-transparent pointer-events-none" />
            
            <div className="relative">
              <div className="inline-block mb-8">
                <div className="bg-gradient-to-r from-gradient-blue via-gradient-purple to-gradient-purple px-8 py-3 rounded-lg">
                  <h3 className="text-xl md:text-2xl font-bold text-white">DAY 2 — FRIDAY</h3>
                </div>
              </div>

              <div className="space-y-4">
                {day2Events.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-gradient-blue to-gradient-purple flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">{item.time}</span>
                        <span className="text-muted-foreground">—</span>
                        <span className="text-lg text-foreground">{item.event}</span>
                        {item.note && (
                          <span className="text-sm text-muted-foreground">{item.note}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Prize Distribution */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h4 className="text-xl font-bold text-foreground mb-4">🎉 Prize Distribution:</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  {prizes.map((prize, index) => (
                    <div 
                      key={index}
                      className="text-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <p className="text-muted-foreground font-medium mb-2">{prize.place}</p>
                      <p className={`text-2xl md:text-3xl font-bold bg-gradient-to-r ${prize.color} bg-clip-text text-transparent`}>
                        {prize.amount}
                      </p>
                      <p className="text-sm text-muted-foreground">INR</p>
                    </div>
                  ))}
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
