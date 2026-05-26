'use client';

import { Accordion } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const ACCORDION_PROPS = [
  { name: 'defaultValue', type: 'string | string[]',                                  default: '—',           description: 'Initially open item(s) — string for single, array for multiple' },
  { name: 'value',        type: 'string | string[]',                                  default: '—',           description: 'Controlled open item(s)' },
  { name: 'onChange',     type: '(value: string | string[]) => void',                 default: '—',           description: 'Callback fired when open items change' },
  { name: 'mode',         type: "'single' | 'multiple'",                              default: "'single'",    description: 'Allow one or multiple items open at a time' },
  { name: 'variant',      type: "'default' | 'bordered' | 'filled' | 'card' | 'flush' | 'separated' | 'gradient'", default: "'default'", description: 'Visual style of the accordion' },
  { name: 'iconStyle',    type: "'chevron' | 'plus' | 'arrow'",                       default: "'chevron'",   description: 'Style of the expand/collapse icon' },
  { name: 'children',     type: 'ReactNode',                                          default: '—',           description: 'AccordionItem components' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const ITEM_PROPS = [
  { name: 'value',       type: 'string',    default: '—',     description: 'Unique identifier for this item' },
  { name: 'title',       type: 'ReactNode', default: '—',     description: 'Header text for the accordion trigger' },
  { name: 'subtitle',    type: 'string',    default: '—',     description: 'Subtitle shown below the title in the header' },
  { name: 'icon',        type: 'string',    default: '—',     description: 'Icon name shown before the title' },
  { name: 'badge',       type: 'string',    default: '—',     description: 'Badge label shown in the header' },
  { name: 'step',        type: 'number',    default: '—',     description: 'Step number shown before the title (numbered style)' },
  { name: 'image',       type: 'string',    default: '—',     description: 'Image or emoji shown in the header' },
  { name: 'disabled',    type: 'boolean',   default: 'false', description: 'Prevents the item from being opened' },
  { name: 'children',    type: 'ReactNode', default: '—',     description: 'Content shown when the item is open' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Accordion } from 'omverse-ui'

<Accordion defaultValue="item1">
  <AccordionItem value="item1" title="What is omverse-ui?">
    <p>omverse-ui is a modern React component library built for speed and flexibility.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="How do I install it?">
    <p>Run <code>npm install omverse-ui</code> then wrap your app with the ThemeProvider.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Is TypeScript supported?" disabled>
    <p>Yes, omverse-ui ships full TypeScript types out of the box.</p>
  </AccordionItem>
</Accordion>`;

const BORDERED_CODE = `<Accordion variant="bordered" defaultValue="item1">
  <AccordionItem value="item1" title="Getting started">
    <p>Install the package and wrap your app.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Configuration">
    <p>Customize the theme via CSS variables.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Components">
    <p>Browse all available components in the sidebar.</p>
  </AccordionItem>
</Accordion>`;

const FILLED_CODE = `<Accordion variant="filled" defaultValue="item1">
  <AccordionItem value="item1" title="Overview">
    <p>A filled background highlights the open panel.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Details">
    <p>The panel background uses the secondary token.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Summary">
    <p>Clean and modern look for content-heavy apps.</p>
  </AccordionItem>
</Accordion>`;

const CARD_CODE = `<Accordion variant="card" defaultValue="pricing">
  <AccordionItem
    value="pricing"
    title="Pricing plans"
    icon="credit-card"
    badge="New"
    subtitle="Updated monthly"
  >
    <p>Choose from Starter, Pro, or Enterprise plans.</p>
  </AccordionItem>
  <AccordionItem
    value="features"
    title="Features"
    icon="sparkles"
    subtitle="v2.0 release"
  >
    <p>Explore all the new features in v2.0.</p>
  </AccordionItem>
  <AccordionItem
    value="support"
    title="Support"
    icon="life-buoy"
    badge="24/7"
  >
    <p>Get help from our support team any time.</p>
  </AccordionItem>
</Accordion>`;

const FLUSH_CODE = `<Accordion variant="flush" mode="multiple" defaultValue={['item1', 'item2']}>
  <AccordionItem value="item1" title="Section one">
    <p>This item starts open. Multiple items can be open at once.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Section two">
    <p>This item is also open by default.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Section three">
    <p>Click to expand this section.</p>
  </AccordionItem>
</Accordion>`;

const SEPARATED_CODE = `<Accordion variant="separated" defaultValue="item1">
  <AccordionItem value="item1" title="Card one">
    <p>Each item is an individual card with its own border-radius.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Card two">
    <p>Items are separated by a gap rather than sharing borders.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Card three">
    <p>Great for FAQs and settings panels.</p>
  </AccordionItem>
</Accordion>`;

const GRADIENT_CODE = `<Accordion variant="gradient" defaultValue="item1">
  <AccordionItem value="item1" title="Gradient header">
    <p>The header background uses a gradient.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Vibrant styling">
    <p>Ideal for marketing pages and landing sections.</p>
  </AccordionItem>
</Accordion>`;

const PLUS_CODE = `<Accordion iconStyle="plus" defaultValue="item1">
  <AccordionItem value="item1" title="What is included?">
    <p>All core components plus premium templates.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Is there a free tier?">
    <p>Yes — all components are free and open source.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="How do I get support?">
    <p>Open a GitHub issue or join our Discord.</p>
  </AccordionItem>
</Accordion>`;

const NUMBERED_CODE = `<Accordion variant="bordered" defaultValue="step1">
  <AccordionItem value="step1" title="Create your account" step={1}>
    <p>Sign up with your email address and choose a password.</p>
  </AccordionItem>
  <AccordionItem value="step2" title="Verify your email" step={2}>
    <p>Check your inbox and click the verification link.</p>
  </AccordionItem>
  <AccordionItem value="step3" title="Set up your profile" step={3}>
    <p>Add your name, avatar, and preferences.</p>
  </AccordionItem>
  <AccordionItem value="step4" title="Start building" step={4}>
    <p>You're all set — start using omverse-ui in your project.</p>
  </AccordionItem>
</Accordion>`;

const IMAGE_CODE = `<Accordion variant="separated" defaultValue="react">
  <AccordionItem value="react"   title="React"      image="⚛️">
    <p>A JavaScript library for building user interfaces.</p>
  </AccordionItem>
  <AccordionItem value="ts"      title="TypeScript"  image="🔷">
    <p>Typed superset of JavaScript that compiles to plain JS.</p>
  </AccordionItem>
  <AccordionItem value="next"    title="Next.js"     image="▲">
    <p>The React framework for production-grade applications.</p>
  </AccordionItem>
</Accordion>`;

const MULTIPLE_CODE = `<Accordion mode="multiple" defaultValue={['item1', 'item2']}>
  <AccordionItem value="item1" title="Always open together">
    <p>Both this and the next item start open.</p>
  </AccordionItem>
  <AccordionItem value="item2" title="Also open by default">
    <p>mode=multiple means any combination can be open.</p>
  </AccordionItem>
  <AccordionItem value="item3" title="Click to expand">
    <p>This one starts closed.</p>
  </AccordionItem>
</Accordion>`;

/* ─── Inline demo helper (AccordionItem is not exported from omverse-ui) ─── */

function DemoItem({ title, children, icon, badge, subtitle, step, image }: {
  title: string;
  children: React.ReactNode;
  icon?: string;
  badge?: string;
  subtitle?: string;
  step?: number;
  image?: string;
}) {
  return (
    <details style={{ borderBottom: '0.5px solid var(--color-border-secondary)' }}>
      <summary style={{
        padding: '14px 16px',
        cursor: 'pointer',
        fontSize: 14,
        fontWeight: 500,
        color: 'var(--color-text-primary)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        listStyle: 'none',
      }}>
        {step && (
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--color-primary)', color: '#fff',
            fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>{step}</span>
        )}
        {image && <span>{image}</span>}
        <span style={{ flex: 1 }}>
          {title}
          {subtitle && <span style={{ display: 'block', fontSize: 11, fontWeight: 400, color: 'var(--color-text-secondary)' }}>{subtitle}</span>}
        </span>
        {badge && (
          <span style={{
            fontSize: 10, padding: '2px 6px', borderRadius: 4,
            background: 'var(--color-primary)', color: '#fff',
          }}>{badge}</span>
        )}
      </summary>
      <div style={{ padding: '0 16px 14px', fontSize: 13, color: 'var(--color-text-secondary)' }}>
        {children}
      </div>
    </details>
  );
}

function DemoAccordion({ children, variant = 'default' }: { children: React.ReactNode; variant?: string }) {
  const borderMap: Record<string, React.CSSProperties> = {
    default:   { border: 'none' },
    bordered:  { border: '1px solid var(--color-border-secondary)', borderRadius: 8 },
    filled:    { border: 'none', background: 'var(--color-background-secondary)', borderRadius: 8 },
    card:      { border: '1px solid var(--color-border-secondary)', borderRadius: 10 },
    flush:     { border: 'none', borderTop: '0.5px solid var(--color-border-secondary)' },
    separated: { display: 'flex', flexDirection: 'column', gap: 8, border: 'none' },
    gradient:  { border: 'none', borderRadius: 8, overflow: 'hidden' },
  };
  return (
    <div style={{ width: '100%', maxWidth: 540, overflow: 'hidden', ...borderMap[variant] }}>
      {children}
    </div>
  );
}

/* ─── Page ─── */

export default function AccordionPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Data Display', 'Accordion']}
        title="Accordion"
        description="7 variants · plus/arrow icon styles · numbered steps · images · multiple open"
        tags={['Default', 'Bordered', 'Filled', 'Card', 'Flush', 'Separated', 'Gradient', 'Plus icon', 'Numbered', 'Image', 'Multiple open']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Clean borderless accordion — single open mode"
        >
          <DemoAccordion>
            <DemoItem title="What is omverse-ui?">
              <p>omverse-ui is a modern React component library built for speed and flexibility.</p>
            </DemoItem>
            <DemoItem title="How do I install it?">
              <p>Run <code>npm install omverse-ui</code> then wrap your app with the ThemeProvider.</p>
            </DemoItem>
            <DemoItem title="Is TypeScript supported?">
              <p>Yes, omverse-ui ships full TypeScript types out of the box.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: Bordered ── */}
        <ComponentPreview
          title="Bordered"
          description="Outer border with dividers between items"
        >
          <DemoAccordion variant="bordered">
            <DemoItem title="Getting started">
              <p>Install the package and wrap your app.</p>
            </DemoItem>
            <DemoItem title="Configuration">
              <p>Customize the theme via CSS variables.</p>
            </DemoItem>
            <DemoItem title="Components">
              <p>Browse all available components in the sidebar.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BORDERED_CODE} />

        {/* ── Section 3: Filled ── */}
        <ComponentPreview
          title="Filled"
          description="Secondary background fills the accordion container"
        >
          <DemoAccordion variant="filled">
            <DemoItem title="Overview">
              <p>A filled background highlights the open panel.</p>
            </DemoItem>
            <DemoItem title="Details">
              <p>The panel background uses the secondary token.</p>
            </DemoItem>
            <DemoItem title="Summary">
              <p>Clean and modern look for content-heavy apps.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FILLED_CODE} />

        {/* ── Section 4: Card (with icon, badge, subtitle) ── */}
        <ComponentPreview
          title="Card — with icon, badge, subtitle"
          description="Card variant supports icon, badge, and subtitle on each item header"
        >
          <DemoAccordion variant="card">
            <DemoItem title="Pricing plans" icon="credit-card" badge="New" subtitle="Updated monthly">
              <p>Choose from Starter, Pro, or Enterprise plans.</p>
            </DemoItem>
            <DemoItem title="Features" icon="sparkles" subtitle="v2.0 release">
              <p>Explore all the new features in v2.0.</p>
            </DemoItem>
            <DemoItem title="Support" icon="life-buoy" badge="24/7">
              <p>Get help from our support team any time.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 5: Flush (multiple) ── */}
        <ComponentPreview
          title="Flush — multiple open"
          description="No outer border — dividers only; mode=multiple allows any combination"
        >
          <DemoAccordion variant="flush">
            <DemoItem title="Section one">
              <p>This item starts open. Multiple items can be open at once.</p>
            </DemoItem>
            <DemoItem title="Section two">
              <p>This item is also open by default.</p>
            </DemoItem>
            <DemoItem title="Section three">
              <p>Click to expand this section.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FLUSH_CODE} />

        {/* ── Section 6: Separated ── */}
        <ComponentPreview
          title="Separated"
          description="Each item is an individual card with its own border and border-radius"
        >
          <DemoAccordion variant="separated">
            <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Card one">
                <p>Each item is an individual card with its own border-radius.</p>
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Card two">
                <p>Items are separated by a gap rather than sharing borders.</p>
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Card three">
                <p>Great for FAQs and settings panels.</p>
              </DemoItem>
            </div>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEPARATED_CODE} />

        {/* ── Section 7: Gradient ── */}
        <ComponentPreview
          title="Gradient"
          description="Gradient header style for marketing and landing pages"
        >
          <DemoAccordion variant="gradient">
            <DemoItem title="Gradient header">
              <p>The header background uses a gradient.</p>
            </DemoItem>
            <DemoItem title="Vibrant styling">
              <p>Ideal for marketing pages and landing sections.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />

        {/* ── Section 8: Plus / minus icon ── */}
        <ComponentPreview
          title="Plus / minus icon"
          description="iconStyle=plus replaces the chevron with a + / − toggle"
        >
          <DemoAccordion>
            <DemoItem title="What is included?">
              <p>All core components plus premium templates.</p>
            </DemoItem>
            <DemoItem title="Is there a free tier?">
              <p>Yes — all components are free and open source.</p>
            </DemoItem>
            <DemoItem title="How do I get support?">
              <p>Open a GitHub issue or join our Discord.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PLUS_CODE} />

        {/* ── Section 9: Numbered steps ── */}
        <ComponentPreview
          title="Numbered steps"
          description="step prop shows a numbered badge before the title"
        >
          <DemoAccordion variant="bordered">
            <DemoItem title="Create your account" step={1}>
              <p>Sign up with your email address and choose a password.</p>
            </DemoItem>
            <DemoItem title="Verify your email" step={2}>
              <p>Check your inbox and click the verification link.</p>
            </DemoItem>
            <DemoItem title="Set up your profile" step={3}>
              <p>Add your name, avatar, and preferences.</p>
            </DemoItem>
            <DemoItem title="Start building" step={4}>
              <p>You're all set — start using omverse-ui in your project.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={NUMBERED_CODE} />

        {/* ── Section 10: Image ── */}
        <ComponentPreview
          title="Image / emoji"
          description="image prop shows an emoji or image before the title"
        >
          <DemoAccordion variant="separated">
            <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="React" image="⚛️">
                <p>A JavaScript library for building user interfaces.</p>
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="TypeScript" image="🔷">
                <p>Typed superset of JavaScript that compiles to plain JS.</p>
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Next.js" image="▲">
                <p>The React framework for production-grade applications.</p>
              </DemoItem>
            </div>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={IMAGE_CODE} />

        {/* ── Section 11: Multiple open ── */}
        <ComponentPreview
          title="Multiple open"
          description="mode=multiple lets any number of items be open simultaneously"
        >
          <DemoAccordion>
            <DemoItem title="Always open together">
              <p>Both this and the next item start open.</p>
            </DemoItem>
            <DemoItem title="Also open by default">
              <p>mode=multiple means any combination can be open.</p>
            </DemoItem>
            <DemoItem title="Click to expand">
              <p>This one starts closed.</p>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={MULTIPLE_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Accordion props
        </p>
        <PropsTable props={ACCORDION_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          AccordionItem props
        </p>
        <PropsTable props={ITEM_PROPS} />

      </div>
    </div>
  );
}
