import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Logo */}
        <div className="mb-8">
          <img
            src="/images/PHI9.SPACE.svg"
            alt="PHI9 Logo"
            className="w-32 h-32 mx-auto"
          />
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
          phi9.space
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Enabling situational awareness in Physical AI systems.
        </p>

        {/* Description */}
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
          Building the enabling technology for GPS denied navigation systems. We focus on creating robust solutions for healthcare, logistics, and autonomous systems that work in challenging environments.
        </p>

        {/* Call to Action */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/case-studies"
            className="bg-accent text-white px-8 py-4 rounded-lg hover:bg-orange-600 transition-colors font-semibold text-lg"
          >
            Explore Case Studies
          </a>
          <a
            href="/manifesto"
            className="border-2 border-accent text-accent px-8 py-4 rounded-lg hover:bg-accent hover:text-white transition-colors font-semibold text-lg"
          >
            Read Our Manifesto
          </a>
        </div>
      </div>
    </div>
  );
};

export default Home;
