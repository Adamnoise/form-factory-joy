
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const BeBuilder = () => {
  return (
    <div className="min-h-screen flex flex-col overflow-hidden relative">
      {/* Background with geometric shapes */}
      <div className="absolute inset-0 bg-[#007BFF] overflow-hidden z-0">
        {/* Geometric cubes background */}
        <div className="absolute top-[20%] left-[10%] w-16 h-16 opacity-20">
          <div className="w-full h-full bg-blue-300 rounded-sm transform rotate-45"></div>
        </div>
        <div className="absolute bottom-[30%] right-[15%] w-24 h-24 opacity-20">
          <div className="w-full h-full bg-blue-300 rounded-sm transform rotate-12"></div>
        </div>
        <div className="absolute top-[60%] left-[25%] w-20 h-20 opacity-15">
          <div className="w-full h-full bg-blue-300 rounded-sm transform -rotate-12"></div>
        </div>

        {/* Additional wave patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 1200 800" preserveAspectRatio="none">
          <path d="M 0 300 Q 300 250 600 300 Q 900 350 1200 300 L 1200 800 L 0 800 Z" fill="white"></path>
          <path d="M 0 400 Q 300 350 600 400 Q 900 450 1200 400 L 1200 800 L 0 800 Z" fill="white"></path>
        </svg>
      </div>

      {/* Header - fixed navigation */}
      <header className="h-20 px-6 md:px-10 flex items-center justify-between bg-transparent relative z-10 w-full">
        <Link to="/" className="text-white text-4xl font-bold">
          Be
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <a href="#start" className="text-white hover:text-blue-200 transition-colors">Start</a>
          <a href="#about" className="text-white hover:text-blue-200 transition-colors">About us</a>
          <a href="#gallery" className="text-white hover:text-blue-200 transition-colors">Gallery</a>
          <a href="#faq" className="text-white hover:text-blue-200 transition-colors">FAQ</a>
        </nav>

        <Button className="bg-[#28A745] hover:bg-[#218838] text-white px-6 font-semibold">
          Try BeBuilder
        </Button>
      </header>

      {/* Mobile Navigation */}
      <div className="md:hidden absolute top-20 left-0 right-0 bg-[#007BFF] z-50 p-4">
        <div className="flex flex-col space-y-4">
          <a href="#start" className="text-white hover:text-blue-200 transition-colors p-2">Start</a>
          <a href="#about" className="text-white hover:text-blue-200 transition-colors p-2">About us</a>
          <a href="#gallery" className="text-white hover:text-blue-200 transition-colors p-2">Gallery</a>
          <a href="#faq" className="text-white hover:text-blue-200 transition-colors p-2">FAQ</a>
          <Button className="bg-[#28A745] hover:bg-[#218838] text-white px-6 font-semibold w-full">
            Try BeBuilder
          </Button>
        </div>
      </div>

      {/* Top info bar */}
      <div className="bg-[#007BFF] text-white text-sm py-2 px-6 flex justify-between border-b border-blue-600 relative z-10">
        <div className="hidden md:block">
          Build Beautiful, Feature-Rich Websites with BeBuilder
        </div>
        <div className="flex space-x-4 ml-auto">
          <div className="flex items-center">
            <span className="mr-1">+61 (0) 3 8376 6284</span>
          </div>
          <div className="flex items-center">
            <span>2 Elizabeth St, Melbourne</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-20 relative z-10 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <p className="text-white opacity-80 mb-2">Betheme</p>
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
            Build Beautiful, Feature-Rich Websites with BeBuilder
          </h1>
          <p className="text-xl text-white opacity-90 mb-10 max-w-3xl mx-auto">
            From professional portfolio websites to glossy online shops, Betheme and BeBuilder provide you with all the tools you need to build anything you want.
          </p>
          <Button className="bg-[#28A745] hover:bg-[#218838] text-white px-8 py-6 text-lg rounded-md font-semibold group">
            Get Started
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </main>

      {/* Builder tools */}
      <div className="absolute bottom-8 left-8 z-10 flex space-x-2">
        <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
          + Wrap
        </Button>
        <Button variant="outline" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
          + Divider
        </Button>
      </div>
    </div>
  );
};

export default BeBuilder;
