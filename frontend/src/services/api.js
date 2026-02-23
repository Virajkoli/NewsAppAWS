import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// News API calls
export const getTopHeadlines = async (country = "us", pageSize = 20) => {
  const response = await api.get("/news/headlines", {
    params: { country, pageSize },
  });
  return response.data;
};

export const getNewsByCategory = async (
  category,
  country = "us",
  pageSize = 20,
) => {
  const response = await api.get(`/news/category/${category}`, {
    params: { country, pageSize },
  });
  return response.data;
};

export const searchNews = async (
  query,
  sortBy = "publishedAt",
  pageSize = 20,
) => {
  const response = await api.get("/news/search", {
    params: { q: query, sortBy, pageSize },
  });
  return response.data;
};

// Saved articles API calls
export const saveArticle = async (article) => {
  const response = await api.post("/news/saved", article);
  return response.data;
};

export const getSavedArticles = async () => {
  const response = await api.get("/news/saved");
  return response.data;
};

export const deleteSavedArticle = async (id) => {
  const response = await api.delete(`/news/saved/${id}`);
  return response.data;
};

export default api;
