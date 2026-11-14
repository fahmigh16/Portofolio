import { AboutSkills } from './components/AboutSkills';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { Experience } from './components/Experience';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';
import KineticGrid from './components/ui/kinetic-grid';
import { useTheme } from './hooks/useTheme';

export function App() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <KineticGrid isDark={isDark} className="min-h-screen text-zinc-900 transition-colors duration-200 dark:text-zinc-100">
      <Navbar theme={theme} onToggleTheme={toggleTheme} />
      <main>
        <Hero />
        <AboutSkills />
        <Projects />
        <Certifications />
        <Experience />
      </main>
      <Contact />
    </KineticGrid>
  );
}

export default App;
