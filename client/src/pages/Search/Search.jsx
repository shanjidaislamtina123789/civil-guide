import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Search Results for: <span className="text-orange-600">"{query}"</span>
      </h2>
      <p className="text-gray-500 mb-8">
        Here are the relevant items matching your keyword.
      </p>

      {/* সার্চ রেজাল্ট কার্ডের লেআউট (এখানে পরবর্তীতে API বা ডাটা ফিল্টার কানেক্ট করা যাবে) */}
      <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
        {query ? (
          <div className="space-y-4">
            <p className="text-gray-600">
              Showing matching guides, services, or updates related to <strong>"{query}"</strong>:
            </p>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
              <h3 className="font-semibold text-lg text-orange-700 capitalize">
                {query} Guidance & Updates
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Find complete documents, application procedures, and recent notices about {query}.
              </p>
              <Link to="/services" className="inline-block mt-3 text-xs font-bold text-orange-600 hover:underline">
                View related services →
              </Link>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Please enter a search keyword to find services or updates.</p>
        )}
      </div>
    </div>
  );
};

export default Search;