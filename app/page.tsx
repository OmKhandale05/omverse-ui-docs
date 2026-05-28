'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Button, Badge, Switch, Slider, Input, Avatar, Progress } from 'omverse-ui';

/* ─────────────────────────────────────────────────────────────────────────
   HERO BACKDROP
   36-cell grid of real components; each cell breathes via CSS keyframes.
   Radial-gradient mask fades the grid at all edges.
───────────────────────────────────────────────────────────────────────── */

function BackdropCell({ index }: { index: number }) {
  const cells = [
    <Button key="b1" size="sm" variant="filled">Save</Button>,
    <Button key="b2" size="sm" variant="outlined">Cancel</Button>,
    <Badge key="bd1" color="success">Active</Badge>,
    <Badge key="bd2" color="primary">Beta</Badge>,
    <Switch key="sw1" defaultChecked />,
    <Switch key="sw2" />,
    <div key="sl" style={{ width: 80 }}><Slider defaultValue={40} /></div>,
    <div key="in" style={{ width: 112 }}><Input placeholder="Search…" /></div>,
    <Avatar key="av" name="Om K" size="sm" />,
    <div key="pr" style={{ width: 80 }}><Progress value={62} /></div>,
  ];
  return <>{cells[index % cells.length]}</>;
}

function HeroBackdrop() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        userSelect: 'none',
        maskImage:
          'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 75%)',
      }}
      aria-hidden
    >
      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: translateY(0px);  }
          50%       { opacity: 1;   transform: translateY(-4px); }
        }
      `}</style>
      <div
        className="hero-backdrop-grid"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: 24,
          padding: 40,
          opacity: 0.35,
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              animation: `breathe ${6 + (i % 5)}s ease-in-out ${(i % 7) * 0.4}s infinite`,
            }}
          >
            <BackdropCell index={i} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────── */

function Hero() {
  return (
    <section style={{ position: 'relative', overflow: 'hidden' }}>
      <HeroBackdrop />
      <div
        style={{
          position: 'relative',
          maxWidth: 1152,
          margin: '0 auto',
          padding: '128px 24px 96px',
          textAlign: 'center',
        }}
      >
        {/* Version badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 9999,
            border: '0.5px solid var(--color-outline-variant)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
            fontSize: 12,
            marginBottom: 32,
          }}
        >
          <span style={{ color: '#10B981' }}>●</span>
          v0.1.4 on npm
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(40px, 6vw, 72px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          The universe of<br />customizable interfaces.
        </h1>

        {/* Subhead */}
        <p
          style={{
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            maxWidth: 540,
            margin: '0 auto 36px',
            fontWeight: 400,
          }}
        >
          27 React components. One CSS variable system. Built for Next.js, themed
          with tokens, shipped as a single npm install.
        </p>

        {/* CTAs */}
        <div
          className="hero-ctas"
          style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            marginBottom: 40,
          }}
        >
          <Link href="/docs/installation">
            <Button variant="filled" size="md">Get started</Button>
          </Link>
          <Link href="/components/button">
            <Button variant="outlined" size="md">Browse components</Button>
          </Link>
        </div>

        {/* Meta strip */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 24,
            flexWrap: 'wrap',
            fontSize: 12,
            color: 'var(--color-text-disabled)',
          }}
        >
          {[
            { icon: 'ti-brand-npm',    label: 'npm'           },
            { icon: 'ti-brand-github', label: 'GitHub'        },
            { icon: 'ti-license',      label: 'MIT'           },
            { icon: 'ti-package',      label: '27 components' },
          ].map(({ icon, label }) => (
            <span
              key={label}
              style={{ display: 'flex', alignItems: 'center', gap: 6 }}
            >
              <i className={`ti ${icon}`} aria-hidden="true" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   LAYER SECTION — sticky tabs + scroll-spy via IntersectionObserver
───────────────────────────────────────────────────────────────────────── */

type LayerDef = {
  id: string;
  label: string;
  tagline: string;
  title: string;
  body: string;
  href: string;
  gradient: string;
  preview: React.ReactNode;
  reverse?: boolean;
};

/* Mac-style window card — white card with traffic lights */
function MacWindow({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        background: '#FFFFFF',
        borderRadius: 16,
        padding: '24px 28px 32px',
        width: '100%',
        maxWidth: 480,
        boxShadow: '0 24px 80px rgba(0,0,0,0.16)',
      }}
    >
      {/* Traffic lights */}
      <div style={{ display: 'flex', gap: 7, marginBottom: 24 }}>
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FF5F57' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#FEBC2E' }} />
        <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28C840' }} />
      </div>
      {children}
    </div>
  );
}

const LAYERS: LayerDef[] = [
  {
    id: 'build',
    label: 'Build',
    tagline: 'Drop in 27 components',
    title: 'Compose interfaces in minutes.',
    body: 'A complete component set — buttons, inputs, overlays, feedback, data display. Typed, tree-shakeable, server-component friendly. Install once and start shipping.',
    href: '/components/button',
    gradient: 'linear-gradient(135deg, #F7F2E8 0%, #F2DFE0 50%, #EDD0D8 100%)',
    preview: (
      <MacWindow>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Button variant="filled" size="sm">Filled</Button>
            <Button variant="outlined" size="sm">Outlined</Button>
            <Button variant="ghost" size="sm">Ghost</Button>
          </div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <Badge color="success">Active</Badge>
            <Badge color="warning">Pending</Badge>
            <Badge color="primary">Beta</Badge>
          </div>
          <Input placeholder="email@omverse.in" />
        </div>
      </MacWindow>
    ),
  },
  {
    id: 'theme',
    label: 'Theme',
    tagline: 'CSS variables, end to end',
    reverse: true,
    title: 'One token system. Light and dark.',
    body: 'Every color, radius, and spacing is a CSS variable. Override one token and the entire library reflows. Dark mode works out of the box — no extra props, no JS toggles inside components.',
    href: '/docs/theming',
    gradient: 'linear-gradient(135deg, #EEF0FB 0%, #DFE4F7 50%, #D4DCFF 100%)',
    preview: (
      <MacWindow>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
          {[
            { token: 'background', swatch: '#FFFFFF' },
            { token: 'surface',    swatch: '#F5F5F5' },
            { token: 'primary',    swatch: '#111111' },
            { token: 'secondary',  swatch: '#555555' },
            { token: 'success',    swatch: '#10B981' },
            { token: 'warning',    swatch: '#F59E0B' },
            { token: 'error',      swatch: '#EF4444' },
            { token: 'outline',    swatch: '#E5E5E5' },
          ].map(({ token, swatch }) => (
            <div
              key={token}
              style={{
                borderRadius: 8,
                padding: 8,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
                border: '0.5px solid #E5E5E5',
                background: '#FAFAFA',
              }}
            >
              <div
                style={{
                  height: 20,
                  borderRadius: 4,
                  background: swatch,
                  border: '0.5px solid #E5E5E5',
                }}
              />
              <span style={{ fontSize: 8, color: '#999', lineHeight: 1.3 }}>{token}</span>
            </div>
          ))}
        </div>
      </MacWindow>
    ),
  },
  {
    id: 'ship',
    label: 'Ship',
    tagline: 'One install away',
    title: 'Production-ready, day one.',
    body: 'Built for Next.js App Router. Zero runtime CSS-in-JS. Works with Tailwind v4. SSR-safe. Tree-shakeable. Ship the component, not the framework.',
    href: '/docs/installation',
    gradient: 'linear-gradient(135deg, #EDFBF3 0%, #D8F4E7 50%, #C4EDD9 100%)',
    preview: (
      <MacWindow>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            lineHeight: 2,
            color: '#111',
          }}
        >
          <div style={{ color: '#999' }}>$ npm install omverse-ui</div>
          <div style={{ color: '#10B981', marginTop: 4 }}>✓ added 1 package in 2.1s</div>
          <div style={{ borderTop: '0.5px solid #E5E5E5', marginTop: 16, paddingTop: 16 }}>
            <div style={{ color: '#999' }}>{'// app/page.tsx'}</div>
            <div>
              {'import { '}
              <span style={{ color: '#7C3AED' }}>Button</span>
              {' } from '}
              <span style={{ color: '#059669' }}>&quot;omverse-ui&quot;</span>
              {';'}
            </div>
            <div style={{ marginTop: 8 }}>
              {'<'}
              <span style={{ color: '#7C3AED' }}>Button</span>
              {' variant='}
              <span style={{ color: '#059669' }}>&quot;filled&quot;</span>
              {'>'}
            </div>
            <div style={{ paddingLeft: 16 }}>Ship it</div>
            <div>
              {'</'}
              <span style={{ color: '#7C3AED' }}>Button</span>
              {'>'}
            </div>
          </div>
        </div>
      </MacWindow>
    ),
  },
];

function LayerSection() {
  const [active, setActive] = useState('build');
  const sectionRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const tabBarRef = useRef<HTMLDivElement>(null);

  /* Scroll-spy — fires when section top crosses the sticky-header threshold */
  useEffect(() => {
    const getOffset = () =>
      64 + (tabBarRef.current?.offsetHeight ?? 72); // navbar + tab bar

    const observers: IntersectionObserver[] = [];
    sectionRefs.current.forEach((el, id) => {
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        /* keep element "active" from when its top enters the post-header zone
           down until 55% from the bottom — gives a wide activation band */
        { rootMargin: `-${getOffset()}px 0px -55% 0px` },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  function scrollToLayer(id: string) {
    const el = sectionRefs.current.get(id);
    if (!el) return;
    const navbarH  = 64;
    const tabBarH  = tabBarRef.current?.offsetHeight ?? 72;
    const offset   = navbarH + tabBarH + 1; // land exactly below the sticky bar
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <section style={{ maxWidth: 1152, margin: '0 auto', padding: '96px 24px 0' }}>

      {/* Section title */}
      <h2
        style={{
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.03em',
          marginBottom: 48,
        }}
      >
        Three layers. One package.
      </h2>

      {/* Sticky tab bar — 3 equal columns */}
      <div
        ref={tabBarRef}
        style={{
          position: 'sticky',
          top: 64,
          zIndex: 20,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'color-mix(in srgb, var(--color-background) 90%, transparent)',
        }}
      >
        {LAYERS.map((l) => (
          <button
            key={l.id}
            onClick={() => scrollToLayer(l.id)}
            className="layer-tab-button"
            style={{
              padding: '20px 24px',
              textAlign: 'left',
              background: 'transparent',
              border: 'none',
              /* Each column shows the line; active = thick dark, inactive = thin gray */
              borderTop: active === l.id
                ? '1.5px solid var(--color-text-primary)'
                : '0.5px solid var(--color-outline-variant)',
              cursor: 'pointer',
              transition: 'border-color 200ms',
            }}
          >
            <div
              className="layer-tab-label"
              style={{
                fontSize: 15,
                fontWeight: active === l.id ? 500 : 400,
                color: active === l.id
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
                marginBottom: 4,
                transition: 'color 200ms, font-weight 200ms',
              }}
            >
              {l.label}
            </div>
            <div
              className="layer-tab-tagline"
              style={{
                fontSize: 13,
                color: 'var(--color-text-disabled)',
                fontWeight: 400,
              }}
            >
              {l.tagline}
            </div>
          </button>
        ))}
      </div>

      {/* Stacked content sections — tall rows, alternating layout, text pinned to bottom */}
      {LAYERS.map((l) => {
        const textCol = (
          <div
            className="layer-text-col"
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '64px 48px',
            }}
          >
            <h3
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
                letterSpacing: '-0.03em',
                lineHeight: 1.15,
                marginBottom: 20,
              }}
            >
              {l.title}
            </h3>
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.75,
                color: 'var(--color-text-secondary)',
                marginBottom: 36,
                fontWeight: 400,
                maxWidth: 380,
              }}
            >
              {l.body}
            </p>
            <Link href={l.href} style={{ textDecoration: 'none' }}>
              <Button variant="filled" size="sm">Learn more</Button>
            </Link>
          </div>
        );

        const gradientCol = (
          <div
            className="layer-gradient-col"
            style={{
              background: l.gradient,
              borderRadius: 20,
              margin: '20px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '60px 44px',
            }}
          >
            {l.preview}
          </div>
        );

        return (
          <div
            key={l.id}
            ref={(el) => { if (el) sectionRefs.current.set(l.id, el); }}
            className="layer-row"
            style={{
              display: 'grid',
              gridTemplateColumns: l.reverse ? '55% 45%' : '45% 55%',
              minHeight: '80vh',
              alignItems: 'stretch',
              borderTop: '0.5px solid var(--color-outline-variant)',
            }}
          >
            {l.reverse
              ? <>{gradientCol}{textCol}</>
              : <>{textCol}{gradientCol}</>
            }
          </div>
        );
      })}
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   SHOWCASE SECTION — Developer-experience cards
───────────────────────────────────────────────────────────────────────── */

/* Shared card shell */
function FeatureCard({
  gradient,
  preview,
  eyebrow,
  title,
  body,
}: {
  gradient: string;
  preview: React.ReactNode;
  eyebrow: string;
  title: string;
  body: string;
}) {
  return (
    <div
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        border: '0.5px solid var(--color-outline-variant)',
        background: 'var(--color-surface)',
      }}
    >
      {/* Gradient preview area */}
      <div
        className="showcase-preview-area"
        style={{
          background: gradient,
          padding: '48px 32px',
          minHeight: 380,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {preview}
      </div>

      {/* Text block */}
      <div style={{ padding: '28px 28px 32px' }}>
        <p
          style={{
            fontSize: 10,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-disabled)',
            fontWeight: 500,
            marginBottom: 8,
          }}
        >
          {eyebrow}
        </p>
        <h3
          style={{
            fontSize: 17,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
            marginBottom: 10,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            fontWeight: 400,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <section style={{ maxWidth: 1152, margin: '0 auto', padding: '96px 24px' }}>

      {/* Heading */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-text-disabled)',
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          Developer Experience
        </p>
        <h2
          style={{
            fontSize: 'clamp(30px, 4vw, 48px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
          }}
        >
          Built for the way you actually work.
        </h2>
      </div>

      {/* 3-column grid */}
      <div className="showcase-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>

        {/* ── Card 1 · TypeScript-first ── */}
        <FeatureCard
          gradient="linear-gradient(145deg, #F0F4FF 0%, #DDE5FB 55%, #C8D5F7 100%)"
          eyebrow="TypeScript-first"
          title="Autocomplete everything."
          body="Every prop, every variant, every size — fully typed. Catch mistakes at compile time, not after deploy. No more guessing variant names."
          preview={
            /* Illustration: VS Code IDE — hex colors are intentional, representing VS Code UI */
            <div
              style={{
                width: '100%',
                maxWidth: 320,
                background: '#1E1E1E',
                borderRadius: 12,
                padding: '20px 22px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
              }}
            >
              <style>{`
                @keyframes caret-blink {
                  50% { opacity: 0; }
                }
              `}</style>
              {/* Traffic lights — part of the VS Code illustration */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FF5F57' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#FEBC2E' }} />
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28C840' }} />
              </div>
              {/* JSX line being typed */}
              <div style={{ lineHeight: 1.9, marginBottom: 6 }}>
                <span style={{ color: '#808080' }}>{'<'}</span>
                <span style={{ color: '#4FC1FF' }}>Button</span>
                <span style={{ color: '#D4D4D4' }}> </span>
                <span style={{ color: '#9CDCFE' }}>variant</span>
                <span style={{ color: '#D4D4D4' }}>=</span>
                <span style={{ color: '#CE9178' }}>&quot;fi</span>
                {/* blinking caret */}
                <span
                  style={{
                    display: 'inline-block',
                    width: 1.5,
                    height: '1em',
                    background: '#AEAFAD',
                    verticalAlign: 'text-bottom',
                    animation: 'caret-blink 1s steps(2) infinite',
                  }}
                />
              </div>
              {/* Autocomplete popup — aligned under the cursor */}
              <div
                style={{
                  background: '#252526',
                  border: '0.5px solid #454545',
                  borderRadius: 4,
                  overflow: 'hidden',
                  marginLeft: 72,
                }}
              >
                {([
                  { label: 'filled',   highlighted: true  },
                  { label: 'outlined', highlighted: false },
                  { label: 'ghost',    highlighted: false },
                ] as const).map(({ label, highlighted }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '5px 10px',
                      background: highlighted ? '#094771' : 'transparent',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div
                        style={{
                          width: 14,
                          height: 14,
                          borderRadius: 3,
                          background: '#007ACC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <span style={{ color: '#FFF', fontSize: 8, fontWeight: 500 }}>a</span>
                      </div>
                      <span style={{ color: '#D4D4D4', fontSize: 12 }}>{label}</span>
                    </div>
                    <span style={{ color: '#888', fontSize: 10 }}>string</span>
                  </div>
                ))}
              </div>
            </div>
          }
        />

        {/* ── Card 2 · Accessible by default ── */}
        <FeatureCard
          gradient="linear-gradient(145deg, #FFF5EA 0%, #FCE6CC 55%, #F8D4A8 100%)"
          eyebrow="Accessible by default"
          title="Keyboard, screen reader, focus — handled."
          body="WCAG-aware contrast. Visible focus rings. Proper ARIA on every interactive component. Tab through your app — everything just works."
          preview={
            /* Illustration: focused button UI — raw <button> used intentionally for fake focus state */
            <div
              style={{
                width: '100%',
                maxWidth: 300,
                background: '#FFFFFF',
                borderRadius: 12,
                padding: '28px 24px',
                boxShadow: '0 12px 40px rgba(0,0,0,0.1)',
              }}
            >
              {/* Tab hint */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 22 }}>
                <div
                  style={{
                    padding: '3px 8px',
                    background: '#F0F0F0',
                    borderRadius: 4,
                    border: '0.5px solid #DCDCDC',
                  }}
                >
                  <span style={{ fontSize: 11, color: '#555', fontFamily: 'var(--font-mono)' }}>Tab ↹</span>
                </div>
                <span
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#999',
                  }}
                >
                  focus moves through
                </span>
              </div>

              {/* Focused "Save changes" button */}
              <div style={{ position: 'relative', display: 'inline-flex', marginBottom: 14 }}>
                {/* Blue focus ring — illustration of WCAG visible focus */}
                <div
                  style={{
                    position: 'absolute',
                    inset: -4,
                    border: '2px solid #2563EB',
                    borderRadius: 10,
                    pointerEvents: 'none',
                  }}
                />
                <button
                  style={{
                    background: '#111',
                    color: '#FFF',
                    fontSize: 13,
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: 'none',
                    cursor: 'default',
                    outline: 'none',
                  }}
                >
                  Save changes
                </button>
              </div>

              {/* Unfocused siblings */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 22 }}>
                <button
                  style={{
                    background: 'transparent',
                    color: '#999',
                    fontSize: 13,
                    fontWeight: 400,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '0.5px solid #E5E5E5',
                    cursor: 'default',
                  }}
                >
                  Cancel
                </button>
                <button
                  style={{
                    background: 'transparent',
                    color: '#999',
                    fontSize: 13,
                    fontWeight: 400,
                    padding: '8px 16px',
                    borderRadius: 6,
                    border: '0.5px solid #E5E5E5',
                    cursor: 'default',
                  }}
                >
                  Reset
                </button>
              </div>

              {/* ARIA attribute hint — values in #10B981 per spec exception */}
              <div
                style={{
                  background: '#F5F5F5',
                  borderRadius: 6,
                  padding: '10px 12px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 10,
                  lineHeight: 1.9,
                }}
              >
                <div>
                  <span style={{ color: '#777' }}>aria-label=</span>
                  <span style={{ color: '#10B981' }}>&quot;Save changes&quot;</span>
                </div>
                <div>
                  <span style={{ color: '#777' }}>role=</span>
                  <span style={{ color: '#10B981' }}>&quot;button&quot;</span>
                </div>
              </div>
            </div>
          }
        />

        {/* ── Card 3 · Performance ── */}
        <FeatureCard
          gradient="linear-gradient(145deg, #EDFBF3 0%, #D8F4E7 55%, #C2EDD9 100%)"
          eyebrow="Performance you can measure"
          title="Small bundle. Zero runtime."
          body="Tree-shakes down to what you import. No CSS-in-JS runtime. No theme provider re-renders. Your bundle stays lean — your app stays fast."
          preview={
            <div style={{ width: '100%', maxWidth: 300, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {/* Big stat card — inner mockup, box-shadow intentional */}
              <div
                style={{
                  background: '#FFF',
                  borderRadius: 12,
                  padding: '20px 22px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
                }}
              >
                <p
                  style={{
                    fontSize: 10,
                    textTransform: 'uppercase',
                    letterSpacing: '0.07em',
                    color: '#999',
                    marginBottom: 10,
                  }}
                >
                  Gzipped bundle
                </p>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    marginBottom: 14,
                  }}
                >
                  <span
                    style={{
                      fontSize: 32,
                      fontWeight: 500,
                      color: '#111',
                      letterSpacing: '-0.03em',
                      lineHeight: 1,
                    }}
                  >
                    12 KB
                  </span>
                  <span style={{ fontSize: 11, color: '#10B981', fontWeight: 500 }}>↓ lean</span>
                </div>
                {/* Progress bar showing 18% of a typical 60+ KB baseline */}
                <div
                  style={{
                    height: 6,
                    borderRadius: 3,
                    background: '#F0F0F0',
                    overflow: 'hidden',
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{ width: '18%', height: '100%', borderRadius: 3, background: '#111' }}
                  />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: 10, color: '#999' }}>omverse-ui</span>
                  <span style={{ fontSize: 10, color: '#CCC' }}>vs 60+ KB typical</span>
                </div>
              </div>

              {/* Two small stat cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div
                  style={{
                    background: '#FFF',
                    borderRadius: 10,
                    padding: 16,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      color: '#999',
                      marginBottom: 8,
                    }}
                  >
                    Runtime CSS
                  </p>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 500,
                      color: '#111',
                      letterSpacing: '-0.03em',
                    }}
                  >
                    0 KB
                  </span>
                </div>
                <div
                  style={{
                    background: '#FFF',
                    borderRadius: 10,
                    padding: 16,
                    boxShadow: '0 8px 32px rgba(0,0,0,0.09)',
                  }}
                >
                  <p
                    style={{
                      fontSize: 10,
                      textTransform: 'uppercase',
                      letterSpacing: '0.07em',
                      color: '#999',
                      marginBottom: 8,
                    }}
                  >
                    SSR-safe
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <i className="ti ti-check" style={{ fontSize: 18, color: '#10B981' }} aria-hidden="true" />
                    <span
                      style={{
                        fontSize: 22,
                        fontWeight: 500,
                        color: '#111',
                        letterSpacing: '-0.03em',
                      }}
                    >
                      Yes
                    </span>
                  </div>
                </div>
              </div>
            </div>
          }
        />

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   INSTALL BLOCK
───────────────────────────────────────────────────────────────────────── */

function InstallBlock() {
  return (
    <section style={{ padding: '96px 24px', background: 'var(--color-background)' }}>

      {/* Card — grid background is scoped inside here, not full-bleed */}
      <div
        className="install-card"
        style={{
          position: 'relative',
          maxWidth: 1152,
          margin: '0 auto',
          minHeight: '60vh',
          borderRadius: 20,
          border: '0.5px solid var(--color-outline-variant)',
          overflow: 'hidden',
          display: 'grid',
          gridTemplateColumns: '42% 58%',
          alignItems: 'stretch',
        }}
      >
        {/* Grid pattern — contained inside the card */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `
              linear-gradient(color-mix(in srgb, var(--color-text-primary) 5%, transparent) 1px, transparent 1px),
              linear-gradient(90deg, color-mix(in srgb, var(--color-text-primary) 5%, transparent) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Left: text vertically centered ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '80px 56px 80px 56px',
          }}
        >
          <h2
            style={{
              fontSize: 'clamp(30px, 3.5vw, 46px)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Build with omverse-ui.
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'var(--color-text-secondary)',
              fontWeight: 400,
              marginBottom: 36,
              maxWidth: 360,
            }}
          >
            A complete component library for Next.js and Tailwind v4.
            Install once, import anywhere, theme with CSS variables.
            No config. No provider wrapping. Just ship.
          </p>
          <Link href="/docs/installation" style={{ textDecoration: 'none' }}>
            <Button variant="filled" size="md">Read the docs</Button>
          </Link>
        </div>

        {/* ── Right: light card wraps to content, centered vertically ── */}
        <div
          className="install-right"
          style={{
            position: 'relative',
            zIndex: 1,
            padding: '32px 32px 32px 0',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              background: 'var(--color-surface)',
              borderRadius: 16,
              border: '0.5px solid var(--color-outline-variant)',
              padding: '28px',
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >

            {/* ── Install code block ── */}
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--color-text-secondary)',
                  marginBottom: 12,
                }}
              >
                Install
              </p>
              <div
                style={{
                  background: '#161616',
                  borderRadius: 10,
                  padding: '20px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  lineHeight: 1.95,
                }}
              >
                <div style={{ color: '#555' }}>$ terminal</div>
                <div style={{ color: '#E8E8E8', marginBottom: 16 }}>
                  npm install omverse-ui
                </div>
                <div style={{ height: '0.5px', background: '#2A2A2A', marginBottom: 16 }} />
                <div style={{ color: '#555' }}>{'/* index.css */'}</div>
                <div>
                  <span style={{ color: '#A78BFA' }}>@import </span>
                  <span style={{ color: '#10B981' }}>&quot;tailwindcss&quot;</span>
                  <span style={{ color: '#E8E8E8' }}>;</span>
                </div>
                <div>
                  <span style={{ color: '#A78BFA' }}>@import </span>
                  <span style={{ color: '#10B981' }}>&quot;omverse-ui/styles&quot;</span>
                  <span style={{ color: '#E8E8E8' }}>;</span>
                </div>
              </div>
            </div>

            {/* ── Usage code block ── */}
            <div>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 400,
                  color: 'var(--color-text-secondary)',
                  marginBottom: 12,
                }}
              >
                Usage
              </p>
              <div
                style={{
                  background: '#161616',
                  borderRadius: 10,
                  padding: '20px 24px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 13,
                  lineHeight: 1.95,
                }}
              >
                <div style={{ color: '#555' }}>{'// any component file'}</div>
                <div>
                  <span style={{ color: '#E8E8E8' }}>{'import { '}</span>
                  <span style={{ color: '#4FC1FF' }}>Button</span>
                  <span style={{ color: '#E8E8E8' }}>{', '}</span>
                  <span style={{ color: '#4FC1FF' }}>Badge</span>
                  <span style={{ color: '#E8E8E8' }}>{' } from '}</span>
                  <span style={{ color: '#10B981' }}>&quot;omverse-ui&quot;</span>
                  <span style={{ color: '#E8E8E8' }}>;</span>
                </div>
                <div style={{ height: '0.5px', background: '#2A2A2A', margin: '12px 0' }} />
                <div style={{ color: '#555' }}>{'export default function Page() {'}</div>
                <div style={{ paddingLeft: 16 }}>
                  <span style={{ color: '#E8E8E8' }}>{'return ('}</span>
                </div>
                <div style={{ paddingLeft: 32 }}>
                  <span style={{ color: '#E8E8E8' }}>{'<'}</span>
                  <span style={{ color: '#4FC1FF' }}>Button</span>
                  <span style={{ color: '#9CDCFE' }}> variant</span>
                  <span style={{ color: '#E8E8E8' }}>=</span>
                  <span style={{ color: '#10B981' }}>&quot;filled&quot;</span>
                  <span style={{ color: '#E8E8E8' }}>{'>'}</span>
                </div>
                <div style={{ paddingLeft: 48, color: '#E8E8E8' }}>Ship it</div>
                <div style={{ paddingLeft: 32 }}>
                  <span style={{ color: '#E8E8E8' }}>{'</'}</span>
                  <span style={{ color: '#4FC1FF' }}>Button</span>
                  <span style={{ color: '#E8E8E8' }}>{'>'}</span>
                </div>
                <div style={{ paddingLeft: 16, color: '#E8E8E8' }}>{')'}</div>
                <div style={{ color: '#555' }}>{'}'}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CATEGORY GRID
