'use client';

import { Popover, PopoverHeader, PopoverFooter, Button, Input } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

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
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'Popover']}
        title="Popover"
        description="Floating interactive panel anchored to a trigger. 4 sides, 3 alignments, arrow indicator and portal rendering."
        tags={['4 sides', '3 alignments', 'Arrow', 'Portal', 'Forms inside']}
      />

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
        <PropsTable props={POPOVER_PROPS} />

      </div>
    </div>
  );
}
