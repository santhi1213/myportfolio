import React, { useState, useEffect } from 'react';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import Resume from '../assets/Santhi_Raju.pdf'

const Hero = () => {
  const { aboutInfo, contactInfo } = useData();
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const titles = ['MERN Stack Developer', 'Full Stack Engineer', 'React Specialist', 'Node.js Expert'];

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentTitle = titles[currentIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentTitle.length) {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, titles]);

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 pt-16 md:pt-0">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 text-blue-400/30 text-sm font-mono animate-float">{'<React />'}</div>
        <div className="absolute top-32 right-16 text-green-400/30 text-sm font-mono animate-float delay-1000">{'{ MongoDB }'}</div>
        <div className="absolute bottom-40 left-20 text-purple-400/30 text-sm font-mono animate-float delay-2000">{'Node.js'}</div>
        <div className="absolute bottom-32 right-12 text-yellow-400/30 text-sm font-mono animate-float delay-3000">{'Express.js'}</div>
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="block mb-2">Hi, I'm</span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 bg-clip-text text-transparent">
              {aboutInfo.name}
            </span>
          </h1>

          <div className="text-2xl md:text-3xl text-gray-300 mb-8 h-12">
            <span className="border-r-2 border-blue-400 animate-pulse">
              {displayText}
            </span>
          </div>

          <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {aboutInfo.bio}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              <a href="#projects">
                View My Work
              </a>
            </button>
            {/* <button className="border border-gray-500 text-gray-300 px-8 py-3 rounded-full hover:border-blue-400 hover:text-blue-400 transition-all duration-300">
              Download CV
            </button> */}
            <a
              href={Resume}
              download="My_Resume.pdf"
              className="border border-gray-500 text-gray-300 px-8 py-3 rounded-full hover:border-blue-400 hover:text-blue-400 transition-all duration-300"
            >
              Download CV
            </a>

          </div>

          <div className="flex items-center justify-center space-x-6">
            <a href={contactInfo.github} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
              <Github className="w-6 h-6" />
            </a>
            <a href={contactInfo.linkedin} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
              <Linkedin className="w-6 h-6" />
            </a>
            <a href={`mailto:${contactInfo.email}`} className="text-gray-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110">
              <Mail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce hover:text-blue-400 transition-colors duration-300"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};

export default Hero;