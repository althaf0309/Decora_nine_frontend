import { Link } from 'react-router-dom';
import { FiMapPin, FiArrowRight, FiArrowUpRight, FiCalendar } from 'react-icons/fi';
import { Project, News } from '../types';
import '../styles/Cards.css';

interface ProjectCardProps {
  project: Project;
  index?: number;
}

export const ProjectCard = ({ project, index = 0 }: ProjectCardProps) => {
  return (
    <Link to={`/projects/${project.slug}`} className={`project-card reveal d${(index % 4) + 1}`}>
      <div className="project-img-wrap">
        <img src={project.cover_image} alt={project.title} className="project-img" />
        {project.category && <span className="project-category">{project.category.name}</span>}
        <span className="project-hover">
          <FiArrowUpRight />
        </span>
      </div>
      <div className="project-info">
        <h3>{project.title}</h3>
        <p className="location"><FiMapPin className="loc-ico" /> {project.location}</p>
        <p className="project-desc">{project.short_description}</p>
        <span className="project-link">View Project <FiArrowRight className="pl-arw" /></span>
      </div>
    </Link>
  );
};

interface NewsCardProps {
  news: News;
  index?: number;
}

export const NewsCard = ({ news, index = 0 }: NewsCardProps) => {
  const publishDate = new Date(news.published_date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  return (
    <Link to={`/news/${news.slug}`} className={`news-card reveal d${(index % 4) + 1}`}>
      <div className="news-img-wrap">
        <img src={news.featured_image} alt={news.title} className="news-img" />
        {news.category && <span className="project-category">{news.category.name}</span>}
        <span className="project-hover"><FiArrowUpRight /></span>
      </div>
      <div className="news-info">
        <span className="news-date"><FiCalendar className="loc-ico" /> {publishDate}</span>
        <h3>{news.title}</h3>
        <p>{news.summary}</p>
        <span className="project-link">Read More <FiArrowRight className="pl-arw" /></span>
      </div>
    </Link>
  );
};
