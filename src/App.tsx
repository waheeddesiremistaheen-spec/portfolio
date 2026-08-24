import { MotionConfig } from 'framer-motion'
import { useTheme } from './hooks/useTheme'
import { Background } from './components/Background'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Skills } from './components/Skills'
import { Stats } from './components/Stats'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { GitHubSection } from './components/GitHubSection'
import { WhatIBuild } from './components/WhatIBuild'
import { Philosophy } from './components/Philosophy'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { CommandPalette } from './components/CommandPalette'

export default function App() {
  const { theme, toggleTheme } = useTheme()

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise relative min-h-screen">
        {/* Accessibility: skip navigation */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <Background />
        <Cursor />
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main id="main" className="relative z-10">
          <Hero />
          <About />
          <Skills />
          <Stats />
          <Projects />
          <Experience />
          <GitHubSection />
          <WhatIBuild />
          <Philosophy />
          <Contact />
        </main>

        <Footer />
        <CommandPalette theme={theme} toggleTheme={toggleTheme} />
      </div>
    </MotionConfig>
  )
}
