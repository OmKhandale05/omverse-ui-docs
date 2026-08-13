'use client'

import { useState } from 'react'
import { Badge, Button, Card, CardBody, CardFooter, CardHeader, CardMedia } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist,
  Anatomy,
  BehaviorGrid,
  ComponentDocSection,
  ComponentDocumentation,
  ContentGuidelines,
  GuidanceList,
  KeyboardTable,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const CARD_PROPS = [
  { name: 'variant', type: "'elevated' | 'filled' | 'outlined' | 'ghost' | 'gradient' | 'glass'", default: "'elevated'", description: 'Sets the surface treatment.' },
  { name: 'radius', type: "'none' | 'sm' | 'md' | 'lg' | 'full'", default: "'md'", description: 'Sets the corner radius.' },
  { name: 'interactive', type: 'boolean', default: 'false', description: 'Adds hover, focus, and active feedback.' },
  { name: 'selected', type: 'boolean', default: 'false', description: 'Shows a selected ring or border.' },
  { name: 'asButton', type: 'boolean', default: 'false', description: 'Renders a semantic button when the entire card is one action.' },
] as const

const COMPOUND_PROPS = [
  { name: 'CardMedia.src', type: 'string', default: 'undefined', description: 'Image source; omitting it renders placeholder content.' },
  { name: 'CardMedia.alt', type: 'string', default: "''", description: 'Alternative text for meaningful media.' },
  { name: 'CardMedia.height', type: 'number', default: "'100%'", description: 'Media height in pixels.' },
  { name: 'CardMedia.overlay', type: 'boolean', default: 'false', description: 'Adds a contrast gradient over the image.' },
  { name: 'CardMedia.overlayContent', type: 'ReactNode', default: 'undefined', description: 'Content positioned over the media.' },
  { name: 'CardHeader.title', type: 'ReactNode', default: 'undefined', description: 'Primary card heading content.' },
  { name: 'CardHeader.subtitle', type: 'ReactNode', default: 'undefined', description: 'Secondary heading context.' },
  { name: 'CardHeader.avatar', type: 'ReactNode', default: 'undefined', description: 'Leading avatar or icon.' },
  { name: 'CardHeader.action', type: 'ReactNode', default: 'undefined', description: 'Trailing status or local action.' },
  { name: 'CardBody.noPadding', type: 'boolean', default: 'false', description: 'Removes the default body padding.' },
  { name: 'CardFooter.divider', type: 'boolean', default: 'false', description: 'Adds a separator above footer content.' },
  { name: 'CardFlip.front', type: 'ReactNode', default: 'required', description: 'Content on the initial face.' },
  { name: 'CardFlip.back', type: 'ReactNode', default: 'required', description: 'Content on the reverse face.' },
  { name: 'CardFlip.height', type: 'number', default: '160', description: 'Flip-card height in pixels.' },
  { name: 'CardFlip.direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Axis used for the flip transition.' },
] as const

const BASIC_CODE = `import { Card, CardBody, CardFooter, CardHeader } from 'omverse-ui'

<Card variant="outlined">
  <CardHeader title="Quarterly planning" subtitle="Updated 2 hours ago" />
  <CardBody>Review goals, owners, and delivery risks.</CardBody>
  <CardFooter divider>
    <Button size="sm" variant="text">View plan</Button>
  </CardFooter>
</Card>`

const ACTION_CODE = `<Card
  asButton
  interactive
  selected={selected}
  onClick={() => setSelected(true)}
  aria-pressed={selected}
>
  <CardHeader title="Start from a template" />
  <CardBody>Use a predefined project structure.</CardBody>
</Card>`

const CARD_STATES = [
  { state: 'Default', trigger: 'Static grouped content', visual: 'Stable surface treatment', interaction: 'Only nested controls are interactive' },
  { state: 'Hover', trigger: 'Pointer enters an interactive card', visual: 'Surface or elevation changes', interaction: 'Signals the card can be activated' },
  { state: 'Focus', trigger: 'Keyboard focuses an asButton card', visual: 'Visible focus indicator', interaction: 'Enter or Space activates the card' },
  { state: 'Pressed', trigger: 'Card is being activated', visual: 'Brief active feedback', interaction: 'Action has not yet completed' },
  { state: 'Selected', trigger: 'Card represents a chosen option', visual: 'Selected ring or border', interaction: 'Selection may be toggled or changed' },
  { state: 'Disabled', trigger: 'Action is unavailable', visual: 'Use native disabled treatment on asButton', interaction: 'Cannot be activated' },
]

