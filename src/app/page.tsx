'use client';

import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { setQuery, setResults } from '../store';
import { RootState } from '../store';

export default function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query, results } = useSelector((state: RootState) => state.search);

  const handleSearch = async () => {
    try {
      const res = await fetch(`/api/search?query=${query}`);
      if (!res.ok) throw new Error('Failed to fetch search results');
      const data = await res.json();
      dispatch(setResults(data)); // Ensure results now include cemeteryCode, lat, and long
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSelect = (veteran: any) => {
    router.push(
      `/details?name=${encodeURIComponent(veteran.name)}&branch=${encodeURIComponent(
        veteran.branch
      )}&location=${encodeURIComponent(veteran.location)}&lat=${veteran.lat}&long=${veteran.long}&cemeteryCode=${
        veteran.cemeteryCode
      }`
    );
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Search for a Veteran</h1>

      {/* Search Input */}
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter last name"
              value={query}
              onChange={(e) => dispatch(setQuery(e.target.value))}
              onKeyDown={handleKeyDown} // Add the key press listener
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black placeholder-gray-400"
            />
            <button
              onClick={handleSearch}
              className="bg-blue-500 text-white font-semibold rounded-md py-2 hover:bg-blue-600"
            >
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="mt-6 w-full max-w-md">
        <ul className="bg-white rounded-lg shadow-lg divide-y divide-gray-300">
          {results.length > 0 ? (
            results.map((veteran: any, index: number) => (
              <li
                key={index}
                className="p-4 hover:bg-gray-100 cursor-pointer text-gray-700 font-medium"
                onClick={() => handleSelect(veteran)} // Navigate to details page
              >
                {veteran.name}
              </li>
            ))
          ) : (
            <li className="p-4 text-gray-500 text-center">No results found.</li>
          )}
        </ul>
      </div>
    </div>
  );
}
