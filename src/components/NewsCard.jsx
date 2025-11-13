import React from 'react';

const NewsCard = ({ article }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <article className="news-card">
      <div className="card-image">
        <img
          src={article.urlToImage || 'https://via.placeholder.com/400x200/6b7280/ffffff?text=No+Image'}
          alt={article.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/400x200/6b7280/ffffff?text=No+Image';
          }}
        />
      </div>
      <div className="card-content">
        <h3 className="card-title">
          <a 
            href={article.url} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {article.title}
          </a>
        </h3>
        <p className="card-description">
          {article.description?.substring(0, 150)}...
        </p>
        <div className="card-meta">
          <span className="source">{article.source?.name}</span>
          <span className="date">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="read-more"
        >
          Read Full Article →
        </a>
      </div>
    </article>
  );
};

export default NewsCard;