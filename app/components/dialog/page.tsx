'use client';

import { useState } from 'react';
import { Button, Dialog, Input, Avatar } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const DIALOG_PROPS = [
  { name: 'open',            type: 'boolean',                                                            default: 'false',     description: 'Whether the dialog is visible' },
  { name: 'onClose',         type: '() => void',                                                         default: '—',         description: 'Called when dialog should close (ESC, backdrop, close button)' },
  { name: 'type',            type: "'default' | 'destructive' | 'success' | 'warning' | 'info'",        default: "'default'", description: 'Affects icon and color scheme' },
  { name: 'position',        type: "'center' | 'bottom' | 'left' | 'right'",                            default: "'center'",  description: 'Where the dialog appears on screen' },
  { name: 'size',            type: "'xs' | 'sm' | 'md' | 'lg' | 'fullscreen'",                         default: "'md'",      description: 'Width of the dialog panel (fullscreen = entire viewport)' },
  { name: 'title',           type: 'string',                                                             default: '—',         description: 'Title shown in the dialog header' },
  { name: 'subtitle',        type: 'string',                                                             default: '—',         description: 'Subtitle shown below the title' },
  { name: 'icon',            type: 'string',                                                             default: '—',         description: 'Emoji or icon shown above the title' },
  { name: 'imageSrc',        type: 'string',                                                             default: '—',         description: 'Hero image URL shown at the top of the dialog' },
  { name: 'imageAlt',        type: 'string',                                                             default: '—',         description: 'Alt text for the hero image' },
  { name: 'imageHeight',     type: 'number',                                                             default: '160',       description: 'Height of the hero image in px' },
  { name: 'showCloseButton', type: 'boolean',                                                            default: 'true',      description: 'Shows the × close button in the header' },
  { name: 'closeOnBackdrop', type: 'boolean',                                                            default: 'true',      description: 'Closes dialog when clicking the backdrop' },
  { name: 'closeOnEscape',   type: 'boolean',                                                            default: 'true',      description: 'Closes dialog on Escape key' },
  { name: 'footer',          type: 'ReactNode',                                                          default: '—',         description: 'Footer content — usually action buttons' },
  { name: 'footerDivider',   type: 'boolean',                                                            default: 'true',      description: 'Shows a divider between body and footer' },
  { name: 'children',        type: 'ReactNode',                                                          default: '—',         description: 'Dialog body content' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const ALERT_CODE = `import { Dialog, Button } from 'omverse-ui'

{/* Default */}
<Dialog
  open={basic}
  onClose={() => setBasic(false)}
  size="sm"
  showCloseButton
  footer={
    <div style={{ display: 'flex', gap: 12, width: '100%' }}>
      <Button variant="outlined" style={{ flex: 1 }} onClick={() => setBasic(false)}>Dismiss</Button>
      <Button variant="filled"   style={{ flex: 1 }} onClick={() => setBasic(false)}>Get started</Button>
    </div>
  }
>
  <p>Welcome back, John!</p>
</Dialog>

{/* Destructive */}
<Dialog
  open={destructive}
  onClose={() => setDestructive(false)}
  type="destructive"
  size="sm"
  showCloseButton={false}
  footer={
    <div style={{ display: 'flex', gap: 12, width: '100%' }}>
      <Button variant="outlined" style={{ flex: 1 }} onClick={() => setDestructive(false)}>Cancel</Button>
      <Button variant="filled" color="error" style={{ flex: 1 }} onClick={() => setDestructive(false)}>Yes, delete account</Button>
    </div>
  }
>
  <p>This action cannot be undone.</p>
</Dialog>

{/* Success */}
<Dialog
  open={success}
  onClose={() => setSuccess(false)}
  type="success"
  size="xs"
  showCloseButton={false}
  footer={
    <Button variant="filled" color="success" style={{ width: '100%' }} onClick={() => setSuccess(false)}>
      Continue
    </Button>
  }
>
  <p>Payment of $49.00 processed successfully.</p>
</Dialog>

{/* Warning */}
<Dialog
  open={warning}
  onClose={() => setWarning(false)}
  type="warning"
  size="xs"
  showCloseButton={false}
  footer={
    <div style={{ display: 'flex', gap: 12, width: '100%' }}>
      <Button variant="outlined" style={{ flex: 1 }} onClick={() => setWarning(false)}>Stay on page</Button>
      <Button variant="filled" color="warning" style={{ flex: 1 }} onClick={() => setWarning(false)}>Leave anyway</Button>
    </div>
  }
>
  <p>You have unsaved changes that will be lost.</p>
</Dialog>`;

const FORM_CODE = `import { Dialog, Button, Input } from 'omverse-ui'

{/* Form dialog */}
<Dialog
  open={form}
  onClose={() => setForm(false)}
  title="Invite team member"
  subtitle="They'll receive an email invitation"
  size="sm"
  footer={
    <>
      <Button variant="outlined" onClick={() => setForm(false)}>Cancel</Button>
      <Button variant="filled"   onClick={() => setForm(false)}>Send invite</Button>
    </>
  }
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '16px 24px' }}>
    <Input label="Email address" placeholder="colleague@company.com" leadingIcon="mail" />
    <Input label="Full name"     placeholder="John Doe" />
  </div>
</Dialog>

{/* Image header dialog */}
<Dialog
  open={image}
  onClose={() => setImage(false)}
  imageSrc="https://picsum.photos/seed/upgrade/600/160"
  imageAlt="Upgrade to Pro"
  title="Upgrade to Pro"
  subtitle="Unlock all features"
  size="sm"
  footer={
    <>
      <Button variant="text"   onClick={() => setImage(false)}>Maybe later</Button>
      <Button variant="filled" onClick={() => setImage(false)}>Upgrade now</Button>
    </>
  }
>
  <p style={{ padding: '16px 24px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
    Get unlimited projects, priority support, advanced analytics, and custom domains with Pro.
  </p>
</Dialog>`;

const POSITIONS_CODE = `{/* Bottom drawer */}
<Dialog
  open={bottom}
  onClose={() => setBottom(false)}
  position="bottom"
  title="Share document"
  subtitle="Choose how to share"
  footer={
    <Button variant="outlined" style={{ width: '100%' }} onClick={() => setBottom(false)}>Cancel</Button>
  }
>
  <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
    {['Copy link', 'Email', 'Message', 'WhatsApp', 'Twitter', 'LinkedIn'].map(label => (
      <button key={label} onClick={() => setBottom(false)}
        style={{ padding: '12px 8px', borderRadius: 12, border: '1px solid var(--color-border)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{label}</span>
      </button>
    ))}
  </div>
</Dialog>

{/* Right panel */}
<Dialog
  open={right}
  onClose={() => setRight(false)}
  position="right"
  title="Edit profile"
  subtitle="Update your information"
  footer={
    <>
      <Button variant="outlined" onClick={() => setRight(false)}>Cancel</Button>
      <Button variant="filled"   onClick={() => setRight(false)}>Save changes</Button>
    </>
  }
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '16px 24px' }}>
    <Input label="Full name" defaultValue="John Doe" />
    <Input label="Role"      defaultValue="Product Designer" />
    <Input label="Email"     defaultValue="john@example.com" leadingIcon="mail" />
  </div>
</Dialog>

{/* Fullscreen — size="fullscreen" with position="center" */}
<Dialog
  open={fullscreen}
  onClose={() => setFullscreen(false)}
  position="center"
  size="fullscreen"
  title="Full screen dialog"
  subtitle="Takes up the entire screen"
  footer={
    <Button variant="outlined" onClick={() => setFullscreen(false)}>Close</Button>
  }
>
  <p style={{ padding: '16px 24px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
    Useful for complex workflows or immersive content.
  </p>
</Dialog>`;

const MULTI_STEP_CODE = `const [multiStep, setMultiStep] = useState(false)
const [step, setStep] = useState(1)

<Dialog
  open={multiStep}
  onClose={() => setMultiStep(false)}
  title={\`Create project — Step \${step} of 3\`}
  subtitle={['Name your project', 'Configure settings', 'Invite team'][step - 1]}
  size="sm"
  showCloseButton
  footer={
    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <Button variant="outlined"
        onClick={() => step === 1 ? setMultiStep(false) : setStep(s => s - 1)}>
        {step === 1 ? 'Cancel' : '← Back'}
      </Button>
      <Button variant="filled"
        onClick={() => step === 3 ? setMultiStep(false) : setStep(s => s + 1)}>
        {step === 3 ? 'Create project' : 'Next →'}
      </Button>
    </div>
  }
>
  <div style={{ padding: '16px 24px' }}>
    {/* Step indicator */}
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 24 }}>
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
          <div style={{
            width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 12, fontWeight: 600,
            background: s < step ? 'var(--color-primary)' : s === step ? 'var(--color-primary-container)' : 'var(--color-surface-variant)',
            color: s < step ? '#fff' : s === step ? 'var(--color-primary)' : 'var(--color-text-disabled)',
            border: s === step ? '2px solid var(--color-primary)' : 'none',
          }}>
            {s < step ? '✓' : s}
          </div>
          {i < 2 && (
            <div style={{ flex: 1, height: 2, background: s < step ? 'var(--color-primary)' : 'var(--color-border)' }} />
          )}
        </div>
      ))}
    </div>
    {step === 1 && <Input label="Project name" placeholder="My awesome project" />}
    {step === 2 && <Input label="Description" placeholder="What is this project about?" />}
    {step === 3 && <Input label="Invite teammates" placeholder="email@company.com" leadingIcon="mail" helperText="Separate multiple emails with commas" />}
  </div>
</Dialog>`;

const COMMAND_CODE = `const [command, setCommand] = useState(false)

const commands = [
  { icon: 'ti-file',     label: 'New file',       shortcut: '⌘N',  group: 'Create'     },
  { icon: 'ti-folder',   label: 'Open folder',    shortcut: '⌘O',  group: 'Create'     },
  { icon: 'ti-search',   label: 'Find in files',  shortcut: '⌘⇧F', group: 'Search'     },
  { icon: 'ti-settings', label: 'Settings',       shortcut: '⌘,',  group: 'Navigation' },
  { icon: 'ti-terminal', label: 'New terminal',   shortcut: '⌘⇧\`', group: 'Navigation' },
]

<Button variant="filled" onClick={() => setCommand(true)}>
  Command palette ⌘K
</Button>

<Dialog
  open={command}
  onClose={() => setCommand(false)}
  showCloseButton={false}
  size="sm"
>
  <div style={{ padding: '8px 0' }}>
    {/* Search input */}
    <div style={{ padding: '8px 16px 10px', borderBottom: '0.5px solid var(--color-border-tertiary)', display: 'flex', alignItems: 'center', gap: 8 }}>
      <i className="ti ti-search" style={{ fontSize: 16, color: 'var(--color-text-secondary)', flexShrink: 0 }} aria-hidden="true" />
      <input
        autoFocus
        placeholder="Search commands..."
        style={{
          flex: 1,
          background: 'none',
          border: 'none',
          outline: 'none',
          fontSize: 14,
          color: 'var(--color-text-primary)',
          padding: '4px 0',
        }}
      />
      <kbd style={{ fontSize: 11, color: 'var(--color-text-tertiary)', background: 'var(--color-background-secondary)', padding: '2px 6px', borderRadius: 4, border: '0.5px solid var(--color-border-tertiary)' }}>
        ESC
      </kbd>
    </div>
    {/* Command items */}
    {commands.map(item => (
      <div key={item.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px', cursor: 'pointer', fontSize: 13, color: 'var(--color-text-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <i className={\`ti \${item.icon}\`} style={{ fontSize: 16, color: 'var(--color-text-secondary)' }} aria-hidden="true" />
          {item.label}
        </div>
        <kbd style={{ fontSize: 11, color: 'var(--color-text-tertiary)', background: 'var(--color-background-secondary)', padding: '2px 6px', borderRadius: 4, border: '0.5px solid var(--color-border-tertiary)' }}>
          {item.shortcut}
        </kbd>
      </div>
    ))}
  </div>
</Dialog>`;

/* ─── Page ─── */

export default function DialogPage() {
  const [basic,        setBasic]        = useState(false);
  const [destructive,  setDestructive]  = useState(false);
  const [success,      setSuccess]      = useState(false);
  const [warning,      setWarning]      = useState(false);
  const [form,         setForm]         = useState(false);
  const [image,        setImage]        = useState(false);
  const [bottom,       setBottom]       = useState(false);
  const [right,        setRight]        = useState(false);
  const [fullscreen,   setFullscreen]   = useState(false);
  const [multiStep,    setMultiStep]    = useState(false);
  const [step,         setStep]         = useState(1);
  const [deletedItems, setDeletedItems] = useState<string[]>([]);
  const [command,      setCommand]      = useState(false);

  const shareOptions = ['Copy link', 'Email', 'Message', 'WhatsApp', 'Twitter', 'LinkedIn'];

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'Dialog']}
        title="Dialog"
        description="5 types · 4 positions · 5 sizes · form · image header · multi-step · command palette"
        tags={['Alert types', 'Form', 'Image header', 'Bottom drawer', 'Right panel', 'Fullscreen', 'Multi-step', 'Command palette']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Alert types ── */}
        <ComponentPreview
          title="Alert types"
          description="type prop sets the icon and color scheme — default, destructive, success, warning"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Button variant="outlined" onClick={() => setBasic(true)}>Default</Button>
            <Button variant="filled" color="error" onClick={() => setDestructive(true)}>Destructive</Button>
            <Button variant="outlined" color="success" onClick={() => setSuccess(true)}>Success</Button>
            <Button variant="outlined" onClick={() => setWarning(true)}>Warning</Button>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ALERT_CODE} />

        {/* ── Section 2: Form + image header ── */}
        <ComponentPreview
          title="Form + image header"
          description="Form dialog with Input fields; imageSrc places a hero banner at the top"
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="outlined" onClick={() => setForm(true)}>Form dialog</Button>
            <Button variant="outlined" onClick={() => setImage(true)}>Image header</Button>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FORM_CODE} />

        {/* ── Section 3: Positions ── */}
        <ComponentPreview
          title="Positions"
          description="bottom = bottom drawer · right = side panel · size=fullscreen fills the viewport"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Button variant="outlined" onClick={() => setBottom(true)}>Bottom drawer</Button>
            <Button variant="outlined" onClick={() => setRight(true)}>Right panel</Button>
            <Button variant="outlined" onClick={() => setFullscreen(true)}>Fullscreen</Button>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={POSITIONS_CODE} />

        {/* ── Section 4: Multi-step ── */}
        <ComponentPreview
          title="Multi-step"
          description="Step indicator + back/next footer — built with a single step state"
        >
          <Button variant="outlined" onClick={() => { setStep(1); setMultiStep(true); }}>
            Multi-step wizard
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTI_STEP_CODE} />

        {/* ── Section 5: Command palette ── */}
        <ComponentPreview
          title="Command palette"
          description="⌘K-style search overlay — built with Dialog + search input + command items"
        >
          <Button variant="filled" onClick={() => setCommand(true)}>
            Command palette ⌘K
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COMMAND_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={DIALOG_PROPS} />

      </div>

      {/* ════════════════════════════════════════
          All Dialog instances (rendered outside
          the layout flow so they portal correctly)
          ════════════════════════════════════════ */}

      {/* Default / Welcome dialog */}
      <Dialog
        open={basic}
        onClose={() => setBasic(false)}
        size="sm"
        showCloseButton
        footer={
          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <Button variant="outlined" style={{ flex: 1 }} onClick={() => setBasic(false)}>
              Dismiss
            </Button>
            <Button variant="filled" style={{ flex: 1 }} onClick={() => setBasic(false)}>
              Get started
            </Button>
          </div>
        }
      >
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Type icon */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <i className="ti ti-info-circle" style={{ fontSize: 24, color: 'var(--color-primary)' }} aria-hidden="true" />
          </div>
          {/* Welcome banner */}
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary-container, #e8f0fe) 0%, var(--color-secondary-container, #f3e8fd) 100%)',
            borderRadius: 16, padding: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <Avatar name="John Doe" size="md" />
              <div>
                <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-text-primary)' }}>
                  Welcome back, John!
                </p>
                <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>
                  Here&apos;s what&apos;s happening today
                </p>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
            {[
              { value: '3', label: 'Notifications', icon: 'bell',          bg: 'var(--color-error-container, #fee2e2)',   color: '#EF4444' },
              { value: '2', label: 'Tasks due',      icon: 'circle-check', bg: 'var(--color-warning-container, #fef3c7)', color: '#F59E0B' },
              { value: '5', label: 'Messages',       icon: 'message',      bg: 'var(--color-primary-container, #e8f0fe)', color: 'var(--color-primary)' },
            ].map(({ value, label, icon, bg, color }) => (
              <div key={label} style={{ background: bg, borderRadius: 12, padding: '12px 8px', textAlign: 'center' }}>
                <i className={`ti ti-${icon}`} style={{ fontSize: 16, color }} aria-hidden="true" />
                <p style={{ fontSize: 18, fontWeight: 700, marginTop: 4, color: 'var(--color-text-primary)' }}>{value}</p>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', marginTop: 2 }}>{label}</p>
              </div>
            ))}
          </div>

          {/* Recent activity */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              Recent activity
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {[
                { icon: 'circle-check', text: 'Button component approved',     time: '2m ago',  bg: '#10B981' },
                { icon: 'message',      text: 'Alice commented on your PR',  time: '15m ago', bg: 'var(--color-primary)' },
                { icon: 'rocket',       text: 'Deploy to production complete', time: '1h ago',  bg: 'var(--color-secondary, #7c3aed)' },
              ].map(({ icon, text, time, bg }) => (
                <div key={text} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                  borderRadius: 12, background: 'var(--color-surface-variant, var(--color-background-secondary))',
                }}>
                  <span style={{
                    width: 32, height: 32, borderRadius: 8, background: bg,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  }}>
                    <i className={`ti ti-${icon}`} style={{ fontSize: 14, color: '#fff' }} aria-hidden="true" />
                  </span>
                  <span style={{ flex: 1, fontSize: 13, color: 'var(--color-text-primary)' }}>{text}</span>
                  <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', flexShrink: 0 }}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Dialog>

      {/* Destructive dialog */}
      <Dialog
        open={destructive}
        onClose={() => { setDestructive(false); setDeletedItems([]); }}
        type="destructive"
        size="sm"
        showCloseButton={false}
        footer={
          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <Button variant="outlined" style={{ flex: 1 }} onClick={() => setDestructive(false)}>
              Cancel
            </Button>
            <Button variant="filled" color="error" style={{ flex: 1 }} onClick={() => setDestructive(false)}>
              Yes, delete account
            </Button>
          </div>
        }
      >
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Header banner */}
          <div style={{
            background: 'var(--color-error-container, #fee2e2)', borderRadius: 16, padding: 20,
            display: 'flex', gap: 14, alignItems: 'flex-start',
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: 'rgba(239,68,68,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <i className="ti ti-alert-triangle" style={{ fontSize: 24, color: '#EF4444' }} aria-hidden="true" />
            </div>
            <div>
              <p style={{ fontWeight: 700, fontSize: 16, color: 'var(--color-text-primary)' }}>
                Delete account permanently?
              </p>
              <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginTop: 4 }}>
                This action cannot be undone. Ever.
              </p>
            </div>
          </div>

          {/* Deletion list */}
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              The following will be permanently deleted:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {([
                ['file-text',   'All projects and files',           'projects'],
                ['settings',    'Account settings and preferences',  'settings'],
                ['credit-card', 'Billing history and invoices',      'billing'],
                ['users',       'Team memberships and access',       'teams'],
              ] as const)
                .filter(([,, id]) => !deletedItems.includes(id))
                .map(([icon, text, id]) => (
                  <div key={id} style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px',
                    borderRadius: 12, background: 'rgba(239,68,68,0.08)',
                  }}>
                    <i className={`ti ti-${icon}`} style={{ fontSize: 14, color: '#EF4444', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ flex: 1, fontSize: 13, color: 'var(--color-text-primary)' }}>{text}</span>
                    <button
                      onClick={() => setDeletedItems(prev => [...prev, id])}
                      style={{
                        flexShrink: 0, width: 24, height: 24, borderRadius: '50%', border: 'none',
                        background: 'transparent', cursor: 'pointer', display: 'flex',
                        alignItems: 'center', justifyContent: 'center',
                      }}
                      aria-label={`Remove ${text} from deletion list`}
                    >
                      <i className="ti ti-x" style={{ fontSize: 12, color: '#EF4444' }} aria-hidden="true" />
                    </button>
                  </div>
                ))}
            </div>
            {deletedItems.length > 0 && (
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', textAlign: 'center', marginTop: 8 }}>
                {deletedItems.length} item{deletedItems.length > 1 ? 's' : ''} removed from deletion
                <button
                  onClick={() => setDeletedItems([])}
                  style={{ marginLeft: 8, color: 'var(--color-primary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: 12 }}
                >
                  Undo
                </button>
              </p>
            )}
          </div>

          {/* Confirm input */}
          <div style={{
            border: '1px solid rgba(239,68,68,0.3)', borderRadius: 12, padding: 16,
            background: 'rgba(239,68,68,0.05)',
          }}>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', marginBottom: 8 }}>
              Type <strong style={{ fontFamily: 'monospace', color: '#EF4444' }}>DELETE</strong> to confirm
            </p>
            <input
              type="text"
              placeholder="Type DELETE here..."
              style={{
                width: '100%', height: 40, padding: '0 12px', borderRadius: 8,
                border: '1.5px solid rgba(239,68,68,0.4)', background: 'var(--color-background-primary)',
                fontSize: 14, color: 'var(--color-text-primary)', outline: 'none', boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      </Dialog>

      {/* Success dialog */}
      <Dialog
        open={success}
        onClose={() => setSuccess(false)}
        type="success"
        size="xs"
        showCloseButton={false}
        footer={
          <Button variant="filled" color="success" style={{ width: '100%' }} onClick={() => setSuccess(false)}>
            Continue
          </Button>
        }
      >
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          {/* Concentric circles */}
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--color-success-container, #d1fae5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(16,185,129,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="ti ti-circle-check" style={{ fontSize: 24, color: '#10B981' }} aria-hidden="true" />
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-text-primary)' }}>
              Payment successful!
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 4 }}>
              Your payment of $49.00 has been processed.
            </p>
          </div>
          <div style={{
            width: '100%', background: 'var(--color-success-container, #d1fae5)',
            borderRadius: 12, padding: 16,
          }}>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Amount paid</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: '#10B981', margin: '4px 0' }}>$49.00</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Receipt sent to john@example.com
            </p>
          </div>
        </div>
      </Dialog>

      {/* Warning dialog */}
      <Dialog
        open={warning}
        onClose={() => setWarning(false)}
        type="warning"
        size="xs"
        showCloseButton={false}
        footer={
          <div style={{ display: 'flex', gap: 12, width: '100%' }}>
            <Button variant="outlined" style={{ flex: 1 }} onClick={() => setWarning(false)}>
              Stay on page
            </Button>
            <Button variant="filled" color="warning" style={{ flex: 1 }} onClick={() => setWarning(false)}>
              Leave anyway
            </Button>
          </div>
        }
      >
        <div style={{ padding: '16px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 16 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'var(--color-warning-container, #fef3c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: 56, height: 56, borderRadius: '50%', background: 'rgba(245,158,11,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 24, color: '#F59E0B' }} aria-hidden="true" />
            </div>
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: 18, color: 'var(--color-text-primary)' }}>
              Unsaved changes
            </p>
            <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginTop: 6, lineHeight: 1.5 }}>
              You have unsaved changes that will be permanently lost if you leave this page.
            </p>
          </div>
          <div style={{
            width: '100%', background: 'var(--color-warning-container, #fef3c7)',
            borderRadius: 12, padding: 16, textAlign: 'left',
          }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
              <i className="ti ti-alert-circle" style={{ fontSize: 14 }} aria-hidden="true" />
              The following will be lost:
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
              {['Form data and inputs', 'Unsaved draft content', 'Selected preferences'].map(item => (
                <li key={item} style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </Dialog>

      {/* Form dialog */}
      <Dialog
        open={form}
        onClose={() => setForm(false)}
        title="Invite team member"
        subtitle="They'll receive an email invitation"
        size="sm"
        footer={
          <>
            <Button variant="outlined" onClick={() => setForm(false)}>Cancel</Button>
            <Button variant="filled"   onClick={() => setForm(false)}>Send invite</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '16px 24px' }}>
          <Input label="Email address" placeholder="colleague@company.com" leadingIcon="mail" />
          <Input label="Full name"     placeholder="John Doe" />
        </div>
      </Dialog>

      {/* Image header dialog */}
      <Dialog
        open={image}
        onClose={() => setImage(false)}
        imageSrc="https://picsum.photos/seed/upgrade/600/160"
        imageAlt="Upgrade to Pro"
        title="Upgrade to Pro"
        subtitle="Unlock all features"
        size="sm"
        footer={
          <>
            <Button variant="text"   onClick={() => setImage(false)}>Maybe later</Button>
            <Button variant="filled" onClick={() => setImage(false)}>Upgrade now</Button>
          </>
        }
      >
        <p style={{ padding: '16px 24px', fontSize: 14, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          Get unlimited projects, priority support, advanced analytics, and custom domains with Pro.
        </p>
      </Dialog>

      {/* Bottom drawer */}
      <Dialog
        open={bottom}
        onClose={() => setBottom(false)}
        position="bottom"
        title="Share document"
        subtitle="Choose how to share"
        footer={
          <Button variant="outlined" style={{ width: '100%' }} onClick={() => setBottom(false)}>
            Cancel
          </Button>
        }
      >
        <div style={{ padding: '16px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {shareOptions.map(label => (
            <button
              key={label}
              onClick={() => setBottom(false)}
              style={{
                padding: '12px 8px', borderRadius: 12,
                border: '1px solid var(--color-border)',
                background: 'var(--color-background-primary)',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>{label}</span>
            </button>
          ))}
        </div>
      </Dialog>

      {/* Right panel */}
      <Dialog
        open={right}
        onClose={() => setRight(false)}
        position="right"
        title="Edit profile"
        subtitle="Update your information"
        footer={
          <>
            <Button variant="outlined" onClick={() => setRight(false)}>Cancel</Button>
            <Button variant="filled"   onClick={() => setRight(false)}>Save changes</Button>
          </>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '16px 24px' }}>
          <Input label="Full name" defaultValue="John Doe" />
          <Input label="Role"      defaultValue="Product Designer" />
          <Input label="Email"     defaultValue="john@example.com" leadingIcon="mail" />
          <Input label="Bio"       placeholder="Tell us about yourself..." />
        </div>
      </Dialog>

      {/* Fullscreen */}
      <Dialog
        open={fullscreen}
        onClose={() => setFullscreen(false)}
        position="center"
        size="fullscreen"
        title="Full screen dialog"
        subtitle="Takes up the entire screen"
        footer={
          <Button variant="outlined" onClick={() => setFullscreen(false)}>Close</Button>
        }
      >
        <p style={{ padding: '16px 24px', fontSize: 14, color: 'var(--color-text-secondary)' }}>
          This is a fullscreen dialog. Useful for complex workflows or immersive content.
        </p>
      </Dialog>

      {/* Multi-step wizard */}
      <Dialog
        open={multiStep}
        onClose={() => setMultiStep(false)}
        title={`Create project — Step ${step} of 3`}
        subtitle={(['Name your project', 'Configure settings', 'Invite team'] as const)[step - 1]}
        size="sm"
        showCloseButton
        footer={
          <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Button
              variant="outlined"
              onClick={() => step === 1 ? setMultiStep(false) : setStep(s => s - 1)}
            >
              {step === 1 ? 'Cancel' : '← Back'}
            </Button>
            <Button
              variant="filled"
              onClick={() => step === 3 ? setMultiStep(false) : setStep(s => s + 1)}
            >
              {step === 3 ? 'Create project' : 'Next →'}
            </Button>
          </div>
        }
      >
        <div style={{ padding: '16px 24px' }}>
          {/* Step progress indicator */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: 24 }}>
            {[1, 2, 3].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < 2 ? 1 : 'none' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600,
                  background: s < step
                    ? 'var(--color-primary)'
                    : s === step
                      ? 'var(--color-primary-container, #e8f0fe)'
                      : 'var(--color-background-secondary)',
                  color: s < step
                    ? '#fff'
                    : s === step
                      ? 'var(--color-primary)'
                      : 'var(--color-text-tertiary)',
                  border: s === step ? '2px solid var(--color-primary)' : 'none',
                  transition: 'all 0.2s',
                }}>
                  {s < step ? '✓' : s}
                </div>
                {i < 2 && (
                  <div style={{
                    flex: 1, height: 2,
                    background: s < step ? 'var(--color-primary)' : 'var(--color-border)',
                    transition: 'background 0.2s',
                  }} />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <Input label="Project name" placeholder="My awesome project" />
          )}
          {step === 2 && (
            <Input label="Description" placeholder="What is this project about?" />
          )}
          {step === 3 && (
            <Input
              label="Invite teammates"
              placeholder="email@company.com"
              leadingIcon="mail"
              helperText="Separate multiple emails with commas"
            />
          )}
        </div>
      </Dialog>

      {/* Command palette */}
      <Dialog
        open={command}
        onClose={() => setCommand(false)}
        showCloseButton={false}
        size="sm"
      >
        <div style={{ padding: '8px 0' }}>
          {/* Search row */}
          <div style={{
            padding: '8px 16px 10px',
            borderBottom: '0.5px solid var(--color-border-tertiary)',
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <i className="ti ti-search" style={{ fontSize: 16, color: 'var(--color-text-secondary)', flexShrink: 0 }} aria-hidden="true" />
            <input
              autoFocus
              placeholder="Search commands..."
              style={{
                flex: 1, background: 'none', border: 'none', outline: 'none',
                fontSize: 14, color: 'var(--color-text-primary)', padding: '4px 0',
              }}
            />
            <kbd style={{
              fontSize: 11, color: 'var(--color-text-tertiary)',
              background: 'var(--color-background-secondary)',
              padding: '2px 6px', borderRadius: 4,
              border: '0.5px solid var(--color-border-tertiary)',
            }}>
              ESC
            </kbd>
          </div>
          {/* Command items */}
          {[
            { icon: 'ti-file',     label: 'New file',      shortcut: '⌘N'  },
            { icon: 'ti-folder',   label: 'Open folder',   shortcut: '⌘O'  },
            { icon: 'ti-search',   label: 'Find in files', shortcut: '⌘⇧F' },
            { icon: 'ti-settings', label: 'Settings',      shortcut: '⌘,'  },
            { icon: 'ti-terminal', label: 'New terminal',  shortcut: '⌘⇧`' },
          ].map(item => (
            <div
              key={item.label}
              onClick={() => setCommand(false)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 16px', cursor: 'pointer', fontSize: 13,
                color: 'var(--color-text-primary)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <i className={`ti ${item.icon}`} style={{ fontSize: 16, color: 'var(--color-text-secondary)' }} aria-hidden="true" />
                {item.label}
              </div>
              <kbd style={{
                fontSize: 11, color: 'var(--color-text-tertiary)',
                background: 'var(--color-background-secondary)',
                padding: '2px 6px', borderRadius: 4,
                border: '0.5px solid var(--color-border-tertiary)',
              }}>
                {item.shortcut}
              </kbd>
            </div>
          ))}
        </div>
      </Dialog>

    </div>
  );
}
