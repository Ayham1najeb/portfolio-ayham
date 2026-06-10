import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
// 💡 استيراد مُزوّد الثيم
import { ThemeProvider } from './context/ThemeContext'; 
import GlowingBackground from './components/GlowingBackground'; // الخلفية المتوهجة


function App() {
  return (
    // 💡 تغليف التطبيق بالـ ThemeProvider
    <ThemeProvider> 
      <GlowingBackground /> {/* 💡 ستظهر فقط في الوضع الليلي */}
      <div className="min-h-screen">
        <Navbar /> 
        
        <main style={{ paddingTop: '5rem' }}> 
          
          <section id="home" style={{ minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
              <Hero />
          </section>
          
          <section id="about" style={{ padding: '5rem 0' }}>
              <About />
          </section>
          
          {/* تم إزالة الخلفية هنا لكي تظهر الأضواء من خلف قسم المهارات */}
          <section id="skills" style={{ padding: '5rem 0' }}> 
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
  );
}

export default App;