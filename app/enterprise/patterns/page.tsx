import { guideMetadata } from '@/lib/page-metadata'
import { EnterpriseExperienceCatalog } from '@/components/enterprise/EnterpriseExperienceCatalog'
import { ENTERPRISE_EXPERIENCE_CATALOG } from '@/lib/enterprise-experiences'

export const metadata = guideMetadata(
  'Enterprise patterns',
  'Patterns for enterprise workflows, audit, filtering, and role-safe interactions.',
  '/enterprise/patterns',
)

export default function EnterprisePatternsPage() {
  return (
    <EnterpriseExperienceCatalog
      category="patterns"
      config={ENTERPRISE_EXPERIENCE_CATALOG.patterns}
    />
  )
}
