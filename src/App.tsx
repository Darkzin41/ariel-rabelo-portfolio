import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import { useEffect } from "react"

import { ThemeProvider } from "./contexts/theme"
import { LanguageProvider } from "./contexts/language"
import Navbar from "./components/Navbar"

import PageTransition from "./components/PageTransition"

import CustomCursor from "./components/CustomCursor"

import Home from "./pages/Home"

import Projects from "./pages/Projects"

import ProjectDetail from "./pages/ProjectDetail"

import Stack from "./pages/Stack"

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" })
  }, [pathname])

  return null
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress")

    if (!bar) return

    const onScroll = () => {
      const scrollTop = window.scrollY

      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight

      const pct = docHeight > 0 ? scrollTop / docHeight : 0

      bar.style.transform = `scaleX(${pct})`
    }

    window.addEventListener("scroll", onScroll, { passive: true })

    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      id="scroll-progress"
      className="scroll-progress"
      style={{ width: "100%", transformOrigin: "left" }}
    />
  )
}

function AppRoutes() {
  const location = useLocation()

  return (
    <PageTransition>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/stack" element={<Stack />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </PageTransition>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <ThemeProvider>
        <BrowserRouter>
          <style>{`@media (pointer: fine) and (min-width: 768px) { * { cursor: none !important; } }`}</style>
          <CustomCursor />
          <ScrollToTop />
          <ScrollProgress />
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </ThemeProvider>
    </LanguageProvider>
  )
}
