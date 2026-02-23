import { useState, useEffect, useCallback } from "react";
import { getNewsByCategory, searchNews } from "../services/api";
import NewsCard from "./NewsCard";

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
    return (
      <div className="text-center py-12 text-lg text-gray-500">
        Loading news...
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

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12 text-lg text-gray-500">
        No articles found
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsList;
