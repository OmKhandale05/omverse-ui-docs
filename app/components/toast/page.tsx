'use client';

import { useState } from 'react';
import { Button, toast } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const TOAST_PROPS = [
  { name: 'title',        type: 'string',                                                          default: '—',              description: 'Toast message — first argument to toast()' },
  { name: 'description',  type: 'string',                                                          default: 'undefined',      description: 'Secondary line of text below the title' },
  { name: 'duration',     type: 'number',                                                          default: '4000',           description: 'Auto-dismiss delay in ms. Pass Infinity to persist until dismissed' },
  { name: 'actions',      type: 'ToastAction[]',                                                   default: 'undefined',      description: 'Action buttons rendered inside the toast' },
  { name: 'avatarSrc',    type: 'string',                                                          default: 'undefined',      description: 'Avatar image URL — shown in rich toasts' },
  { name: 'avatarName',   type: 'string',                                                          default: 'undefined',      description: 'Avatar fallback name — used for initials' },
  { name: 'progress',     type: 'number',                                                          default: 'undefined',      description: '0–100 progress value for toast.progress() toasts' },
  { name: 'dismissible',  type: 'boolean',                                                         default: 'true',           description: 'Shows a close button on the toast' },
  { name: 'id',           type: 'string',                                                          default: 'auto',           description: 'Stable ID — reuse to update or dismiss a specific toast' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const TOASTER_PROPS = [
  { name: 'position',     type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'", default: "'bottom-right'", description: 'Where the toast stack appears on screen' },
  { name: 'maxToasts',    type: 'number',                                                          default: '5',              description: 'Maximum number of toasts visible at once before older ones are removed' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const TYPES_CODE = `import { toast } from 'omverse-ui'

toast('Default notification')
toast.success('Changes saved!', { description: 'Your profile has been updated' })
toast.error('Failed to save',   { description: 'Please check your connection' })
toast.warning('Session expiring', {
  description: "You'll be logged out in 5 minutes",
  actions: [{ label: 'Extend', onClick: () => toast.success('Session extended!') }],
})
toast.info('New version available', {
  description: 'v2.1.0 is ready to install',
  actions: [
    { label: 'Update now', onClick: () => toast.loading('Updating...') },
    { label: 'Later', variant: 'ghost', onClick: () => {} },
  ],
})
toast.gradient('🚀 You reached Pro tier!', {
  description: 'Enjoy unlimited projects and priority support',
  actions: [{ label: 'View perks', onClick: () => {} }],
})`;

const PROMISE_CODE = `toast.promise(
  new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.3 ? resolve('done') : reject(new Error('Failed'))
    }, 2000)
  }),
  {
    loading: 'Saving changes...',
    success: 'Changes saved successfully!',
    error: (err) => \`Error: \${err instanceof Error ? err.message : 'Unknown error'}\`,
  }
)`;

const PROGRESS_CODE = `// Start a progress toast — returns an ID
const id = toast.progress('Uploading files...', { description: '0% complete' })

// Update it as progress changes
let pct = 0
const interval = setInterval(() => {
  pct += Math.random() * 15
  if (pct >= 100) {
    clearInterval(interval)
    toast.update(id, {
      type: 'success',
      title: 'Upload complete!',
      description: '8 files uploaded successfully',
      duration: 4000,
      dismissible: true,
      progress: undefined,
    })
  } else {
    toast.update(id, {
      description: \`\${Math.round(pct)}% complete\`,
      progress: Math.round(pct),
    })
  }
}, 400)`;

const RICH_CODE = `toast.rich({
  type: 'info',
  title: 'John invited you to a project',
  description: 'Design System v2.0 · 5 members',
  avatarSrc: 'https://i.pravatar.cc/150?img=1',
  avatarName: 'John Doe',
  actions: [
    { label: 'Accept',  onClick: () => toast.success('Joined project!') },
    { label: 'Decline', variant: 'ghost', onClick: () => {} },
  ],
  duration: 8000,
})`;

const PERSISTENT_CODE = `// Show a persistent loading toast with a stable ID
toast.loading('Connecting to server...', { id: 'persistent' })

// Dismiss it later by ID
toast.dismiss('persistent')

// Dismiss every visible toast
toast.dismissAll()`;

const STACK_CODE = `toast.success('Profile updated successfully')
setTimeout(() => toast.error('Payment failed', { description: 'Card declined' }), 100)
setTimeout(() => toast.info('New message from Alice'), 200)
// Multiple toasts stack — hover over them to expand`;

const POSITION_CODE = `// Place <Toaster> once at your app root and set position there
import { Toaster } from 'omverse-ui'

export default function RootLayout({ children }) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  )
}`;

/* ─── Page ─── */

export default function ToastPage() {
  const [progressId, setProgressId] = useState<string | null>(null);

  /* ── Progress simulation — matches stories exactly ── */
  function simulateProgress() {
    const id = toast.progress('Uploading files...', {
      description: '0% complete',
    });
    setProgressId(id);

    let pct = 0;
    const interval = setInterval(() => {
      pct += Math.random() * 15;
      if (pct >= 100) {
        pct = 100;
        clearInterval(interval);
        toast.update(id, {
          type: 'success',
          title: 'Upload complete!',
          description: '8 files uploaded successfully',
          duration: 4000,
          dismissible: true,
          progress: undefined,
        });
        setProgressId(null);
      } else {
        toast.update(id, {
          description: `${Math.round(pct)}% complete`,
          progress: Math.round(pct),
        });
      }
    }, 400);
  }

  /* ── Promise simulation — 70 % success ── */
  function simulatePromise() {
    toast.promise(
      new Promise<string>((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.3
            ? resolve('done')
            : reject(new Error('Failed'));
        }, 2000);
      }),
      {
        loading: 'Saving changes...',
        success: 'Changes saved successfully!',
        error: (err) =>
          `Error: ${err instanceof Error ? err.message : 'Unknown error'}`,
      }
    );
  }

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'Toast']}
        title="Toast"
        description="Better than react-toastify · 8 types · 6 positions · promise · progress · rich"
        tags={['Default', 'Success', 'Error', 'Warning', 'Info', 'Gradient', 'Promise', 'Progress', 'Rich', 'Stack', 'Persistent', 'Positions']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Types ── */}
        <ComponentPreview
          title="Types"
          description="Click any button to fire a toast — Toaster is already mounted in the site layout"
        >
          <Button variant="outlined" size="sm"
            onClick={() => toast('Default notification')}
          >
            Default
          </Button>

          <Button variant="outlined" size="sm"
            onClick={() => toast.success('Changes saved!', {
              description: 'Your profile has been updated',
            })}
          >
            Success
          </Button>

          <Button variant="outlined" size="sm"
            onClick={() => toast.error('Failed to save', {
              description: 'Please check your connection',
            })}
          >
            Error
          </Button>

          <Button variant="outlined" size="sm"
            onClick={() => toast.warning('Session expiring', {
              description: "You'll be logged out in 5 minutes",
              actions: [
                { label: 'Extend', onClick: () => toast.success('Session extended!') },
              ],
            })}
          >
            Warning
          </Button>

          <Button variant="outlined" size="sm"
            onClick={() => toast.info('New version available', {
              description: 'v2.1.0 is ready to install',
              actions: [
                { label: 'Update now', onClick: () => toast.loading('Updating...') },
                { label: 'Later', variant: 'ghost', onClick: () => {} },
              ],
            })}
          >
            Info
          </Button>

          <Button variant="tonal" size="sm"
            onClick={() => toast.gradient('🚀 You reached Pro tier!', {
              description: 'Enjoy unlimited projects and priority support',
              actions: [{ label: 'View perks', onClick: () => {} }],
            })}
          >
            Gradient
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TYPES_CODE} />

        {/* ── Section 2: Promise ── */}
        <ComponentPreview
          title="Promise toast"
          description="Shows loading → resolves to success or error automatically"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button variant="outlined" size="sm" onClick={simulatePromise}>
              Simulate promise (70% success)
            </Button>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Shows loading while the promise runs, then switches to success or error
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PROMISE_CODE} />

        {/* ── Section 3: Progress ── */}
        <ComponentPreview
          title="Progress toast"
          description="Progress bar updates in real time — auto converts to success on complete"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button
              variant="outlined"
              size="sm"
              onClick={simulateProgress}
              disabled={progressId !== null}
            >
              Simulate file upload
            </Button>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              {progressId !== null
                ? 'Upload in progress — watch the toast…'
                : 'Starts a progress toast that increments every 400 ms'}
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PROGRESS_CODE} />

        {/* ── Section 4: Rich toast — avatar + actions ── */}
        <ComponentPreview
          title="Rich toast — avatar + actions"
          description="Collaboration and social notifications with avatar, description, and action buttons"
        >
          <Button variant="outlined" size="sm"
            onClick={() => toast.rich({
              type: 'info',
              title: 'John invited you to a project',
              description: 'Design System v2.0 · 5 members',
              avatarSrc: 'https://i.pravatar.cc/150?img=1',
              avatarName: 'John Doe',
              actions: [
                { label: 'Accept',  onClick: () => toast.success('Joined project!') },
                { label: 'Decline', variant: 'ghost', onClick: () => {} },
              ],
              duration: 8000,
            })}
          >
            Collaboration invite
          </Button>

          <Button variant="outlined" size="sm"
            onClick={() => toast.rich({
              type: 'info',
              title: 'Alice commented on your post',
              description: '"This design system looks amazing! 🔥"',
              avatarSrc: 'https://i.pravatar.cc/150?img=5',
              avatarName: 'Alice Wang',
              actions: [{ label: 'View comment', onClick: () => {} }],
            })}
          >
            Social notification
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={RICH_CODE} />

        {/* ── Section 5: Persistent + dismiss ── */}
        <ComponentPreview
          title="Persistent + dismiss"
          description="Use a stable id to update or dismiss a specific toast at any time"
        >
          <Button variant="outlined" size="sm"
            onClick={() => toast.loading('Connecting to server...', { id: 'persistent' })}
          >
            Show persistent
          </Button>

          <Button variant="outlined" size="sm"
            onClick={() => toast.dismiss('persistent')}
          >
            Dismiss persistent
          </Button>

          <Button variant="destructive" size="sm"
            onClick={() => toast.dismissAll()}
          >
            Dismiss all
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PERSISTENT_CODE} />

        {/* ── Section 6: Stack ── */}
        <ComponentPreview
          title="Stack — hover to expand"
          description="Multiple toasts stack — hover over them to expand the stack"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <Button
              variant="outlined"
              size="sm"
              onClick={() => {
                toast.success('Profile updated successfully');
                setTimeout(() => toast.error('Payment failed', { description: 'Card declined' }), 100);
                setTimeout(() => toast.info('New message from Alice'), 200);
              }}
            >
              Show 3 toasts at once
            </Button>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>
              Toasts stack with a collapsed view — hover to expand
            </p>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STACK_CODE} />

        {/* ── Section 7: Position ── */}
        <ComponentPreview
          title="Position"
          description="Set position on the Toaster component in your app root"
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            width: '100%',
            alignItems: 'flex-start',
          }}>
            <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Toast position is controlled by the Toaster component.
              Place it once in your app root with your preferred position.
            </p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'].map(pos => (
                <span key={pos} style={{
                  fontSize: 11,
                  padding: '3px 8px',
                  borderRadius: 6,
                  border: '0.5px solid var(--color-border-tertiary)',
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)',
                }}>{pos}</span>
              ))}
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="layout.tsx" code={POSITION_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Toast options
        </p>
        <PropsTable props={TOAST_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          Toaster props
        </p>
        <PropsTable props={TOASTER_PROPS} />

      </div>
    </div>
  );
}
