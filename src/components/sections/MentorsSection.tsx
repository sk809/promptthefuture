import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Linkedin, Twitter, User } from 'lucide-react';

interface Mentor {
  id: string;
  name: string;
  designation: string;
  bio: string | null;
  image_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
}

const MentorsSection = () => {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      try {
        const { data, error } = await supabase
          .from('mentors')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setMentors(data || []);
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMentors();
  }, []);

  if (isLoading) {
    return null;
  }

  if (mentors.length === 0) {
    return null;
  }

  return (
    <section id="mentors" className="py-20 bg-background relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-gradient-purple/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-gradient-pink/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Our Mentors</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Learn from industry experts who will guide you through the hackathon journey.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {mentors.map((mentor) => (
            <div
              key={mentor.id}
              className="glass-card p-6 rounded-2xl text-center group hover:border-primary/50 transition-all duration-300"
            >
              <div className="mb-4 relative">
                {mentor.image_url ? (
                  <img
                    src={mentor.image_url}
                    alt={mentor.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto border-2 border-primary/30 group-hover:border-primary transition-colors"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mx-auto border-2 border-primary/30">
                    <User className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-1">{mentor.name}</h3>
              <p className="text-sm text-primary mb-3">{mentor.designation}</p>
              
              {mentor.bio && (
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{mentor.bio}</p>
              )}

              <div className="flex items-center justify-center gap-3">
                {mentor.linkedin_url && (
                  <a
                    href={mentor.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
                {mentor.twitter_url && (
                  <a
                    href={mentor.twitter_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MentorsSection;
