import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const roles = ['Web Developer', 'Prompt Engineer', 'Automation Specialist'];
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentRole.length) {
          setDisplayText(currentRole.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseDuration);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, roleIndex]);

  return (
    <section id="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1" />
        <div className="gradient-orb orb-2" />
        <div className="grid-overlay" />
      </div>

      <div className="container text-center position-relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.div
            className="hero-badge mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <span className="badge-dot" />
            Available for work
          </motion.div>

          <motion.h1
            className="display-1 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="gradient-text">Keenlyien</span>
          </motion.h1>

          <motion.div
            className="role-container mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span className="role-prefix">$ </span>
            <span className="role-text">{displayText}</span>
            <span className="cursor-blink">|</span>
          </motion.div>

          <motion.p
            className="lead text-muted mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            Building beautiful web experiences with React and modern technologies.
            Passionate about clean code and great user experiences.
          </motion.p>

          <motion.div
            className="hero-buttons d-flex justify-content-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
          >
            <a href="#projects" className="btn btn-primary btn-lg">
              <span>View Projects</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#contact" className="btn btn-outline-light btn-lg">
              Contact Me
            </a>
          </motion.div>

          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <div className="mouse">
              <div className="wheel" />
            </div>
            <span>Scroll</span>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        #hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #0d1117 0%, #161b22 50%, #0d1117 100%);
        }

        .hero-background {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(88, 166, 255, 0.4) 0%, transparent 70%);
          top: -200px;
          right: -100px;
          animation: float 15s ease-in-out infinite;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(126, 231, 135, 0.3) 0%, transparent 70%);
          bottom: -150px;
          left: -100px;
          animation: float 20s ease-in-out infinite reverse;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(50px, 30px); }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(88, 166, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88, 166, 255, 0.03) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: perspective(500px) rotateX(60deg) translateY(0); }
          100% { transform: perspective(500px) rotateX(60deg) translateY(50px); }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(39, 201, 63, 0.1);
          border: 1px solid rgba(39, 201, 63, 0.3);
          border-radius: 100px;
          color: #27c93f;
          font-size: 14px;
          font-weight: 500;
        }

        .badge-dot {
          width: 8px;
          height: 8px;
          background: #27c93f;
          border-radius: 50%;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.2); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #58a6ff 0%, #7ee787 50%, #f778ba 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .role-container {
          font-size: 1.5rem;
          font-family: 'Courier New', monospace;
          color: #8b949e;
        }

        .role-prefix {
          color: #7ee787;
        }

        .role-text {
          color: #c9d1d9;
        }

        .cursor-blink {
          animation: blink 1s step-end infinite;
          color: #58a6ff;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .btn-lg {
          padding: 14px 28px;
          font-size: 16px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .btn-lg:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(88, 166, 255, 0.3);
        }

        .btn-primary {
          background: linear-gradient(135deg, #58a6ff 0%, #79b8ff 100%);
          border: none;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #79b8ff 0%, #58a6ff 100%);
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          color: #8b949e;
          font-size: 12px;
        }

        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid #30363d;
          border-radius: 13px;
          position: relative;
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: #58a6ff;
          border-radius: 2px;
          position: absolute;
          top: 8px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll 2s ease-in-out infinite;
        }

        @keyframes scroll {
          0% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(15px); }
        }

        .display-1 {
          font-size: 4rem;
          font-weight: 700;
          line-height: 1.1;
        }

        @media (max-width: 768px) {
          .display-1 {
            font-size: 2.5rem;
          }
          .role-container {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </section>
  );
}

export default Hero;