import { useState } from "react";
import { saveArticle } from "../services/api";

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
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {article.urlToImage && (
        <div className="w-full h-48 overflow-hidden bg-gray-200">
          <img
            src={article.urlToImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-5 flex-1 flex flex-col">
        <div className="flex justify-between items-center mb-3 gap-2">
          {article.source?.name && (
            <span className="text-sm text-primary font-semibold">
              {article.source.name}
            </span>
          )}
          {article.publishedAt && (
            <span className="text-xs text-gray-400">
              {formatDate(article.publishedAt)}
            </span>
          )}
        </div>

        <h3 className="text-lg font-semibold mb-3 text-accent leading-snug">
          {article.title}
        </h3>

        {article.description && (
          <p className="text-sm text-gray-500 mb-3 leading-relaxed flex-1">
            {article.description}
          </p>
        )}

        {article.author && (
          <p className="text-sm text-gray-400 mb-4 italic">
            By {article.author}
          </p>
        )}

        <div className="flex gap-3 items-center mt-auto">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center px-5 py-2.5 bg-primary text-white no-underline rounded-md font-medium transition-colors hover:bg-primary-dark"
          >
            Read More
          </a>

          {!isSaved ? (
            <button
              className={`px-5 py-2.5 border-none rounded-md cursor-pointer font-medium transition-colors text-white ${
                saved
                  ? "bg-muted cursor-default"
                  : "bg-success hover:bg-success-dark"
              }`}
              onClick={handleSave}
              disabled={saved}
            >
              {saved ? "✓ Saved" : "Save"}
            </button>
          ) : (
            <button
              className="px-5 py-2.5 bg-danger text-white border-none rounded-md cursor-pointer font-medium transition-colors hover:bg-danger-dark"
              onClick={() => onDelete && onDelete(article._id)}
            >
              Delete
            </button>
          )}

          {saveMessage && (
            <span className="text-sm text-success font-medium">
              {saveMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
