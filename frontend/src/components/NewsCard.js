import React, { useState } from "react";
import { saveArticle } from "../services/api";
import "./NewsCard.css";

const NewsCard = ({ article, isSaved = false, onDelete }) => {
  const [saved, setSaved] = useState(isSaved);
  const [saveMessage, setSaveMessage] = useState("");

  const handleSave = async () => {
    try {
      await saveArticle(article);
      setSaved(true);
      setSaveMessage("Saved!");
      setTimeout(() => setSaveMessage(""), 2000);
    } catch (err) {
      setSaveMessage("Failed to save");
      console.error("Error saving article:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="news-card">
      {article.urlToImage && (
        <div className="news-card-image">
          <img src={article.urlToImage} alt={article.title} />
        </div>
      )}

      <div className="news-card-content">
        <div className="news-card-header">
          {article.source?.name && (
            <span className="news-source">{article.source.name}</span>
          )}
          {article.publishedAt && (
            <span className="news-date">{formatDate(article.publishedAt)}</span>
          )}
        </div>

        <h3 className="news-title">{article.title}</h3>

        {article.description && (
          <p className="news-description">{article.description}</p>
        )}

        {article.author && <p className="news-author">By {article.author}</p>}

        <div className="news-card-actions">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more-btn"
          >
            Read More
          </a>

          {!isSaved ? (
            <button
              className={`save-btn ${saved ? "saved" : ""}`}
              onClick={handleSave}
              disabled={saved}
            >
              {saved ? "✓ Saved" : "Save"}
            </button>
          ) : (
            <button
              className="delete-btn"
              onClick={() => onDelete && onDelete(article._id)}
            >
              Delete
            </button>
          )}

          {saveMessage && <span className="save-message">{saveMessage}</span>}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
