import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCalendar, FiUser } from 'react-icons/fi';
import { News } from '../types';
import { NewsCard } from '../components/Cards';
import { SEO, businessJsonLd } from '../components/SEO';
import { CTABand } from '../components/PageExtras';
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
      <SEO
        title="Interior Design Tips, Ideas & News"
        description="Interior design tips, ideas and project stories from Decora Nine Interiors, Bangalore — flooring, modular kitchens, patterns, offices, cafés and more."
        keywords="interior design tips, interior design ideas Bangalore, modular kitchen trends, home decor tips, interior design blog"
        jsonLd={businessJsonLd}
      />
      <section className="page-header">
        <h1>Interior Insights</h1>
        <p>Design tips, ideas &amp; project stories from our Bangalore studio</p>
      </section>

      <div className="container">
        <div className="page-intro reveal">
          <h2>Interior Insights &amp; Company Updates</h2>
          <p>
            Practical design tips, project stories and news from the Decora Nine team — ideas to
            help you plan beautiful, functional homes, offices and commercial spaces.
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

      <CTABand
        heading="Inspired to start?"
        text="Turn these ideas into your own space. Book a free consultation with Decora Nine Interiors."
      />
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
      <SEO
        title={news.title}
        description={news.summary}
        keywords={`${news.category?.name || 'interior design'}, interior design tips, Decora Nine Interiors, ${news.title}`}
        image={news.featured_image}
        type="article"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Article',
          headline: news.title,
          description: news.summary,
          image: news.featured_image,
          datePublished: news.published_date,
          author: { '@type': 'Organization', name: news.author },
          publisher: businessJsonLd,
        }}
      />
      <section className="page-header">
        {news.category && <span className="nd-cat">{news.category.name}</span>}
        <h1>{news.title}</h1>
        <p className="nd-meta"><FiCalendar /> {publishDate} &nbsp;·&nbsp; <FiUser /> {news.author}</p>
      </section>

      <div className="container">
        <Link to="/news" className="pd-back"><FiArrowLeft /> All Articles</Link>
        <div className="news-content">
          <img src={news.featured_image} alt={news.title} className="news-main-image" />
          <div className="news-body">
            {news.content.split('\n').filter(Boolean).map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <CTABand
        heading="Ready to design your space?"
        text="Put these ideas to work with Bangalore's dependable interior design & execution team."
      />
    </div>
  );
};