export default function CardPage() {
  const [selected, setSelected] = useState(false)

  return (
    <div>
      <PageHeader breadcrumb={['Components', 'Display', 'Card']} title="Card" description="Cards group related information and actions into a scannable surface. They can remain static or become one clearly defined interactive control." tags={['6 variants', 'Compound anatomy', 'Interactive', 'Selectable', 'Media']} />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Use a card to create a meaningful content group whose elements share one topic or task.">
          <div className="component-doc-stack">
            <ComponentPreview title="Content card" description="Header, body, and footer establish a predictable reading and action order.">
              <Card variant="outlined" style={{ width: 'min(100%, 360px)' }}>
                <CardHeader title="Quarterly planning" subtitle="Updated 2 hours ago" action={<Badge variant="tonal">Draft</Badge>} />
                <CardBody><p style={{ color: 'var(--color-text-secondary)' }}>Review goals, owners, and delivery risks before the planning session.</p></CardBody>
                <CardFooter divider><Button size="sm" variant="text">View plan</Button></CardFooter>
              </Card>
            </ComponentPreview>
            <CodeBlock filename="PlanningCard.tsx" code={BASIC_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy" description="A card surface can contain media, a header, body content, and a footer, but only the regions needed by the content should be rendered.">
          <Anatomy preview={<div className="component-anatomy-visual" style={{ width: 260 }}><Card variant="outlined"><CardMedia height={72}><span style={{ opacity: .65 }}>Media</span></CardMedia><CardHeader title="Project title" subtitle="Supporting context" /><CardBody>Primary content</CardBody><CardFooter divider>Actions</CardFooter></Card><span className="component-anatomy-marker" style={{ top: 8, left: -8 }}>1</span><span className="component-anatomy-marker" style={{ top: 84, left: -8 }}>2</span><span className="component-anatomy-marker" style={{ top: 142, left: -8 }}>3</span><span className="component-anatomy-marker" style={{ bottom: 8, left: -8 }}>4</span></div>} items={[
            { number: 1, name: 'Media', description: 'Optional image, illustration, or visual preview.' },
            { number: 2, name: 'Header', description: 'Title, supporting context, identity, and local status.' },
            { number: 3, name: 'Body', description: 'Primary information that belongs to the card.', required: true },
            { number: 4, name: 'Footer', description: 'Actions or metadata that conclude the group.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Cards work best for repeatable, self-contained content groups that benefit from visual separation.">
          <GuidanceList tone="do" items={[
            { title: 'Group one coherent subject', description: 'Keep the title, details, metadata, and actions about the same object or task.' },
            { title: 'Support scanning', description: 'Use repeated card anatomy for comparable projects, people, assets, or plans.' },
            { title: 'Offer one whole-card action', description: 'Use asButton when activating anywhere performs the same primary action.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="Do not add card surfaces when hierarchy, density, or semantics call for a simpler pattern.">
          <GuidanceList tone="dont" items={[
            { title: 'Do not card every section', description: 'Use headings, spacing, and dividers when content already belongs to one page flow.' },
            { title: 'Do not use for dense comparison', description: 'Use DataTable or List when column alignment and rapid row scanning matter.' },
            { title: 'Do not nest interactive cards', description: 'A whole-card button must not contain other links, buttons, or form controls.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Choose a surface treatment from hierarchy and background needs, not decoration alone.">
          <div className="component-doc-stack">
            <ComponentPreview title="Surface treatments" description="Elevated, filled, and outlined cover most product-interface needs.">
              {(['elevated', 'filled', 'outlined', 'ghost', 'gradient'] as const).map((variant) => <Card key={variant} variant={variant} style={{ width: 150 }}><CardBody><strong style={{ textTransform: 'capitalize' }}>{variant}</strong></CardBody></Card>)}
            </ComponentPreview>
            <BehaviorGrid items={[
              { icon: 'ti-shadow', title: 'Elevated', description: 'Separates content from a flat background with depth.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Groups content with a quiet tonal surface.' },
              { icon: 'ti-square', title: 'Outlined', description: 'Defines a boundary without adding elevation.' },
              { icon: 'ti-sparkles', title: 'Gradient and glass', description: 'Reserve expressive treatments for branded or promotional contexts.' },
            ]} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="Static cards do not need interaction states; interactive and selectable cards must communicate every available state."><StateMatrix rows={CARD_STATES} /></ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="The card’s semantics depend on whether it groups content or represents one action.">
          <BehaviorGrid items={[
            { icon: 'ti-layout-card', title: 'Static container', description: 'Leave as a div when the card only groups content and nested actions.' },
            { icon: 'ti-hand-click', title: 'Whole-card action', description: 'Set asButton when the entire surface performs one action.' },
            { icon: 'ti-check', title: 'Selection', description: 'Pair selected visuals with aria-pressed or selection state in the surrounding pattern.' },
            { icon: 'ti-arrows-maximize', title: 'Responsive layout', description: 'Let cards reflow and avoid fixed heights that clip translated or enlarged content.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="Card itself adds no landmark semantics; use meaningful headings and native controls according to the content and action model.">
          <div className="component-doc-stack">
            <KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves to nested controls or to an asButton card.' }, { keys: ['Enter', 'Space'], action: 'Activates an asButton card.' }]} />
            <AccessibilityChecklist items={['Use asButton for a single whole-card action.', 'Never place interactive descendants inside an asButton card.', 'Keep heading levels consistent with the page hierarchy.', 'Write useful alt text for meaningful media and empty alt text for decorative media.', 'Expose selected state programmatically.', 'Keep focus indicators visible against every variant.']} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Card content should be concise enough to scan and complete enough to understand without guessing.">
          <ContentGuidelines rules={[
            { label: 'Lead with the subject', guidance: 'Use a specific title that distinguishes the card from nearby items.', example: 'Quarterly planning' },
            { label: 'Prioritize details', guidance: 'Show only information needed to identify or act on the item.', example: 'Updated 2 hours ago' },
            { label: 'Use clear actions', guidance: 'Label buttons with the outcome rather than generic direction.', example: 'View plan' },
            { label: 'Keep repeated cards parallel', guidance: 'Use the same fields and content order across a collection.', example: 'Owner · Status · Due date' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="Interactive selection cards are appropriate when each card is one mutually comparable choice.">
          <div className="component-doc-stack">
            <ComponentPreview title="Selectable action card" description="The whole surface is one button and exposes pressed state.">
              <Card variant="outlined" asButton interactive selected={selected} aria-pressed={selected} onClick={() => setSelected((value) => !value)} style={{ width: 'min(100%, 320px)' }}>
                <CardHeader title="Start from a template" subtitle={selected ? 'Selected' : 'Recommended for repeatable work'} />
                <CardBody>Use a predefined project structure and workflow.</CardBody>
              </Card>
            </ComponentPreview>
            <CodeBlock filename="TemplateChoice.tsx" code={ACTION_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="Card accepts native div attributes; asButton changes the rendered element to a button. Compound regions accept their matching div attributes.">
          <div className="component-doc-stack"><h3>Card</h3><PropsTable props={CARD_PROPS} /><h3>Compound components</h3><PropsTable props={COMPOUND_PROPS} /></div>
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Choose structure based on content density, hierarchy, and interaction model.">
          <RelatedComponents items={[
            { name: 'List', href: '/components/list', description: 'Scan denser repeated content', icon: 'ti-list' },
            { name: 'DataTable', href: '/components/data-table', description: 'Compare structured values by column', icon: 'ti-table' },
            { name: 'Dialog', href: '/components/dialog', description: 'Focus attention on a blocking task', icon: 'ti-window' },
            { name: 'Accordion', href: '/components/accordion', description: 'Reveal sections within one content flow', icon: 'ti-layout-navbar-expand' },
          ]} />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
