import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { News } from '../types';
import { NewsCard } from '../components/Cards';
import apiClient from '../api/client';
import '../styles/News.css';

export const NewsList = () => {
  const [news, setNews] = useState<News[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.getNews({ page_size: 50 })
      .then(data => setNews(data.results))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="news-page">
      <section className="page-header">
        <h1>Latest News & Updates</h1>
        <p>Stay updated with our recent projects and achievements</p>
      </section>

      <div className="container">
        <div className="page-intro reveal">
          <h2>Interior Insights &amp; Company Updates</h2>
          <p>
            Design tips, project stories and news from the Decora Nine team — practical ideas
            to help you plan beautiful, functional spaces.
          </p>
        </div>

        {news.length === 0 ? (
          <p className="news-empty">No articles have been published yet. Please check back soon.</p>
        ) : (
          <div className="news-grid">
            {news.map((article, i) => (
              <NewsCard key={article.id} news={article} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export const NewsDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [news, setNews] = useState<News | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      apiClient.getNewsBySlug(slug)
        .then(setNews)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!news) return <div className="error">Article not found</div>;

  const publishDate = new Date(news.published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="news-detail-page">
      <section className="page-header">
        <h1>{news.title}</h1>
        <p>{publishDate} • By {news.author}</p>
      </section>

      <div className="container">
        <div className="news-content">
          <img src={news.featured_image} alt={news.title} className="news-main-image" />
          <div className="news-body">
            {news.content.split('\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
