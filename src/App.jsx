import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
// 💡 استيراد مُزوّد الثيم
import { ThemeProvider } from './context/ThemeContext'; 
import { LanguageProvider } from './context/LanguageContext'; 

function App() {
  return (
    <LanguageProvider>
      {/* 💡 تغليف التطبيق بالـ ThemeProvider */}
      <ThemeProvider> 
        <div className="min-h-screen">
          <Navbar /> 
          
          <main style={{ paddingTop: '5rem' }}> 
            
            <section id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
                <Hero />
            </section>
            
            <section id="about" style={{ padding: '5rem 0' }}>
                <About />
            </section>
            
            {/* خلفية أغمق قليلاً */}
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