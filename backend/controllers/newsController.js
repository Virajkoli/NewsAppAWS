const axios = require("axios");
const SavedArticle = require("../models/SavedArticle");

const NEWS_API_KEY = process.env.NEWS_API_KEY;
const NEWS_API_URL = process.env.NEWS_API_URL;

// Get top headlines
const getTopHeadlines = async (req, res) => {
  try {
    const { country = "us", pageSize = 20 } = req.query;

    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: {
        country,
        pageSize,
        apiKey: NEWS_API_KEY,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching top headlines:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching news",
      error: error.message,
    });
  }
};

// Get news by category
const getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const { country = "us", pageSize = 20 } = req.query;

    const response = await axios.get(`${NEWS_API_URL}/top-headlines`, {
      params: {
        country,
        category,
        pageSize,
        apiKey: NEWS_API_KEY,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error fetching news by category:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching news",
      error: error.message,
    });
  }
};

// Search news
const searchNews = async (req, res) => {
  try {
    const { q, sortBy = "publishedAt", pageSize = 20 } = req.query;

    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const response = await axios.get(`${NEWS_API_URL}/everything`, {
      params: {
        q,
        sortBy,
        pageSize,
        apiKey: NEWS_API_KEY,
      },
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error("Error searching news:", error.message);
    res.status(500).json({
      success: false,
      message: "Error searching news",
      error: error.message,
    });
  }
};

// Save article to database
const saveArticle = async (req, res) => {
  try {
    const articleData = req.body;

    const savedArticle = new SavedArticle(articleData);
    await savedArticle.save();

    res.status(201).json({
      success: true,
      message: "Article saved successfully",
      data: savedArticle,
    });
  } catch (error) {
    console.error("Error saving article:", error.message);
    res.status(500).json({
      success: false,
      message: "Error saving article",
      error: error.message,
    });
  }
};

// Get saved articles
const getSavedArticles = async (req, res) => {
  try {
    const savedArticles = await SavedArticle.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: savedArticles,
    });
  } catch (error) {
    console.error("Error fetching saved articles:", error.message);
    res.status(500).json({
      success: false,
      message: "Error fetching saved articles",
      error: error.message,
    });
  }
};

// Delete saved article
const deleteSavedArticle = async (req, res) => {
  try {
    const { id } = req.params;

    await SavedArticle.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Article deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting article:", error.message);
    res.status(500).json({
      success: false,
      message: "Error deleting article",
      error: error.message,
    });
  }
};

module.exports = {
  getTopHeadlines,
  getNewsByCategory,
  searchNews,
  saveArticle,
  getSavedArticles,
  deleteSavedArticle,
};
