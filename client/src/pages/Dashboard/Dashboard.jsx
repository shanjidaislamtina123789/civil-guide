import React, { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaUserCircle, FaBookmark, FaSignOutAlt, FaExternalLinkAlt, FaTrash } from 'react-icons/fa';

// Mocked initial services data for saved reference matching IDs
const sampleServices = [
  { id: '1', name: 'E-Passport Application & Renewal', category: 'Passport', fee: '৳5,750+' },
  { id: '2', name: 'Smart NID Card Correction', category: 'NID', fee: '৳230+' },
  { id: '3', name: 'Digital Birth Certificate', category: 'Birth Certificate', fee: '৳50+' },
  { id: '4', name: 'BRTA Driving License', category: 'Driving License', fee: '৳500+' },
  { id: '5', name: 'e-TIN Registration', category: 'e-TIN', fee: 'Free' },
  { id: '6', name: 'Trade License Renewal', category: 'Trade License', fee: 'Varies' },
];

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();
  const [savedIds, setSavedIds] = useState([]);

  useEffect(() => {
    // Load saved guide IDs from localStorage
    const saved = JSON.parse(localStorage.getItem('savedServices') || '[]');
    setSavedIds(saved);
  }, []);

  const handleRemoveSaved = (id) => {
    const updated = savedIds.filter((itemId) => itemId !== id);
    setSavedIds(updated);
    localStorage.setItem('savedServices', JSON.stringify(updated));
  };

  const handleLogout = async () => {
    await logOut();
    navigate('/');
  };

  const savedServicesList = sampleServices.filter((service) => savedIds.includes(service.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[75vh]">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg mb-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400 text-3xl font-extrabold">
            {user?.displayName ? user.displayName.charAt(0).toUpperCase() : <FaUserCircle />}
          </div>
          <div>
            <h1 className="text-2xl font-bold">
              Welcome, {user?.displayName || user?.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-xs text-gray-400 mt-1">{user?.email || 'user@example.com'}</p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-semibold px-4 py-2.5 rounded-xl transition flex items-center gap-2"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* User Info Overview */}
        <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm h-fit space-y-4">
          <h2 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">Account Overview</h2>
          
          <div className="text-xs space-y-3 text-gray-600">
            <div>
              <span className="block text-gray-400 font-medium">Full Name</span>
              <span className="font-bold text-gray-800 text-sm">{user?.displayName || 'N/A'}</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Email Address</span>
              <span className="font-bold text-gray-800 text-sm">{user?.email || 'N/A'}</span>
            </div>
            <div>
              <span className="block text-gray-400 font-medium">Saved Guides</span>
              <span className="font-bold text-orange-600 text-sm">{savedIds.length} Services</span>
            </div>
          </div>
        </div>

        {/* Saved Services Section */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <FaBookmark className="text-orange-600" /> My Saved Guides
            </h2>
            <span className="text-xs text-gray-500">{savedServicesList.length} items</span>
          </div>

          {savedServicesList.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
              <p className="text-xs text-gray-500 mb-4">You have not bookmarked any government services yet.</p>
              <Link
                to="/services"
                className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs px-5 py-2.5 rounded-xl shadow transition"
              >
                Browse Services
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedServicesList.map((service) => (
                <div key={service.id} className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] uppercase font-bold bg-orange-50 text-orange-600 px-2 py-0.5 rounded">
                        {service.category}
                      </span>
                      <button
                        onClick={() => handleRemoveSaved(service.id)}
                        className="text-gray-400 hover:text-red-500 transition p-1"
                        title="Remove Bookmark"
                      >
                        <FaTrash className="text-xs" />
                      </button>
                    </div>
                    <h3 className="font-bold text-sm text-gray-800">{service.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Govt Fee: {service.fee}</p>
                  </div>

                  <Link
                    to={`/services/${service.id}`}
                    className="inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-xl transition"
                  >
                    View Guide <FaExternalLinkAlt className="text-[10px]" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;