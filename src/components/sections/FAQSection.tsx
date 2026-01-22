import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
const FAQSection = () => {
  const faqs = [{
    question: 'Who can enter the Vibe Coding Hackathon?',
    answer: 'The Vibe Coding Hackathon is open to both school and college students. All participants must carry a valid institutional ID card during the event.'
  }, {
    question: 'Do I need a team to participate in the Vibe Coding Hackathon?',
    answer: 'Yes. Participation is strictly team-based. Individual participation is not allowed. Each team must have 2 to 4 members, and a participant cannot be part of more than one team.'
  }, {
    question: 'What should I bring to the Vibe Coding Hackathon venue?',
    answer: 'Participants must bring: A laptop with required development tools installed, chargers and necessary accessories, valid institutional ID card, and any personal essentials required for a 24-hour event. All development work must be carried out during the hackathon.'
  }, {
    question: 'Will the theme and problem statement be given in advance?',
    answer: 'The themes will be announced in advance to help teams prepare and align their skills. However, the exact problem statements will be revealed on the spot at the start of the hackathon. Teams must develop their solutions strictly based on the given problem statement within the declared themes. Pre-prepared or previously developed solutions will not be permitted.'
  }, {
    question: 'Is there an entry fee for the Vibe Coding Hackathon?',
    answer: 'Yes. A registration fee of ₹500 per team is mandatory. The fee covers accommodation, food, and basic logistical arrangements. The registration fee is non-refundable.'
  }, {
    question: "What if I don't know how to code?",
    answer: 'That is not a problem. Teams may include members who contribute through ideation and planning, design and presentation, or research and documentation. However, the team as a whole must be capable of delivering a working prototype during the hackathon.'
  }, {
    question: 'Will food and accommodation be provided during the Vibe Coding Hackathon?',
    answer: 'Yes. Food and accommodation will be provided for registered participants as part of the event, covered under the registration fee.'
  }, {
    question: 'Can I use existing code or projects in the Vibe Coding Hackathon?',
    answer: 'Use of open-source libraries, frameworks, and tools is permitted. However, pre-built or previously developed full projects are strictly prohibited. All core development must happen during the hackathon. Violation of this rule will result in disqualification.'
  }, {
    question: 'How are teams eliminated in the Vibe Coding Hackathon?',
    answer: 'Team performance is evaluated cumulatively across all rounds of the hackathon. Each round contributes to a team\'s overall score, calculated using a marks and star-based evaluation system. Eliminations are not announced after every round. Instead, scores are accumulated throughout the event, final rankings are declared on the final day, and the top-performing teams are selected based on total marks and star ratings. Winners are declared based on final scores. Eliminations are strictly performance-based.'
  }, {
    question: 'Are inter-college teams allowed in the Vibe Coding Hackathon?',
    answer: 'Yes. Inter-college teams are allowed, provided all members meet eligibility requirements and are registered correctly on both platforms.'
  }, {
    question: 'Are there age restrictions for participants in the Vibe Coding Hackathon?',
    answer: 'There is no specific age limit. Participants must be school or college students and carry a valid institutional ID.'
  }];
  return <section id="faq" className="py-24 relative md:py-[80px]">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold font-display mb-6">
            <span className="gradient-text">Frequently Asked Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Got questions? We've got answers.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-6 md:p-8">
            <Accordion type="single" collapsible className="w-full space-y-2">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-white/10 rounded-lg px-4 bg-background/30 backdrop-blur-sm data-[state=open]:border-primary/50 transition-colors">
                  <AccordionTrigger className="text-left hover:no-underline py-4 text-foreground font-medium">
                    <span className="flex items-start gap-3">
                      <span className="text-primary font-bold shrink-0">
                        Q{index + 1}.
                      </span>
                      <span>{faq.question}</span>
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-4 pl-9">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </div>
    </section>;
};
export default FAQSection;