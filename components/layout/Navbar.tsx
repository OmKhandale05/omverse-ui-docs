'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { DOCS_NAVIGATION, ENTERPRISE_NAVIGATION } from '@/lib/navigation'

function SearchIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

const PRIMARY_LINKS = [
  { label: 'Components', href: '/components/button' },
  { label: 'Examples', href: '/examples' },
  { label: 'Enterprise', href: '/enterprise' },
]

function openCommandPalette() {
  window.dispatchEvent(new CustomEvent('open-command-palette'))
}

export function Navbar() {
  const pathname = usePathname()
  const [dark, setDark] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      setDark(document.documentElement.classList.contains('dark'))
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const frame = requestAnimationFrame(() => closeButtonRef.current?.focus())

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      cancelAnimationFrame(frame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileMenuOpen])

  function closeMobileMenu() {
    setMobileMenuOpen(false)
  }

  function toggleTheme() {
    const nextDark = !dark
    setDark(nextDark)
    document.documentElement.classList.toggle('dark', nextDark)
    localStorage.setItem('omverse-theme', nextDark ? 'dark' : 'light')
  }

  return (
    <>
      <header className="site-header">
        <nav className="site-nav" aria-label="Primary navigation">
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="nav-icon-button nav-menu-button"
          >
            <i className={`ti ${mobileMenuOpen ? 'ti-x' : 'ti-menu-2'}`} aria-hidden="true" />
          </button>

          <Link href="/" className="site-logo" aria-label="omverse-ui home">
            omverse-ui
          </Link>

          <div className="nav-primary-links">
            {PRIMARY_LINKS.map((link) => {
              const isActive = pathname.startsWith(link.href.split('/button')[0])
              return (
                <Link key={link.href} href={link.href} aria-current={isActive ? 'page' : undefined}>
                  {link.label}
                </Link>
              )
            })}
            <a href="https://github.com/OmKhandale05/omverse-ui-docs" target="_blank" rel="noopener noreferrer">
              <GitHubIcon /> GitHub
            </a>
          </div>

          <div className="nav-actions">
            <button type="button" onClick={openCommandPalette} className="nav-search-button" aria-label="Search documentation">
              <SearchIcon />
              <span className="nav-search-label">Search</span>
              <kbd className="nav-search-shortcut">⌘/Ctrl K</kbd>
            </button>
            <a href="https://github.com/OmKhandale05/omverse-ui-docs" target="_blank" rel="noopener noreferrer" aria-label="Open GitHub repository" className="nav-icon-button nav-github-button">
              <GitHubIcon />
            </a>
            <button type="button" onClick={toggleTheme} aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} aria-pressed={dark} className="nav-icon-button">
              {dark ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
        </nav>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-navigation-layer">
          <button className="mobile-navigation-backdrop" onClick={closeMobileMenu} aria-label="Close navigation" />
          <aside id="mobile-navigation" className="mobile-navigation" role="dialog" aria-modal="true" aria-labelledby="mobile-navigation-title">
            <div className="mobile-navigation-header">
              <span id="mobile-navigation-title">omverse-ui</span>
              <button ref={closeButtonRef} type="button" onClick={closeMobileMenu} aria-label="Close navigation" className="nav-icon-button">
                <i className="ti ti-x" aria-hidden="true" />
              </button>
            </div>
            <div className="mobile-navigation-body">
              <div className="mobile-navigation-section">
                <h2>Menu</h2>
                {PRIMARY_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={closeMobileMenu}>{link.label}</Link>
                ))}
                <a href="https://github.com/OmKhandale05/omverse-ui-docs" target="_blank" rel="noopener noreferrer">GitHub</a>
              </div>
              {pathname.startsWith('/enterprise') && ENTERPRISE_NAVIGATION.map((section) => (
                <div key={section.title} className="mobile-navigation-section">
                  <h2>Enterprise {section.title}</h2>
                  {section.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={closeMobileMenu} aria-current={pathname === item.href ? 'page' : undefined}>
                      {item.label}
                      {item.badge === 'new' && <span className="docs-sidebar-badge">new</span>}
                    </Link>
                  ))}
                </div>
              ))}
              {pathname !== '/' && !pathname.startsWith('/enterprise') && DOCS_NAVIGATION.map((section) => (
                <div key={section.title} className="mobile-navigation-section">
                  <h2>{section.title}</h2>
                  {section.items.map((item) => (
                    <Link key={item.href} href={item.href} onClick={closeMobileMenu} aria-current={pathname === item.href ? 'page' : undefined}>
                      {item.label}
                      {item.badge === 'new' && <span className="docs-sidebar-badge">new</span>}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </aside>
        </div>
      )}
    </>
  )
}
