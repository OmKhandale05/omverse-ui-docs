'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

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
  const pathname = usePathname()
  const isHome = pathname === '/'
  const lastScrollY = useRef(0)
  const rafId = useRef<number | null>(null)

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
    <nav
      className="flex items-center px-4 h-12 shrink-0 w-full sticky top-0 z-50"
      style={navStyle}
    >
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

      {/* ── Nav links — centered ── */}
      <div className="flex items-center gap-0.5 mx-auto">
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
      <div className="flex items-center gap-2 shrink-0">
        {/* Search */}
        <button
          type="button"
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-md transition-colors"
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

        {/* Theme toggle */}
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

        {/* Get started */}
        <Link
          href="/docs"
          className="inline-flex items-center justify-center rounded-md px-3 h-8 text-[13px] transition-colors"
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
  )
}
