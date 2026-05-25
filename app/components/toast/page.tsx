'use client';

import { Button, toast } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const TOAST_PROPS = [
  {
    name: 'toast(message)',
    type: 'string',
    default: '—',
    description: 'Show a default toast',
  },
  {
    name: 'toast.success(message)',
    type: 'string',
    default: '—',
    description: 'Show a success toast',
  },
  {
    name: 'toast.error(message)',
    type: 'string',
    default: '—',
    description: 'Show an error toast',
  },
  {
    name: 'toast.warning(message)',
    type: 'string',
    default: '—',
    description: 'Show a warning toast',
  },
  {
    name: 'toast.info(message)',
    type: 'string',
    default: '—',
    description: 'Show an info toast',
  },
  {
    name: 'toast.loading(message)',
    type: 'string',
    default: '—',
    description: 'Show a loading toast with spinner',
  },
  {
    name: 'toast.promise(promise, messages)',
    type: 'Promise',
    default: '—',
    description: 'Tracks a promise — loading → success or error automatically',
  },
  {
    name: 'duration',
    type: 'number',
    default: '4000',
    description: 'Auto dismiss delay in ms — pass Infinity to keep until dismissed',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Additional description text shown below the title',
  },
  {
    name: 'position',
    type: "'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'",
    default: "'bottom-right'",
    description: 'Toast stack position — configured on the <Toaster /> component',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const TYPES_CODE = `import { toast } from 'omverse-ui'

toast('Default toast message')
toast.success('Changes saved successfully!')
toast.error('Something went wrong')
toast.warning('This action cannot be undone')
toast.info('New version available')
toast.loading('Saving changes...')`;

const DESCRIPTION_CODE = `toast('Profile updated', {
  description: 'Your profile has been saved successfully.',
})`;

const PROMISE_CODE = `toast.promise(
  new Promise(resolve => setTimeout(resolve, 2000)),
  {
    loading: 'Saving...',
    success: 'Saved successfully!',
    error:   'Failed to save',
  }
)`;

const DURATION_CODE = `toast('Disappears in 1 second',  { duration: 1000     })
toast('Disappears in 5 seconds', { duration: 5000     })
toast('Stays until dismissed',   { duration: Infinity })`;

const TOASTER_CODE = `// Place once at the root of your app (e.g. layout.tsx)
import { Toaster } from 'omverse-ui'

export default function Layout({ children }) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
    </>
  )
}`;

/* ─── Page ─── */

export default function ToastPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'Toast']}
        title="Toast"
        description="Lightweight notification messages that appear temporarily. 8 types, 6 positions, promise support and progress bar."
        tags={['8 types', '6 positions', 'Promise', 'Auto dismiss', 'Progress bar']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Types ── */}
        <ComponentPreview
          title="Types"
          description="Click any button to trigger — Toaster is already mounted in the site layout"
        >
          <Button variant="outlined" size="sm" onClick={() => toast('Default toast message')}>
            Default
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast.success('Changes saved successfully!')}>
            Success
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast.error('Something went wrong')}>
            Error
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast.warning('This action cannot be undone')}>
            Warning
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast.info('New version available')}>
            Info
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast.loading('Saving changes...')}>
            Loading
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TYPES_CODE} />

        {/* ── Section 2: With description ── */}
        <ComponentPreview
          title="With description"
          description="description adds a second line below the title"
        >
          <Button
            variant="outlined"
            size="sm"
            onClick={() =>
              toast('Profile updated', {
                description: 'Your profile has been saved successfully.',
              })
            }
          >
            With description
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DESCRIPTION_CODE} />

        {/* ── Section 3: Promise ── */}
        <ComponentPreview
          title="Promise"
          description="toast.promise() shows loading while the promise runs, then switches to success or error"
        >
          <Button
            variant="outlined"
            size="sm"
            onClick={() =>
              toast.promise(
                new Promise(res => setTimeout(res, 2000)),
                {
                  loading: 'Saving...',
                  success: 'Saved successfully!',
                  error:   'Failed to save',
                }
              )
            }
          >
            Promise toast (2s)
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PROMISE_CODE} />

        {/* ── Section 4: Custom duration ── */}
        <ComponentPreview
          title="Custom duration"
          description="duration in ms — use Infinity to keep the toast until the user dismisses it manually"
        >
          <Button variant="outlined" size="sm" onClick={() => toast('Disappears in 1 second',  { duration: 1000 })}>
            1 second
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast('Disappears in 5 seconds', { duration: 5000 })}>
            5 seconds
          </Button>
          <Button variant="outlined" size="sm" onClick={() => toast('Stays until dismissed', { duration: Infinity })}>
            Permanent
          </Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DURATION_CODE} />

        {/* ── Section 5: Toaster setup ── */}
        <ComponentPreview
          title="Toaster setup"
          description="Mount Toaster once at the root — it renders the stack into a portal outside your component tree"
        >
          <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: 420 }}>
            <code style={{ background: 'var(--color-background-secondary)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)' }}>
              {'<Toaster />'}
            </code>
            {' '}is already mounted in this site&apos;s root layout via{' '}
            <code style={{ background: 'var(--color-background-secondary)', padding: '2px 6px', borderRadius: 4, fontFamily: 'var(--font-mono)' }}>
              Providers.tsx
            </code>
            . In your own app add it once to your root layout.
          </p>
        </ComponentPreview>

        <CodeBlock filename="layout.tsx" code={TOASTER_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={TOAST_PROPS} />

      </div>
    </div>
  );
}
