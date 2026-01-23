import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import quantumLogo from '@/assets/quantum-logo.png';

const navLinks = [
  { label: 'Overview', href: '#overview' },
  { label: 'Team', href: '#team' },
  { label: 'Schedule', href: '#schedule' },
  { label: 'Evaluation', href: '#evaluation' },
  { label: 'Rules', href: '#rules' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-border/50' : ''
      }`}
    >
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img 
            src={quantumLogo} 
            alt="Quantum 2.0 Hackathon" 
            className="h-10 w-auto"
          />
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
          <Link to="/admin/login">
            <Button variant="ghost" size="sm" className="gap-2">
              <Lock className="w-4 h-4" />
              Admin Login
            </Button>
          </Link>
          <Button variant="gradient" size="sm">
            Register
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border/50 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Link to="/admin/login" onClick={() => setIsMobileMenuOpen(false)}>
              <Button variant="ghost" className="w-full justify-start gap-2">
                <Lock className="w-4 h-4" />
                Admin Login
              </Button>
            </Link>
            <Button variant="gradient" className="w-full mt-2">
              Register
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
