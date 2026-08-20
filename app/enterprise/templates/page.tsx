import { guideMetadata } from '@/lib/page-metadata'
import { EnterpriseExperienceCatalog } from '@/components/enterprise/EnterpriseExperienceCatalog'
import { ENTERPRISE_EXPERIENCE_CATALOG } from '@/lib/enterprise-experiences'

export const metadata = guideMetadata(
  'Enterprise templates',
  'Reusable enterprise templates for work items, users, and approvals.',
  '/enterprise/templates',
)

export default function EnterpriseTemplatesPage() {
  return (
    <EnterpriseExperienceCatalog
      category="templates"
      config={ENTERPRISE_EXPERIENCE_CATALOG.templates}
    />
  )
}
