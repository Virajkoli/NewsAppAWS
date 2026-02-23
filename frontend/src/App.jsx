import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
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
      <div className="min-h-screen">
        {/* Header */}
        <header className="bg-accent text-white py-4 shadow-md">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <h1 className="text-3xl font-bold">📰 News App</h1>
            <nav className="flex gap-6">
              <Link
                to="/"
                className="text-white no-underline font-medium hover:text-primary transition-colors"
              >
                Home
              </Link>
              <Link
                to="/saved"
                className="text-white no-underline font-medium hover:text-primary transition-colors"
              >
                Saved Articles
              </Link>
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
                  <div className="bg-white py-4 mb-8 shadow-sm">
                    <div className="max-w-6xl mx-auto px-4">
                      <div className="flex gap-2 flex-wrap">
                        {categories.map((category) => (
                          <button
                            key={category}
                            className={`px-5 py-2 border-2 border-primary rounded-full font-medium cursor-pointer transition-all ${
                              selectedCategory === category
                                ? "bg-primary text-white"
                                : "bg-white text-primary hover:bg-primary hover:text-white"
                            }`}
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
