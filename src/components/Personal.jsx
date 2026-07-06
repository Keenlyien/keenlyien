import { motion } from 'framer-motion';

const contactLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/Keenlyien',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#c9d1d9',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/keenlyien',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    color: '#0077b5',
  },
  {
    name: 'Email',
    url: 'mailto:keenlyien@example.com',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
        <polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#58a6ff',
  },
];

const gifSlots = ['left', 'center', 'right'];

function Personal() {
  return (
    <section id="personal">
      <div className="container">
        <motion.div
          className="personal-top"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="photo-placeholder">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4.418 3.582-7 8-7s8 2.582 8 7" />
            </svg>
          </div>

          <h2 className="personal-name">Your Name</h2>

          <div className="personal-contact-icons">
            {contactLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-icon-link"
                whileHover={{ y: -4, scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                aria-label={link.name}
                style={{ color: link.color }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="personal-body"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur.
          </p>
        </motion.div>

        <motion.div
          className="gif-row"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {gifSlots.map((slot, index) => (
            <motion.div
              key={slot}
              className="gif-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.02 }}
            >
              <span className="gif-card-label">GIF placeholder ({slot})</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style>{`
        #personal {
          position: relative;
          padding: 100px 0;
        }

        .personal-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          margin-bottom: 48px;
        }

        .photo-placeholder {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: linear-gradient(145deg, #161b22 0%, #0d1117 100%);
          border: 2px dashed #30363d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b949e;
          margin-bottom: 20px;
        }

        .personal-name {
          font-size: 2rem;
          font-weight: 700;
          color: #c9d1d9;
          margin-bottom: 20px;
        }

        .personal-contact-icons {
          display: flex;
          gap: 16px;
        }

        .contact-icon-link {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88, 166, 255, 0.08);
          border: 1px solid #30363d;
          transition: all 0.3s ease;
        }

        .contact-icon-link:hover {
          border-color: currentColor;
          box-shadow: 0 4px 20px rgba(88, 166, 255, 0.2);
        }

        .contact-icon-link svg {
          width: 20px;
          height: 20px;
        }

        .personal-body {
          max-width: 700px;
          margin: 0 auto 56px;
        }

        .personal-body p {
          color: #8b949e;
          font-size: 1.05rem;
          line-height: 1.8;
          text-align: center;
        }

        .gif-row {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .gif-card {
          flex: 1 1 280px;
          max-width: 320px;
          aspect-ratio: 4 / 3;
          border-radius: 16px;
          background: linear-gradient(145deg, #161b22 0%, #0d1117 100%);
          border: 2px dashed #30363d;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8b949e;
          font-size: 0.9rem;
          text-align: center;
          padding: 16px;
        }

        @media (max-width: 768px) {
          #personal {
            padding: 60px 0;
          }

          .personal-name {
            font-size: 1.6rem;
          }

          .photo-placeholder {
            width: 120px;
            height: 120px;
          }

          .gif-row {
            flex-direction: column;
            align-items: center;
          }

          .gif-card {
            width: 100%;
            max-width: 320px;
          }
        }
      `}</style>
    </section>
  );
}

export default Personal;
