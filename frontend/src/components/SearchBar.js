import React, { useState } from "react";
import "./SearchBar.css";

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
    <div className="search-bar-container">
      <div className="container">
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            placeholder="Search for news..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
          {query && (
            <button type="button" className="clear-btn" onClick={handleClear}>
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default SearchBar;
