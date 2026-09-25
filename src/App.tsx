import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"

import { useEffect, useLayoutEffect } from "react"

import { ThemeProvider } from "./contexts/theme"
import { LanguageProvider } from "./contexts/language"
import Navbar from "./components/Navbar"

import PageTransition from "./components/PageTransition"

import CustomCursor from "./components/CustomCursor"

import Home from "./pages/Home"

import Projects from "./pages/Projects"

import ProjectDetail from "./pages/ProjectDetail"

import Stack from "./pages/Stack"
import { resolvePageScrollY } from "./lib/navigation"

function readPageScrollY() {
  return resolvePageScrollY(
    window.scrollY,
    document.documentElement.scrollTop,
    document.body.scrollTop,
  )
}

function addPageScrollListener(listener: () => void) {
  window.addEventListener("scroll", listener, { passive: true })
  document.documentElement.addEventListener("scroll", listener, {
    passive: true,
  })
  document.body.addEventListener("scroll", listener, { passive: true })

  return () => {
    window.removeEventListener("scroll", listener)
    document.documentElement.removeEventListener("scroll", listener)
    document.body.removeEventListener("scroll", listener)
  }
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useLayoutEffect(() => {
    const previousScrollRestoration = window.history.scrollRestoration

    window.history.scrollRestoration = "manual"

    return () => {
      window.history.scrollRestoration = previousScrollRestoration
    }
  }, [])

  useLayoutEffect(() => {
    const htmlScrollBehavior = document.documentElement.style.scrollBehavior
    const bodyScrollBehavior = document.body.style.scrollBehavior

    document.documentElement.style.scrollBehavior = "auto"
    document.body.style.scrollBehavior = "auto"

    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0

    document.documentElement.style.scrollBehavior = htmlScrollBehavior
    document.body.style.scrollBehavior = bodyScrollBehavior
  }, [pathname])

  return null
}

function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById("scroll-progress")

    if (!bar) return

    const onScroll = () => {
      const scrollTop = readPageScrollY()

      const docHeight =
        Math.max(
          document.documentElement.scrollHeight,
          document.body.scrollHeight,
        ) - window.innerHeight

      const pct = docHeight > 0 ? scrollTop / docHeight : 0

      bar.style.transform = `scaleX(${pct})`
    }

    const removeScrollListener = addPageScrollListener(onScroll)

    onScroll()

    return removeScrollListener
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
