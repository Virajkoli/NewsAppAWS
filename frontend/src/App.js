import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NewsList from "./components/NewsList";
import SavedArticles from "./components/SavedArticles";
import SearchBar from "./components/SearchBar";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "general",
    "business",
    "technology",
    "entertainment",
    "health",
    "science",
    "sports",
  ];

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="container">
            <h1>📰 News App</h1>
            <nav className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/saved">Saved Articles</Link>
            </nav>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={setSearchQuery} />

                {!searchQuery && (
                  <div className="categories">
                    <div className="container">
                      <div className="category-buttons">
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={
                              selectedCategory === category ? "active" : ""
                            }
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category.charAt(0).toUpperCase() +
                              category.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <NewsList
                  category={selectedCategory}
                  searchQuery={searchQuery}
                />
              </>
            }
          />
          <Route path="/saved" element={<SavedArticles />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
