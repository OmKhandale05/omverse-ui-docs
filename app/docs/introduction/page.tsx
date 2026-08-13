'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { Button, Badge, Spinner, Switch } from 'omverse-ui';

/* ─── Responsive helpers ─────────────────────────────────────────────────── */
const CSS = `
  .intro-hero-inner   { display: grid; grid-template-columns: 1fr; }
  .intro-layers-grid  { display: grid; grid-template-columns: 1fr; gap: 28px; padding: 32px 0; }
  .intro-features     { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
  .intro-stats        { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }

  @media (min-width: 600px) {
    .intro-stats      { grid-template-columns: repeat(4, 1fr); }
  }
  @media (min-width: 640px) {
    .intro-layers-grid { grid-template-columns: 1fr 1fr; }
    .intro-features    { grid-template-columns: 1fr 1fr 1fr; }
  }
`;

/* ─── Layer tabs (zerodrift-inspired) ────────────────────────────────────── */
const LAYERS = [
  {
    id:        'install',
    label:     'Install',
    sub:       'One command setup',
    heading:   'Up and running in minutes.',
    body:      'Add omverse-ui with a single npm command. No wrappers, no providers, no config files — just import what you need and start building.',
    href:      '/docs/installation',
    cta:       'Installation guide',
  },
  {
    id:        'compose',
    label:     'Components',
    sub:       'Build your UI',
    heading:   'Every component, fully typed.',
    body:      '27 production-ready components with full TypeScript support, CVA-powered variants, and WAI-ARIA accessibility baked in.',
    href:      '/components/button',
    cta:       'Browse components',
  },
  {
    id:        'theme',
    label:     'Theming',
    sub:       'Match your brand',
    heading:   'Design tokens, your way.',
    body:      'Override any color, radius, or spacing via CSS custom properties. Dark mode works out of the box — one class on the root element.',
    href:      '/docs/theming',
    cta:       'Theming guide',
  },
] as const;

/* ─── Page ───────────────────────────────────────────────────────────────── */

