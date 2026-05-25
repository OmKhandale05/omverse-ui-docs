'use client';

import { useState } from 'react';
import { Button, Dialog } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const DIALOG_PROPS = [
  {
    name: 'open',
    type: 'boolean',
    default: '—',
    description: 'Controls dialog visibility',
  },
  {
    name: 'onClose',
    type: '() => void',
    default: '—',
    description: 'Called when the dialog should close (ESC, backdrop click, close button)',
  },
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    description: 'Title shown in the dialog header',
  },
  {
    name: 'subtitle',
    type: 'string',
    default: 'undefined',
    description: 'Subtitle shown below the title',
  },
  {
    name: 'type',
    type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",
    default: "'default'",
    description: 'Affects the icon colour scheme and accent',
  },
  {
    name: 'position',
    type: "'center' | 'bottom' | 'left' | 'right'",
    default: "'center'",
    description: 'center — modal, bottom — drawer, left/right — side panel',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'fullscreen'",
    default: "'md'",
    description: 'Dialog panel size (applies to center position only)',
  },
  {
    name: 'icon',
    type: 'string',
    default: 'undefined',
    description: 'Emoji or icon shown above the title',
  },
  {
    name: 'footer',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Footer content — usually action buttons',
  },
  {
    name: 'showCloseButton',
    type: 'boolean',
    default: 'false',
    description: 'Shows a close button in the top-right corner',
  },
  {
    name: 'closeOnBackdrop',
    type: 'boolean',
    default: 'true',
    description: 'Closes when clicking the backdrop',
  },
  {
    name: 'closeOnEscape',
    type: 'boolean',
    default: 'true',
    description: 'Closes on Escape key',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { useState } from 'react'
import { Button, Dialog } from 'omverse-ui'

export function Example() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        title="Dialog title"
        subtitle="This provides context about the action."
        showCloseButton
        footer={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
            <Button variant="filled" onClick={() => setOpen(false)}>Confirm</Button>
          </>
        }
      >
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
          Dialog content goes here.
        </p>
      </Dialog>
    </>
  )
}`;

const TYPES_CODE = `// Destructive — for dangerous or irreversible actions
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  type="destructive"
  icon="🗑️"
  title="Delete account?"
  subtitle="This action cannot be undone. All data will be permanently removed."
  footer={
    <>
      <Button variant="text" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="filled" onClick={() => setOpen(false)}>Delete</Button>
    </>
  }
/>

// Success
<Dialog type="success" title="Payment complete" icon="✅" ... />

// Warning
<Dialog type="warning" title="Unsaved changes" icon="⚠️" ... />

// Info
<Dialog type="info" title="New update available" icon="ℹ️" ... />`;

const SIZES_CODE = `<Dialog open={open} onClose={() => setOpen(false)} size="xs" title="Extra small" />
<Dialog open={open} onClose={() => setOpen(false)} size="sm" title="Small" />
<Dialog open={open} onClose={() => setOpen(false)} size="md" title="Medium (default)" />
<Dialog open={open} onClose={() => setOpen(false)} size="lg" title="Large" />
<Dialog open={open} onClose={() => setOpen(false)} size="fullscreen" title="Fullscreen" />`;

const POSITION_CODE = `// Bottom drawer
<Dialog open={open} onClose={() => setOpen(false)} position="bottom" title="Share" />

// Left side panel
<Dialog open={open} onClose={() => setOpen(false)} position="left" title="Settings" />

