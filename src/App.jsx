import { useScroll, useSpring, motion } from 'framer-motion';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ParticlesBackground from './components/ParticlesBackground';
import { ThemeProvider } from './context/ThemeContext'; 
import { LanguageProvider } from './context/LanguageContext'; 

function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <LanguageProvider>
      <ThemeProvider> 
        <ParticlesBackground />
        <CustomCursor />
        {/* Scroll Progress Bar */}
        <motion.div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '4px',
            backgroundColor: 'var(--color-accent)',
            transformOrigin: '0%',
            scaleX,
            zIndex: 1000
          }}
        />
        <div className="min-h-screen" style={{ position: 'relative', zIndex: 1 }}>
          <Navbar /> 
          
          <main style={{ paddingTop: '5rem' }}> 
            
            <section id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
                <Hero />
            </section>
            
            <section id="about" style={{ padding: '5rem 0' }}>
                <About />
            </section>
            
            <section id="skills" style={{ padding: '5rem 0', backgroundColor: 'var(--color-card-bg)' }}> 
                <Skills />
            </section>

            <section id="projects" style={{ padding: '5rem 0' }}>
                <Projects />
            </section>
            
            <section id="contact" style={{ padding: '5rem 0' }}>
                <Contact />
            </section>
          </main>

          <Footer />
        </div>
      </ThemeProvider>
    </LanguageProvider>
  );
}

export default App;