export default function IntroductionPage() {
  const [activeLayer, setActiveLayer] = useState<string>('install');

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 40px 80px' }}>
      <style>{CSS}</style>

      {/* ── Breadcrumb ── */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontSize: 11, color: 'var(--color-text-disabled)', marginBottom: 32,
      }}>
        <span>Docs</span>
        <i className="ti ti-chevron-right" style={{ fontSize: 10 }} aria-hidden="true" />
        <span style={{ color: 'var(--color-text-primary)' }}>Introduction</span>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — dark card, bottom-anchored content  (zerodrift pattern)
      ═══════════════════════════════════════════════════════════════════ */}
      <div style={{
        background: '#1c1c1e',
        borderRadius: 16,
        padding: '32px',
        minHeight: 460,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        marginBottom: 8,
      }}>

        {/* Subtle radial glow — depth in the dark card */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: -120,
          right: -80,
          width: 480,
          height: 480,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* ── Top row: badge + floating component preview ── */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative', zIndex: 1 }}>

          {/* Version pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.72)',
            background: 'rgba(255,255,255,0.07)',
            border: '0.5px solid rgba(255,255,255,0.1)',
            borderRadius: 9999, padding: '4px 12px',
          }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
            v0.1.6 — Stable release
          </div>

          {/* Floating component mini-cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, auto)', gap: 6 }}>
            {[
              { label: 'Filled',   filled: true  },
              { label: 'Tonal',    filled: false  },
              { label: 'Outlined', filled: false  },
              { label: 'Ghost',    filled: false  },
            ].map(({ label, filled }) => (
              <div key={label} style={{
                padding: '5px 13px',
                borderRadius: 7,
                border: '0.5px solid rgba(255,255,255,0.12)',
                background: filled ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.06)',
                fontSize: 11,
                color: filled ? '#1c1c1e' : 'rgba(255,255,255,0.55)',
                fontWeight: 500,
                letterSpacing: '-0.01em',
              }}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom: headline + description + CTAs ── */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 500,
            color: '#ffffff',
            letterSpacing: '-0.04em',
            lineHeight: 1.08,
            marginBottom: 18,
          }}>
            Build interfaces<br />faster.
          </h1>

          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: 420,
            marginBottom: 28,
            fontWeight: 400,
          }}>
            27 production-ready React components built on Tailwind v4,
            TypeScript and CVA. Accessible, typed and ready to ship.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/docs/installation" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 38, padding: '0 20px', borderRadius: 9999,
              background: '#ffffff', color: '#1c1c1e',
              fontSize: 13, fontWeight: 500, textDecoration: 'none',
              letterSpacing: '-0.01em',
            }}>
              Get started
              <i className="ti ti-arrow-right" style={{ fontSize: 13 }} aria-hidden="true" />
            </Link>

            <Link href="/components/button" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 38, padding: '0 20px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.07)',
              color: 'rgba(255,255,255,0.6)',
              fontSize: 13, fontWeight: 400, textDecoration: 'none',
              border: '0.5px solid rgba(255,255,255,0.12)',
              letterSpacing: '-0.01em',
            }}>
              View components
            </Link>

            {/* Install snippet */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              height: 38, padding: '0 16px', borderRadius: 9999,
              background: 'rgba(255,255,255,0.05)',
              border: '0.5px solid rgba(255,255,255,0.08)',
              fontSize: 12, fontFamily: 'var(--font-mono)',
              color: 'rgba(255,255,255,0.72)',
            }}>
              <span style={{ color: 'rgba(255,255,255,0.72)' }}>$</span>
              npm install omverse-ui
              <i className="ti ti-copy" style={{ fontSize: 12, color: 'rgba(255,255,255,0.2)' }} aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          STATS ROW
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="intro-stats" style={{ marginBottom: 8 }}>
        {[
          { value: '27',   label: 'Components', icon: 'ti-components'  },
          { value: '150+', label: 'Variants',   icon: 'ti-layout-grid' },
          { value: 'v4',   label: 'Tailwind',   icon: 'ti-palette'     },
          { value: 'MIT',  label: 'License',    icon: 'ti-license'     },
        ].map((stat) => (
          <div key={stat.label} style={{
            padding: '20px',
            border: '0.5px solid var(--color-outline-variant)',
            borderRadius: 12,
            background: 'var(--color-background)',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            <i className={`ti ${stat.icon}`} style={{ fontSize: 15, color: 'var(--color-text-disabled)' }} aria-hidden="true" />
            <p style={{
              fontSize: 28, fontWeight: 500,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.04em', lineHeight: 1,
            }}>
              {stat.value}
            </p>
            <p style={{ fontSize: 11, color: 'var(--color-text-disabled)', letterSpacing: '0.02em' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          THREE-LAYER TABS  (zerodrift pattern)
          border-top active indicator, #7d7d7d inactive text, two-column
          content panel with text left + visual right
      ═══════════════════════════════════════════════════════════════════ */}
      <div style={{ marginBottom: 8 }}>

        {/* Tab header row */}
        <div style={{ display: 'flex' }}>
          {LAYERS.map((layer) => {
            const active = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                type="button"
                onClick={() => setActiveLayer(layer.id)}
                style={{
                  flex: 1,
                  textAlign: 'left',
                  padding: '18px 24px 18px 0',
                  background: 'transparent',
                  border: 'none',
                  borderTop: `2px solid ${active ? 'var(--color-text-primary)' : 'var(--color-outline-variant)'}`,
                  cursor: 'pointer',
                  transition: 'border-color 200ms ease',
                }}
              >
                <p style={{
                  fontSize: 18,
                  fontWeight: 400,
                  letterSpacing: '-0.025em',
                  color: active ? 'var(--color-text-primary)' : 'var(--color-text-disabled)',
                  marginBottom: 4,
                  transition: 'color 200ms ease',
                }}>
                  {layer.label}
                </p>
                <p style={{
                  fontSize: 12,
                  color: active ? 'var(--color-text-secondary)' : 'var(--color-text-disabled)',
                  transition: 'color 200ms ease',
                }}>
                  {layer.sub}
                </p>
              </button>
            );
          })}
        </div>

        {/* Tab content */}
        {LAYERS.map((layer) => {
          if (activeLayer !== layer.id) return null;
          return (
            <div key={layer.id} className="intro-layers-grid">

              {/* Left: text + CTA link */}
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
                <h2 style={{
                  fontSize: 22, fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  letterSpacing: '-0.03em', lineHeight: 1.25,
                }}>
                  {layer.heading}
                </h2>
                <p style={{
                  fontSize: 14, color: 'var(--color-text-secondary)',
                  lineHeight: 1.75,
                }}>
                  {layer.body}
                </p>
                <Link href={layer.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 13, color: 'var(--color-text-primary)',
                  textDecoration: 'none', fontWeight: 500,
                }}>
                  {layer.cta}
                  <i className="ti ti-arrow-right" style={{ fontSize: 12 }} aria-hidden="true" />
                </Link>
              </div>

              {/* Right: visual panel */}
              <div style={{
                border: '0.5px solid var(--color-outline-variant)',
                borderRadius: 12,
                overflow: 'hidden',
                background: 'var(--color-surface)',
              }}>
                {layer.id === 'install' && (
                  <CodeBlock
                    filename="terminal"
                    code={`npm install omverse-ui\n\n# or with pnpm / yarn\npnpm add omverse-ui\nyarn add omverse-ui`}
                  />
                )}

                {layer.id === 'compose' && (
                  <>
                    {/* Browser chrome */}
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 8,
                      padding: '10px 14px',
                      borderBottom: '0.5px solid var(--color-outline-variant)',
                      background: 'var(--color-surface-variant)',
                    }}>
                      <div style={{ display: 'flex', gap: 5 }}>
                        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FF5F57' }} />
                        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#FFBD2E' }} />
                        <div style={{ width: 9, height: 9, borderRadius: '50%', background: '#28CA41' }} />
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--color-text-disabled)', fontFamily: 'var(--font-mono)' }}>
                        Live preview
                      </span>
                      <span style={{ marginLeft: 'auto', fontSize: 10, color: '#10B981', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                        Interactive
                      </span>
                    </div>
                    <div style={{ padding: '24px', display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center' }}>
                      <Button variant="filled"  size="sm">Filled</Button>
                      <Button variant="outlined" size="sm">Outlined</Button>
                      <Button variant="tonal"   size="sm">Tonal</Button>
                      <Badge color="success">Success</Badge>
                      <Badge color="primary">Primary</Badge>
                      <Badge color="warning">Warning</Badge>
                      <Spinner variant="circular" size="sm" />
                      <Switch defaultChecked />
                    </div>
                  </>
                )}

                {layer.id === 'theme' && (
                  <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {[
                      { token: '--color-primary',          swatch: 'var(--color-primary)'         },
                      { token: '--color-success',          swatch: 'var(--color-success)'         },
                      { token: '--color-warning',          swatch: 'var(--color-warning)'         },
                      { token: '--color-error',            swatch: 'var(--color-error)'           },
                      { token: '--color-surface',          swatch: 'var(--color-surface)'         },
                      { token: '--color-outline-variant',  swatch: 'var(--color-outline-variant)' },
                    ].map(({ token, swatch }) => (
                      <div key={token} style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '8px 0',
                        borderBottom: '0.5px solid var(--color-outline-variant)',
                      }}>
                        <div style={{
                          width: 24, height: 24, borderRadius: 5,
                          background: swatch,
                          border: '0.5px solid var(--color-outline-variant)',
                          flexShrink: 0,
                        }} />
                        <span style={{
                          fontSize: 11, fontFamily: 'var(--font-mono)',
                          color: 'var(--color-text-secondary)',
                        }}>
                          {token}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          FEATURE GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <div className="intro-features" style={{ marginBottom: 8 }}>
        {[
          { icon: 'ti-brand-typescript', title: 'TypeScript first',  desc: 'Fully typed with complete IntelliSense support.'             },
          { icon: 'ti-moon',             title: 'Dark mode ready',   desc: 'Every component adapts automatically via CSS variables.'     },
          { icon: 'ti-package',          title: 'Tree-shakeable',    desc: 'Zero unused CSS or JS — import only what you use.'           },
          { icon: 'ti-accessible',       title: 'Accessible',        desc: 'WAI-ARIA compliant with keyboard navigation support.'        },
          { icon: 'ti-brush',            title: 'Customizable',      desc: 'Override any design token to match your brand.'             },
          { icon: 'ti-bolt',             title: 'Fast by default',   desc: 'Built on Tailwind v4 — no runtime style generation.'        },
        ].map((f) => (
          <div key={f.title} style={{
            padding: '20px',
            border: '0.5px solid var(--color-outline-variant)',
            borderRadius: 12,
            background: 'var(--color-background)',
          }}>
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-surface)',
              border: '0.5px solid var(--color-outline-variant)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 12,
            }}>
              <i className={`ti ${f.icon}`} style={{ fontSize: 15, color: 'var(--color-text-primary)' }} aria-hidden="true" />
            </div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 5 }}>{f.title}</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', lineHeight: 1.65 }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          QUICK START
      ═══════════════════════════════════════════════════════════════════ */}
      <div style={{
        border: '0.5px solid var(--color-outline-variant)',
        borderRadius: 16, overflow: 'hidden', marginBottom: 8,
      }}>
        <div style={{
          padding: '14px 20px',
          borderBottom: '0.5px solid var(--color-outline-variant)',
          background: 'var(--color-surface)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 2 }}>Quick start</p>
            <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Install and use components in minutes.</p>
          </div>
          <Link href="/docs/installation" style={{
            display: 'inline-flex', alignItems: 'center', gap: 4,
            fontSize: 12, color: 'var(--color-text-secondary)',
            textDecoration: 'none',
            border: '0.5px solid var(--color-outline-variant)',
            borderRadius: 6, padding: '5px 10px',
            background: 'var(--color-background)',
          }}>
            Full guide
            <i className="ti ti-arrow-right" style={{ fontSize: 11 }} aria-hidden="true" />
          </Link>
        </div>
        <CodeBlock
          filename="App.tsx"
          code={`import { Button, Badge, Input } from 'omverse-ui'\n\nexport default function App() {\n  return (\n    <div>\n      <Button variant="filled">Get started</Button>\n      <Badge color="success">v0.1.6</Badge>\n      <Input label="Email" placeholder="you@example.com" />\n    </div>\n  )\n}`}
        />
      </div>

      {/* ═══════════════════════════════════════════════════════════════════
          CONTINUE READING
      ═══════════════════════════════════════════════════════════════════ */}
      <div style={{
        border: '0.5px solid var(--color-outline-variant)',
        borderRadius: 16, overflow: 'hidden',
      }}>
        <div style={{
          padding: '14px 20px',
          borderBottom: '0.5px solid var(--color-outline-variant)',
          background: 'var(--color-surface)',
        }}>
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)' }}>Continue reading</p>
        </div>
        {[
          { icon: 'ti-download',     title: 'Installation',   desc: 'Full setup guide for Vite and Next.js projects.',        href: '/docs/installation'  },
          { icon: 'ti-palette',      title: 'Theming',        desc: 'Customize colors and tokens to match your brand.',       href: '/docs/theming'       },
          { icon: 'ti-color-swatch', title: 'Design tokens',  desc: 'Complete reference of all CSS custom properties.',       href: '/docs/design-tokens' },
          { icon: 'ti-layout-grid',  title: 'Components',     desc: 'Browse all 27 components with live previews and code.',  href: '/components/button'  },
        ].map((item, i, arr) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex', alignItems: 'center', gap: 16,
              padding: '16px 20px',
              borderBottom: i < arr.length - 1 ? '0.5px solid var(--color-outline-variant)' : 'none',
              textDecoration: 'none',
              background: 'var(--color-background)',
              transition: 'background 120ms ease',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-surface)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = 'var(--color-background)';
            }}
          >
            <div style={{
              width: 32, height: 32, borderRadius: 8,
              background: 'var(--color-surface)',
              border: '0.5px solid var(--color-outline-variant)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <i className={`ti ${item.icon}`} style={{ fontSize: 15, color: 'var(--color-text-primary)' }} aria-hidden="true" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--color-text-primary)', marginBottom: 2 }}>{item.title}</p>
              <p style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>{item.desc}</p>
            </div>
            <i className="ti ti-arrow-right" style={{ fontSize: 13, color: 'var(--color-text-disabled)', flexShrink: 0 }} aria-hidden="true" />
          </Link>
        ))}
      </div>

    </div>
  );
}