───────────────────────────────────────────────────────────────────────── */

const CATEGORIES: Record<string, { icon: string; slug: string }[]> = {
  Inputs: [
    { icon: 'ti-hand-click',               slug: 'button'   },
    { icon: 'ti-forms',                    slug: 'input'    },
    { icon: 'ti-text-size',                slug: 'textarea' },
    { icon: 'ti-selector',                 slug: 'select'   },
    { icon: 'ti-toggle-left',              slug: 'switch'   },
    { icon: 'ti-adjustments-horizontal',   slug: 'slider'   },
    { icon: 'ti-checkbox',                 slug: 'checkbox' },
    { icon: 'ti-circle-dot',               slug: 'radio'    },
  ],
  Feedback: [
    { icon: 'ti-message',        slug: 'toast'    },
    { icon: 'ti-loader',         slug: 'spinner'  },
    { icon: 'ti-layout-rows',    slug: 'skeleton' },
    { icon: 'ti-progress',       slug: 'progress' },
    { icon: 'ti-alert-circle',   slug: 'alert'    },
  ],
  Overlays: [
    { icon: 'ti-layout-bottombar',   slug: 'dialog'   },
    { icon: 'ti-layout-sidebar',     slug: 'drawer'   },
    { icon: 'ti-message-circle',     slug: 'popover'  },
    { icon: 'ti-info-circle',        slug: 'tooltip'  },
    { icon: 'ti-chevrons-down',      slug: 'dropdown' },
  ],
  'Data Display': [
    { icon: 'ti-rectangle',         slug: 'card'      },
    { icon: 'ti-tag',               slug: 'badge'     },
    { icon: 'ti-user-circle',       slug: 'avatar'    },
    { icon: 'ti-layout-navbar',     slug: 'tabs'      },
    { icon: 'ti-layout-list',       slug: 'accordion' },
    { icon: 'ti-table',             slug: 'datatable' },
    { icon: 'ti-sparkles',          slug: 'icon'      },
  ],
};

