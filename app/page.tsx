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
            color: 'var(--color-text-tertiary)',
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
              style={{
                fontSize: 13,
                color: 'var(--color-text-tertiary)',
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
   SHOWCASE SECTION — three alternating rows
───────────────────────────────────────────────────────────────────────── */

function ShowcaseRow({
  index,
  eyebrow,
  title,
  body,
  preview,
  reverse,
}: {
  index: string;
  eyebrow: string;
  title: string;
  body: string;
  preview: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 64,
        alignItems: 'center',
        padding: '80px 0',
        borderTop: '0.5px solid var(--color-outline-variant)',
      }}
    >
      <div style={{ order: reverse ? 2 : 1 }}>
        <p
          style={{
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color: 'var(--color-text-tertiary)',
            marginBottom: 12,
            fontWeight: 500,
          }}
        >
          {index} — {eyebrow}
        </p>
        <h3
          style={{
            fontSize: 'clamp(22px, 3vw, 30px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.025em',
            marginBottom: 16,
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--color-text-secondary)',
            fontWeight: 400,
          }}
        >
          {body}
        </p>
      </div>

      <div
        style={{
          order: reverse ? 1 : 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 260,
          border: '0.5px solid var(--color-outline-variant)',
          borderRadius: 12,
          padding: 32,
          background: 'var(--color-surface)',
        }}
      >
        {preview}
      </div>
    </div>
  );
}

const ALL_COMPONENTS = [
  'Button', 'Input', 'Card', 'Badge', 'Switch',
  'Slider', 'Dialog', 'Toast', 'Avatar', 'Progress',
  'Tabs', 'Tooltip', 'Spinner', 'DatePicker',
  'Accordion', 'Breadcrumb', 'Pagination', 'Stepper',
  'Navbar', 'Select', 'Checkbox', 'Radio', 'Chip',
  'Divider', 'Icon', 'IconButton', 'Dropdown',
];

function ShowcaseSection() {
  return (
    <section style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px' }}>
      <ShowcaseRow
        index="01"
        eyebrow="27 components"
        title="Everything you need. Nothing you don't."
        body="From the basics — Button, Input, Card — to the harder ones — Dialog, Toast, DatePicker. All composable, all consistent, all from one package."
        preview={
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              justifyContent: 'center',
              maxWidth: 300,
            }}
          >
            {ALL_COMPONENTS.map((c) => (
              <Badge key={c} color="primary">{c}</Badge>
            ))}
          </div>
        }
      />

      <ShowcaseRow
        index="02"
        eyebrow="Dark mode native"
        title="One token swap. Whole library reflows."
        body="No theme provider gymnastics. Toggle a class, every component repaints. CSS variables do the heavy lifting — no JS, no flicker, no flash of wrong colors."
        reverse
        preview={
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 16,
              width: '100%',
              maxWidth: 320,
            }}
          >
            {/* Light mockup */}
            <div
              style={{
                borderRadius: 10,
                padding: 16,
                background: '#FFFFFF',
                border: '0.5px solid #E5E5E5',
              }}
            >
              <div style={{ fontSize: 11, color: '#666', marginBottom: 10 }}>Light</div>
              <div style={{ height: 6, borderRadius: 4, background: '#111', marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 4, background: '#999', marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 4, background: '#E5E5E5', width: '66%' }} />
            </div>
            {/* Dark mockup */}
            <div
              style={{
                borderRadius: 10,
                padding: 16,
                background: '#0A0A0A',
                border: '0.5px solid #222',
              }}
            >
              <div style={{ fontSize: 11, color: '#888', marginBottom: 10 }}>Dark</div>
              <div style={{ height: 6, borderRadius: 4, background: '#FAFAFA', marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 4, background: '#666', marginBottom: 6 }} />
              <div style={{ height: 6, borderRadius: 4, background: '#222', width: '66%' }} />
            </div>
          </div>
        }
      />

      <ShowcaseRow
        index="03"
        eyebrow="Tailwind v4 native"
        title="Plays nice with the rest of your stack."
        body="No CSS-in-JS runtime. No global resets fighting your design system. Drop omverse-ui into a Next.js app with Tailwind v4 and it just works."
        preview={
          <div
            style={{
              width: '100%',
              maxWidth: 320,
              borderRadius: 10,
              padding: 16,
              fontFamily: 'var(--font-mono)',
              fontSize: 12,
              lineHeight: 1.9,
              border: '0.5px solid var(--color-outline-variant)',
              background: 'var(--color-background)',
              color: 'var(--color-text-primary)',
            }}
          >
            <div style={{ color: 'var(--color-text-tertiary)' }}>{'// app/layout.tsx'}</div>
            <div>
              {'import { Toaster } from '}
              <span style={{ color: '#10B981' }}>&quot;omverse-ui&quot;</span>
              {';'}
            </div>
            <div style={{ marginTop: 12, color: 'var(--color-text-tertiary)' }}>{'// any page'}</div>
            <div>
              {'<'}
              <span style={{ color: '#10B981' }}>Button</span>
              {' variant='}
              <span style={{ color: '#10B981' }}>&quot;filled&quot;</span>
              {'>'}
            </div>
            <div>&nbsp;&nbsp;Ship it</div>
            <div>
              {'</'}
              <span style={{ color: '#10B981' }}>Button</span>
              {'>'}
            </div>
          </div>
        }
      />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   INSTALL BLOCK
───────────────────────────────────────────────────────────────────────── */

