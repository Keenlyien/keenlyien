import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

function ProjectCard({ repo, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg']);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const getLanguageColor = (lang) => {
    const colors = {
      JavaScript: '#f7df1e',
      TypeScript: '#3178c6',
      Python: '#3572A5',
      React: '#61dafb',
      Vue: '#41b883',
    };
    return colors[lang] || '#8b949e';
  };

  return (
    <motion.div
      ref={cardRef}
      className="col-md-6 col-lg-4"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="project-card"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ scale: { duration: 0.2 } }}
      >
        <div className="card-glow" />
        <div className="card-content">
          <div className="card-header">
            <motion.div
              className="folder-icon"
              whileHover={{ scale: 1.1, rotate: 5 }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
            </motion.div>
            <div className="repo-stats">
              <motion.span
                className="stat star"
                whileHover={{ scale: 1.1 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                {repo.stargazers_count}
              </motion.span>
              <motion.span
                className="stat fork"
                whileHover={{ scale: 1.1 }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="18" r="3" />
                  <circle cx="12" cy="6" r="3" />
                  <path d="M12 6v12" />
                </svg>
                {repo.forks_count}
              </motion.span>
            </div>
          </div>

          <h5 className="card-title">{repo.name}</h5>
          <p className="card-text">
            {repo.description || 'No description available'}
          </p>

          <div className="card-footer">
            <div className="language">
              <span
                className="language-dot"
                style={{ backgroundColor: getLanguageColor(repo.language) }}
              />
              <span>{repo.language || 'Unknown'}</span>
            </div>
            <motion.a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm"
              whileHover={{ x: 5 }}
              transition={{ type: 'spring', stiffness: 400, damping: 10 }}
            >
              View
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </motion.a>
          </div>
        </div>
      </motion.div>

      <style>{`
        .project-card {
          background: linear-gradient(145deg, #161b22 0%, #0d1117 100%);
          border: 1px solid #30363d;
          border-radius: 16px;
          padding: 24px;
          height: 100%;
          min-height: 280px;
          position: relative;
          overflow: hidden;
          transform-style: preserve-3d;
          cursor: pointer;
        }

        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(88, 166, 255, 0.15) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .project-card:hover .card-glow {
          opacity: 1;
        }

        .card-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .folder-icon {
          color: #58a6ff;
          background: rgba(88, 166, 255, 0.1);
          padding: 10px;
          border-radius: 10px;
          display: inline-flex;
        }

        .repo-stats {
          display: flex;
          gap: 12px;
        }

        .stat {
          display: flex;
          align-items: center;
          gap: 4px;
          color: #8b949e;
          font-size: 14px;
        }

        .stat.star {
          color: #e3b341;
        }

        .card-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #c9d1d9;
          margin-bottom: 12px;
          word-break: break-word;
        }

        .card-text {
          color: #8b949e;
          font-size: 0.9rem;
          line-height: 1.6;
          flex-grow: 1;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 20px;
          padding-top: 16px;
          border-top: 1px solid #30363d;
        }

        .language {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #c9d1d9;
          font-size: 14px;
        }

        .language-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .btn {
          background: rgba(88, 166, 255, 0.1);
          border: 1px solid rgba(88, 166, 255, 0.3);
          color: #58a6ff;
          padding: 6px 12px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 13px;
          transition: all 0.3s;
          text-decoration: none;
        }

        .btn:hover {
          background: #58a6ff;
          color: #fff;
          border-color: #58a6ff;
        }
      `}</style>
    </motion.div>
  );
}

function Projects() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pinned-repos')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRepos(data);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="section-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
            My Work
          </div>
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">Things I've built that I'm proud of</p>
        </motion.div>

        {loading ? (
          <motion.div
            className="loading-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="loading-spinner" />
            <span>Loading projects...</span>
          </motion.div>
        ) : (
          <div className="row g-4">
            {repos.map((repo, index) => (
              <ProjectCard key={repo.id} repo={repo} index={index} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        #projects {
          position: relative;
        }

        #projects::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background:
            radial-gradient(circle at 20% 30%, rgba(88, 166, 255, 0.05) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(126, 231, 135, 0.05) 0%, transparent 50%);
          pointer-events: none;
        }

        .section-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(88, 166, 255, 0.1);
          border: 1px solid rgba(88, 166, 255, 0.2);
          border-radius: 100px;
          color: #58a6ff;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #c9d1d9 0%, #8b949e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .section-subtitle {
          color: #8b949e;
          font-size: 1.1rem;
          max-width: 500px;
          margin: 0 auto;
        }

        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
          color: #8b949e;
        }

        .loading-spinner {
          width: 40px;
          height: 40px;
          border: 3px solid #30363d;
          border-top-color: #58a6ff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .row {
          position: relative;
          z-index: 1;
        }
      `}</style>
    </section>
  );
}

export default Projects;