import React, { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"}>
        Home
      </NavLink>
      <NavLink to="/services" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"}>
        Services
      </NavLink>
      <NavLink to="/updates" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"}>
        Updates
      </NavLink>
      <NavLink to="/faq" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"}>
        FAQ
      </NavLink>
      <NavLink to="/contact" className={({ isActive }) => isActive ? "text-orange-600 font-bold" : "hover:text-orange-600 transition"}>
        Contact
      </NavLink>
    </>
  );

  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link to="/" className="text-2xl font-extrabold text-orange-600">
          Civil<span className="text-gray-900">Guide</span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-6 text-gray-700 font-medium text-sm">
          {navLinks}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          
          {/* Search */}
          <div className="relative">
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                  className="px-3 py-1 text-sm border border-orange-500 rounded-lg focus:outline-none w-36 sm:w-48"
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="ml-1 text-xs text-gray-500 hover:text-red-500 p-1"
                >
                  ✕
                </button>
              </form>
            ) : (
              <button 
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-gray-600 hover:text-orange-600 transition rounded-lg hover:bg-gray-100"
              >
                <FaSearch className="text-base" />
              </button>
            )}
          </div>

          {user ? (
  <div className="flex items-center gap-2 border-l border-gray-200 pl-3">
    <Link
      to="/dashboard"
      className="text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg transition"
    >
       {user.displayName || user.email?.split('@')[0]}
    </Link>
    <button
      onClick={logOut}
      className="bg-red-50 hover:bg-red-100 text-red-600 text-xs font-bold px-3 py-1.5 rounded-lg transition border border-red-100"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    to="/login"
    className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow transition"
  >
    Login
  </Link>
)}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;