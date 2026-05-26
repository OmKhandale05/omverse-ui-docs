'use client';

import { PageHeader } from '@/components/ui/PageHeader';
import { CodeBlock } from '@/components/ui/CodeBlock';

/* ─── Requirements table data ─── */

const REQUIREMENTS = [
  { name: 'React',          value: '18+',              note: 'Hooks + concurrent features' },
  { name: 'Tailwind CSS',   value: 'v4',               note: 'Required for utility classes' },
  { name: 'Vite or Next.js', value: 'Recommended',    note: 'First-class Tailwind v4 support' },
  { name: 'TypeScript',     value: 'Recommended',      note: 'Full type definitions included' },
];

/* ─── Code snippets ─── */

const INSTALL_CODE = `npm install omverse-ui`;

const TAILWIND_CODE = `npm install tailwindcss @tailwindcss/vite`;

const VITE_CONFIG_CODE = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})`;

const CSS_CODE = `@import "tailwindcss";
@import "omverse-ui/styles";
@source "../node_modules/omverse-ui/dist/index.js";`;

const IMPORT_CSS_CODE = `import './index.css'`;

const TOASTER_CODE = `import { Toaster } from 'omverse-ui'

function App() {
  return (
    <>
      <Toaster position="bottom-right" />
      {/* your app */}
    </>
  )
}`;

const USAGE_CODE = `import { Button, Badge, Input, Card } from 'omverse-ui'

export default function App() {
  return (
    <div>
      <Button variant="filled">Get started</Button>
      <Badge color="success">Live</Badge>
      <Input label="Email" placeholder="you@example.com" />
    </div>
  )
}`;

/* ─── Shared heading style ─── */

const h2Style: React.CSSProperties = {
  fontSize: 16,
  fontWeight: 600,
  color: 'var(--color-text-primary)',
  letterSpacing: '-0.02em',
  marginBottom: 12,
  marginTop: 32,
};

const bodyStyle: React.CSSProperties = {
  fontSize: 13,
  color: 'var(--color-text-secondary)',
  lineHeight: 1.7,
  marginBottom: 12,
};

/* ─── Page ─── */

export default function InstallationPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Docs', 'Installation']}
        title="Installation"
        description="Get omverse-ui up and running in your React project in under 5 minutes."
      />

      <div style={{ padding: '28px 40px', maxWidth: 720, margin: '0 auto' }}>

        {/* ── Requirements ── */}
        <h2 style={{ ...h2Style, marginTop: 0 }}>Requirements</h2>
        <div style={{
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 24,
        }}>
          {/* Header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '160px 120px 1fr',
            columnGap: 16,
            padding: '7px 16px',
            background: 'var(--color-background-secondary)',
            borderBottom: '0.5px solid var(--color-border-tertiary)',
          }}>
            {(['Package', 'Version', 'Note'] as const).map(h => (
              <span key={h} style={{
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* Rows */}
          {REQUIREMENTS.map((req, i) => (
            <div key={req.name} style={{
              display: 'grid',
              gridTemplateColumns: '160px 120px 1fr',
              columnGap: 16,
              padding: '10px 16px',
              borderBottom: i < REQUIREMENTS.length - 1
                ? '0.5px solid var(--color-border-tertiary)'
                : undefined,
              alignItems: 'center',
            }}>
              <code style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}>
                {req.name}
              </code>
              <span style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                color: 'var(--color-primary)',
                fontWeight: 500,
              }}>
                {req.value}
              </span>
              <span style={{
                fontSize: 12,
                color: 'var(--color-text-secondary)',
              }}>
                {req.note}
              </span>
            </div>
          ))}
        </div>

        {/* ── Step 1: Install omverse-ui ── */}
        <h2 style={h2Style}>1. Install omverse-ui</h2>
        <CodeBlock filename="terminal" code={INSTALL_CODE} />

        {/* ── Step 2: Install Tailwind v4 ── */}
        <h2 style={h2Style}>2. Install Tailwind v4</h2>
        <CodeBlock filename="terminal" code={TAILWIND_CODE} />

        {/* ── Step 3: Configure Vite ── */}
        <h2 style={h2Style}>3. Configure vite.config.ts</h2>
        <p style={bodyStyle}>
          Add the Tailwind v4 Vite plugin — no <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>tailwind.config.js</code> needed.
        </p>
        <CodeBlock filename="vite.config.ts" code={VITE_CONFIG_CODE} />

        {/* ── Step 4: Configure CSS ── */}
        <h2 style={h2Style}>4. Update index.css</h2>
        <p style={bodyStyle}>
          Import Tailwind, the omverse-ui design tokens, and tell Tailwind where to scan for class usage.
        </p>
        <CodeBlock filename="index.css" code={CSS_CODE} />

        {/* ── Step 5: Import CSS ── */}
        <h2 style={h2Style}>5. Import CSS in main.tsx</h2>
        <CodeBlock filename="main.tsx" code={IMPORT_CSS_CODE} />

        {/* ── Step 6: Add Toaster ── */}
        <h2 style={h2Style}>6. Add Toaster to app root</h2>
        <p style={bodyStyle}>
          Required only if you use the <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>toast()</code> API.
          Place it once at the top level so toasts render above all other content.
        </p>
        <CodeBlock filename="App.tsx" code={TOASTER_CODE} />

        {/* ── Step 7: Start using components ── */}
        <h2 style={h2Style}>7. Start using components</h2>
        <CodeBlock filename="App.tsx" code={USAGE_CODE} />

      </div>
    </div>
  );
}
