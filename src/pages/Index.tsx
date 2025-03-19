
import React, { useEffect, useRef } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import Header from '@/components/layout/Header';
import { Button } from '@/components/ui-custom/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import FadeIn from '@/components/animations/FadeIn';

const Index = () => {
  const featuresRef = useRef<HTMLDivElement>(null);

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header />
      
      <main className="flex flex-col min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center px-4 py-24">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5 z-0"
            aria-hidden="true"
          />
          
          <div className="container mx-auto relative z-10 pt-16 md:pt-24">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <FadeIn>
                <span className="inline-flex items-center rounded-full border border-border px-4 py-1 text-xs font-medium">
                  Introducing our new design
                </span>
              </FadeIn>
              
              <FadeIn delay={100}>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  Beautiful design meets perfect functionality
                </h1>
              </FadeIn>
              
              <FadeIn delay={200}>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  Experience a minimal, intuitive interface crafted with exceptional attention to detail. Every element serves a purpose.
                </p>
              </FadeIn>
              
              <FadeIn delay={300}>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Learn more
                  </Button>
                </div>
              </FadeIn>
              
              <FadeIn delay={400}>
                <button 
                  onClick={scrollToFeatures}
                  className="inline-flex flex-col items-center justify-center mt-16 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <span>Discover features</span>
                  <ChevronDown className="h-4 w-4 mt-1 animate-bounce" />
                </button>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section 
          ref={featuresRef}
          className="py-20 md:py-32 bg-muted/30"
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Designed with purpose
                </h2>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Every feature has been carefully crafted to provide the best user experience
                </p>
              </FadeIn>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FadeIn key={feature.title} delay={(index % 3) * 100 as 100 | 200 | 300}>
                  <Card variant="glass" className="h-full" hoverEffect>
                    <CardHeader>
                      <div className="p-2 w-12 h-12 flex items-center justify-center rounded-md glass-accent mb-4">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="py-20 md:py-32 bg-primary text-primary-foreground relative overflow-hidden">
          <div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.1),transparent_60%)]"
            aria-hidden="true"
          />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <FadeIn>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to transform your experience?
                </h2>
              </FadeIn>
              <FadeIn delay={100}>
                <p className="text-primary-foreground/80 mb-10 text-lg">
                  Join thousands of users who have already elevated their design experience.
                </p>
              </FadeIn>
              <FadeIn delay={200}>
                <Button 
                  size="xl" 
                  variant="secondary" 
                  className="bg-white text-primary hover:bg-white/90"
                >
                  Get started today
                </Button>
              </FadeIn>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="py-12 md:py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-6 md:mb-0">
                <p className="text-sm text-muted-foreground">
                  © 2023 Minimalist. All rights reserved.
                </p>
              </div>
              <div className="flex gap-8">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
};

const features = [
  {
    title: "Minimalist Design",
    description: "Clean and uncluttered interface that focuses on what truly matters, allowing users to focus on content without distractions.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.1"/>
      <path d="M8 12L11 15L16 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  },
  {
    title: "Intuitive Navigation",
    description: "Thoughtfully organized navigation that makes it easy for users to find what they're looking for without unnecessary complexity.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.1"/>
      <path d="M12 8L12 16M8 12L16 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  },
  {
    title: "Fluid Animations",
    description: "Subtle animations that provide feedback and guide users through their journey, enhancing the overall experience.",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="12" fill="currentColor" fillOpacity="0.1"/>
      <path d="M9 16L12 13M12 13L15 16M12 13V18.5M15 11L12 8M12 8L9 11M12 8V5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  }
];

export default Index;
