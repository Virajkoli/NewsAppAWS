const express = require("express");
const router = express.Router();
const {
  getTopHeadlines,
  getNewsByCategory,
  searchNews,
  saveArticle,
  getSavedArticles,
  deleteSavedArticle,
} = require("../controllers/newsController");

// Get top headlines
router.get("/headlines", getTopHeadlines);

// Get news by category
router.get("/category/:category", getNewsByCategory);

// Search news
router.get("/search", searchNews);

// Saved articles routes
router.post("/saved", saveArticle);
router.get("/saved", getSavedArticles);
router.delete("/saved/:id", deleteSavedArticle);

module.exports = router;
