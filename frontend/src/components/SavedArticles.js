import React, { useState, useEffect } from "react";
import { getSavedArticles, deleteSavedArticle } from "../services/api";
import NewsCard from "./NewsCard";
import "./SavedArticles.css";

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
    return <div className="loading">Loading saved articles...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="saved-articles">
      <div className="container">
        <h2 className="page-title">Saved Articles</h2>

        {savedArticles.length === 0 ? (
          <div className="no-saved">
            <p>No saved articles yet.</p>
            <p>Start saving articles from the home page!</p>
          </div>
        ) : (
          <div className="news-grid">
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
