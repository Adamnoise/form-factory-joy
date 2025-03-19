
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui-custom/Button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={cn(
        'fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-300',
        isScrolled ? 'glass-effect backdrop-blur-lg shadow-sm py-3' : 'bg-transparent'
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-xl font-medium flex items-center"
        >
          <span className="text-primary">Minimalist</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLinks />
          <div className="flex items-center space-x-4">
            <Button variant="minimal" size="sm">
              Sign In
            </Button>
            <Button variant="default" size="sm">
              Get Started
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon-sm" 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect backdrop-blur-xl border-t border-border/10 animate-fade-in">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <NavLinksMobile closeMenu={() => setIsMobileMenuOpen(false)} />
            <div className="flex flex-col space-y-2 pt-2">
              <Button variant="minimal" className="justify-start" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Button>
              <Button variant="default" onClick={() => setIsMobileMenuOpen(false)}>
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const NavLinks = () => {
  return (
    <>
      <Link to="/" className="text-sm hover:text-primary transition-colors">
        Home
      </Link>
      <Link to="/about" className="text-sm hover:text-primary transition-colors">
        About
      </Link>
      <Link to="/features" className="text-sm hover:text-primary transition-colors">
        Features
      </Link>
      <Link to="/contact" className="text-sm hover:text-primary transition-colors">
        Contact
      </Link>
    </>
  );
};

const NavLinksMobile = ({ closeMenu }: { closeMenu: () => void }) => {
  return (
    <>
      <Link 
        to="/" 
        className="text-base py-2 hover:text-primary transition-colors"
        onClick={closeMenu}
      >
        Home
      </Link>
      <Link 
        to="/about" 
        className="text-base py-2 hover:text-primary transition-colors"
        onClick={closeMenu}
      >
        About
      </Link>
      <Link 
        to="/features" 
        className="text-base py-2 hover:text-primary transition-colors"
        onClick={closeMenu}
      >
        Features
      </Link>
      <Link 
        to="/contact" 
        className="text-base py-2 hover:text-primary transition-colors"
        onClick={closeMenu}
      >
        Contact
      </Link>
    </>
  );
};

export default Header;
