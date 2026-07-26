import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

const defaultServices = [
  { id: '1', category: 'Passport', name: 'E-Passport Application & Renewal', fee: '৳5,750+', time: '7-15 Days', desc: 'Apply for a new e-passport online.' },
  { id: '2', category: 'NID', name: 'Smart NID Card Correction', fee: '৳230+', time: '15-30 Days', desc: 'Correct mistakes in name, birth date, or address.' },
  { id: '3', category: 'Birth Certificate', name: 'Digital Birth Certificate', fee: '৳50+', time: '3-7 Days', desc: 'Register or correct digital birth certificates.' },
  { id: '4', category: 'Driving License', name: 'BRTA Driving License', fee: '৳500+', time: '30 Days', desc: 'Driving license application and renewal.' },
  { id: '5', category: 'e-TIN', name: 'e-TIN Registration', fee: 'Free', time: 'Instant', desc: 'Get your 12-digit Tax Identification Number.' },
  { id: '6', category: 'Trade License', name: 'Trade License Renewal', fee: 'Varies', time: '2-5 Days', desc: 'Apply for or renew your business trade license.' },
];

const categories = ['All', 'Passport', 'NID', 'Birth Certificate', 'Driving License', 'e-TIN', 'Trade License'];

const Services = () => {
  const [servicesData, setServicesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    // Read dynamic services from LocalStorage
    const savedServices = JSON.parse(localStorage.getItem('appServices')) || defaultServices;
    setServicesData(savedServices);

    const saved = JSON.parse(localStorage.getItem('savedServices') || '[]');
    setSavedIds(saved);
  }, []);

  const toggleSave = (id) => {
    let updatedSaved = savedIds.includes(id) ? savedIds.filter(item => item !== id) : [...savedIds, id];
    setSavedIds(updatedSaved);
    localStorage.setItem('savedServices', JSON.stringify(updatedSaved));
  };

  const filteredServices = selectedCategory === 'All'
    ? servicesData 
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">Government Services</h1>
        <p className="text-gray-500 mt-2 text-sm">Select a category or browse services.</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 text-xs font-semibold rounded-full transition ${
              selectedCategory === cat ? 'bg-orange-600 text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <div key={service.id} className="bg-white border rounded-2xl p-6 shadow-sm relative flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold bg-orange-50 text-orange-600 px-2 py-1 rounded">
                  {service.category}
                </span>
                <button onClick={() => toggleSave(service.id)} className="text-orange-600">
                  {savedIds.includes(service.id) ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>

              <h3 className="text-lg font-bold text-gray-800 mb-2">{service.name}</h3>
              <p className="text-xs text-gray-500 mb-4">{service.desc}</p>
            </div>

            <Link to={`/services/${service.id}`} className="block text-center bg-gray-900 text-white text-xs font-semibold py-2.5 rounded-xl">
              View Full Guide →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;