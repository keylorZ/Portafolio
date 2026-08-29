import { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Contact from '@/components/Contact';
import SocialLinks from '@/components/SocialLinks';
import Footer from '@/components/Footer';

function App() {
  const visitRegistered = useRef(false);

  useEffect(() => {
    if (visitRegistered.current) return;
    visitRegistered.current = true;
    fetch('/api/visitas', { method: 'POST' }).catch(() => {
      // El servidor de visitas puede no estar disponible; no romper el sitio.
    });
  }, []);

  return (
    <div className="bg-slate-950">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Contact />
      <SocialLinks />
      <Footer />
    </div>
  );
}

export default App;
