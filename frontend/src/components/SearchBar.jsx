import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const handleClear = () => {
    setQuery("");
    onSearch("");
  };

  return (
    <div className="bg-white py-6 shadow-sm mb-4">
      <div className="max-w-6xl mx-auto px-4">
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Search for news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-md text-base transition-colors focus:outline-none focus:border-primary"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-primary text-white border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-primary-dark"
          >
            Search
          </button>
          {query && (
            <button
              type="button"
              className="px-6 py-3 bg-muted text-white border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-muted-dark"
              onClick={handleClear}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
