import { useState, useEffect } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { FiMapPin, FiUser, FiMaximize, FiCalendar, FiArrowLeft } from 'react-icons/fi';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from '../components/Cards';
import apiClient from '../api/client';
import '../styles/Projects.css';

export const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [categories, setCategories] = useState<ProjectCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiClient.getProjects({ page_size: 50 }),
      apiClient.getProjectCategories()
    ]).then(([projectsData, categoriesData]) => {
      setProjects(projectsData.results);
      setCategories(categoriesData);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filteredProjects = selectedCategory
    ? projects.filter(p => p.category.slug === selectedCategory)
    : projects;

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="projects-page">
      <section className="page-header">
        <h1>Our Projects</h1>
        <p>Showcase of completed interior design projects</p>
      </section>

      <div className="container">
        <div className="page-intro reveal">
          <h2>Interiors we've delivered across South India</h2>
          <p>
            A selection of completed work — from restaurants and cafés to offices, homes and
            large-format commercial spaces. Every project reflects our promise: dependable site
            execution, quality finishes and results true to the original design intent. Filter by
            category to explore.
          </p>
        </div>

        <div className="filter-buttons">
          <button
            className={!selectedCategory ? 'active' : ''}
            onClick={() => setSelectedCategory('')}
          >
            All Projects
          </button>
          {categories.map(cat => (
            <button
              key={cat.id}
              className={selectedCategory === cat.slug ? 'active' : ''}
              onClick={() => setSelectedCategory(cat.slug)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      apiClient.getProjectBySlug(slug)
        .then(setProject)
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [slug]);

  if (loading) return <div className="loading">Loading...</div>;
  if (!project) return <div className="error">Project not found</div>;

  const info = [
    { icon: <FiUser />, label: 'Client', value: project.client_name },
    { icon: <FiMapPin />, label: 'Location', value: project.location },
    { icon: <FiMaximize />, label: 'Project Area', value: project.project_area },
    { icon: <FiCalendar />, label: 'Completed', value: new Date(project.completion_date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) },
  ];

  return (
    <div className="project-detail-page">
      {/* Hero banner */}
      <section className="pd-hero" style={{ backgroundImage: `url(${project.cover_image})` }}>
        <div className="pd-hero-overlay" />
        <div className="pd-hero-content">
          {project.category && <span className="pd-category">{project.category.name}</span>}
          <h1>{project.title}</h1>
          <p className="pd-hero-loc"><FiMapPin /> {project.location}</p>
        </div>
      </section>

      <div className="container">
        <Link to="/projects" className="pd-back"><FiArrowLeft /> All Projects</Link>

        {/* Info bar */}
        <div className="pd-info-bar reveal">
          {info.map(it => (
            <div key={it.label} className="pd-info-item">
              <span className="pd-info-ico">{it.icon}</span>
              <div>
                <span className="pd-info-label">{it.label}</span>
                <strong>{it.value}</strong>
              </div>
            </div>
          ))}
        </div>

        {/* Overview */}
        <div className="pd-overview reveal">
          <h2 className="fancy-h">
            <span className="fh-italic">Project</span>&nbsp;<span className="fh-bold">Overview</span>
            <span className="fh-dash" />
          </h2>
          <p>{project.description}</p>
        </div>

        {/* Gallery */}
        {project.gallery.length > 0 && (
          <div className="pd-gallery-section">
            <div className="about-sec-head">
              <span className="eyebrow center reveal">Gallery</span>
              <h2 className="fancy-h center about-fh reveal d1">
                <span className="fh-italic">Project</span>&nbsp;<span className="fh-bold">Gallery</span>
                <span className="fh-dash" />
              </h2>
            </div>
            <div className="pd-gallery">
              {project.gallery.map((item, i) => (
                <figure key={item.id} className={`pd-gitem reveal d${(i % 4) + 1}`}>
                  <img src={item.image} alt={item.caption || project.title} loading="lazy" />
                </figure>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <section className="pd-cta reveal">
          <h2 className="fancy-h center on-dark">
            <span className="fh-italic">Like what you</span>&nbsp;<span className="fh-bold">see?</span>
          </h2>
          <p>Let's create something exceptional for your space.</p>
          <Link to="/contact" className="btn btn-accent btn-lg">Start Your Project</Link>
        </section>
      </div>
    </div>
  );
};
