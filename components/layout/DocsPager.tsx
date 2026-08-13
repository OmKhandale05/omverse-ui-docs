'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { DOCS_NAVIGATION } from '@/lib/navigation'

const routes = DOCS_NAVIGATION.flatMap((section) =>
  section.items.map((item) => ({ ...item, section: section.title })),
)

export function DocsPager() {
  const pathname = usePathname()
  const currentIndex = routes.findIndex((item) => item.href === pathname)

  if (currentIndex === -1) return null

  const previous = routes[currentIndex - 1]
  const next = routes[currentIndex + 1]

  return (
    <nav className="docs-pager" aria-label="Documentation pagination">
      {previous ? (
        <Link href={previous.href} className="docs-pager-link docs-pager-previous">
          <span className="docs-pager-direction">
            <i className="ti ti-arrow-left" aria-hidden="true" /> Previous
          </span>
          <span className="docs-pager-title">{previous.label}</span>
          <span className="docs-pager-section">{previous.section}</span>
        </Link>
      ) : <span />}
      {next && (
        <Link href={next.href} className="docs-pager-link docs-pager-next">
          <span className="docs-pager-direction">
            Next <i className="ti ti-arrow-right" aria-hidden="true" />
          </span>
          <span className="docs-pager-title">{next.label}</span>
          <span className="docs-pager-section">{next.section}</span>
        </Link>
      )}
    </nav>
  )
}