// Right side panel
<Dialog open={open} onClose={() => setOpen(false)} position="right" title="Details" />`;

/* ─── Page ─── */

export default function DialogPage() {
  const [basicOpen,       setBasicOpen]       = useState(false);
  const [destructiveOpen, setDestructiveOpen] = useState(false);
  const [successOpen,     setSuccessOpen]     = useState(false);
  const [warningOpen,     setWarningOpen]     = useState(false);
  const [sizeOpen,        setSizeOpen]        = useState(false);
  const [currentSize,     setCurrentSize]     = useState<'xs' | 'sm' | 'md' | 'lg' | 'fullscreen'>('md');
  const [posOpen,         setPosOpen]         = useState(false);
  const [currentPos,      setCurrentPos]      = useState<'bottom' | 'left' | 'right'>('bottom');

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'Dialog']}
        title="Dialog"
        description="Modal dialogs for confirmations, forms and alerts. 5 types, 5 sizes, 4 positions with focus trap and escape-to-close."
        tags={['5 types', '5 sizes', '4 positions', 'Focus trap', 'Escape to close']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="Controls via useState — onClose handles ESC, backdrop click and close button"
        >
          <Button variant="outlined" onClick={() => setBasicOpen(true)}>
            Open dialog
          </Button>

          <Dialog
            open={basicOpen}
            onClose={() => setBasicOpen(false)}
            title="Dialog title"
            subtitle="This provides context about the action being performed."
            showCloseButton
            footer={
              <>
                <Button variant="text" onClick={() => setBasicOpen(false)}>Cancel</Button>
                <Button variant="filled" onClick={() => setBasicOpen(false)}>Confirm</Button>
              </>
            }
          >
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              Dialog content goes here. This could be a form, a list or any other content.
            </p>
          </Dialog>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Types ── */}
        <ComponentPreview
          title="Types"
          description="default, destructive (red), success (green), warning (amber) and info (blue)"
        >
          <Button variant="outlined" size="sm" onClick={() => setDestructiveOpen(true)}>
            Destructive
          </Button>
          <Button variant="outlined" size="sm" onClick={() => setSuccessOpen(true)}>
            Success
          </Button>
          <Button variant="outlined" size="sm" onClick={() => setWarningOpen(true)}>
            Warning
          </Button>

          {/* Destructive */}
          <Dialog
            open={destructiveOpen}
            onClose={() => setDestructiveOpen(false)}
            type="destructive"
            icon="🗑️"
            title="Delete account?"
            subtitle="This action cannot be undone. All data will be permanently removed."
            footer={
              <>
                <Button variant="text" onClick={() => setDestructiveOpen(false)}>Cancel</Button>
                <Button variant="filled" onClick={() => setDestructiveOpen(false)}>Delete</Button>
              </>
            }
          />

          {/* Success */}
          <Dialog
            open={successOpen}
            onClose={() => setSuccessOpen(false)}
            type="success"
            icon="✅"
            title="Payment complete"
            subtitle="Your subscription has been activated successfully."
            footer={
              <Button variant="filled" onClick={() => setSuccessOpen(false)}>Done</Button>
            }
          />

          {/* Warning */}
          <Dialog
            open={warningOpen}
            onClose={() => setWarningOpen(false)}
            type="warning"
            icon="⚠️"
            title="Unsaved changes"
            subtitle="You have unsaved changes. Are you sure you want to leave?"
            footer={
              <>
                <Button variant="text" onClick={() => setWarningOpen(false)}>Stay</Button>
                <Button variant="filled" onClick={() => setWarningOpen(false)}>Leave anyway</Button>
              </>
            }
          />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TYPES_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="xs, sm, md (default), lg and fullscreen — applies to center position only"
        >
          {(['xs', 'sm', 'md', 'lg', 'fullscreen'] as const).map(s => (
            <Button
              key={s}
              variant="outlined"
              size="sm"
              onClick={() => { setCurrentSize(s); setSizeOpen(true); }}
            >
              {s}
            </Button>
          ))}

          <Dialog
            open={sizeOpen}
            onClose={() => setSizeOpen(false)}
            size={currentSize}
            title={`${currentSize} dialog`}
            subtitle="Dialog size controls the width of the panel."
            showCloseButton
            footer={
              <Button variant="filled" onClick={() => setSizeOpen(false)}>Close</Button>
            }
          >
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
              This dialog is using size=&quot;{currentSize}&quot;.
            </p>
          </Dialog>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: Positions ── */}
        <ComponentPreview
          title="Positions"
          description="center (default modal), bottom (drawer), left and right (side panels)"
        >
          {(['bottom', 'left', 'right'] as const).map(p => (
            <Button
              key={p}
              variant="outlined"
              size="sm"
              onClick={() => { setCurrentPos(p); setPosOpen(true); }}
            >
              {p}
            </Button>
          ))}

          <Dialog
            open={posOpen}
            onClose={() => setPosOpen(false)}
            position={currentPos}
            title={`${currentPos.charAt(0).toUpperCase() + currentPos.slice(1)} panel`}
            subtitle={`position="${currentPos}" — click outside or press ESC to close`}
            showCloseButton
          >
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, padding: '8px 0' }}>
              Content for the {currentPos} {currentPos === 'bottom' ? 'drawer' : 'side panel'}.
            </p>
          </Dialog>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={POSITION_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={DIALOG_PROPS} />

      </div>
    </div>
  );
}
