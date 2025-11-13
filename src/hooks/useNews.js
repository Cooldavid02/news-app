import { useState, useCallback } from 'react';
import axios from 'axios';

const API_KEY = 'c59dd9b343db441088be3b99a4809658'; 
const BASE_URL = 'https://newsapi.org/v2';

export const useNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = useCallback(async (query = '', category = 'general') => {
    try {
      setLoading(true);
      setError(null);
      
      let url = '';
      if (query) {
        url = `${BASE_URL}/everything?q=${query}&sortBy=publishedAt&apiKey=${API_KEY}`;
      } else {
        url = `${BASE_URL}/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`;
      }

      const response = await axios.get(url);
      setNews(response.data.articles || []);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
      console.error('Error fetching news:', err);
      
      // For demo purposes, show some mock data when API fails
      if (err.response?.status === 429) { // Rate limit exceeded
        setNews(getMockNews());
        setError(null);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  return { news, loading, error, fetchNews };
};

// Mock data for development/demo
const getMockNews = () => [
  {
    title: 'Breaking: New React Features Released',
    description: 'The React team has announced several new features in the latest update.',
    url: 'https://example.com',
    urlToImage: 'https://via.placeholder.com/400x200/4f46e5/ffffff?text=React+News',
    publishedAt: new Date().toISOString(),
    source: { name: 'Tech News' }
  },
  {
    title: 'Global Tech Conference 2024',
    description: 'Annual technology conference brings together industry leaders from around the world.',
    url: 'https://example.com',
    urlToImage: 'https://via.placeholder.com/400x200/06b6d4/ffffff?text=Tech+Conference',
    publishedAt: new Date().toISOString(),
    source: { name: 'Tech Daily' }
  }
];