function InstallBlock() {
  return (
    <section
      style={{ maxWidth: 1152, margin: '0 auto', padding: '96px 24px' }}
    >
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>
          Get started
        </p>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
          }}
        >
          One install. One import. Ship.
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {/* Terminal card */}
        <div
          style={{
            borderRadius: 12,
            padding: 24,
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            lineHeight: 1.85,
            border: '0.5px solid var(--color-outline-variant)',
            background: 'var(--color-surface)',
          }}
        >
          <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 16 }}>$ install</div>
          <div style={{ color: 'var(--color-text-primary)', marginBottom: 24 }}>
            npm install omverse-ui
          </div>
          <div
            style={{
              borderTop: '0.5px solid var(--color-outline-variant)',
              paddingTop: 24,
            }}
          >
            <div style={{ color: 'var(--color-text-tertiary)', marginBottom: 8 }}>
              {'// your component'}
            </div>
            <div style={{ color: 'var(--color-text-primary)' }}>
              {'import { Button } from '}
              <span style={{ color: '#10B981' }}>&quot;omverse-ui&quot;</span>
              {';'}
            </div>
            <div style={{ marginTop: 8, color: 'var(--color-text-primary)' }}>
              <div>{'export default function Demo() {'}</div>
              <div>
                &nbsp;&nbsp;{'return <'}
                <span style={{ color: '#10B981' }}>Button</span>
                {' variant='}
                <span style={{ color: '#10B981' }}>&quot;filled&quot;</span>
                {'>'}
                Ship
                {'</'}
                <span style={{ color: '#10B981' }}>Button</span>
                {'>;'}
              </div>
              <div>{'}'}</div>
            </div>
          </div>
        </div>

        {/* Rendered output card */}
        <div
          style={{
            borderRadius: 12,
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 20,
            justifyContent: 'center',
            border: '0.5px solid var(--color-outline-variant)',
            background: 'var(--color-surface)',
          }}
        >
          <p
            style={{
              fontSize: 11,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-tertiary)',
              fontWeight: 500,
            }}
          >
            Rendered output
          </p>
          <Button variant="filled">Ship</Button>
          <p
            style={{
              fontSize: 13,
              color: 'var(--color-text-secondary)',
              lineHeight: 1.65,
              fontWeight: 400,
            }}
          >
            That's it. No config files. No provider wrappers (unless you want
            toasts). No theme runtime.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   CATEGORY GRID
───────────────────────────────────────────────────────────────────────── */

const CATEGORIES = {
  Inputs:        ['Button', 'Input', 'Textarea', 'Select', 'Switch', 'Slider', 'Checkbox', 'Radio'],
  Feedback:      ['Toast', 'Spinner', 'Skeleton', 'Progress', 'Alert'],
  Overlays:      ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Dropdown'],
  'Data Display': ['Card', 'Badge', 'Avatar', 'Tabs', 'Accordion', 'DataTable', 'Icon'],
} as const;

type CategoryKey = keyof typeof CATEGORIES;

function CategoryGrid() {
  const [tab, setTab] = useState<CategoryKey>('Inputs');

  return (
    <section
      style={{ maxWidth: 1152, margin: '0 auto', padding: '0 24px 96px' }}
    >
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>
          The catalog
        </p>
        <h2
          style={{
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
          }}
        >
          Every component. Every category.
        </h2>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 4, marginBottom: 24, flexWrap: 'wrap' }}>
        {(Object.keys(CATEGORIES) as CategoryKey[]).map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            style={{
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: tab === c ? 500 : 400,
              color: tab === c
                ? 'var(--color-text-primary)'
                : 'var(--color-text-secondary)',
              background: tab === c ? 'var(--color-surface)' : 'transparent',
              border: '0.5px solid var(--color-outline-variant)',
              borderRadius: 8,
              cursor: 'pointer',
              transition: 'background 150ms, color 150ms',
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
        }}
      >
        {CATEGORIES[tab].map((name) => (
          <Link
            key={name}
            href={`/components/${name.toLowerCase()}`}
            style={{
              borderRadius: 10,
              padding: '16px',
              border: '0.5px solid var(--color-outline-variant)',
              background: 'var(--color-surface)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
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
            <span
              style={{
                fontSize: 13,
                color: 'var(--color-text-primary)',
                fontWeight: 500,
              }}
            >
              {name}
            </span>
            <i
              className="ti ti-arrow-up-right"
              style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}
              aria-hidden="true"
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   FINAL CTA
───────────────────────────────────────────────────────────────────────── */

function FinalCta() {
  return (
    <section
      style={{
        borderTop: '0.5px solid var(--color-outline-variant)',
        padding: '96px 24px',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h2
          style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.04em',
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          Start building.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.65,
            marginBottom: 36,
            fontWeight: 400,
          }}
        >
          One install away from a complete component library. Free, open source,
          and built for the way you actually ship.
        </p>

        {/* Install command card */}
        <div
          style={{
            borderRadius: 10,
            padding: '14px 20px',
            maxWidth: 380,
            margin: '0 auto 28px',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            border: '0.5px solid var(--color-outline-variant)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-primary)',
          }}
        >
          <span>npm install omverse-ui</span>
          <i
            className="ti ti-copy"
            style={{ fontSize: 14, color: 'var(--color-text-tertiary)' }}
            aria-hidden="true"
          />
        </div>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <Link href="/docs/installation">
            <Button variant="filled">Read the docs</Button>
          </Link>
          <Link href="/components/button">
            <Button variant="outlined">Browse components</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ background: 'var(--color-background)' }}>
        <Hero />
        <LayerSection />
        <ShowcaseSection />
        <InstallBlock />
        <CategoryGrid />
        <FinalCta />
      </main>
    </div>
  );
}
