import Link from 'next/link'
import { SectionIntro } from './SectionIntro'
import type { EnterpriseCategory, EnterpriseCategoryConfig } from '@/lib/enterprise-experiences'

interface EnterpriseExperienceCatalogProps {
  category: EnterpriseCategory
  config: EnterpriseCategoryConfig
}

export function EnterpriseExperienceCatalog({ category, config }: EnterpriseExperienceCatalogProps) {
  const introId = `${category}-intro`

  return (
    <section className="enterprise-section enterprise-section--tinted">
      <div className="enterprise-container">
        <SectionIntro
          id={introId}
          eyebrow={config.label}
          title={config.subtitle}
          description={config.description}
          align="left"
        />

        <div className="enterprise-experience-grid">
          {config.items.map((item) => (
            <Link
              href={`/enterprise/${category}/${item.slug}`}
              key={item.slug}
              className="enterprise-experience-card"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div>
                <p className="enterprise-experience-card-eyebrow">
                  <i className={`ti ${item.icon}`} aria-hidden="true" />
                  <span>{config.label}</span>
                </p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </div>
              <div className="enterprise-experience-card-tags">
                {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
