'use client';

import { PageHeader } from '@/components/ui/PageHeader';
import { CodeBlock } from '@/components/ui/CodeBlock';

/* ─── Code snippets ─── */

const MEDIA_CODE = `/* Automatically follow the OS preference */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0A0A0F;
    --color-surface: #111118;
    --color-surface-variant: #1A1A24;
    --color-text-primary: #F1F5F9;
    --color-text-secondary: #94A3B8;
    --color-text-tertiary: #64748B;
    --color-outline: #334155;
    --color-outline-variant: #1E293B;
  }
}`;

const CLASS_TOGGLE_CSS = `/* Class-based — toggle .dark on <html> */
.dark {
  --color-background: #0A0A0F;
  --color-surface: #111118;
  --color-surface-variant: #1A1A24;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-text-tertiary: #64748B;
  --color-outline: #334155;
  --color-outline-variant: #1E293B;
}`;

const TOGGLE_HOOK_CODE = `import { useEffect, useState } from 'react'

export function useDarkMode() {
  const [dark, setDark] = useState(
    () => document.documentElement.classList.contains('dark')
  )

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return [dark, setDark] as const
}`;

const PERSIST_CODE = `// Prevent flash of wrong theme — add to <head> before JS loads
<script dangerouslySetInnerHTML={{
  __html: \`
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark')
    }
  \`,
}} />`;

const NEXT_LAYOUT_CODE = `// app/layout.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'My App' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-flash script — must be inline, before any JS */}
        <script dangerouslySetInnerHTML={{
          __html: \`
            const t = localStorage.getItem('theme')
            const d = window.matchMedia('(prefers-color-scheme: dark)').matches
            if (t === 'dark' || (!t && d)) document.documentElement.classList.add('dark')
          \`,
        }} />
      </head>
      <body>{children}</body>
    </html>
  )
}`;

/* ─── Shared styles ─── */

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

const calloutStyle: React.CSSProperties = {
  background: 'var(--color-primary-container)',
  borderLeft: '3px solid var(--color-primary)',
  borderRadius: '0 8px 8px 0',
  padding: '10px 16px',
  marginBottom: 16,
  fontSize: 13,
  color: 'var(--color-on-primary-container)',
  lineHeight: 1.65,
};

/* ─── Page ─── */

export default function DarkModePage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Docs', 'Dark mode']}
        title="Dark mode"
        description="omverse-ui supports dark mode via CSS media query or a class-based toggle — no extra config required."
      />

      <div style={{ padding: '28px 40px', maxWidth: 720, margin: '0 auto' }}>

        <p style={{ ...bodyStyle, marginTop: 0 }}>
          All omverse-ui colors are CSS custom properties, so dark mode is a matter of overriding
          those variables. There are two standard approaches — choose whichever fits your app.
        </p>

        {/* ── Approach 1: Media query ── */}
        <h2 style={{ ...h2Style, marginTop: 0 }}>Option 1 — System preference (media query)</h2>
        <p style={bodyStyle}>
          Override tokens inside a{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>prefers-color-scheme: dark</code>{' '}
          media query. The browser switches automatically based on the OS setting — no JavaScript needed.
        </p>
        <CodeBlock filename="index.css" code={MEDIA_CODE} />

        {/* ── Approach 2: Class-based toggle ── */}
        <h2 style={h2Style}>Option 2 — Class-based toggle</h2>
        <p style={bodyStyle}>
          Scope overrides to a{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>.dark</code> class on{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>&lt;html&gt;</code>.
          This lets you toggle dark mode programmatically and persist the user&apos;s preference.
        </p>
        <CodeBlock filename="index.css" code={CLASS_TOGGLE_CSS} />

        <p style={{ ...bodyStyle, marginTop: 16 }}>
          Use a small hook to toggle the class and save the preference to{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>localStorage</code>:
        </p>
        <CodeBlock filename="useDarkMode.ts" code={TOGGLE_HOOK_CODE} />

        {/* ── Anti-flash ── */}
        <h2 style={h2Style}>Preventing flash of wrong theme</h2>
        <p style={bodyStyle}>
          When using class-based dark mode, the page can briefly flash the wrong theme before
          JavaScript runs. Fix this by injecting an inline script in{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>&lt;head&gt;</code>{' '}
          that reads <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>localStorage</code> and
          applies the class synchronously.
        </p>
        <div style={calloutStyle}>
          The script must be <strong>inline</strong> (not a deferred or async script) so it
          runs before the browser paints anything.
        </div>

        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
        }}>
          Standalone anti-flash snippet
        </p>
        <CodeBlock filename="index.html / _document.tsx" code={PERSIST_CODE} />

        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
          marginTop: 20,
        }}>
          In a Next.js App Router layout
        </p>
        <CodeBlock filename="app/layout.tsx" code={NEXT_LAYOUT_CODE} />

        {/* ── Tips ── */}
        <h2 style={h2Style}>Tips</h2>
        <ul style={{
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.9,
          paddingLeft: 20,
          margin: 0,
        }}>
          <li>
            Add <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>suppressHydrationWarning</code>{' '}
            to <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>&lt;html&gt;</code> in Next.js to
            silence the class mismatch hydration warning.
          </li>
          <li>
            Both approaches can be combined — use the media query as the default and class override
            for an explicit user toggle.
          </li>
          <li>
            See the{' '}
            <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Design tokens</strong>{' '}
            page for a full list of color variables you can override.
          </li>
        </ul>

      </div>
    </div>
  );
}
