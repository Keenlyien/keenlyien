import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = {
  education: {
    title: 'Education',
    content: [
      '> Loading education data...',
      '',
      '> Computer Science Degree',
      '  University: [Your University]',
      '  Period: 2020 - 2024',
      '  GPA: 3.8/4.0',
      '',
      '> Relevant Coursework:',
      '  - Data Structures & Algorithms',
      '  - Web Development',
      '  - Database Systems',
      '  - Software Engineering',
      '',
      '> Certifications:',
      '  - AWS Cloud Practitioner',
      '  - Meta Frontend Developer',
    ],
  },
  skills: {
    title: 'Skills',
    content: [
      '> Initializing skills matrix...',
      '',
      '> Languages:',
      '  [████████░░] JavaScript/TypeScript',
      '  [██████░░░░] Python',
      '  [████░░░░░░] SQL',
      '',
      '> Frameworks:',
      '  [██████░░░░] React/React Native',
      '  [█████░░░░░] Node.js',
      '  [████░░░░░░] Bootstrap',
      '',
      '> Tools:',
      '  - Git/GitHub',
      '  - Vite',
      '  - REST APIs',
      '  - Framer Motion',
    ],
  },
  experience: {
    title: 'Experience',
    content: [
      '> Fetching work history...',
      '',
      '> Frontend Developer @ Company',
      '  2024 - Present',
      '  - Built responsive web applications',
      '  - Collaborated with cross-functional teams',
      '  - Implemented UI/UX designs',
      '',
      '> Intern @ Company',
      '  2023 - 2024',
      '  - Developed internal tools',
      '  - Learned industry best practices',
      '  - Participated in code reviews',
    ],
  },
};

function TerminalPanel({ content, isVisible, panelKey }) {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const contentRef = useRef(content);

  useEffect(() => {
    if (!isVisible) {
      setDisplayedLines([]);
      setCurrentLine(0);
    }
  }, [isVisible]);

  useEffect(() => {
    if (contentRef.current !== content) {
      contentRef.current = content;
      setDisplayedLines([]);
      setCurrentLine(0);
    }
  }, [content]);

  useEffect(() => {
    if (!isVisible || currentLine >= content.length) return;

    const timeout = setTimeout(() => {
      setDisplayedLines((prev) => [...prev, content[currentLine]]);
      setCurrentLine((prev) => prev + 1);
    }, 80);

    return () => clearTimeout(timeout);
  }, [isVisible, currentLine, content]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 50 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="terminal-panel"
      style={{
        backgroundColor: '#0d1117',
        border: '1px solid #30363d',
        borderRadius: '8px',
        padding: '20px',
        fontFamily: "'Courier New', monospace",
        color: '#c9d1d9',
        minWidth: '400px',
        maxWidth: '500px',
        height: 'fit-content',
        maxHeight: '450px',
        overflow: 'hidden',
        boxShadow: '0 0 30px rgba(88, 166, 255, 0.2)',
      }}
    >
      <div style={{
        borderBottom: '1px solid #30363d',
        paddingBottom: '10px',
        marginBottom: '15px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
      }}>
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ff5f56' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ffbd2e' }} />
        <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#27c93f' }} />
        <span style={{ marginLeft: '10px', fontSize: '12px', color: '#8b949e' }}>
          terminal
        </span>
      </div>

      <div className="terminal-content" style={{ fontSize: '14px', lineHeight: '1.6', maxHeight: '350px', overflowY: 'auto' }}>
        {displayedLines.map((line, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              color: line.startsWith('>') ? '#58a6ff' : line.startsWith('[') ? '#7ee787' : '#c9d1d9',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}
          >
            {line || '\u00A0'}
          </motion.div>
        ))}
        {currentLine < content.length && (
          <span style={{ color: '#58a6ff' }}>{showCursor ? '█' : '\u00A0'}</span>
        )}
      </div>
    </motion.div>
  );
}

function About() {
  const [selected, setSelected] = useState(null);

  const toggle = (key) => {
    setSelected(selected === key ? null : key);
  };

  return (
    <section id="about" className="py-5">
      <div className="container">
        <motion.h2
          className="mb-5 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>

        <div className="about-layout">
          <div className="cards-wrapper">
            <motion.div className="cards-container">
              {Object.entries(sections).map(([key, section]) => {
                const isSelected = selected === key;

                return (
                  <motion.div
                    key={key}
                    layout
                    onClick={() => toggle(key)}
                    className="card p-4 text-center"
                    animate={{
                      x: isSelected ? -40 : selected ? 40 : 0,
                      scale: isSelected ? 1.1 : 1,
                      opacity: selected && !isSelected ? 0.5 : 1,
                      borderColor: isSelected ? '#58a6ff' : '#30363d',
                      boxShadow: isSelected
                        ? '0 0 40px rgba(88, 166, 255, 0.5), inset 0 0 20px rgba(88, 166, 255, 0.1)'
                        : 'none',
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    style={{
                      cursor: 'pointer',
                      minWidth: '260px',
                      minHeight: '160px',
                      backgroundColor: '#161b22',
                      border: '2px solid',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #58a6ff, #7ee787, #58a6ff)',
                        backgroundSize: '200% 100%',
                        animation: 'shimmer 2s linear infinite',
                      }}
                    />
                  )}

                  <motion.h3
                    animate={{
                      color: isSelected ? '#58a6ff' : '#c9d1d9',
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {section.title}
                  </motion.h3>

                  {!isSelected && (
                    <p className="text-muted mb-0 mt-2">Click to view</p>
                  )}

                  {isSelected && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2"
                    >
                      <span style={{
                        fontSize: '12px',
                        color: '#8b949e',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '5px',
                      }}>
                        <span style={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          backgroundColor: '#27c93f',
                          animation: 'pulse 1.5s infinite',
                        }} />
                        Active
                      </span>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
            </motion.div>
          </div>

          <div className="terminal-wrapper">
            <TerminalPanel
              content={selected ? sections[selected].content : []}
              isVisible={!!selected}
              panelKey={selected}
            />
          </div>
        </div>

        <style>{`
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </div>
    </section>
  );
}

export default About;