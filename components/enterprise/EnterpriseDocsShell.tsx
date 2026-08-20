'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ENTERPRISE_NAVIGATION, ENTERPRISE_ROUTES } from '@/lib/navigation'

function EnterpriseSidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="enterprise-sidebar" aria-label="Enterprise documentation navigation">
      <div className="enterprise-sidebar-intro">
        <Link href="/enterprise" className="enterprise-sidebar-home">
          <span className="enterprise-sidebar-mark" aria-hidden="true">O</span>
          <span><strong>Enterprise</strong><small>Experience system</small></span>
        </Link>
        <span className="enterprise-sidebar-version">v0.1</span>
      </div>

      <nav aria-label="Enterprise resources">
        {ENTERPRISE_NAVIGATION.map((section) => (
          <section key={section.title} className="enterprise-sidebar-section">
            <h2>{section.title}</h2>
            <ul>
              {section.items.map((item, index) => {
                const isActive = pathname === item.href

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      data-active={isActive || undefined}
                      data-index={index === 0 ? 'true' : undefined}
                    >
                      <i className={`ti ${item.icon}`} aria-hidden="true" />
                      <span>{item.label}</span>
                      {index === 0 && <i className="ti ti-arrow-up-right enterprise-sidebar-arrow" aria-hidden="true" />}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}
      </nav>
    </aside>
  )
}

function EnterprisePager({ pathname }: { pathname: string }) {
  const currentIndex = ENTERPRISE_ROUTES.findIndex((route) => route.href === pathname)
  if (currentIndex < 1) return null

  const previous = ENTERPRISE_ROUTES[currentIndex - 1]
  const next = ENTERPRISE_ROUTES[currentIndex + 1]

  return (
    <nav className="enterprise-pager" aria-label="Enterprise page navigation">
      {previous ? (
        <Link href={previous.href} className="enterprise-pager-link">
          <span><i className="ti ti-arrow-left" aria-hidden="true" />Previous</span>
          <strong>{previous.label}</strong>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="enterprise-pager-link enterprise-pager-link--next">
          <span>Next<i className="ti ti-arrow-right" aria-hidden="true" /></span>
          <strong>{next.label}</strong>
        </Link>
      )}
    </nav>
  )
}

export function EnterpriseDocsShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLanding = pathname === '/enterprise'

  if (isLanding) {
    return <main id="main-content" tabIndex={-1}>{children}</main>
  }

  return (
    <div className="enterprise-docs-frame">
      <EnterpriseSidebar pathname={pathname} />
      <main id="main-content" tabIndex={-1} className="enterprise-docs-main">
        {children}
        <EnterprisePager pathname={pathname} />
      </main>
    </div>
  )
}
