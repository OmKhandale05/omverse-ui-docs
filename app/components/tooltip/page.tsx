'use client';

import { Button, IconButton, Tooltip } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table data ─── */

const TOOLTIP_PROPS = [
  {
    name: 'content',
    type: 'ReactNode',
    default: '—',
    description: 'Tooltip content — string for simple text, ReactNode for rich tooltips',
  },
  {
    name: 'position',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'top'",
    description: 'Position of the tooltip relative to the trigger',
  },
  {
    name: 'variant',
    type: "'dark' | 'light' | 'primary'",
    default: "'dark'",
    description: 'Visual style — dark (default), light or primary (brand colored)',
  },
  {
    name: 'shortcut',
    type: 'string',
    default: 'undefined',
    description: 'Keyboard shortcut shown in a monospace badge inside the tooltip',
  },
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    description: 'Bold title shown above content — for rich tooltips',
  },
  {
    name: 'actionLabel',
    type: 'string',
    default: 'undefined',
    description: 'Action link text shown inside the tooltip',
  },
  {
    name: 'onAction',
    type: '() => void',
    default: 'undefined',
    description: 'Callback fired when the action link is clicked',
  },
  {
    name: 'delay',
    type: 'number',
    default: '0',
    description: 'Delay in ms before the tooltip appears',
  },
  {
    name: 'maxWidth',
    type: 'number',
    default: 'undefined',
    description: 'Max width for rich tooltips with long content',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Prevents the tooltip from appearing',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

const API_PROPS = TOOLTIP_PROPS;

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Button, Tooltip } from 'omverse-ui'

<Tooltip content="Create a new item">
  <Button variant="outlined">New item</Button>
</Tooltip>

<Tooltip content="Delete this record">
  <Button variant="outlined" color="error">Delete</Button>
</Tooltip>

<Tooltip content="Share with your team">
  <Button variant="outlined">Share</Button>
</Tooltip>`;

const POSITIONS_CODE = `<Tooltip content="Tooltip on top"    position="top">
  <Button variant="outlined" size="sm">Top</Button>
</Tooltip>
<Tooltip content="Tooltip on right"  position="right">
  <Button variant="outlined" size="sm">Right</Button>
</Tooltip>
<Tooltip content="Tooltip on bottom" position="bottom">
  <Button variant="outlined" size="sm">Bottom</Button>
</Tooltip>
<Tooltip content="Tooltip on left"   position="left">
  <Button variant="outlined" size="sm">Left</Button>
</Tooltip>`;

const VARIANTS_CODE = `<Tooltip content="Dark tooltip (default)" variant="dark">
  <Button variant="outlined" size="sm">Dark</Button>
</Tooltip>
<Tooltip content="Light tooltip" variant="light">
  <Button variant="outlined" size="sm">Light</Button>
</Tooltip>
<Tooltip content="Primary tooltip" variant="primary">
  <Button variant="outlined" size="sm">Primary</Button>
</Tooltip>`;

const SHORTCUT_CODE = `import { IconButton, Tooltip } from 'omverse-ui'

<Tooltip content="Save document" shortcut="⌘S">
  <Button variant="outlined" size="sm">Save</Button>
</Tooltip>
<Tooltip content="Undo last action" shortcut="⌘Z">
  <Button variant="outlined" size="sm">Undo</Button>
</Tooltip>
<Tooltip content="Search everything" shortcut="⌘K">
  <IconButton icon="search" aria-label="Search" />
</Tooltip>`;

const RICH_CODE = `<Tooltip
  title="Design tokens"
  content="Tokens are the atomic values that define your design system."
  actionLabel="Learn more"
  maxWidth={220}
>
  <Button variant="outlined" size="sm">Rich tooltip</Button>
</Tooltip>`;

const DISABLED_CODE = `<Tooltip content="You need edit permission to perform this action">
  <Button disabled>Delete record</Button>
