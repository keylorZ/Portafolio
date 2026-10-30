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
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0b0710] text-white">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/background.jpg')" }}
        />
        <div className="absolute inset-0 bg-[#0b0710]/45" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b0710]/55 via-[#0b0710]/15 to-[#0b0710]/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,rgba(11,7,16,0.3)_65%,rgba(11,7,16,0.8)_100%)]" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
            maskImage: 'radial-gradient(circle at 50% 30%, black, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(circle at 50% 30%, black, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10">
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
    </div>
  );
}

export default App;
