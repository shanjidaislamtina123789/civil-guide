import React from 'react';
import Hero from '../../components/Hero/Hero';
import { Link } from 'react-router-dom';

const Home = () => {
  // Sample featured service categories
  const categories = [
    { title: 'Passport Services', desc: 'New passport, renewal & status check.' },
    { title: 'NID & Smart Card', desc: 'New registration, correction & downloading.' },
    { title: 'Birth Registration', desc: 'New certificate & official corrections.' },
    { title: 'Driving License', desc: 'Learner permit, BRTA exams & renewal.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero />

      {/* Featured Services Overview */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Explore Essential Services</h2>
            <p className="text-gray-600 mt-2">Get accurate guidelines and official links without brokers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition duration-200 border border-gray-100">
                <h3 className="text-xl font-bold text-gray-800">{cat.title}</h3>
                <p className="text-gray-600 text-sm mt-2">{cat.desc}</p>
                <Link to="/services" className="inline-block mt-4 text-orange-600 font-semibold hover:underline text-sm">
                  View Guide &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;