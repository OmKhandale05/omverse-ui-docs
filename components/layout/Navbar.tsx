'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { SECTIONS } from '@/components/layout/Sidebar'

/* ─── Tabler-style outline SVG icons ─── */

function SearchIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

function SunIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

/* ─── Logo mark: black square with white grid pattern ─── */

function LogoMark() {
  return (
    <span
      className="flex items-center justify-center w-5 h-5 rounded-[3px] shrink-0"
      style={{ background: 'var(--color-on-surface)' }}
    >
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" fill="var(--color-background)" />
        <rect x="6.5" y="1" width="3.5" height="3.5" rx="0.5" fill="var(--color-background)" />
        <rect x="1" y="6.5" width="3.5" height="3.5" rx="0.5" fill="var(--color-background)" />
        <rect
          x="6.5"
          y="6.5"
          width="3.5"
          height="3.5"
          rx="0.5"
          fill="var(--color-background)"
          opacity="0.35"
        />
      </svg>
    </span>
  )
}

interface NavLink {
  label: string
  href: string
  external?: boolean
}

const NAV_LINKS: NavLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Examples', href: '/examples' },
  { label: 'GitHub', href: 'https://github.com/omverse/omverse-ui', external: true },
]

export function Navbar() {
  const [dark, setDark] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isHidden, setIsHidden] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const isHome = pathname === '/'
  const lastScrollY = useRef(0)
  const rafId = useRef<number | null>(null)

  const closeMobileMenu = () => setMobileMenuOpen(false)

  /* Single scroll listener — handles both transparent/solid and hide/show */
  useEffect(() => {
    function handleScroll() {
      // Throttle via rAF — only queue one frame at a time
      if (rafId.current !== null) return
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null
        const currentY = window.scrollY

        // transparent → solid threshold (used by navStyle below)
        setIsScrolled(currentY > 80)

        // hide/show logic — works on every page
        if (currentY < 80) {
          setIsHidden(false)
        } else if (currentY > lastScrollY.current) {
          setIsHidden(true)   // scrolling down
        } else {
          setIsHidden(false)  // scrolling up
        }

        lastScrollY.current = currentY
      })
    }

    handleScroll() // sync on mount
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (rafId.current !== null) cancelAnimationFrame(rafId.current)
    }
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => {
    closeMobileMenu()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /* Lock body scroll while mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  function toggleTheme() {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
  }

  const navStyle: React.CSSProperties =
    !isHome
      ? {
          background: 'var(--color-background)',
          borderBottom: '0.5px solid var(--color-outline-variant)',
          transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'background 200ms, border-color 200ms, transform 250ms ease',
        }
      : isScrolled
        ? {
            background: 'color-mix(in srgb, var(--color-background) 80%, transparent)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderBottom: '0.5px solid var(--color-outline-variant)',
            transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'background 200ms, border-color 200ms, transform 250ms ease',
          }
        : {
            background: 'transparent',
            borderBottom: '0.5px solid transparent',
            transform: isHidden ? 'translateY(-100%)' : 'translateY(0)',
            transition: 'background 200ms, border-color 200ms, transform 250ms ease',
          }

  return (
  <>
    <nav
      className="flex items-center px-4 h-12 shrink-0 w-full sticky top-0 z-50"
      style={navStyle}
    >
      {/* ── Responsive rules — no Tailwind breakpoint classes needed ── */}
      <style>{`
        .nav-hamburger   { display: flex; }
        .nav-links       { display: none; }
        .nav-search      { display: none; }
        .nav-get-started { display: none; }
        .nav-right       { margin-left: auto; }
        @media (min-width: 768px) {
          .nav-hamburger   { display: none !important; }
          .nav-links       { display: flex !important; }
          .nav-search      { display: flex !important; }
          .nav-get-started { display: inline-flex !important; }
          .nav-right       { margin-left: 0 !important; }
        }
      `}</style>

      {/* ── Hamburger — mobile only, all pages ── */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label={mobileMenuOpen ? 'Close navigation' : 'Open navigation'}
        className="nav-hamburger items-center justify-center w-8 h-8 rounded-md shrink-0 mr-2"
        style={{
          border: 'none',
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          cursor: 'pointer',
        }}
      >
        <i
          className={`ti ${mobileMenuOpen ? 'ti-x' : 'ti-menu-2'}`}
          style={{ fontSize: 18 }}
          aria-hidden="true"
        />
      </button>

      {/* ── Logo ── */}
      <Link href="/" className="flex items-center gap-2 mr-8 shrink-0">
        <LogoMark />
        <span
          className="text-[13px]"
          style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}
        >
          omverse-ui
        </span>
        <span
          className="text-[10px] px-1.5 py-0.5 rounded-sm"
          style={{
            fontWeight: 500,
            background: 'var(--color-surface-variant)',
            color: 'var(--color-text-secondary)',
          }}
        >
          v0.1.4
        </span>
      </Link>

      {/* ── Nav links — centered, hidden on mobile ── */}
      <div className="nav-links items-center gap-0.5 mx-auto">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            {...(link.external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-[13px] transition-colors"
            style={{
              fontWeight: 400,
              color: 'var(--color-text-secondary)',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                'var(--color-text-primary)'
              ;(e.currentTarget as HTMLAnchorElement).style.background =
                'var(--color-surface)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLAnchorElement).style.color =
                'var(--color-text-secondary)'
              ;(e.currentTarget as HTMLAnchorElement).style.background = 'transparent'
            }}
          >
            {link.label === 'GitHub' && <GitHubIcon />}
            {link.label}
          </Link>
        ))}
      </div>

      {/* ── Right side ── */}
      <div className="nav-right flex items-center gap-2 shrink-0">
        {/* Search — hidden on mobile */}
        <button
          type="button"
          className="nav-search items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors"
          style={{
            fontWeight: 400,
            fontSize: '13px',
            color: 'var(--color-text-secondary)',
            border: '0.5px solid var(--color-outline-variant)',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              'var(--color-surface)'
            ;(e.currentTarget as HTMLButtonElement).style.color =
              'var(--color-text-primary)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color =
              'var(--color-text-secondary)'
          }}
        >
          <SearchIcon />
          <span>Search</span>
          <kbd
            className="rounded px-1.5 py-0.5"
            style={{
              fontSize: '11px',
              fontWeight: 500,
              background: 'var(--color-surface-variant)',
              color: 'var(--color-text-secondary)',
            }}
          >
            ⌘K
          </kbd>
        </button>

        {/* Theme toggle — visible on all sizes */}
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
          className="w-8 h-8 flex items-center justify-center rounded-md transition-colors"
          style={{ color: 'var(--color-text-secondary)' }}
          onMouseEnter={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background =
              'var(--color-surface)'
            ;(e.currentTarget as HTMLButtonElement).style.color =
              'var(--color-text-primary)'
          }}
          onMouseLeave={(e) => {
            ;(e.currentTarget as HTMLButtonElement).style.background = 'transparent'
            ;(e.currentTarget as HTMLButtonElement).style.color =
              'var(--color-text-secondary)'
          }}
        >
          {dark ? <SunIcon /> : <MoonIcon />}
        </button>

        {/* Get started — hidden on mobile */}
        <Link
          href="/docs"
          className="nav-get-started items-center justify-center rounded-md px-3 h-8 text-[13px] transition-colors"
          style={{
            fontWeight: 500,
            background: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
          }}
        >
          Get started
        </Link>
      </div>
    </nav>

    {/* ── Mobile backdrop ── */}
    <div
      onClick={closeMobileMenu}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.45)',
        zIndex: 60,
        opacity: mobileMenuOpen ? 1 : 0,
        pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        transition: 'opacity 250ms ease',
      }}
    />

    {/* ── Mobile drawer ── */}
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: 300,
        background: 'var(--color-background)',
        borderRight: '0.5px solid var(--color-outline-variant)',
        zIndex: 70,
        transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 250ms ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 16px',
          height: 48,
          borderBottom: '0.5px solid var(--color-outline-variant)',
          flexShrink: 0,
        }}
      >
        <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>
          omverse-ui
        </span>
        <button
          onClick={closeMobileMenu}
          aria-label="Close navigation"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 32,
            height: 32,
            borderRadius: 6,
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-secondary)',
            cursor: 'pointer',
          }}
        >
          <i className="ti ti-x" style={{ fontSize: 18 }} aria-hidden="true" />
        </button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 24 }}>

        {/* ── "Menu" — nav links, always shown ── */}
        <p
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontWeight: 500,
            color: 'var(--color-text-disabled)',
            marginBottom: 4,
          }}
        >
          Menu
        </p>
        {NAV_LINKS.map((link) => {
          const isActive =
            !link.external &&
            (pathname === link.href || pathname.startsWith(link.href + '/'))
          const style: React.CSSProperties = {
            display: 'block',
            padding: '10px 0',
            fontSize: 14,
            fontWeight: isActive ? 500 : 400,
            color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
            textDecoration: 'none',
          }
          return link.external ? (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={style}
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ) : (
            <Link key={link.label} href={link.href} style={style} onClick={closeMobileMenu}>
              {link.label}
            </Link>
          )
        })}

        {/* ── Sidebar sections — docs/component pages only ── */}
        {!isHome && (
          <>
            <div
              style={{
                height: '0.5px',
                background: 'var(--color-outline-variant)',
                margin: '20px 0',
              }}
            />
            {SECTIONS.map((section) => (
              <div key={section.title}>
                <p
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 500,
                    color: 'var(--color-text-disabled)',
                    marginBottom: 4,
                    marginTop: 20,
                  }}
                >
                  {section.title}
                </p>
                {section.items.map((item) => {
                  const isItemActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobileMenu}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                        padding: '10px 0',
                        fontSize: 14,
                        fontWeight: isItemActive ? 500 : 400,
                        color: isItemActive
                          ? 'var(--color-text-primary)'
                          : 'var(--color-text-secondary)',
                        textDecoration: 'none',
                      }}
                    >
                      {item.label}
                      {item.badge === 'new' && (
                        <span
                          style={{
                            fontSize: 10,
                            fontWeight: 500,
                            padding: '1px 5px',
                            borderRadius: 3,
                            background: 'var(--color-primary-container)',
                            color: 'var(--color-on-primary-container)',
                          }}
                        >
                          new
                        </span>
                      )}
                    </Link>
                  )
                })}
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  </>
  )
}
