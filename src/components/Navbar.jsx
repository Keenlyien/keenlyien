import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { type: 'anchor', href: '#hero', id: 'hero', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { type: 'route', to: '/personal', id: 'personal', label: 'Personal', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z' },
  { type: 'anchor', href: '#about', id: 'about', label: 'About', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { type: 'anchor', href: '#projects', id: 'projects', label: 'Projects', icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z' },
  { type: 'anchor', href: '#contact', id: 'contact', label: 'Contact', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Keep "Personal" highlighted while actually on the /personal route.
  useEffect(() => {
    if (location.pathname === '/personal') {
      setActiveSection('personal');
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section scroll-tracking only makes sense on the home page,
      // where the anchor sections actually exist in the DOM.
      if (location.pathname !== '/') return;

      const anchorIds = navItems.filter(i => i.type === 'anchor').map(i => i.id);
      const scrollPosition = window.scrollY + 100;

      for (let i = anchorIds.length - 1; i >= 0; i--) {
        const element = document.getElementById(anchorIds[i]);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(anchorIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    setMobileOpen(false);

    if (item.type === 'route') {
      navigate(item.to);
      return;
    }

    // Anchor item: if we're not on the home page, navigate there first
    // and pass along which section to scroll to once it renders.
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: item.href } });
      return;
    }

    const element = document.querySelector(item.href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`navbar navbar-expand-lg fixed-top ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container">
          <motion.div
            className="navbar-brand fw-bold"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/" className="brand-link">
              Keenlyien    
            </Link>
          </motion.div>

          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            <motion.span
              className="hamburger-line"
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
            />
            <motion.span
              className="hamburger-line"
              animate={{ opacity: mobileOpen ? 0 : 1 }}
            />
            <motion.span
              className="hamburger-line"
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
            />
          </button>

          <motion.div
            className={`navbar-collapse ${mobileOpen ? 'open' : ''}`}
            initial={false}
            animate={{ height: mobileOpen ? 'auto' : 0, opacity: mobileOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            style={{ overflow: 'hidden' }}
          >
            <ul className="navbar-nav ms-auto">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                const linkHref = item.type === 'route' ? item.to : item.href;

                return (
                  <motion.li
                    key={item.id}
                    className="nav-item"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <a
                      href={linkHref}
                      className={`nav-link ${isActive ? 'active' : ''}`}
                      onClick={(e) => handleNavClick(e, item)}
                    >
                      <svg className="nav-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={item.icon} />
                      </svg>
                      <span className="nav-text">{item.label}</span>
                      {isActive && (
                        <motion.span
                          className="nav-indicator"
                          layoutId="nav-indicator"
                          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                      )}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        </div>
      </motion.nav>

      <style>{`
        .navbar {
          padding: 15px 0;
          transition: all 0.4s ease;
        }

        .navbar.scrolled {
          background: rgba(22, 27, 34, 0.95);
          backdrop-filter: blur(20px);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
          padding: 10px 0;
        }

        .navbar-brand {
          font-size: 1.5rem;
        }

        .brand-link {
          color: #c9d1d9;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 2px;
        }

        .brand-bracket {
          color: #58a6ff;
          font-weight: 700;
        }

        .navbar-toggler {
          border: none;
          background: transparent;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 5px;
          cursor: pointer;
        }

        .hamburger-line {
          width: 24px;
          height: 2px;
          background: #c9d1d9;
          display: block;
          transform-origin: center;
        }

        @media (min-width: 992px) {
          .navbar-collapse {
            display: flex !important;
            height: auto !important;
            opacity: 1 !important;
          }
        }

        .navbar-nav {
          display: flex;
          gap: 8px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        @media (max-width: 991px) {
          .navbar-nav {
            flex-direction: column;
            align-items: center;
            gap: 16px;
          }
        }

        .nav-item {
          position: relative;
        }

        .nav-link {
          color: #8b949e !important;
          padding: 8px 16px !important;
          position: relative;
          transition: color 0.3s ease;
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          text-decoration: none;
        }

        .nav-link:hover,
        .nav-link.active {
          color: #58a6ff !important;
        }

        .nav-text {
          position: relative;
          z-index: 1;
        }

        .nav-icon {
          display: flex;
          align-items: center;
          opacity: 0.7;
          transition: opacity 0.3s;
        }

        .nav-link:hover .nav-icon,
        .nav-link.active .nav-icon {
          opacity: 1;
        }

        .nav-indicator {
          position: absolute;
          bottom: 0;
          left: 16px;
          right: 16px;
          height: 2px;
          background: linear-gradient(90deg, #58a6ff, #7ee787);
          border-radius: 1px;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #58a6ff, #7ee787);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .nav-link:hover::after {
          width: calc(100% - 32px);
        }
      `}</style>
    </>
  );
}

export default Navbar;
