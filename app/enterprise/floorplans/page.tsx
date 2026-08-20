import { guideMetadata } from '@/lib/page-metadata'
import { EnterpriseExperienceCatalog } from '@/components/enterprise/EnterpriseExperienceCatalog'
import { ENTERPRISE_EXPERIENCE_CATALOG } from '@/lib/enterprise-experiences'

export const metadata = guideMetadata(
  'Enterprise floorplans',
  'Reusable enterprise floorplans for dashboard, reporting, approvals, and admin surfaces.',
  '/enterprise/floorplans',
)

export default function EnterpriseFloorplansPage() {
  return (
    <EnterpriseExperienceCatalog
      category="floorplans"
      config={ENTERPRISE_EXPERIENCE_CATALOG.floorplans}
    />
  )
}
