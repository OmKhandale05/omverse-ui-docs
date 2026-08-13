'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DOCS_NAVIGATION } from '@/lib/navigation'

export { DOCS_NAVIGATION as SECTIONS } from '@/lib/navigation'

interface SidebarProps {
  activeHref?: string
}

export function Sidebar({ activeHref }: SidebarProps) {
  const pathname = usePathname()
  const active = activeHref ?? pathname

  return (
    <aside className="docs-sidebar" aria-label="Documentation navigation">
      {DOCS_NAVIGATION.map((section) => (
        <div key={section.title} className="docs-sidebar-section">
          <h2 className="docs-sidebar-heading">{section.title}</h2>
          <ul className="docs-sidebar-list">
            {section.items.map((item) => {
              const isActive = active === item.href

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? 'page' : undefined}
                    className="docs-sidebar-link"
                    data-active={isActive || undefined}
                  >
                    <span>{item.label}</span>
                    {item.variantCount !== undefined && (
                      <span className="docs-sidebar-count" aria-label={`${item.variantCount} variants`}>
                        {item.variantCount}
                      </span>
                    )}
                    {item.badge === 'new' && <span className="docs-sidebar-badge">new</span>}
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