type CategoryKey = keyof typeof CATEGORIES;

function CategoryGrid() {
  const [tab, setTab] = useState<CategoryKey>('Inputs');
  const categories = Object.keys(CATEGORIES) as CategoryKey[];

  return (
    <section style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px 96px' }}>

      {/* Heading */}
      <div style={{ marginBottom: 40 }}>
        <p
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            color: 'var(--color-text-disabled)',
            fontWeight: 500,
            marginBottom: 14,
          }}
        >
          The Catalog
        </p>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
          }}
        >
          Every component. Every category.
        </h2>
      </div>

      {/* Card wrapping tabs + grid */}
      <div
        style={{
          borderRadius: 20,
          border: '0.5px solid var(--color-outline-variant)',
          overflow: 'hidden',
          background: 'var(--color-surface)',
        }}
      >

        {/* Tab bar — 4 equal columns, same style as LayerSection */}
        <div
          className="category-tab-bar"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${categories.length}, 1fr)`,
            borderBottom: '0.5px solid var(--color-outline-variant)',
          }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setTab(c)}
              style={{
                padding: '20px 24px',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                borderTop: tab === c
                  ? '1.5px solid var(--color-text-primary)'
                  : '1.5px solid transparent',
                cursor: 'pointer',
                transition: 'border-color 200ms',
              }}
            >
              <div
                style={{
                  fontSize: 14,
                  fontWeight: tab === c ? 500 : 400,
                  color: tab === c
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                  marginBottom: 3,
                  transition: 'color 200ms',
                }}
              >
                {c}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'var(--color-text-disabled)',
                  fontWeight: 400,
                }}
              >
                {CATEGORIES[c].length} components
              </div>
            </button>
          ))}
        </div>

        {/* Component grid */}
        <div
          className="category-items-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 1,
            background: 'var(--color-outline-variant)', // gap colour via background trick
          }}
        >
          {CATEGORIES[tab].map(({ icon, slug }) => {
            const name = slug.charAt(0).toUpperCase() + slug.slice(1);
            return (
              <Link
                key={slug}
                href={`/components/${slug}`}
                style={{
                  background: 'var(--color-surface)',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '22px 24px',
                  transition: 'background 150ms',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    'var(--color-background)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    'var(--color-surface)';
                }}
              >
                <i
                  className={`ti ${icon}`}
                  style={{
                    fontSize: 18,
                    color: 'var(--color-text-secondary)',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
                <span
                  style={{
                    flex: 1,
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {name}
                </span>
                <i
                  className="ti ti-arrow-up-right"
                  style={{
                    fontSize: 13,
                    color: 'var(--color-text-disabled)',
                    flexShrink: 0,
                  }}
                  aria-hidden="true"
                />
              </Link>
            );
          })}
          {/* Pad the last row so empty cells don't expose the gap background */}
          {Array.from({
            length: (4 - (CATEGORIES[tab].length % 4)) % 4,
          }).map((_, i) => (
            <div key={`pad-${i}`} style={{ background: 'var(--color-surface)' }} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────────────────── */

function FinalCta() {
  const changelog = [
    { version: 'v0.1.4', label: 'Latest',  items: 'DataTable · Skeleton · Alert'          },
    { version: 'v0.1.3', label: null,       items: 'Chip · Divider · Badge variants'       },
    { version: 'v0.1.2', label: null,       items: 'Dark mode · Token system overhaul'     },
    { version: 'v0.1.1', label: null,       items: 'Dialog · Drawer · Tooltip · Popover'  },
  ];

  return (
    <section style={{ padding: '0 24px 96px', background: 'var(--color-background)' }}>

      {/* Gradient card — dark indigo/space gradient matching the omverse brand */}
      <div
        className="final-cta-card"
        style={{
          maxWidth: 1152,
          margin: '0 auto',
          borderRadius: 20,
          overflow: 'hidden',
          /* Illustration background — hex intentional, not docs UI chrome */
          background: 'linear-gradient(135deg, #0C0C1E 0%, #151245 35%, #1F1760 60%, #2C1B78 80%, #180E45 100%)',
          padding: '72px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 64,
          alignItems: 'center',
        }}
      >

        {/* ── Left: copy + install row + meta ── */}
        <div>
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.35)',
              fontWeight: 500,
              marginBottom: 20,
            }}
          >
            Free · Open Source · MIT License
          </p>

          <h2
            style={{
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 500,
              color: '#FFFFFF',
              letterSpacing: '-0.03em',
              lineHeight: 1.1,
              marginBottom: 20,
            }}
          >
            Start building with omverse-ui.
          </h2>

          <p
            style={{
              fontSize: 15,
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.55)',
              fontWeight: 400,
              marginBottom: 36,
              maxWidth: 400,
            }}
          >
            27 components. One install. Full CSS variable theming.
            Everything you need to ship a polished interface —
            available on npm right now.
          </p>

          {/* Install pill + CTA button */}
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 28, flexWrap: 'wrap' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 18px',
                borderRadius: 8,
                border: '0.5px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.07)',
                fontFamily: 'var(--font-mono)',
                fontSize: 13,
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              <i className="ti ti-terminal-2" style={{ fontSize: 14, color: 'rgba(255,255,255,0.35)' }} aria-hidden="true" />
              npm install omverse-ui
            </div>
            <Link href="/docs/installation" style={{ textDecoration: 'none' }}>
              <button
                style={{
                  padding: '10px 22px',
                  background: '#FFFFFF',
                  color: '#0C0C1E',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                }}
              >
                Get started
              </button>
            </Link>
          </div>

          {/* Meta strip */}
          <p
            style={{
              fontSize: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: 'rgba(255,255,255,0.25)',
              fontWeight: 500,
            }}
          >
            27 components · TypeScript · Next.js App Router · Tailwind v4
          </p>
        </div>

        {/* ── Right: white "What's included" card ── */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 16,
            padding: '36px 32px',
          }}
        >
          {/* Card header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <p
              style={{
                fontSize: 11,
                textTransform: 'uppercase',
                letterSpacing: '0.09em',
                color: '#999',
                fontWeight: 500,
              }}
            >
              Recently shipped
            </p>
            <span style={{ fontSize: 11, color: '#10B981', fontWeight: 500 }}>● Active</span>
          </div>

          {/* Changelog rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {changelog.map(({ version, label, items }, i) => (
              <div
                key={version}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '64px 1fr',
                  gap: 16,
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : '0.5px solid #F0F0F0',
                  alignItems: 'flex-start',
                }}
              >
                {/* Version + label */}
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: '#111', fontFamily: 'var(--font-mono)' }}>
                    {version}
                  </div>
                  {label && (
                    <div style={{ fontSize: 10, color: '#10B981', fontWeight: 500, marginTop: 2 }}>
                      {label}
                    </div>
                  )}
                </div>
                {/* Components shipped */}
                <div style={{ fontSize: 13, color: '#555', lineHeight: 1.5, fontWeight: 400 }}>
                  {items}
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: 20,
              paddingTop: 18,
              borderTop: '0.5px solid #E8E8E8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span style={{ fontSize: 12, color: '#999' }}>27 components shipped so far</span>
            <Link href="/docs/introduction" style={{ fontSize: 12, color: '#111', fontWeight: 500, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              See all
              <i className="ti ti-arrow-up-right" style={{ fontSize: 12 }} aria-hidden="true" />
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────── */

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  const base: React.CSSProperties = {
    display: 'block',
    fontSize: 14,
    color: 'var(--color-text-secondary)',
    textDecoration: 'none',
    fontWeight: 400,
    lineHeight: 1,
    transition: 'color 150ms',
  };
  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--color-text-primary)';
  };
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'var(--color-text-secondary)';
  };
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={base}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} style={base} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      {children}
    </Link>
  );
}

function Footer() {
  const columns: {
    heading: string;
    links: { label: string; href: string; external?: boolean }[];
  }[] = [
    {
      heading: 'Product',
      links: [
        { label: 'Components',   href: '/components/button'                                                       },
        { label: 'Examples',     href: '/examples'                                                                },
        { label: 'Docs',         href: '/docs/introduction'                                                       },
        { label: 'Storybook',    href: 'https://design-sys-components.vercel.app',           external: true       },
      ],
    },
    {
      heading: 'Resources',
      links: [
        { label: 'Installation',    href: '/docs/installation'                                                    },
        { label: 'Theming',         href: '/docs/theming'                                                         },
        { label: 'Design tokens',   href: '/docs/design-tokens'                                                   },
        { label: 'Dark mode',       href: '/docs/dark-mode'                                                       },
        { label: 'GitHub',          href: 'https://github.com/OmKhandale05/design-sys-components', external: true },
      ],
    },
    {
      heading: 'Examples',
      links: [
        { label: 'Dashboard', href: '/examples?id=dashboard' },
        { label: 'Mail',      href: '/examples?id=mail'      },
        { label: 'Cards',     href: '/examples?id=cards'     },
        { label: 'Forms',     href: '/examples?id=forms'     },
        { label: 'Music',     href: '/examples?id=music'     },
        { label: 'Settings',  href: '/examples?id=settings'  },
        { label: 'Sign-in',   href: '/examples?id=signin'    },
        { label: 'Pricing',   href: '/examples?id=pricing'   },
      ],
    },
    {
      heading: 'Community',
      links: [
        { label: 'npm',          href: 'https://npmjs.com/package/omverse-ui',                               external: true },
        { label: 'MIT License',  href: 'https://github.com/OmKhandale05/design-sys-components/blob/main/LICENSE', external: true },
      ],
    },
  ];


  return (
    <footer
      style={{
        borderTop: '0.5px solid var(--color-outline-variant)',
        background: 'var(--color-background)',
      }}
    >
      <div style={{ maxWidth: 1152, margin: '0 auto', padding: '72px 24px 0' }}>

        {/* ── Top 4-column section ── */}
        <div
          className="footer-top-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
            gap: 48,
            marginBottom: 56,
          }}
        >

          {/* Brand */}
          <div className="footer-brand-col">
            <div
              style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}
            >
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  background: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <i
                  className="ti ti-hexagon-filled"
                  style={{ fontSize: 14, color: 'var(--color-background)' }}
                  aria-hidden="true"
                />
              </div>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-text-primary)' }}>
                omverse-ui
              </span>
            </div>
            <p
              style={{
                fontSize: 14,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
                marginBottom: 14,
                maxWidth: 260,
                fontWeight: 400,
              }}
            >
              The universe of customizable interfaces.
            </p>
            <p style={{ fontSize: 13, color: 'var(--color-text-disabled)', fontWeight: 400 }}>
              Built by Om Khandale
            </p>
          </div>

          {/* Link columns */}
          {columns.map(({ heading, links }) => (
            <div key={heading}>
              <p
                style={{
                  fontSize: 11,
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  marginBottom: 20,
                }}
              >
                {heading}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {links.map(({ label, href, external }) => (
                  <FooterLink key={label} href={href} external={external}>
                    {label}
                  </FooterLink>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom strip ── */}
        <div
          className="footer-bottom-strip"
          style={{
            borderTop: '0.5px solid var(--color-outline-variant)',
            padding: '20px 0 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: 13, color: 'var(--color-text-disabled)', fontWeight: 400 }}>
            © 2026 omverse-ui · v0.1.4 · MIT
          </span>
        </div>

      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* ── Responsive overrides (inline styles can't do media queries) ── */}
      <style>{`
        /* HeroBackdrop — 3-col grid on mobile, 6 on desktop */
        @media (max-width: 767px) {
          .hero-backdrop-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          }
        }

        /* LayerSection tab bar — compact padding + hide taglines on mobile */
        @media (max-width: 767px) {
          .layer-tab-button  { padding: 12px 10px !important; }
          .layer-tab-label   { font-size: 13px !important; }
          .layer-tab-tagline { display: none !important; }
        }

        /* LayerSection rows — single column, text always first */
        @media (max-width: 767px) {
          .layer-row {
            grid-template-columns: 1fr !important;
            min-height: unset !important;
          }
          .layer-text-col {
            padding: 40px 24px !important;
            order: 1;
          }
          .layer-gradient-col {
            order: 2;
            margin: 0 16px 24px !important;
            padding: 40px 24px !important;
          }
        }

        /* ShowcaseSection — 1 column, shorter preview areas */
        @media (max-width: 767px) {
          .showcase-grid         { grid-template-columns: 1fr !important; }
          .showcase-preview-area { min-height: 260px !important; }
        }

        /* InstallBlock — single column */
        @media (max-width: 767px) {
          .install-card  { grid-template-columns: 1fr !important; min-height: unset !important; }
          .install-right { padding: 0 24px 32px !important; }
        }

        /* CategoryGrid tab bar — 2×2 on mobile; items — 2 columns */
        @media (max-width: 767px) {
          .category-tab-bar   { grid-template-columns: repeat(2, 1fr) !important; }
          .category-items-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }

        /* Footer — 2-col grid, brand full-width on top */
        @media (max-width: 767px) {
          .footer-top-grid  { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .footer-brand-col { grid-column: 1 / -1; }
          .footer-bottom-strip {
            flex-direction: column !important;
            gap: 8px !important;
            align-items: flex-start !important;
          }
        }

        /* FinalCta — single column, reduced padding on mobile */
        @media (max-width: 767px) {
          .final-cta-card {
            grid-template-columns: 1fr !important;
            padding: 36px 24px !important;
            gap: 32px !important;
          }
        }

        /* Hero — wrap CTAs neatly on very small screens */
        @media (max-width: 479px) {
          .hero-ctas { flex-direction: column; align-items: center; }
        }
      `}</style>
      <Navbar />
      <main style={{ background: 'var(--color-background)', flex: 1 }}>
        <Hero />
        <LayerSection />
        <ShowcaseSection />
        <InstallBlock />
        <CategoryGrid />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
