import React from 'react';
import { Link } from 'react-router-dom';
import bgImage from '../../assets/images/government-bg.jpeg';

const Hero = () => {
  return (
    <section className="relative w-full h-[88vh] flex items-center justify-center bg-slate-900">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bgImage})` }}
      ></div>

      {/* Hero Content - Centered */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 bg-orange-600/90 text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6 shadow-md">
          <span>🇧🇩</span>
          <span>Bangladesh Government Paperwork Assistant</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight">
          Complete Your <br className="hidden sm:inline" />
          Government Paperwork <br />
          <span className="text-orange-500">Without Confusion</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-gray-200 leading-relaxed font-normal max-w-3xl">
          CivilGuide helps you prepare documents correctly with step-by-step guides, smart checklists, eligibility checks, and official source references before you apply.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link
            to="/services"
            className="bg-orange-600 text-white px-8 py-3.5 rounded-lg text-base sm:text-lg font-semibold hover:bg-orange-700 transition duration-200 shadow-lg flex items-center gap-2"
          >
            Start Guide <span>&rarr;</span>
          </Link>
          <Link
            to="/services"
            className="bg-white/10 backdrop-blur-md text-white border border-white/30 px-8 py-3.5 rounded-lg text-base sm:text-lg font-semibold hover:bg-white/20 transition duration-200 shadow-lg"
          >
            Explore Services
          </Link>
        </div>

      </div>
    </section>
  );
};

export default Hero;