import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaBell, FaCalendarAlt, FaExternalLinkAlt } from 'react-icons/fa';

const Updates = () => {
  const [updatesData, setUpdatesData] = useState([]);
  const [loading, setLoading] = useState(true);

  // MongoDB থেকে ডাটা নিয়ে আসা
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await axios.get('https://civil-guide-uzq8.onrender.com/api/notices');
        setUpdatesData(response.data);
      } catch (error) {
        console.error('Error fetching notices:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
  }, []);

  if (loading) {
    return <div className="text-center py-20 text-gray-500 font-medium">Loading notices...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-[75vh]">
      
      {/* Header */}
      <div className="text-center mb-10">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1 rounded-full mb-3">
          <FaBell /> Latest Government Notices
        </span>
        <h1 className="text-3xl font-extrabold text-gray-900">Official Updates & Announcements</h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-xl mx-auto">
          Stay informed about recent fee changes, document rule revisions, and server maintenance notices.
        </p>
      </div>

      {/* Updates Cards List */}
      <div className="space-y-4">
        {updatesData.length === 0 ? (
          <p className="text-center text-gray-400 py-10">No notices published yet.</p>
        ) : (
          updatesData.map((item) => (
            <div 
              key={item._id} // MongoDB ID
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700 px-2.5 py-0.5 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <FaCalendarAlt className="text-[10px]" /> {item.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-gray-800 hover:text-orange-600 transition cursor-pointer">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed max-w-3xl">
                  {item.summary}
                </p>
              </div>

              {/* 🔗 অফিশিয়াল লিংক বাটন — যা নতুন ট্যাবে সরাসরি সেই ওয়েবসাইটে নিয়ে যাবে */}
              <a
                href={item.officialLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 bg-gray-900 hover:bg-orange-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition whitespace-nowrap"
              >
                Official Notice <FaExternalLinkAlt className="text-[10px]" />
              </a>
            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Updates;