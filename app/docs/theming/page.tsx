'use client';

import { PageHeader } from '@/components/ui/PageHeader';
import { CodeBlock } from '@/components/ui/CodeBlock';

/* ─── Code snippets ─── */

const OVERRIDE_CODE = `@import "tailwindcss";
@import "omverse-ui/styles";
@source "../node_modules/omverse-ui/dist/index.js";

/* Override primary color */
:root {
  --color-primary: #6366F1;
  --color-on-primary: #ffffff;
  --color-primary-container: #E0E7FF;
  --color-on-primary-container: #3730A3;
}`;

const DARK_MODE_CODE = `/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #0A0A0F;
    --color-surface: #111118;
  }
}`;

const CLASS_DARK_CODE = `/* Class-based dark mode (e.g. when you toggle .dark on <html>) */
.dark {
  --color-background: #0A0A0F;
  --color-surface: #111118;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
}`;

const THEME_SOURCE_CODE = `/* omverse-ui/styles defines tokens like: */
@theme {
  --color-primary: #6C47FF;
  --color-on-primary: #ffffff;
  --color-background: #ffffff;
  --color-surface: #F8F8FC;
  /* ... and many more */
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

export default function ThemingPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Docs', 'Theming']}
        title="Theming"
        description="omverse-ui uses CSS custom properties for all design tokens. Override them to match your brand."
      />

      <div style={{ padding: '28px 40px', maxWidth: 720, margin: '0 auto' }}>

        {/* ── How it works ── */}
        <h2 style={{ ...h2Style, marginTop: 0 }}>How it works</h2>
        <p style={bodyStyle}>
          All omverse-ui styles are built on CSS custom properties (variables) declared inside a{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>@theme</code> block via{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>omverse-ui/styles</code>.
          This means every color, radius, and spacing value is a single CSS variable you can override
          anywhere in your own stylesheet — no build step, no config file, no re-compilation required.
        </p>
        <p style={bodyStyle}>
          Tailwind v4 reads these tokens automatically via <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>@theme</code>,
          making them available as utility classes too (e.g.{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>bg-primary</code>,{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>text-on-primary</code>).
        </p>
        <CodeBlock filename="omverse-ui/styles (excerpt)" code={THEME_SOURCE_CODE} />

        {/* ── Override tokens ── */}
        <h2 style={h2Style}>Overriding design tokens</h2>
        <p style={bodyStyle}>
          After importing <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>omverse-ui/styles</code>,
          add a <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>:root</code> block in the
          same file and set any tokens you want to change. Your values win due to CSS cascade order.
        </p>
        <div style={calloutStyle}>
          Always place overrides <strong>after</strong> the omverse-ui import so the cascade applies correctly.
        </div>
        <CodeBlock filename="index.css" code={OVERRIDE_CODE} />

        {/* ── Dark mode ── */}
        <h2 style={h2Style}>Dark mode</h2>
        <p style={bodyStyle}>
          omverse-ui ships with a light theme by default. You can enable dark mode via the standard
          CSS media query or a class-based toggle — whichever matches your app&apos;s approach.
        </p>

        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
          marginTop: 20,
        }}>
          Media query (system preference)
        </p>
        <CodeBlock filename="index.css" code={DARK_MODE_CODE} />

        <p style={{
          fontSize: 13,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 8,
          marginTop: 20,
        }}>
          Class-based toggle
        </p>
        <p style={bodyStyle}>
          If you manage dark mode with a{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>.dark</code> class on{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>&lt;html&gt;</code>,
          scope your overrides to that class instead.
        </p>
        <CodeBlock filename="index.css" code={CLASS_DARK_CODE} />

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
            See the{' '}
            <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Design tokens</strong>{' '}
            page for a full list of every available token.
          </li>
          <li>
            Tokens prefixed <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>--color-on-*</code>{' '}
            are foreground colors designed for legibility on top of their background counterpart.
          </li>
          <li>
            Radius and spacing tokens (<code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>--radius-*</code>) follow the same override pattern.
          </li>
        </ul>

      </div>
    </div>
  );
}
