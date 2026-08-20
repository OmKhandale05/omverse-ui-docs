import Link from 'next/link'
import { PageHeader } from '@/components/ui/PageHeader'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist,
  Anatomy,
  BehaviorGrid,
  ComponentDocumentation,
  ComponentDocSection,
  ContentGuidelines,
  GuidanceList,
  KeyboardTable,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation'
import { COMPONENT_DOC_SECTIONS } from '@/components/docs/ComponentDocumentation'
import type { EnterpriseResource } from '@/lib/enterprise-experiences'
import { EnterpriseAnatomyPreview } from './EnterpriseAnatomyPreview'
import { FilteringRecordsPreview } from './FilteringRecordsPreview'

interface EnterpriseExperiencePageProps {
  breadcrumb: string[]
  resource: EnterpriseResource
}

export function EnterpriseExperiencePage({ breadcrumb, resource }: EnterpriseExperiencePageProps) {
  return (
    <div>
      <PageHeader
        breadcrumb={breadcrumb}
        title={resource.title}
        description={resource.summary}
        tags={resource.tags}
      />

      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description={resource.overview[0]}
        >
          <div className="component-doc-prose">
            {resource.overview.slice(1).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="Use each piece in this order to keep interpretation and automation consistent."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual enterprise-anatomy-visual">
                <EnterpriseAnatomyPreview resource={resource} />
              </div>
            }
            items={resource.anatomy}
          />
          <div className="component-doc-prose">
            <p>
              The ordering here is not visual-only; it reflects interaction priority and expected user cognition.
              Keep this order unless policy demands a specific domain exception.
            </p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Use this pattern when the user needs guided consistency, state, and reuse at scale."
        >
          <GuidanceList tone="do" items={resource.whenToUse} />
        </ComponentDocSection>

        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="Avoid forcing this pattern where simpler, direct interactions are sufficient."
        >
          <GuidanceList
            tone="dont"
            items={resource.whenNotToUse}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="variants"
          title="Variants"
          description="A small number of variants helps teams choose correctly without adding complexity."
        >
          <BehaviorGrid items={resource.variants} />
        </ComponentDocSection>

        <ComponentDocSection
          id="states"
          title="States"
          description="States communicate readiness, risk, and expected user behavior."
        >
          <StateMatrix rows={resource.states} />
        </ComponentDocSection>

        <ComponentDocSection
          id="behavior"
          title="Behavior"
          description="Behavior should remain predictable across devices, permissions, and async edges."
        >
          <BehaviorGrid items={resource.behavior} />
        </ComponentDocSection>

        <ComponentDocSection
          id="accessibility"
          title="Accessibility"
          description="Keep interaction clarity high and ensure assistive technologies get the same meaning."
        >
          <div className="component-doc-stack">
            <KeyboardTable rows={resource.keyboard} />
            <AccessibilityChecklist items={resource.accessibilityChecklist} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Consistency is achieved by language standards, not by design only."
        >
          <ContentGuidelines rules={resource.contentGuidelines} />
        </ComponentDocSection>

        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Reference implementation style, payloads, and practical behavior."
        >
          <div className="component-doc-stack">
            {resource.slug === 'filtering-records' && <FilteringRecordsPreview />}
            {resource.examples.map((example) => (
              <div key={example.heading} className="component-doc-prose">
                <h3 className="enterprise-example-title">{example.heading}</h3>
                <ul>
                  {example.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {example.code && <CodeBlock filename="example.payload.json" language="json" code={example.code} />}
              </div>
            ))}
            <Link href={resource.slug.includes('view') ? '/components/saved-views' : '/components/data-table'} style={{ color: 'var(--color-primary)' }}>
              Open linked component reference for implementation patterns
            </Link>
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="props-api"
          title="Props / API"
          description="Use these API entries as a baseline contract and validate them against your domain layer."
        >
          <div className="component-doc-prose">
            <p>These names are implementation-oriented and should map to your local contracts.</p>
            <PropsTable props={resource.props} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="related-components"
          title="Related components"
          description="Useful entry points from the component library for this enterprise pattern."
        >
          <RelatedComponents items={resource.related} />
          <div className="component-doc-prose component-doc-callout">
            <i className="ti ti-info-circle" aria-hidden="true" />
            <span>Pair this pattern with related governance pages and role-aware component behavior for stronger consistency.</span>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}

export const STANDARD_ENTERPRISE_SECTION_IDS = COMPONENT_DOC_SECTIONS
