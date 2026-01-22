import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminLayout from '@/components/admin/AdminLayout';
import { supabase } from '@/integrations/supabase/client';
import { Users, Building2, Images, ArrowRight } from 'lucide-react';

interface Stats {
  mentors: number;
  sponsors: number;
  eventImages: number;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({ mentors: 0, sponsors: 0, eventImages: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [mentorsRes, sponsorsRes, imagesRes] = await Promise.all([
        supabase.from('mentors').select('id', { count: 'exact', head: true }),
        supabase.from('sponsors').select('id', { count: 'exact', head: true }),
        supabase.from('event_images').select('id', { count: 'exact', head: true }),
      ]);

      setStats({
        mentors: mentorsRes.count || 0,
        sponsors: sponsorsRes.count || 0,
        eventImages: imagesRes.count || 0,
      });
      setIsLoading(false);
    };

    fetchStats();
  }, []);

  const cards = [
    {
      title: 'Mentors',
      count: stats.mentors,
      icon: Users,
      href: '/admin/mentors',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Sponsors',
      count: stats.sponsors,
      icon: Building2,
      href: '/admin/sponsors',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Event Images',
      count: stats.eventImages,
      icon: Images,
      href: '/admin/events',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-display">Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your website content from here.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                to={card.href}
                className="group glass-card p-6 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{card.title}</p>
                    <p className="text-4xl font-bold mt-2">
                      {isLoading ? '...' : card.count}
                    </p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm text-primary group-hover:translate-x-1 transition-transform">
                  Manage <ArrowRight className="w-4 h-4 ml-1" />
                </div>
              </Link>
            );
          })}
        </div>

        <div className="glass-card p-6 rounded-xl border border-border/50">
          <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-primary mt-2" />
              <span>All changes are saved automatically and reflected on the live website instantly.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-primary mt-2" />
              <span>Images are optimized automatically for better performance.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-2 h-2 rounded-full bg-primary mt-2" />
              <span>Use the drag handle to reorder items by display order.</span>
            </li>
          </ul>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
