import { CapabilityGrid } from '@/components/enterprise/CapabilityGrid'
import { EnterpriseCTA } from '@/components/enterprise/EnterpriseCTA'
import { EnterpriseFooter } from '@/components/enterprise/EnterpriseFooter'
import { EnterpriseHero } from '@/components/enterprise/EnterpriseHero'
import { EnterpriseExperienceCatalog } from '@/components/enterprise/EnterpriseExperienceCatalog'
import { GovernanceSection } from '@/components/enterprise/GovernanceSection'
import { ReliabilitySection } from '@/components/enterprise/ReliabilitySection'
import { ENTERPRISE_EXPERIENCE_CATALOG } from '@/lib/enterprise-experiences'

const trustItems = [
  { value: '58', label: 'typed public exports' },
  { value: '28', label: 'component pages' },
  { value: '0', label: 'runtime CSS-in-JS' },
  { value: 'MIT', label: 'open-source license' },
]

export default function EnterprisePage() {
  return (
    <>
      <EnterpriseHero />
      <section className="enterprise-trust-strip" aria-label="Platform facts">
        <div className="enterprise-container">
          {trustItems.map((item) => (
            <div key={item.label}><strong>{item.value}</strong><span>{item.label}</span></div>
          ))}
        </div>
      </section>
      <CapabilityGrid />
      <EnterpriseExperienceCatalog category="patterns" config={ENTERPRISE_EXPERIENCE_CATALOG.patterns} />
      <EnterpriseExperienceCatalog category="floorplans" config={ENTERPRISE_EXPERIENCE_CATALOG.floorplans} />
      <EnterpriseExperienceCatalog category="templates" config={ENTERPRISE_EXPERIENCE_CATALOG.templates} />
      <GovernanceSection />
      <ReliabilitySection />
      <EnterpriseCTA />
      <EnterpriseFooter />
    </>
  )
}