</Tooltip>`;

/* ─── Page ─── */

export default function TooltipPage() {
return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Feedback', 'Tooltip']}        title="Tooltip"        description="Contextual information shown on hover and focus. Supports 4 positions, 3 variants, keyboard shortcuts and rich content."        tags={['4 positions', '3 variants', 'Keyboard shortcut', 'Rich content', 'Works on disabled']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Contextual information shown on hover and focus. Supports 4 positions, 3 variants, keyboard shortcuts and rich content.">
          <div className="component-doc-stack">
            <ComponentPreview title="Descriptive tooltips" description="Hover or focus each trigger to reveal a short explanation.">
              <Tooltip content="Create a new item"><Button variant="outlined">New item</Button></Tooltip>
              <Tooltip content="Delete this record"><Button variant="outlined" color="error">Delete</Button></Tooltip>
              <Tooltip content="Share with your team"><Button variant="outlined">Share</Button></Tooltip>
            </ComponentPreview>
            <CodeBlock filename="TooltipExample.tsx" code={BASIC_CODE} />
            <div className="component-doc-prose">
              <p>Use tooltips to clarify unfamiliar controls, never to hide essential instructions or information required to complete a task.</p>
            </div>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Root container and spacing boundary.</li>
            <li>Primary content and optional secondary metadata.</li>
            <li>State indicators and utility affordances (icons, badges, controls).</li>
            <li>Optional helper text, grouping, and behavioral wrappers.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Choose Tooltip when a repeated, structured interaction is required.</li>
            <li>Use it for clear, consistent operations across similar surfaces.</li>
            <li>Use in forms, lists, and action workflows where clarity matters.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use only for decorative layout without interaction meaning.</li>
            <li>Avoid duplicating the same behavior without distinct user context.</li>
            <li>Prefer simpler HTML or textual content for static, non-interactive labels.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Component variants should be documented by API props and examples below.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-stack">
            <p>Common states include idle, active, disabled, focused, and loading/pending states where applicable.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-stack">
            <p>Behavior should remain deterministic and keyboard-friendly, with clear visual feedback for every state transition.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Use semantic structure and visible labels whenever possible.</li>
            <li>Preserve keyboard navigation and focus visibility.</li>
            <li>Announce status and changes when context requires it.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Prefer short, clear labels.</li>
            <li>Keep content actions scannable and outcome-oriented.</li>
            <li>Use consistent wording across similar components.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
          {/* ── Content ── */}
          <div style={{ padding: '28px 40px' }}>
          
            {/* ── Section 1: Basic ── */}
            <ComponentPreview
              title="Basic"
              description="Hover any trigger to see the tooltip — works on hover and keyboard focus"
            >
              <Tooltip content="Create a new item">
                <Button variant="outlined">New item</Button>
              </Tooltip>
              <Tooltip content="Delete this record">
                <Button variant="outlined">Delete</Button>
              </Tooltip>
              <Tooltip content="Share with your team">
                <Button variant="outlined">Share</Button>
              </Tooltip>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={BASIC_CODE} />
          
            {/* ── Section 2: Positions ── */}
            <ComponentPreview
              title="Positions"
              description="top (default), right, bottom and left"
            >
              <Tooltip content="Tooltip on top"    position="top">
                <Button variant="outlined" size="sm">Top</Button>
              </Tooltip>
              <Tooltip content="Tooltip on right"  position="right">
                <Button variant="outlined" size="sm">Right</Button>
              </Tooltip>
              <Tooltip content="Tooltip on bottom" position="bottom">
                <Button variant="outlined" size="sm">Bottom</Button>
              </Tooltip>
              <Tooltip content="Tooltip on left"   position="left">
                <Button variant="outlined" size="sm">Left</Button>
              </Tooltip>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={POSITIONS_CODE} />
          
            {/* ── Section 3: Variants ── */}
            <ComponentPreview
              title="Variants"
              description="dark (default, high contrast), light (for dark backgrounds) and primary (brand colored)"
            >
              <Tooltip content="Dark tooltip (default)" variant="dark">
                <Button variant="outlined" size="sm">Dark</Button>
              </Tooltip>
              <Tooltip content="Light tooltip" variant="light">
                <Button variant="outlined" size="sm">Light</Button>
              </Tooltip>
              <Tooltip content="Primary tooltip" variant="primary">
                <Button variant="outlined" size="sm">Primary</Button>
              </Tooltip>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />
          
            {/* ── Section 4: With keyboard shortcut ── */}
            <ComponentPreview
              title="With keyboard shortcut"
              description="shortcut renders in a monospace badge inside the tooltip — useful for command palette hints"
            >
              <Tooltip content="Save document" shortcut="⌘S">
                <Button variant="outlined" size="sm">Save</Button>
              </Tooltip>
              <Tooltip content="Undo last action" shortcut="⌘Z">
                <Button variant="outlined" size="sm">Undo</Button>
              </Tooltip>
              <Tooltip content="Search everything" shortcut="⌘K">
                <IconButton icon="search" aria-label="Search" />
              </Tooltip>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SHORTCUT_CODE} />
          
            {/* ── Section 5: Rich tooltip ── */}
            <ComponentPreview
              title="Rich tooltip"
              description="title adds a bold heading, actionLabel adds a clickable link — use maxWidth for long content"
            >
              <Tooltip
                title="Design tokens"
                content="Tokens are the atomic values that define your design system."
                actionLabel="Learn more"
                maxWidth={220}
              >
                <Button variant="outlined" size="sm">Rich tooltip</Button>
              </Tooltip>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={RICH_CODE} />
          
            {/* ── Section 6: On a disabled element ── */}
            <ComponentPreview
              title="On a disabled element"
              description="Wrap a disabled button — the Tooltip handles pointer events by wrapping in a span"
            >
              <Tooltip content="You need edit permission to perform this action">
                <Button disabled>Delete record</Button>
              </Tooltip>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={DISABLED_CODE} />
          
            {/* ── Props table ── */}
          
          </div>
          </div>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API">
          <div className="component-doc-stack">
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>Api Props</p>
            <PropsTable props={API_PROPS} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components">
          <div className="component-doc-prose">
          <ul className="component-doc-prose">
            <li>Use Tooltip alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep tooltip behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
