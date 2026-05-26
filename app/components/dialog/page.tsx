'use client';

import { useState } from 'react';
import { Button, Dialog } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const DIALOG_PROPS = [
  { name: 'open',           type: 'boolean',                                              default: 'false',     description: 'Whether the dialog is visible' },
  { name: 'onClose',        type: '() => void',                                           default: '—',         description: 'Callback fired when the dialog requests to close' },
  { name: 'title',          type: 'string',                                               default: '—',         description: 'Dialog header title' },
  { name: 'description',    type: 'string',                                               default: '—',         description: 'Subtitle shown below the title' },
  { name: 'variant',        type: "'default' | 'destructive' | 'success' | 'warning'",   default: "'default'", description: 'Icon and color theme' },
  { name: 'size',           type: "'sm' | 'md' | 'lg' | 'xl' | 'full'",                 default: "'md'",      description: 'Width of the dialog panel' },
  { name: 'position',       type: "'center' | 'bottom' | 'right' | 'fullscreen'",        default: "'center'",  description: 'Where the dialog appears on screen' },
  { name: 'showClose',      type: 'boolean',                                              default: 'true',      description: 'Shows the × close button in the header' },
  { name: 'closeOnOverlay', type: 'boolean',                                              default: 'true',      description: 'Closes the dialog when clicking the backdrop' },
  { name: 'imageUrl',       type: 'string',                                               default: '—',         description: 'URL for an image shown at the top of the dialog' },
  { name: 'imageAlt',       type: 'string',                                               default: '—',         description: 'Alt text for the header image' },
  { name: 'footer',         type: 'ReactNode',                                            default: '—',         description: 'Content rendered in the dialog footer' },
  { name: 'children',       type: 'ReactNode',                                            default: '—',         description: 'Dialog body content' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const ALERT_CODE = `import { Dialog, Button } from 'omverse-ui'

const [open, setOpen] = useState(false)

{/* Default */}
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Heads up"
  description="This action will update your settings."
  variant="default"
  footer={
    <>
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="filled"   onClick={() => setOpen(false)}>Confirm</Button>
    </>
  }
>
  <p>Are you sure you want to continue?</p>
</Dialog>

{/* Destructive */}
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Delete account"
  description="This action cannot be undone."
  variant="destructive"
  footer={
    <>
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
      <Button color="error" variant="filled" onClick={() => setOpen(false)}>Delete</Button>
    </>
  }
>
  <p>All your data will be permanently removed.</p>
</Dialog>`;

const FORM_CODE = `<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Create project"
  description="Fill in the details for your new project."
  footer={
    <>
      <Button variant="outlined" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="filled"   onClick={() => setOpen(false)}>Create</Button>
    </>
  }
>
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <div>
      <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Project name</label>
      <input
        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border-secondary)', fontSize: 14, background: 'var(--color-background-primary)', color: 'var(--color-text-primary)', boxSizing: 'border-box' }}
        placeholder="My awesome project"
      />
    </div>
    <div>
      <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Description</label>
      <textarea
        rows={3}
        style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border-secondary)', fontSize: 14, background: 'var(--color-background-primary)', color: 'var(--color-text-primary)', boxSizing: 'border-box', resize: 'vertical' }}
        placeholder="What is this project about?"
      />
    </div>
  </div>
</Dialog>`;

const IMAGE_CODE = `<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="New feature available"
  description="Check out what's new in v2.0"
  imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=200&fit=crop"
  imageAlt="Feature preview"
  footer={
    <>
      <Button variant="outlined" onClick={() => setOpen(false)}>Maybe later</Button>
      <Button variant="filled"   onClick={() => setOpen(false)}>Explore</Button>
    </>
  }
>
  <p>We've added a brand new dashboard with improved analytics and real-time data.</p>
</Dialog>`;

const POSITION_CODE = `{/* Bottom drawer */}
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Bottom drawer"
  position="bottom"
  footer={<Button variant="filled" onClick={() => setOpen(false)}>Close</Button>}
>
  <p>This dialog slides up from the bottom — great for mobile.</p>
</Dialog>

{/* Right panel */}
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Right panel"
  position="right"
  footer={<Button variant="filled" onClick={() => setOpen(false)}>Close</Button>}
>
  <p>This dialog slides in from the right like a side drawer.</p>
</Dialog>

{/* Fullscreen */}
<Dialog
  open={open}
  onClose={() => setOpen(false)}
  title="Fullscreen"
  position="fullscreen"
  footer={<Button variant="outlined" onClick={() => setOpen(false)}>Exit</Button>}
>
  <p>Takes up the entire viewport.</p>
</Dialog>`;

const MULTI_STEP_CODE = `const [open, setOpen]   = useState(false)
const [step, setStep]   = useState(1)

<Dialog
  open={open}
  onClose={() => { setOpen(false); setStep(1) }}
  title={\`Step \${step} of 3\`}
  description={['Account info', 'Personal details', 'Confirmation'][step - 1]}
  footer={
    <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'space-between' }}>
      <Button variant="outlined" onClick={() => step > 1 ? setStep(s => s - 1) : setOpen(false)}>
        {step > 1 ? 'Back' : 'Cancel'}
      </Button>
      <Button variant="filled" onClick={() => step < 3 ? setStep(s => s + 1) : setOpen(false)}>
        {step < 3 ? 'Continue' : 'Finish'}
      </Button>
    </div>
  }
>
  <div>
    {/* Step progress indicator */}
    <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
      {[1, 2, 3].map(n => (
        <div key={n} style={{
          flex: 1, height: 4, borderRadius: 2,
          background: n <= step ? 'var(--color-primary)' : 'var(--color-border-secondary)',
        }} />
      ))}
    </div>
    {step === 1 && <p>Enter your email and choose a password.</p>}
    {step === 2 && <p>Tell us a bit about yourself.</p>}
    {step === 3 && <p>Everything looks good! Click Finish to complete setup.</p>}
  </div>
</Dialog>`;

/* ─── Page ─── */

export default function DialogPage() {
  const [basic,       setBasic]       = useState(false);
  const [destructive, setDestructive] = useState(false);
  const [success,     setSuccess]     = useState(false);
  const [warning,     setWarning]     = useState(false);
  const [form,        setForm]        = useState(false);
  const [image,       setImage]       = useState(false);
  const [bottom,      setBottom]      = useState(false);
  const [right,       setRight]       = useState(false);
  const [fullscreen,  setFullscreen]  = useState(false);
  const [multiStep,   setMultiStep]   = useState(false);
  const [step,        setStep]        = useState(1);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'Dialog']}
        title="Dialog"
        description="4 alert variants · form · image header · bottom drawer · right panel · fullscreen · multi-step"
        tags={['Alert types', 'Form', 'Image header', 'Bottom drawer', 'Right panel', 'Fullscreen', 'Multi-step']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Alert types ── */}
        <ComponentPreview
          title="Alert types"
          description="Four variants — default, destructive, success, and warning — each with a themed icon"
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            <Button onClick={() => setBasic(true)}>Default</Button>
            <Button onClick={() => setDestructive(true)} color="error"   variant="outlined">Destructive</Button>
            <Button onClick={() => setSuccess(true)}     color="success" variant="outlined">Success</Button>
            <Button onClick={() => setWarning(true)}     color="warning" variant="outlined">Warning</Button>
          </div>
        </ComponentPreview>

        {/* Default dialog */}
        <Dialog
          open={basic}
          onClose={() => setBasic(false)}
          title="Heads up"
          description="This action will update your settings."
          variant="default"
          footer={
            <>
              <Button variant="outlined" onClick={() => setBasic(false)}>Cancel</Button>
              <Button variant="filled"   onClick={() => setBasic(false)}>Confirm</Button>
            </>
          }
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Are you sure you want to continue?</p>
        </Dialog>

        {/* Destructive dialog */}
        <Dialog
          open={destructive}
          onClose={() => setDestructive(false)}
          title="Delete account"
          description="This action cannot be undone."
          variant="destructive"
          footer={
            <>
              <Button variant="outlined" onClick={() => setDestructive(false)}>Cancel</Button>
              <Button color="error" variant="filled" onClick={() => setDestructive(false)}>Delete</Button>
            </>
          }
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>All your data will be permanently removed.</p>
        </Dialog>

        {/* Success dialog */}
        <Dialog
          open={success}
          onClose={() => setSuccess(false)}
          title="Payment successful"
          description="Your transaction was processed."
          variant="success"
          footer={
            <Button variant="filled" color="success" onClick={() => setSuccess(false)}>Done</Button>
          }
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Your receipt has been sent to your email.</p>
        </Dialog>

        {/* Warning dialog */}
        <Dialog
          open={warning}
          onClose={() => setWarning(false)}
          title="Unsaved changes"
          description="You have unsaved changes that will be lost."
          variant="warning"
          footer={
            <>
              <Button variant="outlined" onClick={() => setWarning(false)}>Stay</Button>
              <Button color="warning" variant="filled" onClick={() => setWarning(false)}>Leave anyway</Button>
            </>
          }
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>Do you want to discard your changes and leave?</p>
        </Dialog>

        <CodeBlock filename="App.tsx" code={ALERT_CODE} />

        {/* ── Section 2: Form + image header ── */}
        <ComponentPreview
          title="Form + image header"
          description="Form dialog with custom inputs; image dialog with a banner photo header"
        >
          <div style={{ display: 'flex', gap: 10 }}>
            <Button onClick={() => setForm(true)}>Open form</Button>
            <Button onClick={() => setImage(true)} variant="outlined">With image</Button>
          </div>
        </ComponentPreview>

        {/* Form dialog */}
        <Dialog
          open={form}
          onClose={() => setForm(false)}
          title="Create project"
          description="Fill in the details for your new project."
          footer={
            <>
              <Button variant="outlined" onClick={() => setForm(false)}>Cancel</Button>
              <Button variant="filled"   onClick={() => setForm(false)}>Create</Button>
            </>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Project name</label>
              <input
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border-secondary)', fontSize: 14, background: 'var(--color-background-primary)', color: 'var(--color-text-primary)', boxSizing: 'border-box' }}
                placeholder="My awesome project"
              />
            </div>
            <div>
              <label style={{ fontSize: 12, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 4 }}>Description</label>
              <textarea
                rows={3}
                style={{ width: '100%', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--color-border-secondary)', fontSize: 14, background: 'var(--color-background-primary)', color: 'var(--color-text-primary)', boxSizing: 'border-box', resize: 'vertical' }}
                placeholder="What is this project about?"
              />
            </div>
          </div>
        </Dialog>

        {/* Image dialog */}
        <Dialog
          open={image}
          onClose={() => setImage(false)}
          title="New feature available"
          description="Check out what's new in v2.0"
          imageUrl="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=200&fit=crop"
          imageAlt="Feature preview"
          footer={
            <>
              <Button variant="outlined" onClick={() => setImage(false)}>Maybe later</Button>
              <Button variant="filled"   onClick={() => setImage(false)}>Explore</Button>
            </>
          }
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            We've added a brand new dashboard with improved analytics and real-time data.
          </p>
        </Dialog>

        <CodeBlock filename="App.tsx" code={FORM_CODE} />
        <CodeBlock filename="App.tsx" code={IMAGE_CODE} />

        {/* ── Section 3: Positions ── */}
        <ComponentPreview
          title="Positions"
          description="bottom (drawer), right (side panel), and fullscreen layouts"
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Button onClick={() => setBottom(true)}    variant="outlined">Bottom drawer</Button>
            <Button onClick={() => setRight(true)}     variant="outlined">Right panel</Button>
            <Button onClick={() => setFullscreen(true)} variant="outlined">Fullscreen</Button>
          </div>
        </ComponentPreview>

        {/* Bottom drawer */}
        <Dialog
          open={bottom}
          onClose={() => setBottom(false)}
          title="Bottom drawer"
          position="bottom"
          footer={<Button variant="filled" onClick={() => setBottom(false)}>Close</Button>}
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            This dialog slides up from the bottom — great for mobile-friendly interactions.
          </p>
        </Dialog>

        {/* Right panel */}
        <Dialog
          open={right}
          onClose={() => setRight(false)}
          title="Right panel"
          position="right"
          footer={<Button variant="filled" onClick={() => setRight(false)}>Close</Button>}
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            This dialog slides in from the right side of the screen like a side drawer or settings panel.
          </p>
        </Dialog>

        {/* Fullscreen */}
        <Dialog
          open={fullscreen}
          onClose={() => setFullscreen(false)}
          title="Fullscreen"
          position="fullscreen"
          footer={<Button variant="outlined" onClick={() => setFullscreen(false)}>Exit</Button>}
        >
          <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
            Takes up the entire viewport — useful for complex editors and immersive flows.
          </p>
        </Dialog>

        <CodeBlock filename="App.tsx" code={POSITION_CODE} />

        {/* ── Section 4: Multi-step ── */}
        <ComponentPreview
          title="Multi-step"
          description="Step indicator with back/next navigation — built with state, no extra components"
        >
          <Button onClick={() => { setMultiStep(true); setStep(1); }}>Open wizard</Button>
        </ComponentPreview>

        <Dialog
          open={multiStep}
          onClose={() => { setMultiStep(false); setStep(1); }}
          title={`Step ${step} of 3`}
          description={['Account info', 'Personal details', 'Confirmation'][step - 1]}
          footer={
            <div style={{ display: 'flex', gap: 8, width: '100%', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                onClick={() => step > 1 ? setStep(s => s - 1) : setMultiStep(false)}
              >
                {step > 1 ? 'Back' : 'Cancel'}
              </Button>
              <Button
                variant="filled"
                onClick={() => step < 3 ? setStep(s => s + 1) : setMultiStep(false)}
              >
                {step < 3 ? 'Continue' : 'Finish'}
              </Button>
            </div>
          }
        >
          <div>
            {/* Step progress bar */}
            <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
              {[1, 2, 3].map(n => (
                <div
                  key={n}
                  style={{
                    flex: 1,
                    height: 4,
                    borderRadius: 2,
                    background: n <= step ? 'var(--color-primary)' : 'var(--color-border-secondary)',
                    transition: 'background 0.2s',
                  }}
                />
              ))}
            </div>
            {step === 1 && (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                Enter your email and choose a password to get started.
              </p>
            )}
            {step === 2 && (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                Tell us a bit about yourself — name, role, and company.
              </p>
            )}
            {step === 3 && (
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                Everything looks good! Click Finish to complete your setup.
              </p>
            )}
          </div>
        </Dialog>

        <CodeBlock filename="App.tsx" code={MULTI_STEP_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={DIALOG_PROPS} />

      </div>
    </div>
  );
}
