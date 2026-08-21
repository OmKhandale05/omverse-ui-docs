import Link from 'next/link'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
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
import { BulkActionsPreview } from './BulkActionsPreview'
import { ApprovalFlowPreview } from './ApprovalFlowPreview'
import { RoleBasedAccessPreview } from './RoleBasedAccessPreview'
import { EmptyNoResultsPreview } from './EmptyNoResultsPreview'
import { ObjectDetailPreview } from './ObjectDetailPreview'
import { ActivityAuditHistoryPreview } from './ActivityAuditHistoryPreview'
import { SavedViewsPatternPreview } from './SavedViewsPatternPreview'
import { DashboardFloorplanPreview } from './DashboardFloorplanPreview'

interface EnterpriseExperiencePageProps {
  breadcrumb: string[]
  resource: EnterpriseResource
}

const PRIMARY_REFERENCE_BY_SLUG: Record<string, string> = {
  'filtering-records': '/components/filter-bar',
  'bulk-actions': '/components/bulk-action-bar',
  'approval-flow': '/components/approval-card',
  'role-based-access': '/components/access-gate',
  'empty-no-results': '/components/empty-state',
  'object-detail-preview': '/components/side-panel',
  'activity-audit-history': '/components/audit-log',
  'saved-views': '/components/saved-views',
  'dashboard': '/examples?id=dashboard',
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
          {resource.slug === 'filtering-records' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Filter operational work"
                description="Try searching, combining filters, restoring a saved view, sorting the table, and recovering from an empty result."
                layout="grid"
              >
                <FilteringRecordsPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'bulk-actions' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Act on selected records"
                description="Select eligible rows, review the exact scope, use a visible or overflow action, and clear the selection."
                layout="grid"
              >
                <BulkActionsPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'approval-flow' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Review a governed access request"
                description="Add rationale, test guarded return and rejection decisions, approve the request, and inspect the resulting handoff and timeline."
                layout="grid"
              >
                <ApprovalFlowPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'role-based-access' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Preview workspace capabilities by role"
                description="Switch roles to compare allowed, disabled, and replaced capability surfaces, inspect the read-only grant matrix, and request escalation."
                layout="grid"
              >
                <RoleBasedAccessPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'empty-no-results' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Recover from a meaningful empty result"
                description="Compare first-use, filtered, and permission-limited outcomes, then use each recommended recovery path without losing page context."
                layout="grid"
              >
                <EmptyNoResultsPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'object-detail-preview' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Inspect work without losing list context"
                description="Select records, reveal progressive detail, test the restricted state, and follow the explicit route to the complete object."
                layout="grid"
              >
                <ObjectDetailPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'activity-audit-history' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Investigate immutable operational events"
                description="Search evidence, filter event types, pause or resume the stream, inspect an event, and prepare a governed export."
                layout="grid"
              >
                <ActivityAuditHistoryPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'saved-views' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Restore and govern recurring workspace context"
                description="Apply, search, create, rename, duplicate, and set default views; then test schema drift and the guided repair state."
                layout="grid"
              >
                <SavedViewsPatternPreview />
              </ComponentPreview>
            </div>
          )}
          {resource.slug === 'dashboard' && (
            <div className="enterprise-pattern-preview">
              <ComponentPreview
                title="Monitor health and move priority work"
                description="Change the reporting range, refresh source status, inspect performance, and move urgent requests into active review."
                layout="grid"
              >
                <DashboardFloorplanPreview />
              </ComponentPreview>
            </div>
          )}
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
            {resource.examples.map((example) => (
              <div key={example.heading} className="component-doc-prose">
                <h3 className="enterprise-example-title">{example.heading}</h3>
                <ul>
                  {example.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
                {example.code && (
                  <CodeBlock
                    filename={example.filename ?? 'example.payload.json'}
                    language={example.language ?? 'json'}
                    code={example.code}
                  />
                )}
              </div>
            ))}
            <Link href={PRIMARY_REFERENCE_BY_SLUG[resource.slug] ?? '/components/data-table'} style={{ color: 'var(--color-primary)' }}>
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
