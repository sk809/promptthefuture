import { Helmet } from 'react-helmet-async';
import Navbar from '@/components/sections/Navbar';
import HeroSection from '@/components/sections/HeroSection';
import OverviewSection from '@/components/sections/OverviewSection';
import TeamSection from '@/components/sections/TeamSection';
import ScheduleSection from '@/components/sections/ScheduleSection';
import TimelineSection from '@/components/sections/TimelineSection';
import EvaluationSection from '@/components/sections/EvaluationSection';
import RulesSection from '@/components/sections/RulesSection';
import FAQSection from '@/components/sections/FAQSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/sections/Footer';

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Prompt the Future | 24-Hour AI Hackathon</title>
        <meta 
          name="description" 
          content="Prompt the Future is a 24-hour hackathon focused on AI-first thinking, vibe coding, and real-world problem solving. 12-13 February at Gulzar Group of Institutes. ₹50,000 prize pool." 
        />
        <meta name="keywords" content="hackathon, AI, coding, vibe coding, tech event, Gulzar Group of Institutes" />
      </Helmet>
      
      <Navbar />
      <main className="min-h-screen bg-background overflow-x-hidden">
        <HeroSection />
        <OverviewSection />
        <TeamSection />
        <ScheduleSection />
        <TimelineSection />
        <EvaluationSection />
        <RulesSection />
        <FAQSection />
        <CTASection />
        <Footer />
      </main>
    </>
  );
};

export default Index;
