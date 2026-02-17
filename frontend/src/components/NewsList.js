import React, { useState, useEffect, useCallback } from "react";
import { getNewsByCategory, searchNews } from "../services/api";
import NewsCard from "./NewsCard";
import "./NewsList.css";

const NewsList = ({ category, searchQuery }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let response;

      if (searchQuery) {
        response = await searchNews(searchQuery);
      } else {
        response = await getNewsByCategory(category);
      }

      if (response.success) {
        setArticles(response.data.articles || []);
      } else {
        setError("Failed to fetch news");
      }
    } catch (err) {
      setError(err.message || "Error fetching news");
      console.error("Error fetching news:", err);
    } finally {
      setLoading(false);
    }
  }, [category, searchQuery]);

  useEffect(() => {
    fetchNews();
  }, [fetchNews]);

  if (loading) {
    return <div className="loading">Loading news...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!articles || articles.length === 0) {
    return <div className="no-articles">No articles found</div>;
  }

  return (
    <div className="news-list">
      <div className="container">
        <div className="news-grid">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
