import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const socialLinks = [
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

const introText = "Let's work together. I'm always open to new opportunities and interesting projects.";

function Contact() {
  const [displayedText, setDisplayedText] = useState('');
  const [textComplete, setTextComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < introText.length) {
        setDisplayedText(introText.slice(0, index + 1));
        index++;
      } else {
        setTextComplete(true);
        clearInterval(interval);
      }
    }, 40);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact">
      <div className="contact-bg">
        <div className="contact-orb orb-1" />
        <div className="contact-orb orb-2" />
      </div>

      <div className="container text-center position-relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="section-badge"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
            </svg>
            Get in Touch
          </motion.div>

          <motion.h2
            className="contact-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Let's Connect
          </motion.h2>

          <motion.p
            className="contact-intro"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            {displayedText}
            {!textComplete && <span className="typing-cursor">|</span>}
          </motion.p>

          <motion.div
            className="social-links"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon" style={{ color: link.color }}>
                  {link.icon}
                </span>
                <span className="social-name">{link.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        #contact {
          position: relative;
          min-height: 80vh;
          display: flex;
          align-items: center;
        }

        .contact-bg {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .contact-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.2;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(88, 166, 255, 0.4) 0%, transparent 70%);
          top: 10%;
          left: 10%;
        }

        .orb-2 {
          width: 350px;
          height: 350px;
          background: radial-gradient(circle, rgba(247, 120, 186, 0.3) 0%, transparent 70%);
          bottom: 10%;
          right: 10%;
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
          margin-bottom: 24px;
        }

        .contact-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 24px;
          background: linear-gradient(135deg, #c9d1d9 0%, #8b949e 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .contact-intro {
          font-size: 1.2rem;
          color: #8b949e;
          max-width: 600px;
          margin: 0 auto 48px;
          font-family: 'Courier New', monospace;
          min-height: 2em;
        }

        .typing-cursor {
          animation: blink 0.8s step-end infinite;
          color: #58a6ff;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .social-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 28px;
          background: linear-gradient(145deg, rgba(22, 27, 34, 0.8), rgba(13, 17, 23, 0.9));
          border: 1px solid #30363d;
          border-radius: 12px;
          color: #c9d1d9;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(88, 166, 255, 0.1), rgba(126, 231, 135, 0.1));
          opacity: 0;
          transition: opacity 0.3s;
        }

        .social-link:hover::before {
          opacity: 1;
        }

        .social-link:hover {
          border-color: #58a6ff;
          box-shadow: 0 8px 32px rgba(88, 166, 255, 0.2);
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .social-icon svg {
          width: 100%;
          height: 100%;
        }

        .social-name {
          font-weight: 500;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 2rem;
          }

          .contact-intro {
            font-size: 1rem;
          }

          .social-links {
            gap: 16px;
          }

          .social-link {
            padding: 12px 20px;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;