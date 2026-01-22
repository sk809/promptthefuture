import { Calendar, Clock, MapPin } from 'lucide-react';
import DisplayCards from '@/components/ui/display-cards';

const ScheduleSection = () => {
  const scheduleCards = [
    {
      icon: <Calendar className="size-6 text-primary-foreground" />,
      title: "Date",
      description: "19 – 20 February",
      iconClassName: "from-gradient-purple to-gradient-pink",
      className:
        "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <Clock className="size-6 text-primary-foreground" />,
      title: "Duration",
      description: "24 Hours",
      subDescription: "Reporting: 9:00 AM sharp",
      iconClassName: "from-gradient-pink to-gradient-blue",
      className:
        "[grid-area:stack] translate-x-12 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      icon: <MapPin className="size-6 text-primary-foreground" />,
      title: "Venue",
      description: "Gulzar Group of Institutes",
      iconClassName: "from-gradient-blue to-gradient-purple",
      className:
        "[grid-area:stack] translate-x-24 translate-y-20 hover:translate-y-10",
    },
  ];

  return (
    <section id="schedule" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Schedule & Venue</span>
          </h2>
        </div>

        <div className="flex justify-center min-h-[400px]">
          <DisplayCards cards={scheduleCards} />
        </div>
      </div>
    </section>
  );
};

export default ScheduleSection;
