import { Calendar, Clock, MapPin } from 'lucide-react';

const ScheduleSection = () => {
  return (
    <section id="schedule" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Schedule & Venue</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Date */}
          <div className="glass-card p-8 text-center group hover:border-primary/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-purple to-gradient-pink flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Calendar className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Date</h3>
            <p className="text-2xl font-bold text-foreground">19 – 20 February</p>
          </div>

          {/* Duration */}
          <div className="glass-card p-8 text-center group hover:border-primary/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-pink to-gradient-blue flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Clock className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Duration</h3>
            <p className="text-2xl font-bold text-foreground">24 Hours</p>
            <p className="text-sm text-muted-foreground mt-1">Reporting: 9:00 AM sharp</p>
          </div>

          {/* Venue */}
          <div className="glass-card p-8 text-center group hover:border-primary/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gradient-blue to-gradient-purple flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <MapPin className="w-8 h-8 text-primary-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">Venue</h3>
            <p className="text-xl font-bold text-foreground">Gulzar Group of Institutes</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
