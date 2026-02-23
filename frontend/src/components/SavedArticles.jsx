import { useState, useEffect } from "react";
import { getSavedArticles, deleteSavedArticle } from "../services/api";
import NewsCard from "./NewsCard";

const SavedArticles = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSavedArticles();
  }, []);

  const fetchSavedArticles = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await getSavedArticles();

      if (response.success) {
        setSavedArticles(response.data || []);
      } else {
        setError("Failed to fetch saved articles");
      }
    } catch (err) {
      setError(err.message || "Error fetching saved articles");
      console.error("Error fetching saved articles:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (articleId) => {
    try {
      await deleteSavedArticle(articleId);
      setSavedArticles(
        savedArticles.filter((article) => article._id !== articleId),
      );
    } catch (err) {
      console.error("Error deleting article:", err);
      alert("Failed to delete article");
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12 text-lg text-gray-500">
        Loading saved articles...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-lg text-danger">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="py-8 min-h-[calc(100vh-200px)]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-accent mb-8 text-center">
          Saved Articles
        </h2>

        {savedArticles.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-xl mb-2">No saved articles yet.</p>
            <p className="text-xl">Start saving articles from the home page!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedArticles.map((article) => (
              <NewsCard
                key={article._id}
                article={article}
                isSaved={true}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedArticles;
