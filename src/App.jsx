import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Personal from './components/Personal';
import { FaviconProvider } from './context/FaviconContext';

function Home() {
  const location = useLocation();

  // If we navigated here from another page with a target section
  // (e.g. clicking "About" while on /personal), scroll to it once rendered.
  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const target = location.state.scrollTo;
      const timeoutId = setTimeout(() => {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Contact />
    </>
  );
}

function App() {
  return (
    <FaviconProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personal" element={<Personal />} />
        </Routes>
      </BrowserRouter>
    </FaviconProvider>
  );
}

export default App;
