'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const ACCORDION_PROPS = [
  { name: 'defaultValue',  type: 'string | string[]',                                                                                                          default: '—',         description: 'Initially open item(s) — string for single, array for multiple' },
  { name: 'value',         type: 'string | string[]',                                                                                                          default: '—',         description: 'Controlled open item(s)' },
  { name: 'onValueChange', type: '(value: string | string[]) => void',                                                                                         default: '—',         description: 'Callback fired when open items change' },
  { name: 'mode',          type: "'single' | 'multiple'",                                                                                                      default: "'single'",  description: 'Allow one or multiple items open at a time' },
  { name: 'variant',       type: "'default' | 'bordered' | 'filled' | 'card' | 'flush' | 'separated' | 'gradient' | 'plus' | 'numbered' | 'image'",          default: "'default'", description: 'Visual style of the accordion' },
  { name: 'iconStyle',     type: "'chevron' | 'plus' | 'arrow' | 'none'",                                                                                     default: "'chevron'", description: 'Style of the expand/collapse icon' },
  { name: 'children',      type: 'ReactNode',                                                                                                                  default: '—',         description: 'AccordionItem components' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const ITEM_PROPS = [
  { name: 'value',      type: 'string',                                            default: '—',          description: 'Unique identifier for this item' },
  { name: 'title',      type: 'string',                                            default: '—',          description: 'Header text shown in the trigger button' },
  { name: 'subtitle',   type: 'string',                                            default: '—',          description: 'Subtitle shown below the title' },
  { name: 'icon',       type: 'IconName',                                          default: '—',          description: 'Leading icon name in the trigger' },
  { name: 'iconBg',     type: 'string',                                            default: '—',          description: 'Tailwind class for the icon container background' },
  { name: 'badge',      type: 'string',                                            default: '—',          description: 'Badge label shown in the trigger' },
  { name: 'badgeColor', type: "'default' | 'error' | 'success' | 'warning'",     default: "'default'",  description: 'Color of the badge chip' },
  { name: 'step',       type: 'number',                                            default: '—',          description: 'Step number badge before the title (numbered variant)' },
  { name: 'image',      type: 'string',                                            default: '—',          description: 'Emoji shown in a side panel (image variant)' },
  { name: 'imageAlt',   type: 'string',                                            default: '—',          description: 'Accessible alt text for the image/emoji' },
  { name: 'disabled',   type: 'boolean',                                           default: 'false',      description: 'Prevents the item from being opened' },
  { name: 'children',   type: 'ReactNode',                                         default: '—',          description: 'Content shown when the item is open' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Accordion, AccordionItem } from 'omverse-ui'

<Accordion defaultValue="item-1">
  <AccordionItem value="item-1" title="What is a design system?">
    A design system is a collection of reusable components guided by clear
    standards that can be assembled to build any number of applications.
  </AccordionItem>
  <AccordionItem value="item-2" title="How do I install the package?">
    Run npm install @yourscope/design-system in your project directory.
  </AccordionItem>
  <AccordionItem value="item-3" title="Can I customize the colors?">
    Yes! All colors are defined as CSS variables in your index.css using the @theme block.
  </AccordionItem>
  <AccordionItem value="item-4" title="Is TypeScript supported?">
    Fully supported. Every component exports its props type for complete type safety.
  </AccordionItem>
</Accordion>`;

const BORDERED_CODE = `<Accordion variant="bordered" defaultValue="b-1">
  <AccordionItem value="b-1" title="Account settings">
    Manage your account details, email preferences, and connected applications.
  </AccordionItem>
  <AccordionItem value="b-2" title="Privacy & security">
    Control your privacy settings and manage two-factor authentication.
  </AccordionItem>
  <AccordionItem value="b-3" title="Notifications">
    Configure how and when you receive email and push notifications.
  </AccordionItem>
</Accordion>`;

const FILLED_CODE = `<Accordion variant="filled" defaultValue="f-1">
  <AccordionItem value="f-1" title="Why choose our platform?">
    We offer the most comprehensive design system with TypeScript,
    dark mode, and accessibility built in.
  </AccordionItem>
  <AccordionItem value="f-2" title="What's included in Pro?">
    Unlimited projects, priority support, advanced analytics, and custom domains.
  </AccordionItem>
  <AccordionItem value="f-3" title="Is there a free trial?">
    Yes! Start with our free plan — no credit card required.
  </AccordionItem>
</Accordion>`;

const CARD_CODE = `<Accordion variant="card" defaultValue="c-1">
  <AccordionItem
    value="c-1"
    title="General settings"
    subtitle="Manage your workspace"
    icon="settings"
    iconBg="bg-secondary-container"
  >
    Configure your workspace name, timezone, and default language settings.
  </AccordionItem>
  <AccordionItem
    value="c-2"
    title="Team members"
    subtitle="5 members · 2 pending"
    icon="info"
    iconBg="bg-primary-container"
    badge="2 pending"
    badgeColor="default"
  >
    Manage team access and permissions for your workspace.
  </AccordionItem>
  <AccordionItem
    value="c-3"
    title="Security"
    subtitle="2FA not enabled"
    icon="alert-circle"
    iconBg="bg-error-container"
    badge="Action needed"
    badgeColor="error"
  >
    Enable two-factor authentication to secure your account.
  </AccordionItem>
</Accordion>`;

const FLUSH_CODE = `<Accordion variant="flush" mode="multiple">
  <AccordionItem value="fl-1" title="What is included?">
    All components, dark mode, TypeScript types, and full documentation.
  </AccordionItem>
  <AccordionItem value="fl-2" title="How does licensing work?">
    Single license covers unlimited projects for one developer.
  </AccordionItem>
  <AccordionItem value="fl-3" title="Can I use in commercial projects?">
    Yes, the license covers commercial use without any restrictions.
  </AccordionItem>
</Accordion>`;

const SEPARATED_CODE = `<Accordion variant="separated" defaultValue="s-1">
  <AccordionItem value="s-1" title="Getting started">
    Install the package and follow the setup guide to get started quickly.
  </AccordionItem>
  <AccordionItem value="s-2" title="Configuration options">
    Customize tokens, themes, and component defaults via your config file.
  </AccordionItem>
  <AccordionItem value="s-3" title="Advanced usage">
    Learn about composition patterns, compound components, and more.
  </AccordionItem>
</Accordion>`;

const GRADIENT_CODE = `<Accordion variant="gradient" defaultValue="g-1">
  <AccordionItem value="g-1" title="Pro features" subtitle="Everything you need to scale">
    {/* feature list */}
  </AccordionItem>
  <AccordionItem value="g-2" title="Team collaboration" subtitle="Work together seamlessly">
    {/* feature list */}
  </AccordionItem>
  <AccordionItem value="g-3" title="Enterprise plan" subtitle="Custom pricing and SLAs">
    {/* feature list */}
  </AccordionItem>
</Accordion>`;

const PLUS_CODE = `<Accordion variant="plus" iconStyle="plus" defaultValue="p-1">
  <AccordionItem value="p-1" title="Is there a free plan?">
    Yes! Our free plan includes 3 projects and all basic components.
  </AccordionItem>
  <AccordionItem value="p-2" title="Do you offer refunds?">
    We offer a 30-day money-back guarantee, no questions asked.
  </AccordionItem>
  <AccordionItem value="p-3" title="How do I cancel my subscription?">
    You can cancel anytime from your account settings page.
  </AccordionItem>
  <AccordionItem value="p-4" title="Can I upgrade or downgrade?">
    Yes, plan changes take effect immediately and are prorated.
  </AccordionItem>
</Accordion>`;

const NUMBERED_CODE = `<Accordion variant="numbered" defaultValue="n-1">
  <AccordionItem value="n-1" title="Create your account" step={1}>
    Sign up with your email or continue with Google or GitHub.
  </AccordionItem>
  <AccordionItem value="n-2" title="Set up your workspace" step={2}>
    Name your workspace and configure basic settings.
  </AccordionItem>
  <AccordionItem value="n-3" title="Invite your team" step={3}>
    Add teammates by email and assign their roles and permissions.
  </AccordionItem>
  <AccordionItem value="n-4" title="Build your first project" step={4}>
    Create a new project and start using your design system components.
  </AccordionItem>
</Accordion>`;

const IMAGE_CODE = `<Accordion variant="image" defaultValue="i-1">
  <AccordionItem
    value="i-1"
    title="Design system"
    subtitle="30 components · TypeScript"
    image="🎨"
  >
    A complete design system with 30+ components, dark mode support,
    and full TypeScript definitions.
  </AccordionItem>
  <AccordionItem
    value="i-2"
    title="Starter templates"
    subtitle="12 templates · Next.js"
    image="🚀"
  >
    Production-ready templates for dashboards, landing pages, and SaaS applications.
  </AccordionItem>
  <AccordionItem
    value="i-3"
    title="Component library"
    subtitle="50+ components · React"
    image="⚛️"
  >
    Every component is accessible, typed, and follows your design tokens automatically.
  </AccordionItem>
</Accordion>`;

const MULTIPLE_CODE = `<Accordion variant="bordered" mode="multiple" defaultValue={['m-1', 'm-3']}>
  <AccordionItem value="m-1" title="First item — open by default">
    This item starts open. Multiple items can be open simultaneously.
  </AccordionItem>
  <AccordionItem value="m-2" title="Second item — click to open">
    Click to expand without closing other items.
  </AccordionItem>
  <AccordionItem value="m-3" title="Third item — also open">
    This item also starts open. All three can be open at the same time.
  </AccordionItem>
</Accordion>`;

/* ─── Inline demo helpers (AccordionItem is not exported from omverse-ui) ─── */

const ICON_MAP: Record<string, string> = {
  settings: 'settings',
  info: 'info-circle',
  'alert-circle': 'alert-circle',
  'check-circle': 'circle-check',
  'credit-card': 'credit-card',
  bookmark: 'bookmark',
  heart: 'heart',
  star: 'star',
  bell: 'bell',
  users: 'users',
  'file-text': 'file-text',
  rocket: 'rocket',
  'message-square': 'message-square',
  edit: 'edit',
  trash: 'trash',
};

const ICON_BG_COLORS: Record<string, string> = {
  'bg-secondary-container': '#f1f5f9',
  'bg-primary-container':   '#eff6ff',
  'bg-error-container':     '#fee2e2',
  'bg-success-container':   '#dcfce7',
  'bg-warning-container':   '#fef9c3',
};

const BADGE_STYLES: Record<string, React.CSSProperties> = {
  default: { background: '#e2e8f0', color: '#475569' },
  error:   { background: '#fee2e2', color: '#dc2626' },
  success: { background: '#dcfce7', color: '#16a34a' },
  warning: { background: '#fef9c3', color: '#ca8a04' },
};

interface DemoItemProps {
  title: string;
  children?: React.ReactNode;
  subtitle?: string;
  icon?: string;
  iconBg?: string;
  badge?: string;
  badgeColor?: 'default' | 'error' | 'success' | 'warning';
  step?: number;
  image?: string;
  defaultOpen?: boolean;
  variant?: string;
  iconStyle?: 'chevron' | 'plus';
}

function DemoItem({
  title, subtitle, icon, iconBg, badge, badgeColor = 'default',
  step, image, children, defaultOpen = false,
  variant = 'default', iconStyle = 'chevron',
}: DemoItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const isGradient = variant === 'gradient';
  const isImageVariant = variant === 'image' && !!image;
  const isPlus = iconStyle === 'plus';

  const triggerBg = isGradient && isOpen
    ? 'linear-gradient(135deg, var(--color-primary, #6366f1) 0%, #8b5cf6 100%)'
    : 'transparent';

  const titleColor     = isGradient && isOpen ? '#fff'                           : 'var(--color-text-primary)';
  const subtitleColor  = isGradient && isOpen ? 'rgba(255,255,255,0.75)'         : 'var(--color-text-secondary)';
  const chevronColor   = isGradient && isOpen ? '#fff'
                       : isOpen                ? 'var(--color-primary, #6366f1)'
                       :                         'var(--color-text-secondary)';

  function renderExpandIcon() {
    if (isPlus) {
      return (
        <span style={{
          width: 24, height: 24, borderRadius: 6, flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: isOpen ? '#ede9fe' : '#f1f5f9',
          color: isOpen ? '#7c3aed' : 'var(--color-text-secondary)',
          fontSize: 14,
        }}>
          <i className={`ti ti-${isOpen ? 'minus' : 'plus'}`} aria-hidden="true" />
        </span>
      );
    }
    return (
      <i
        className={`ti ti-chevron-${isOpen ? 'up' : 'down'}`}
        style={{ fontSize: 16, color: chevronColor, flexShrink: 0 }}
        aria-hidden="true"
      />
    );
  }

  return (
    <div style={{ borderBottom: '0.5px solid var(--color-border-secondary, #e2e8f0)' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: isImageVariant ? 0 : '14px 16px',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: 14,
          fontWeight: 500,
          background: triggerBg,
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          textAlign: 'left',
        }}
      >
        {isImageVariant ? (
          /* ── Image / media layout ── */
          <>
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              background: 'linear-gradient(135deg, #eff6ff, #f5f3ff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, margin: '12px 0 12px 16px',
            }}>
              {image}
            </div>
            <div style={{ flex: 1, padding: '12px 0', minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)' }}>{title}</div>
              {subtitle && (
                <div style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 2 }}>{subtitle}</div>
              )}
            </div>
            <div style={{ flexShrink: 0, marginRight: 16 }}>
              {renderExpandIcon()}
            </div>
          </>
        ) : (
          /* ── Standard layout ── */
          <>
            {step !== undefined && (
              <span style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                background: isOpen ? 'var(--color-primary, #6366f1)' : '#f1f5f9',
                color: isOpen ? '#fff' : 'var(--color-text-secondary)',
                fontSize: 12, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {step}
              </span>
            )}

            {icon && (
              <span style={{
                width: 32, height: 32, borderRadius: 8, flexShrink: 0,
                background: iconBg ? (ICON_BG_COLORS[iconBg] ?? '#f1f5f9') : '#f1f5f9',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i
                  className={`ti ti-${ICON_MAP[icon] ?? icon}`}
                  style={{ fontSize: 16, color: 'var(--color-text-secondary)' }}
                  aria-hidden="true"
                />
              </span>
            )}

            <span style={{ flex: 1, minWidth: 0 }}>
              <span style={{ display: 'block', color: titleColor }}>{title}</span>
              {subtitle && (
                <span style={{
                  display: 'block', fontSize: 12, fontWeight: 400,
                  color: subtitleColor, marginTop: 2,
                }}>
                  {subtitle}
                </span>
              )}
            </span>

            {badge && (
              <span style={{
                fontSize: 11, padding: '3px 8px', borderRadius: 999, flexShrink: 0,
                ...BADGE_STYLES[badgeColor],
              }}>
                {badge}
              </span>
            )}

            {renderExpandIcon()}
          </>
        )}
      </button>

      {isOpen && (
        <div style={{
          padding: '4px 16px 14px',
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
        }}>
          {children}
        </div>
      )}
    </div>
  );
}

function DemoAccordion({
  children, variant = 'default',
}: {
  children: React.ReactNode;
  variant?: string;
}) {
  const styles: Record<string, React.CSSProperties> = {
    default:   {},
    bordered:  { border: '1.5px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' },
    filled:    { background: 'var(--color-background-secondary, #f8fafc)', borderRadius: 8, overflow: 'hidden' },
    card:      { border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 10, overflow: 'hidden' },
    flush:     { overflow: 'hidden' },
    separated: { display: 'flex', flexDirection: 'column', gap: 8 },
    gradient:  { border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' },
    plus:      { border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' },
    numbered:  { border: '1.5px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' },
    image:     { display: 'flex', flexDirection: 'column', gap: 8 },
  };

  return (
    <div style={{ width: '100%', maxWidth: 540, ...(styles[variant] ?? {}) }}>
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
        description="10 variants · single + multiple · badge · icon · subtitle · image"
        tags={['Default', 'Bordered', 'Filled', 'Card', 'Flush', 'Separated', 'Gradient', 'Plus / minus', 'Numbered', 'Image', 'Multiple open']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Clean accordion with underline dividers — single open mode"
        >
          <DemoAccordion variant="default">
            <DemoItem title="What is a design system?" defaultOpen>
              A design system is a collection of reusable components guided by clear
              standards that can be assembled to build any number of applications.
            </DemoItem>
            <DemoItem title="How do I install the package?">
              Run <code>npm install @yourscope/design-system</code> in your project directory.
            </DemoItem>
            <DemoItem title="Can I customize the colors?">
              Yes! All colors are defined as CSS variables in your index.css file using the @theme block.
            </DemoItem>
            <DemoItem title="Is TypeScript supported?">
              Fully supported. Every component exports its props type for complete type safety.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: Bordered ── */}
        <ComponentPreview
          title="Bordered"
          description="Full outer border with dividers between items — great for settings panels"
        >
          <DemoAccordion variant="bordered">
            <DemoItem title="Account settings" defaultOpen variant="bordered">
              Manage your account details, email preferences, and connected applications.
            </DemoItem>
            <DemoItem title="Privacy & security" variant="bordered">
              Control your privacy settings and manage two-factor authentication.
            </DemoItem>
            <DemoItem title="Notifications" variant="bordered">
              Configure how and when you receive email and push notifications.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BORDERED_CODE} />

        {/* ── Section 3: Filled ── */}
        <ComponentPreview
          title="Filled"
          description="Secondary tonal background fills the accordion container"
        >
          <DemoAccordion variant="filled">
            <DemoItem title="Why choose our platform?" defaultOpen>
              We offer the most comprehensive design system with TypeScript,
              dark mode, and accessibility built in.
            </DemoItem>
            <DemoItem title="What's included in Pro?">
              Unlimited projects, priority support, advanced analytics, and custom domains.
            </DemoItem>
            <DemoItem title="Is there a free trial?">
              Yes! Start with our free plan — no credit card required.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FILLED_CODE} />

        {/* ── Section 4: Card — with icon + badge ── */}
        <ComponentPreview
          title="Card — with icon + badge"
          description="Card variant supports icon, iconBg, badge, badgeColor, and subtitle on each item"
        >
          <DemoAccordion variant="card">
            <DemoItem
              title="General settings"
              subtitle="Manage your workspace"
              icon="settings"
              iconBg="bg-secondary-container"
              defaultOpen
            >
              Configure your workspace name, timezone, and default language settings.
            </DemoItem>
            <DemoItem
              title="Team members"
              subtitle="5 members · 2 pending"
              icon="info"
              iconBg="bg-primary-container"
              badge="2 pending"
              badgeColor="default"
            >
              Manage team access and permissions for your workspace.
            </DemoItem>
            <DemoItem
              title="Security"
              subtitle="2FA not enabled"
              icon="alert-circle"
              iconBg="bg-error-container"
              badge="Action needed"
              badgeColor="error"
            >
              Enable two-factor authentication to secure your account.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 5: Flush — multiple open ── */}
        <ComponentPreview
          title="Flush — multiple open"
          description="No outer border, dividers only — mode=multiple allows any combination to be open"
        >
          <DemoAccordion variant="flush">
            <DemoItem title="What is included?">
              All components, dark mode, TypeScript types, and full documentation.
            </DemoItem>
            <DemoItem title="How does licensing work?">
              Single license covers unlimited projects for one developer.
            </DemoItem>
            <DemoItem title="Can I use in commercial projects?">
              Yes, the license covers commercial use without any restrictions.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FLUSH_CODE} />

        {/* ── Section 6: Separated ── */}
        <ComponentPreview
          title="Separated"
          description="Each item is an individual card separated by a gap"
        >
          <DemoAccordion variant="separated">
            <div style={{ border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Getting started" defaultOpen>
                Install the package and follow the setup guide to get started quickly.
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Configuration options">
                Customize tokens, themes, and component defaults via your config file.
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Advanced usage">
                Learn about composition patterns, compound components, and more.
              </DemoItem>
            </div>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEPARATED_CODE} />

        {/* ── Section 7: Gradient header ── */}
        <ComponentPreview
          title="Gradient header"
          description="Brand gradient header on the open trigger — ideal for marketing pages"
        >
          <DemoAccordion variant="gradient">
            <DemoItem
              title="Pro features"
              subtitle="Everything you need to scale"
              defaultOpen
              variant="gradient"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Unlimited projects', 'Priority support 24/7', 'Advanced analytics', 'Custom domains', 'Team collaboration'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="ti ti-circle-check" style={{ fontSize: 16, color: '#16a34a', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </DemoItem>
            <DemoItem
              title="Team collaboration"
              subtitle="Work together seamlessly"
              variant="gradient"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Shared workspaces', 'Role-based permissions', 'Real-time co-editing', 'Activity feed', 'Slack integration'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="ti ti-circle-check" style={{ fontSize: 16, color: '#16a34a', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </DemoItem>
            <DemoItem
              title="Enterprise plan"
              subtitle="Custom pricing and SLAs"
              variant="gradient"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Dedicated account manager', 'SLA guarantees', 'SSO & SAML support', 'Audit logs', 'Custom contracts'].map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <i className="ti ti-circle-check" style={{ fontSize: 16, color: '#16a34a', flexShrink: 0 }} aria-hidden="true" />
                    <span style={{ fontSize: 13 }}>{f}</span>
                  </div>
                ))}
              </div>
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />

        {/* ── Section 8: Plus / minus — FAQ style ── */}
        <ComponentPreview
          title="Plus / minus — FAQ style"
          description="iconStyle=plus replaces the chevron with a + / − toggle inside a rounded box"
        >
          <DemoAccordion variant="plus">
            <DemoItem title="Is there a free plan?" defaultOpen iconStyle="plus">
              Yes! Our free plan includes 3 projects and all basic components.
            </DemoItem>
            <DemoItem title="Do you offer refunds?" iconStyle="plus">
              We offer a 30-day money-back guarantee, no questions asked.
            </DemoItem>
            <DemoItem title="How do I cancel my subscription?" iconStyle="plus">
              You can cancel anytime from your account settings page.
            </DemoItem>
            <DemoItem title="Can I upgrade or downgrade?" iconStyle="plus">
              Yes, plan changes take effect immediately and are prorated.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PLUS_CODE} />

        {/* ── Section 9: Numbered — onboarding steps ── */}
        <ComponentPreview
          title="Numbered — onboarding steps"
          description="step prop shows a numbered circle before the title"
        >
          <DemoAccordion variant="numbered">
            <DemoItem title="Create your account" step={1} defaultOpen>
              Sign up with your email or continue with Google or GitHub.
            </DemoItem>
            <DemoItem title="Set up your workspace" step={2}>
              Name your workspace and configure basic settings.
            </DemoItem>
            <DemoItem title="Invite your team" step={3}>
              Add teammates by email and assign their roles and permissions.
            </DemoItem>
            <DemoItem title="Build your first project" step={4}>
              Create a new project and start using your design system components.
            </DemoItem>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={NUMBERED_CODE} />

        {/* ── Section 10: Image / media ── */}
        <ComponentPreview
          title="Image / media"
          description="image prop shows an emoji in a gradient side panel — subtitle provides context"
        >
          <DemoAccordion variant="image">
            <div style={{ border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Design system" subtitle="30 components · TypeScript" image="🎨" defaultOpen variant="image">
                <p style={{ margin: '0 0 12px' }}>
                  A complete design system with 30+ components, dark mode support, and full TypeScript definitions.
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['React', 'TypeScript', 'Tailwind', 'Dark mode'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#eff6ff', color: '#1d4ed8' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Starter templates" subtitle="12 templates · Next.js" image="🚀" variant="image">
                <p style={{ margin: '0 0 12px' }}>
                  Production-ready templates for dashboards, landing pages, and SaaS applications.
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Next.js', 'Vite', 'Dashboard', 'Landing page'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#f5f3ff', color: '#6d28d9' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </DemoItem>
            </div>
            <div style={{ border: '1px solid var(--color-border-secondary, #e2e8f0)', borderRadius: 8, overflow: 'hidden' }}>
              <DemoItem title="Component library" subtitle="50+ components · React" image="⚛️" variant="image">
                <p style={{ margin: '0 0 12px' }}>
                  Every component is accessible, typed, and follows your design tokens automatically.
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {['Accessible', 'WCAG AA', 'CVA', 'Composable'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: '#dcfce7', color: '#15803d' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </DemoItem>
            </div>
          </DemoAccordion>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={IMAGE_CODE} />

        {/* ── Section 11: Multiple open ── */}
        <ComponentPreview
          title="Multiple open at once"
          description="mode=multiple lets any number of items be open simultaneously"
        >
          <DemoAccordion variant="bordered">
            <DemoItem title="First item — open by default" defaultOpen variant="bordered">
              This item starts open. Multiple items can be open simultaneously.
            </DemoItem>
            <DemoItem title="Second item — click to open" variant="bordered">
              Click to expand without closing other items.
            </DemoItem>
            <DemoItem title="Third item — also open" defaultOpen variant="bordered">
              This item also starts open. All three can be open at the same time.
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
