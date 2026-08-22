'use client';

import { Popover, PopoverHeader, PopoverFooter, Button, Input } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table data ─── */

const POPOVER_PROPS = [
  {
    name: 'trigger',
    type: 'ReactNode',
    default: '—',
    description: 'Element that triggers the popover',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Popover content — any React node (forms, filters, rich text)',
  },
  {
    name: 'side',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: 'Which side of the trigger to open on',
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'start'",
    description: 'Alignment along the chosen side',
  },
  {
    name: 'showArrow',
    type: 'boolean',
    default: 'true',
    description: 'Shows the arrow indicator pointing toward the trigger',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'auto'",
    default: "'md'",
    description: 'Width of the popover panel',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback when open state changes',
  },
  {
    name: 'closeOnOutside',
    type: 'boolean',
    default: 'true',
    description: 'Close the popover when clicking outside',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Close the popover when pressing Escape',
  },
  {
    name: 'offset',
    type: 'number',
    default: 'undefined',
    description: 'Offset from the trigger in px',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

const API_PROPS = POPOVER_PROPS;

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Popover, Button } from 'omverse-ui'

<Popover trigger={<Button variant="outlined">Open popover</Button>}>
  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
    This is a simple popover with text content.
  </p>
</Popover>`;

const HEADER_FOOTER_CODE = `import { Popover, PopoverHeader, PopoverFooter, Button, Input } from 'omverse-ui'

<Popover trigger={<Button variant="outlined">Create note</Button>}>
  <PopoverHeader
    title="Quick note"
    description="Add a note to this item"
  />
  <Input placeholder="Write something..." textarea rows={3} />
  <PopoverFooter>
    <Button size="sm" variant="text">Cancel</Button>
    <Button size="sm" variant="filled">Save</Button>
  </PopoverFooter>
</Popover>`;

const POSITIONS_CODE = `<Popover trigger={<Button variant="outlined" size="sm">Top</Button>}    side="top">
  <p style={{ fontSize: 12 }}>Opens on top</p>
</Popover>

<Popover trigger={<Button variant="outlined" size="sm">Bottom</Button>} side="bottom">
  <p style={{ fontSize: 12 }}>Opens on bottom</p>
</Popover>

<Popover trigger={<Button variant="outlined" size="sm">Left</Button>}   side="left">
  <p style={{ fontSize: 12 }}>Opens on left</p>
</Popover>

<Popover trigger={<Button variant="outlined" size="sm">Right</Button>}  side="right">
  <p style={{ fontSize: 12 }}>Opens on right</p>
</Popover>`;

const NO_ARROW_CODE = `<Popover
  trigger={<Button variant="outlined">No arrow</Button>}
  showArrow={false}
>
  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
    Popover without arrow indicator.
  </p>
</Popover>`;

const SIZES_CODE = `<Popover trigger={<Button variant="outlined" size="sm">sm</Button>}   size="sm">
  <p style={{ fontSize: 13 }}>Small (200 px) panel</p>
</Popover>

<Popover trigger={<Button variant="outlined" size="sm">md</Button>}   size="md">
  <p style={{ fontSize: 13 }}>Medium (320 px) — default</p>
</Popover>

<Popover trigger={<Button variant="outlined" size="sm">lg</Button>}   size="lg">
  <p style={{ fontSize: 13 }}>Large (480 px) panel</p>
</Popover>

<Popover trigger={<Button variant="outlined" size="sm">auto</Button>} size="auto">
  <p style={{ fontSize: 13 }}>Auto — fits content width</p>
</Popover>`;

/* ─── Page ─── */

export default function PopoverPage() {
return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Overlay', 'Popover']}        title="Popover"        description="Floating interactive panel anchored to a trigger. 4 sides, 3 alignments, arrow indicator and portal rendering."        tags={['4 sides', '3 alignments', 'Arrow', 'Portal', 'Forms inside']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Floating interactive panel anchored to a trigger. 4 sides, 3 alignments, arrow indicator and portal rendering.">
          <div className="component-doc-stack">
            <ComponentPreview title="Basic popover" description="Activate the trigger to reveal contextual content anchored to it.">
              <Popover trigger={<Button variant="outlined">Open popover</Button>}>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Review contextual information without leaving the current task.</p>
              </Popover>
            </ComponentPreview>
            <CodeBlock filename="PopoverExample.tsx" code={BASIC_CODE} />
            <div className="component-doc-prose">
              <p>Use a popover for compact interactive content that belongs to one trigger. Use a dialog when the task needs stronger focus or more space.</p>
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
            <li>Choose Popover when a repeated, structured interaction is required.</li>
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
              description="Simplest usage — wrap any trigger and put content inside"
            >
              <Popover trigger={<Button variant="outlined">Open popover</Button>}>
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  This is a simple popover with text content.
                </p>
              </Popover>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={BASIC_CODE} />
          
            {/* ── Section 2: With header and footer ── */}
            <ComponentPreview
              title="With header and footer"
              description="PopoverHeader adds a titled section; PopoverFooter aligns action buttons at the bottom"
              align="start"
            >
              <Popover trigger={<Button variant="outlined">Create note</Button>}>
                <PopoverHeader
                  title="Quick note"
                  description="Add a note to this item"
                />
                <Input placeholder="Write something..." textarea rows={3} />
                <PopoverFooter>
                  <Button size="sm" variant="text">Cancel</Button>
                  <Button size="sm" variant="filled">Save</Button>
                </PopoverFooter>
              </Popover>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={HEADER_FOOTER_CODE} />
          
            {/* ── Section 3: Positions ── */}
            <ComponentPreview
              title="Positions"
              description="side prop controls which edge the panel opens on — top, bottom, left, right"
            >
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Popover trigger={<Button variant="outlined" size="sm">Top</Button>} side="top">
                  <p style={{ fontSize: 12 }}>Opens on top</p>
                </Popover>
                <Popover trigger={<Button variant="outlined" size="sm">Bottom</Button>} side="bottom">
                  <p style={{ fontSize: 12 }}>Opens on bottom</p>
                </Popover>
                <Popover trigger={<Button variant="outlined" size="sm">Left</Button>} side="left">
                  <p style={{ fontSize: 12 }}>Opens on left</p>
                </Popover>
                <Popover trigger={<Button variant="outlined" size="sm">Right</Button>} side="right">
                  <p style={{ fontSize: 12 }}>Opens on right</p>
                </Popover>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={POSITIONS_CODE} />
          
            {/* ── Section 4: No arrow ── */}
            <ComponentPreview
              title="Without arrow"
              description="showArrow={false} removes the directional arrow — cleaner look for inline panels"
            >
              <Popover
                trigger={<Button variant="outlined">No arrow</Button>}
                showArrow={false}
              >
                <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
                  Popover without arrow indicator.
                </p>
              </Popover>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={NO_ARROW_CODE} />
          
            {/* ── Section 5: Sizes ── */}
            <ComponentPreview
              title="Sizes"
              description="sm · md (default) · lg · auto — controls the panel width"
            >
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Popover trigger={<Button variant="outlined" size="sm">sm</Button>} size="sm">
                  <p style={{ fontSize: 13 }}>Small (200 px) panel</p>
                </Popover>
                <Popover trigger={<Button variant="outlined" size="sm">md</Button>} size="md">
                  <p style={{ fontSize: 13 }}>Medium (320 px) — default</p>
                </Popover>
                <Popover trigger={<Button variant="outlined" size="sm">lg</Button>} size="lg">
                  <p style={{ fontSize: 13 }}>Large (480 px) panel</p>
                </Popover>
                <Popover trigger={<Button variant="outlined" size="sm">auto</Button>} size="auto">
                  <p style={{ fontSize: 13 }}>Auto — fits content width</p>
                </Popover>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIZES_CODE} />
          
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
            <li>Use Popover alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep popover behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
