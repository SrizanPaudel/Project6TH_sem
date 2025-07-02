import React from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { format } from 'date-fns';
import NewsCard from '../components/NewsCard';

interface NewsArticle {
  id: string;
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
  summary?: string;
}

// Mock data for development
const mockArticles: NewsArticle[] = [
  {
    id: '1',
    title: 'Sample News Article 1',
    description: 'This is a sample news article description for development purposes.',
    url: 'https://example.com/news/1',
    source: 'Sample News',
    publishedAt: new Date().toISOString(),
    summary: 'A brief summary of the sample news article.',
  },
  {
    id: '2',
    title: 'Sample News Article 2',
    description: 'Another sample news article description for development.',
    url: 'https://example.com/news/2',
    source: 'Sample News',
    publishedAt: new Date().toISOString(),
    summary: 'A brief summary of another sample news article.',
  },
];

const Home: React.FC = () => {
  const { data: articles, isLoading, error } = useQuery<NewsArticle[]>(
    'news',
    async () => {
      try {
        // TODO: Replace with actual API endpoint
        const response = await axios.get('/api/news');
        return response.data;
      } catch (error) {
        // For development, return mock data if API fails
        console.warn('Using mock data due to API error:', error);
        return mockArticles;
      }
    },
    {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">
          Error loading news articles. Please try again later.
        </div>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-primary"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">No News Available</h2>
        <p className="text-gray-600">
          There are no news articles available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Latest News</h2>
        <button
          onClick={() => window.location.reload()}
          className="btn btn-secondary"
        >
          Refresh
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default Home; 