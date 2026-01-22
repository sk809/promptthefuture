import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Building2, ExternalLink } from 'lucide-react';

interface Sponsor {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
  tier: string | null;
}

const SponsorsSection = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        const { data, error } = await supabase
          .from('sponsors')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setSponsors(data || []);
      } catch (error) {
        console.error('Error fetching sponsors:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (isLoading) {
    return null;
  }

  if (sponsors.length === 0) {
    return null;
  }

  // Group sponsors by tier
  const platinumSponsors = sponsors.filter(s => s.tier === 'platinum');
  const goldSponsors = sponsors.filter(s => s.tier === 'gold');
  const silverSponsors = sponsors.filter(s => s.tier === 'silver');
  const standardSponsors = sponsors.filter(s => !s.tier || s.tier === 'standard');

  const SponsorCard = ({ sponsor, size = 'default' }: { sponsor: Sponsor; size?: 'large' | 'default' | 'small' }) => {
    const sizeClasses = {
      large: 'w-40 h-40',
      default: 'w-28 h-28',
      small: 'w-20 h-20',
    };

    return (
      <a
        href={sponsor.website_url || '#'}
        target={sponsor.website_url ? '_blank' : undefined}
        rel="noopener noreferrer"
        className="glass-card p-4 rounded-xl flex flex-col items-center justify-center gap-3 hover:border-primary/50 transition-all duration-300 group"
      >
        {sponsor.logo_url ? (
          <img
            src={sponsor.logo_url}
            alt={sponsor.name}
            className={`${sizeClasses[size]} object-contain`}
          />
        ) : (
          <div className={`${sizeClasses[size]} bg-white rounded-lg flex items-center justify-center`}>
            <Building2 className="w-12 h-12 text-muted-foreground" />
          </div>
        )}
        <span className="text-sm font-medium text-foreground text-center">{sponsor.name}</span>
        {sponsor.website_url && (
          <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </a>
    );
  };

  const TierSection = ({ title, sponsors, size }: { title: string; sponsors: Sponsor[]; size: 'large' | 'default' | 'small' }) => {
    if (sponsors.length === 0) return null;

    return (
      <div className="mb-12 last:mb-0">
        <h3 className="text-xl font-semibold text-center mb-6 gradient-text">{title}</h3>
        <div className="flex flex-wrap justify-center gap-6">
          {sponsors.map(sponsor => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} size={size} />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="sponsors" className="py-20 bg-background relative overflow-hidden">
      {/* Ambient glow effects */}
      <div className="absolute top-1/3 -right-32 w-64 h-64 bg-gradient-blue/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 -left-32 w-64 h-64 bg-gradient-purple/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-display mb-4">
            <span className="gradient-text">Our Sponsors</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Powered by amazing companies who believe in the future of tech.
          </p>
        </div>

        <TierSection title="Platinum Sponsors" sponsors={platinumSponsors} size="large" />
        <TierSection title="Gold Sponsors" sponsors={goldSponsors} size="default" />
        <TierSection title="Silver Sponsors" sponsors={silverSponsors} size="small" />
        {standardSponsors.length > 0 && (
          <TierSection title="Partners" sponsors={standardSponsors} size="small" />
        )}
      </div>
    </section>
  );
};

export default SponsorsSection;
