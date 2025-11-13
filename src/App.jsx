import React, { useState } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import NewsCard from './components/NewsCard';
import Loading from './components/Loading';
import { useNews } from './hooks/useNews';
import './styles/App.css';

function App() {
  const [category, setCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const { news, loading, error, fetchNews } = useNews();

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      fetchNews(query);
    } else {
      fetchNews('', category);
    }
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
    fetchNews('', newCategory);
  };

  const resetToHeadlines = () => {
    setSearchQuery('');
    setCategory('general');
    fetchNews('', 'general');
  };

  return (
    <div className="app">
      <Header 
        onSearch={handleSearch}
        searchQuery={searchQuery}
        onReset={resetToHeadlines}
      />
      
      <CategoryNav 
        category={category}
        onCategoryChange={handleCategoryChange}
      />

      <main className="main-content">
        <div className="container">
          {loading && <Loading />}

          {error && (
            <div className="error">
              <p>{error}</p>
              <button onClick={() => fetchNews('', category)} className="retry-btn">
                Try Again
              </button>
            </div>
          )}

          {!loading && !error && (
  <>
              <div className="news-header">
                <h2>
                  {searchQuery 
                    ? `Search Results for "${searchQuery}"` 
                    : `${category.charAt(0).toUpperCase() + category.slice(1)} News`}
                </h2>
                <span className="news-count">{news.length} articles</span>
              </div>

              <div className="news-container">
                <div className="news-grid">
                  {news.map((article, index) => (
                    <NewsCard key={index} article={article} />
                  ))}
                </div>
              </div>

              {news.length === 0 && !loading && (
                <div className="no-news">
                  <p>No news articles found. Try a different search or category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2025 NewsHub. Powered by NewsAPI.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;