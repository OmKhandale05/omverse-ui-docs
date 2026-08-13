'use client'

import { useEffect, useState } from 'react'
import type { ComponentDocSectionId } from './ComponentDocumentation'

interface TableOfContentsItem {
  id: ComponentDocSectionId
  label: string
}

export function OnThisPage({ items }: { items: readonly TableOfContentsItem[] }) {
  const [activeId, setActiveId] = useState<ComponentDocSectionId>(items[0].id)

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((section): section is HTMLElement => section !== null)
    const scrollContainer = document.querySelector<HTMLElement>('main#main-content')

    if (!sections.length || !scrollContainer) return
    const container = scrollContainer

    function updateActiveSection() {
      const activationLine = container.getBoundingClientRect().top + 120
      let current = sections[0]

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= activationLine) current = section
        else break
      }

      setActiveId(current.id as ComponentDocSectionId)
    }

    updateActiveSection()
    container.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)

    return () => {
      container.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [items])

  return (
    <aside className="component-doc-toc" aria-label="On this page">
      <p>On this page</p>
      <ol>
        {items.map((section, index) => {
          const isActive = activeId === section.id

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? 'location' : undefined}
                data-active={isActive || undefined}
                onClick={() => setActiveId(section.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {section.label}
              </a>
            </li>
          )
        })}
      </ol>
    </aside>
  )
}
