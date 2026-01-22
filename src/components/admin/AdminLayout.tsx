import { ReactNode, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  Building2, 
  Images, 
  LogOut, 
  Loader2,
  Home 
} from 'lucide-react';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Mentors', href: '/admin/mentors', icon: Users },
  { label: 'Sponsors', href: '/admin/sponsors', icon: Building2 },
  { label: 'Event Images', href: '/admin/events', icon: Images },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { user, isLoading, isAdmin, signOut, checkAdminStatus } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!isLoading) {
        if (!user) {
          navigate('/admin/login');
          return;
        }
        
        const adminStatus = await checkAdminStatus();
        if (!adminStatus) {
          navigate('/admin/login');
        }
      }
    };
    
    verifyAdmin();
  }, [user, isLoading, navigate, checkAdminStatus]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="text-center glass-card p-8 rounded-2xl max-w-md">
          <h1 className="text-2xl font-bold text-destructive mb-4">Unauthorized Access</h1>
          <p className="text-muted-foreground mb-6">
            You don't have permission to access this area.
          </p>
          <Button onClick={() => navigate('/admin/login')} variant="gradient">
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border/50 bg-card/50 backdrop-blur-sm flex flex-col">
        <div className="p-6 border-b border-border/50">
          <h1 className="text-xl font-bold font-display gradient-text">PTF Admin</h1>
          <p className="text-xs text-muted-foreground mt-1 truncate">{user.email}</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-border/50 space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span className="font-medium">View Website</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors w-full"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
