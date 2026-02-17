const mongoose = require("mongoose");

const savedArticleSchema = new mongoose.Schema(
  {
    source: {
      id: String,
      name: String,
    },
    author: String,
    title: {
      type: String,
      required: true,
    },
    description: String,
    url: {
      type: String,
      required: true,
      unique: true,
    },
    urlToImage: String,
    publishedAt: String,
    content: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("SavedArticle", savedArticleSchema);
