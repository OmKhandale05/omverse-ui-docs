'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/* ─── Types ─── */

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

/* ─── Sidebar nav structure ─── */

const SECTIONS: SidebarSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', href: '/docs/introduction' },
      { label: 'Installation', href: '/docs/installation' },
      { label: 'Theming', href: '/docs/theming' },
      { label: 'Design tokens', href: '/docs/design-tokens' },
      { label: 'Dark mode', href: '/docs/dark-mode' },
    ],
  },
  {
    title: 'Form',
    items: [
      { label: 'Button', href: '/components/button' },
      { label: 'Input', href: '/components/input' },
      { label: 'Select', href: '/components/select' },
      { label: 'Checkbox', href: '/components/checkbox' },
      { label: 'Radio', href: '/components/radio' },
      { label: 'Switch', href: '/components/switch' },
      { label: 'Slider', href: '/components/slider', badge: 'new' },
      { label: 'DatePicker', href: '/components/date-picker', badge: 'new' },
    ],
  },
  {
    title: 'Display',
    items: [
      { label: 'Avatar', href: '/components/avatar' },
      { label: 'Badge', href: '/components/badge' },
      { label: 'Card', href: '/components/card' },
      { label: 'Chip', href: '/components/chip' },
      { label: 'Accordion', href: '/components/accordion' },
      { label: 'Progress', href: '/components/progress' },
      { label: 'Divider', href: '/components/divider' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Navbar', href: '/components/navbar', variantCount: 16 },
      { label: 'Breadcrumb', href: '/components/breadcrumb', variantCount: 11 },
      { label: 'Tabs', href: '/components/tabs', variantCount: 11 },
      { label: 'Pagination', href: '/components/pagination', variantCount: 17 },
      { label: 'Stepper', href: '/components/stepper', variantCount: 10 },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { label: 'Dialog', href: '/components/dialog' },
      { label: 'Tooltip', href: '/components/tooltip' },
      { label: 'Toast', href: '/components/toast' },
    ],
  },
  {
    title: 'Other',
    items: [
      { label: 'Icon', href: '/components/icon' },
      { label: 'IconButton', href: '/components/icon-button' },
      { label: 'Spinner', href: '/components/spinner' },
    ],
  },
]

/* ─── Component ─── */

interface SidebarProps {
  activeHref?: string
}

export function Sidebar({ activeHref }: SidebarProps) {
  const pathname = usePathname()
  const active = activeHref ?? pathname

  return (
    <aside
      className="flex flex-col overflow-y-auto shrink-0 py-6"
      style={{
        width: '200px',
        background: 'var(--color-background)',
        borderRight: '0.5px solid var(--color-outline-variant)',
      }}
    >
      {SECTIONS.map((section) => (
        <div key={section.title} className="mb-6 px-3">
          {/* Section heading */}
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

          {/* Items */}
          <ul className="flex flex-col gap-0.5">
            {section.items.map((item) => {
              const isActive = active === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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

                    {/* Variant count badge */}
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

                    {/* New badge */}
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
    </aside>
  )
}
