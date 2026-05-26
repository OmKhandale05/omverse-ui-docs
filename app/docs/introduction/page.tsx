'use client';

import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Button, Badge, Spinner, Switch } from 'omverse-ui';

export default function IntroductionPage() {
  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 40px 80px' }}>

      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'var(--color-text-tertiary)', marginBottom: 32 }}>
        <span>Docs</span>
        <i className="ti ti-chevron-right" style={{ fontSize: 10 }} aria-hidden="true" />
        <span style={{ color: 'var(--color-text-primary)' }}>Introduction</span>
      </div>

      {/* Hero section */}
      <div style={{
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 16,
        padding: '40px 40px 32px',
        background: 'var(--color-background-secondary)',
        marginBottom: 16,
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, fontWeight: 500,
          color: 'var(--color-text-secondary)',
          background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 9999, padding: '4px 12px',
          marginBottom: 20,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          v0.1.4 — Stable release
        </div>

        <h1 style={{
          fontSize: 36, fontWeight: 500,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.035em', lineHeight: 1.15,
          marginBottom: 14,
        }}>
          Build interfaces faster<br />with omverse-ui
        </h1>

        <p style={{
          fontSize: 14, color: 'var(--color-text-secondary)',
          lineHeight: 1.7, maxWidth: 460, marginBottom: 28, fontWeight: 400,
        }}>
          27 production-ready React components built on Tailwind v4,
          TypeScript and CVA. Accessible, typed and ready to ship.
        </p>

        <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
          <Link href="/docs/installation" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 36, padding: '0 18px', borderRadius: 9999,
            background: '#0A0A0F',
            color: '#ffffff',
            fontSize: 13, fontWeight: 500, textDecoration: 'none',
          }}>
            Get started
            <i className="ti ti-arrow-right" style={{ fontSize: 13 }} aria-hidden="true" />
          </Link>
          <Link href="/components/button" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            height: 36, padding: '0 18px', borderRadius: 9999,
            background: 'var(--color-background-primary)',
            color: 'var(--color-text-secondary)',
            fontSize: 13, fontWeight: 400, textDecoration: 'none',
            border: '0.5px solid var(--color-border-secondary)',
          }}>
            View components
          </Link>
        </div>

        {/* Install snippet */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          height: 34, padding: '0 14px', borderRadius: 8,
          background: 'var(--color-background-primary)',
          border: '0.5px solid var(--color-border-tertiary)',
          fontSize: 12, fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-secondary)',
        }}>
          <span style={{ color: 'var(--color-text-tertiary)' }}>$</span>
          <span>npm install omverse-ui</span>
          <i className="ti ti-copy" style={{ fontSize: 13, marginLeft: 4, color: 'var(--color-text-tertiary)' }} aria-hidden="true" />
        </div>
      </div>

      {/* Stats row — 4 cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {[
          { value: '27',   label: 'Components', icon: 'ti-components'  },
          { value: '150+', label: 'Variants',   icon: 'ti-layout-grid' },
          { value: 'v4',   label: 'Tailwind',   icon: 'ti-palette'     },
          { value: 'MIT',  label: 'License',    icon: 'ti-license'     },
        ].map(stat => (
          <div key={stat.label} style={{
            padding: '20px',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12,
            background: 'var(--color-background-primary)',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <i className={`ti ${stat.icon}`} style={{ fontSize: 18, color: 'var(--color-text-secondary)' }} aria-hidden="true" />
            <p style={{ fontSize: 24, fontWeight: 500, color: 'var(--color-text-primary)', letterSpacing: '-0.04em', lineHeight: 1 }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 11, color: 'var(--color-text-tertiary)' }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Live preview card */}
      <div style={{
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
      }}>
        <div style={{
          padding: '12px 16px',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          background: 'var(--color-background-secondary)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FFBD2E' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28CA41' }} />
          </div>
          <span style={{ fontSize: 11, color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-mono)' }}>Live preview</span>
          <span style={{ marginLeft: 'auto', fontSize: 10, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            Interactive
          </span>
        </div>
        <div style={{
          padding: '32px 24px',
          background: 'var(--color-background-primary)',
          display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center',
        }}>
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="gradient">Gradient</Button>
          <Badge color="success">Success</Badge>
          <Badge color="primary">Primary</Badge>
          <Badge color="warning">Warning</Badge>
          <Spinner variant="circular" size="sm" />
          <Switch defaultChecked />
        </div>
      </div>

      {/* Features grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 16 }}>
        {[
          { icon: 'ti-brand-typescript', title: 'TypeScript first',    desc: 'Fully typed with complete IntelliSense support.' },
          { icon: 'ti-moon',             title: 'Dark mode ready',     desc: 'Every component adapts automatically via CSS variables.' },
          { icon: 'ti-package',          title: 'Tree-shakeable',      desc: 'Zero unused CSS or JS — import only what you use.' },
          { icon: 'ti-accessible',       title: 'Accessible',          desc: 'WAI-ARIA compliant with keyboard navigation support.' },
          { icon: 'ti-brush',            title: 'Customizable',        desc: 'Override any design token to match your brand.' },
          { icon: 'ti-bolt',             title: 'Fast by default',     desc: 'Built on Tailwind v4 — no runtime style generation.' },
        ].map(f => (
          <div key={f.title} style={{
            padding: '20px',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 12,
            background: 'var(--color-background-primary)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
            }}>
              <i className={`ti ${f.icon}`} style={{ fontSize: 16, color: 'var(--color-text-primary)' }} aria-hidden="true" />
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 6 }}>{f.title}</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Code example card */}
      <div style={{
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 16, overflow: 'hidden', marginBottom: 16,
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          background: 'var(--color-background-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 2 }}>Quick start</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Install and start using components in minutes.</p>
          </div>
          <Link href="/docs/installation" style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 12, color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            border: '0.5px solid var(--color-border-tertiary)',
            borderRadius: 6, padding: '4px 10px',
            background: 'var(--color-background-primary)',
          }}>
            Full guide
            <i className="ti ti-arrow-right" style={{ fontSize: 11 }} aria-hidden="true" />
          </Link>
        </div>
        <CodeBlock filename="App.tsx" code={`import { Button, Badge, Input } from 'omverse-ui'

export default function App() {
  return (
    <div>
      <Button variant="filled">Get started</Button>
      <Badge color="success">v0.1.4</Badge>
      <Input label="Email" placeholder="you@example.com" />
    </div>
  )
}`} />
      </div>

      {/* Continue reading */}
      <div style={{
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
          background: 'var(--color-background-secondary)',
        }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>Continue reading</p>
        </div>
        {[
          { icon: 'ti-download',     title: 'Installation',   desc: 'Full setup guide for Vite and Next.js projects.',        href: '/docs/installation'  },
          { icon: 'ti-palette',      title: 'Theming',        desc: 'Customize colors and tokens to match your brand.',       href: '/docs/theming'       },
          { icon: 'ti-color-swatch', title: 'Design tokens',  desc: 'Complete reference of all CSS custom properties.',       href: '/docs/design-tokens' },
          { icon: 'ti-layout-grid',  title: 'Components',     desc: 'Browse all 27 components with live previews and code.',  href: '/components/button'  },
        ].map((item, i, arr) => (
          <Link key={item.href} href={item.href} style={{
            display: 'flex', alignItems: 'center', gap: 16,
            padding: '16px 20px',
            borderBottom: i < arr.length - 1 ? '0.5px solid var(--color-border-tertiary)' : 'none',
            textDecoration: 'none',
            background: 'var(--color-background-primary)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-background-secondary)',
              border: '0.5px solid var(--color-border-tertiary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 15, color: 'var(--color-text-primary)' }} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 2 }}>{item.title}</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.desc}</p>
            </div>
            <i className="ti ti-arrow-right" style={{ fontSize: 13, color: 'var(--color-text-tertiary)', flexShrink: 0 }} aria-hidden="true" />
          </Link>
        ))}
      </div>

    </div>
  );
}
