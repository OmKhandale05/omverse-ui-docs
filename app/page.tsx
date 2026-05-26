'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  Badge,
  Switch,
  Slider,
  Input,
  Avatar,
  Progress,
} from 'omverse-ui';

/* ------------------------------------------------------------------ */
/*  HERO BACKDROP                                                      */
/* ------------------------------------------------------------------ */

function HeroBackdrop() {
  // A grid of real components that "breathe" via slow CSS animations.
  // Edges are masked to fade into the page background.
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{
        maskImage:
          'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 75%)',
        WebkitMaskImage:
          'radial-gradient(ellipse 80% 70% at center, black 30%, transparent 75%)',
      }}
      aria-hidden
    >
      <div
        className="absolute inset-0 grid gap-6 p-10"
        style={{
          gridTemplateColumns: 'repeat(6, minmax(0,1fr))',
          opacity: 0.35,
        }}
      >
        {Array.from({ length: 36 }).map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-center"
            style={{
              animation: `breathe ${6 + (i % 5)}s ease-in-out ${
                (i % 7) * 0.4
              }s infinite`,
            }}
          >
            <BackdropCell index={i} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.4; transform: translateY(0px); }
          50%      { opacity: 1;   transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

function BackdropCell({ index }: { index: number }) {
  const variants = [
    <Button key="b1" size="sm" variant="filled">Save</Button>,
    <Button key="b2" size="sm" variant="outlined">Cancel</Button>,
    <Badge key="bd1" color="success">Active</Badge>,
    <Badge key="bd2" color="primary">Beta</Badge>,
    <Switch key="sw1" defaultChecked />,
    <Switch key="sw2" />,
    <div key="sl" className="w-24"><Slider defaultValue={40} /></div>,
    <div key="in" className="w-28"><Input placeholder="Search…" /></div>,
    <Avatar key="av" name="Om K" size="sm" />,
    <div key="pr" className="w-24"><Progress value={62} /></div>,
  ];
  return variants[index % variants.length];
}

/* ------------------------------------------------------------------ */
/*  LAYER TABS (Build / Theme / Ship)                                  */
/* ------------------------------------------------------------------ */

type Layer = {
  id: string;
  label: string;
  tagline: string;
  title: string;
  body: string;
  href: string;
  preview: React.ReactNode;
};

const LAYERS: Layer[] = [
  {
    id: 'build',
    label: 'Build',
    tagline: 'Drop in 27 components',
    title: 'Compose interfaces in minutes.',
    body:
      'A complete component set — buttons, inputs, overlays, feedback, data display. Typed, tree-shakeable, server-component friendly. Install once and start shipping.',
    href: '/components/button',
    preview: (
      <div className="flex flex-col gap-3 w-full max-w-sm">
        <div className="flex gap-2">
          <Button variant="filled">Primary</Button>
          <Button variant="outlined">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
        <div className="flex gap-2">
          <Badge color="success">Active</Badge>
          <Badge color="warning">Pending</Badge>
          <Badge color="primary">Beta</Badge>
        </div>
        <Input placeholder="email@omverse.in" />
      </div>
    ),
  },
  {
    id: 'theme',
    label: 'Theme',
    tagline: 'CSS variables, end to end',
    title: 'One token system. Light and dark.',
    body:
      'Every color, radius, and spacing is a CSS variable. Override one token and the entire library reflows. Dark mode works out of the box — no extra props, no JS toggles inside components.',
    href: '/docs/theming',
    preview: (
      <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
        {[
          'bg',
          'surface',
          'border',
          'text-primary',
          'text-secondary',
          'text-tertiary',
          'accent',
          'muted',
        ].map((t) => (
          <div
            key={t}
            className="rounded-lg p-3 flex flex-col gap-2"
            style={{
              border: '0.5px solid var(--color-border)',
              background: `var(--color-${t.startsWith('text') ? 'surface' : t})`,
            }}
          >
            <div
              className="h-6 w-full rounded"
              style={{ background: `var(--color-${t})` }}
            />
            <span
              className="text-[10px]"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {t}
            </span>
          </div>
        ))}
      </div>
    ),
  },
  {
    id: 'ship',
    label: 'Ship',
    tagline: 'One install away',
    title: 'Production-ready, day one.',
    body:
      'Built for Next.js App Router. Zero runtime CSS-in-JS. Works with Tailwind v4. SSR-safe. Tree-shakeable. Ship the component, not the framework.',
    href: '/docs/installation',
    preview: (
      <div
        className="w-full max-w-sm rounded-lg p-4 font-mono text-sm"
        style={{
          border: '0.5px solid var(--color-border)',
          background: 'var(--color-surface)',
          color: 'var(--color-text-primary)',
        }}
      >
        <div style={{ color: 'var(--color-text-tertiary)' }}>$ npm install</div>
        <div className="mt-1">omverse-ui</div>
        <div className="mt-4" style={{ color: '#10B981' }}>
          ✓ added 1 package in 2.1s
        </div>
      </div>
    ),
  },
];

function LayerSection() {
  const [active, setActive] = useState<string>('build');
  const current = LAYERS.find((l) => l.id === active)!;

  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <div className="mb-12">
        <p
          className="text-sm mb-3"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          The library
        </p>
        <h2
          className="text-3xl md:text-4xl font-medium tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Three layers. One package.
        </h2>
      </div>

      <div className="flex gap-1 mb-10">
        {LAYERS.map((l) => (
          <button
            key={l.id}
            onClick={() => setActive(l.id)}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{
              border: '0.5px solid var(--color-border)',
              background:
                active === l.id ? 'var(--color-surface)' : 'transparent',
              color:
                active === l.id
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
              fontWeight: active === l.id ? 500 : 400,
            }}
          >
            <span className="mr-2" style={{ color: 'var(--color-text-tertiary)' }}>
              0{LAYERS.indexOf(l) + 1}
            </span>
            {l.label}
            <span
              className="ml-2 hidden md:inline"
              style={{ color: 'var(--color-text-tertiary)' }}
            >
              {l.tagline}
            </span>
          </button>
        ))}
      </div>

      <div
        className="grid md:grid-cols-2 gap-10 rounded-lg p-8 md:p-12"
        style={{
          border: '0.5px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <div className="flex flex-col justify-center">
          <h3
            className="text-2xl md:text-3xl font-medium tracking-tight mb-4"
            style={{ color: 'var(--color-text-primary)' }}
          >
            {current.title}
          </h3>
          <p
            className="text-base mb-6 leading-relaxed"
            style={{ color: 'var(--color-text-secondary)' }}
          >
            {current.body}
          </p>
          <Link
            href={current.href}
            className="text-sm inline-flex items-center gap-1"
            style={{ color: 'var(--color-text-primary)' }}
          >
            Learn more
            <i className="ti ti-arrow-right" />
          </Link>
        </div>

        <div className="flex items-center justify-center min-h-[220px]">
          {current.preview}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  CAPABILITY SHOWCASE (3 stacked rows)                               */
/* ------------------------------------------------------------------ */

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
      className={`grid md:grid-cols-2 gap-10 items-center py-16 md:py-20 ${
        reverse ? 'md:[&>*:first-child]:order-2' : ''
      }`}
      style={{ borderTop: '0.5px solid var(--color-border)' }}
    >
      <div>
        <p
          className="text-xs uppercase tracking-wider mb-3"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          {index} — {eyebrow}
        </p>
        <h3
          className="text-2xl md:text-3xl font-medium tracking-tight mb-4"
          style={{ color: 'var(--color-text-primary)' }}
        >
          {title}
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          {body}
        </p>
      </div>
      <div
        className="rounded-lg p-8 flex items-center justify-center min-h-[260px]"
        style={{
          border: '0.5px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        {preview}
      </div>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <section className="px-6 max-w-6xl mx-auto">
      <ShowcaseRow
        index="01"
        eyebrow="27 components"
        title="Everything you need. Nothing you don't."
        body="From the basics — Button, Input, Card — to the harder ones — Dialog, Toast, Combobox, DataTable. All composable, all consistent, all from one package."
        preview={
          <div className="flex flex-wrap gap-2 justify-center max-w-xs">
            {[
              'Button', 'Input', 'Card', 'Badge', 'Switch',
              'Slider', 'Dialog', 'Toast', 'Avatar', 'Progress',
              'Tabs', 'Tooltip', 'Skeleton', 'Spinner',
            ].map((c) => (
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
          <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
            <div
              className="rounded-lg p-4 flex flex-col gap-2"
              style={{
                background: '#FFFFFF',
                border: '0.5px solid #E5E5E5',
              }}
            >
              <div className="text-xs" style={{ color: '#666' }}>Light</div>
              <div className="h-2 rounded-lg" style={{ background: '#111' }} />
              <div className="h-2 rounded-lg" style={{ background: '#999' }} />
              <div className="h-2 rounded-lg w-2/3" style={{ background: '#E5E5E5' }} />
            </div>
            <div
              className="rounded-lg p-4 flex flex-col gap-2"
              style={{
                background: '#0A0A0A',
                border: '0.5px solid #222',
              }}
            >
              <div className="text-xs" style={{ color: '#888' }}>Dark</div>
              <div className="h-2 rounded-lg" style={{ background: '#FAFAFA' }} />
              <div className="h-2 rounded-lg" style={{ background: '#666' }} />
              <div className="h-2 rounded-lg w-2/3" style={{ background: '#222' }} />
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
            className="w-full max-w-sm rounded-lg p-4 font-mono text-xs leading-relaxed"
            style={{
              border: '0.5px solid var(--color-border)',
              background: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
            }}
          >
            <span style={{ color: 'var(--color-text-tertiary)' }}>// app/layout.tsx</span>
            <br />
            import &#123; Toaster &#125; from <span style={{ color: '#10B981' }}>"omverse-ui"</span>;
            <br /><br />
            <span style={{ color: 'var(--color-text-tertiary)' }}>// any page</span>
            <br />
            &lt;<span style={{ color: '#10B981' }}>Button</span> variant=<span style={{ color: '#10B981' }}>"primary"</span>&gt;
            <br />
            &nbsp;&nbsp;Ship it
            <br />
            &lt;/<span style={{ color: '#10B981' }}>Button</span>&gt;
          </div>
        }
      />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  INSTALL + RENDER BLOCK                                             */
/* ------------------------------------------------------------------ */

function InstallBlock() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
          Get started
        </p>
        <h2
          className="text-3xl md:text-4xl font-medium tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          One install. One import. Ship.
        </h2>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div
          className="rounded-lg p-6 font-mono text-sm"
          style={{
            border: '0.5px solid var(--color-border)',
            background: 'var(--color-surface)',
          }}
        >
          <div className="mb-4" style={{ color: 'var(--color-text-tertiary)' }}>
            $ install
          </div>
          <div style={{ color: 'var(--color-text-primary)' }}>npm install omverse-ui</div>
          <div
            className="my-6"
            style={{ borderTop: '0.5px solid var(--color-border)' }}
          />
          <div className="mb-2" style={{ color: 'var(--color-text-tertiary)' }}>
            // your component
          </div>
          <div style={{ color: 'var(--color-text-primary)' }}>
            import {'{'} Button {'}'} from <span style={{ color: '#10B981' }}>"omverse-ui"</span>;
            <br /><br />
            export default function Demo() {'{'}
            <br />
            &nbsp;&nbsp;return &lt;Button variant=<span style={{ color: '#10B981' }}>"primary"</span>&gt;Ship&lt;/Button&gt;;
            <br />
            {'}'}
          </div>
        </div>
        <div
          className="rounded-lg p-6 flex flex-col gap-4 items-start justify-center"
          style={{
            border: '0.5px solid var(--color-border)',
            background: 'var(--color-surface)',
          }}
        >
          <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-tertiary)' }}>
            Rendered output
          </p>
          <Button variant="filled">Ship</Button>
          <p className="text-sm" style={{ color: 'var(--color-text-secondary)' }}>
            That's it. No config files. No provider wrappers (unless you want toasts).
            No theme runtime.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  COMPONENT CATEGORY GRID                                            */
/* ------------------------------------------------------------------ */

const CATEGORIES = {
  Inputs: ['Button', 'Input', 'Textarea', 'Select', 'Switch', 'Slider', 'Checkbox', 'Radio'],
  Feedback: ['Toast', 'Spinner', 'Skeleton', 'Progress', 'Alert'],
  Overlays: ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Dropdown'],
  'Data Display': ['Card', 'Badge', 'Avatar', 'Tabs', 'Accordion', 'DataTable', 'Icon'],
};

function CategoryGrid() {
  const [tab, setTab] = useState<keyof typeof CATEGORIES>('Inputs');
  return (
    <section className="px-6 py-24 md:py-32 max-w-6xl mx-auto">
      <div className="mb-12">
        <p className="text-sm mb-3" style={{ color: 'var(--color-text-tertiary)' }}>
          The catalog
        </p>
        <h2
          className="text-3xl md:text-4xl font-medium tracking-tight"
          style={{ color: 'var(--color-text-primary)' }}
        >
          Every component. Every category.
        </h2>
      </div>
      <div className="flex gap-1 mb-8 flex-wrap">
        {(Object.keys(CATEGORIES) as (keyof typeof CATEGORIES)[]).map((c) => (
          <button
            key={c}
            onClick={() => setTab(c)}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{
              border: '0.5px solid var(--color-border)',
              background: tab === c ? 'var(--color-surface)' : 'transparent',
              color: tab === c ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
              fontWeight: tab === c ? 500 : 400,
            }}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {CATEGORIES[tab].map((c) => (
          <Link
            key={c}
            href={`/components/${c.toLowerCase()}`}
            className="rounded-lg p-4 transition-colors hover:bg-[var(--color-surface-hover)]"
            style={{
              border: '0.5px solid var(--color-border)',
              background: 'var(--color-surface)',
            }}
          >
            <div className="flex items-center justify-between">
              <span
                className="text-sm"
                style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}
              >
                {c}
              </span>
              <i
                className="ti ti-arrow-up-right"
                style={{ color: 'var(--color-text-tertiary)' }}
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  FINAL CTA                                                          */
/* ------------------------------------------------------------------ */

function FinalCta() {
  return (
    <section className="px-6 py-24 md:py-32 max-w-4xl mx-auto text-center">
      <h2
        className="text-3xl md:text-5xl font-medium tracking-tight mb-6"
        style={{ color: 'var(--color-text-primary)' }}
      >
        Start building.
      </h2>
      <p
        className="text-base md:text-lg mb-10 max-w-xl mx-auto leading-relaxed"
        style={{ color: 'var(--color-text-secondary)' }}
      >
        One install away from a complete component library. Free, open source, and built for the way you actually ship.
      </p>
      <div
        className="rounded-lg p-4 max-w-md mx-auto mb-6 font-mono text-sm flex items-center justify-between"
        style={{
          border: '0.5px solid var(--color-border)',
          background: 'var(--color-surface)',
        }}
      >
        <span style={{ color: 'var(--color-text-primary)' }}>npm install omverse-ui</span>
        <i className="ti ti-copy" style={{ color: 'var(--color-text-tertiary)' }} />
      </div>
      <div className="flex gap-3 justify-center">
        <Link href="/docs/installation">
          <Button variant="filled">Read the docs</Button>
        </Link>
        <Link href="/components/button">
          <Button variant="outlined">Browse components</Button>
        </Link>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  HERO                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <HeroBackdrop />
      <div className="relative px-6 pt-32 pb-24 md:pt-40 md:pb-32 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-8 text-xs"
          style={{
            border: '0.5px solid var(--color-border)',
            background: 'var(--color-surface)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <span style={{ color: '#10B981' }}>●</span>
          v0.1.4 on npm
        </div>
        <h1
          className="text-4xl md:text-6xl lg:text-7xl tracking-tight mb-6"
          style={{
            color: 'var(--color-text-primary)',
            fontWeight: 500,
            lineHeight: 1.05,
          }}
        >
          The universe of<br />customizable interfaces.
        </h1>
        <p
          className="text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-secondary)' }}
        >
          27 React components. One CSS variable system. Built for Next.js, themed with tokens, shipped as a single npm install.
        </p>
        <div className="flex gap-3 justify-center flex-wrap">
          <Link href="/docs/installation">
            <Button variant="filled">Get started</Button>
          </Link>
          <Link href="/components/button">
            <Button variant="outlined">Browse components</Button>
          </Link>
        </div>
        <div
          className="mt-16 flex items-center justify-center gap-6 flex-wrap text-xs"
          style={{ color: 'var(--color-text-tertiary)' }}
        >
          <span className="flex items-center gap-2"><i className="ti ti-brand-npm" /> npm</span>
          <span className="flex items-center gap-2"><i className="ti ti-brand-github" /> GitHub</span>
          <span className="flex items-center gap-2"><i className="ti ti-license" /> MIT</span>
          <span className="flex items-center gap-2"><i className="ti ti-package" /> 27 components</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  PAGE                                                               */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  return (
    <main style={{ background: 'var(--color-bg)' }}>
      <Hero />
      <LayerSection />
      <ShowcaseSection />
      <InstallBlock />
      <CategoryGrid />
      <FinalCta />
    </main>
  );
}