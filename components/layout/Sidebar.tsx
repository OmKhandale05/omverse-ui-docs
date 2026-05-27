'use client'

import Link from 'next/link'
import { createContext, useContext, useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

/* ─── Sidebar open/close context ─────────────────────────────────────────── */

interface SidebarCtx {
  isOpen: boolean
  setIsOpen: (v: boolean) => void
}

const SidebarContext = createContext<SidebarCtx>({
  isOpen: false,
  setIsOpen: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  return useContext(SidebarContext)
}

/* ─── Types ───────────────────────────────────────────────────────────────── */

interface SidebarItem {
  label: string
  href: string
  variantCount?: number
  badge?: 'new'
}

interface SidebarSection {
  title: string
  items: SidebarItem[]
}

/* ─── Nav data ────────────────────────────────────────────────────────────── */

const SECTIONS: SidebarSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction',   href: '/docs/introduction'  },
      { label: 'Installation',   href: '/docs/installation'  },
      { label: 'Theming',        href: '/docs/theming'       },
      { label: 'Design tokens',  href: '/docs/design-tokens' },
      { label: 'Dark mode',      href: '/docs/dark-mode'     },
    ],
  },
  {
    title: 'Form',
    items: [
      { label: 'Button',     href: '/components/button'      },
      { label: 'Input',      href: '/components/input'       },
      { label: 'Select',     href: '/components/select'      },
      { label: 'Checkbox',   href: '/components/checkbox'    },
      { label: 'Radio',      href: '/components/radio'       },
      { label: 'Switch',     href: '/components/switch'      },
      { label: 'Slider',     href: '/components/slider',     badge: 'new' },
      { label: 'DatePicker', href: '/components/date-picker', badge: 'new' },
    ],
  },
  {
    title: 'Display',
    items: [
      { label: 'Avatar',    href: '/components/avatar'    },
      { label: 'Badge',     href: '/components/badge'     },
      { label: 'Card',      href: '/components/card'      },
      { label: 'Chip',      href: '/components/chip'      },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Progress',  href: '/components/progress'  },
      { label: 'Divider',   href: '/components/divider'   },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Navbar',      href: '/components/navbar',      variantCount: 16 },
      { label: 'Breadcrumb',  href: '/components/breadcrumb',  variantCount: 11 },
      { label: 'Tabs',        href: '/components/tabs',        variantCount: 11 },
      { label: 'Pagination',  href: '/components/pagination',  variantCount: 17 },
      { label: 'Stepper',     href: '/components/stepper',     variantCount: 10 },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { label: 'Dialog',  href: '/components/dialog'  },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Toast',   href: '/components/toast'   },
    ],
  },
  {
    title: 'Other',
    items: [
      { label: 'Icon',        href: '/components/icon'        },
      { label: 'IconButton',  href: '/components/icon-button' },
      { label: 'Spinner',     href: '/components/spinner'     },
    ],
  },
]

/* ─── Shared nav list ─────────────────────────────────────────────────────── */

function SidebarNav({
  active,
  onNav,
}: {
  active: string
  onNav?: () => void
}) {
  return (
    <>
      {SECTIONS.map((section) => (
        <div key={section.title} className="mb-6 px-3">
          <p
            className="mb-1 px-2 text-[11px] uppercase tracking-wider"
            style={{
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
              letterSpacing: '0.06em',
            }}
          >
            {section.title}
          </p>

          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = active === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNav}
                    className="flex items-center justify-between px-2 py-1.5 rounded-r-md rounded-l-none text-[13px] transition-colors"
                    style={
                      isActive
                        ? {
                            fontWeight: 500,
                            color: 'var(--color-text-primary)',
                            background: 'var(--color-surface)',
                            borderLeft: '1.5px solid var(--color-primary)',
                          }
                        : {
                            fontWeight: 400,
                            color: 'var(--color-text-secondary)',
                          }
                    }
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        ;(e.currentTarget as HTMLAnchorElement).style.color =
                          'var(--color-text-primary)'
                        ;(e.currentTarget as HTMLAnchorElement).style.background =
                          'var(--color-surface)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        ;(e.currentTarget as HTMLAnchorElement).style.color =
                          'var(--color-text-secondary)'
                        ;(e.currentTarget as HTMLAnchorElement).style.background =
                          'transparent'
                      }
                    }}
                  >
                    <span>{item.label}</span>

                    {item.variantCount !== undefined && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-sm"
                        style={{
                          fontWeight: 500,
                          background: 'var(--color-surface-variant)',
                          color: 'var(--color-text-secondary)',
                          lineHeight: 1,
                        }}
                      >
                        {item.variantCount}
                      </span>
                    )}

                    {item.badge === 'new' && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-sm"
                        style={{
                          fontWeight: 500,
                          background: 'var(--color-primary-container)',
                          color: 'var(--color-on-primary-container)',
                          lineHeight: 1,
                        }}
                      >
                        new
                      </span>
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </>
  )
}

/* ─── Component ───────────────────────────────────────────────────────────── */

interface SidebarProps {
  activeHref?: string
}

export function Sidebar({ activeHref }: SidebarProps) {
  const pathname = usePathname()
  const active = activeHref ?? pathname
  const { isOpen, setIsOpen } = useSidebar()

  const close = () => setIsOpen(false)

  /* Close drawer whenever the route changes */
  useEffect(() => {
    setIsOpen(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])

  /* Lock body scroll while the mobile drawer is open */
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      <style>{`
        @media (max-width: 767px) {
          .sidebar-desktop { display: none !important; }
        }
        @media (min-width: 768px) {
          .sidebar-mobile-backdrop { display: none !important; }
          .sidebar-mobile-drawer   { display: none !important; }
        }
      `}</style>

      {/* ── Desktop: inline sidebar (hidden on mobile via CSS) ── */}
      <aside
        className="sidebar-desktop flex flex-col overflow-y-auto shrink-0 py-6"
        style={{
          width: '200px',
          background: 'var(--color-background)',
          borderRight: '0.5px solid var(--color-outline-variant)',
        }}
      >
        <SidebarNav active={active} />
      </aside>

      {/* ── Mobile: semi-transparent backdrop (hidden on desktop via CSS) ── */}
      <div
        className="sidebar-mobile-backdrop"
        onClick={close}
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.45)',
          zIndex: 60,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 250ms ease',
        }}
      />

      {/* ── Mobile: slide-in drawer (hidden on desktop via CSS) ── */}
      <div
        className="sidebar-mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          width: 280,
          background: 'var(--color-background)',
          borderRight: '0.5px solid var(--color-outline-variant)',
          zIndex: 70,
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
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
            padding: '0 12px',
            height: 48,
            borderBottom: '0.5px solid var(--color-outline-variant)',
            flexShrink: 0,
          }}
        >
          <span
            style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}
          >
            omverse-ui
          </span>
          <button
            onClick={close}
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

        {/* Scrollable nav content */}
        <div style={{ flex: 1, overflowY: 'auto', paddingTop: 12 }}>
          <SidebarNav active={active} onNav={close} />
        </div>
      </div>
    </>
  )
}
