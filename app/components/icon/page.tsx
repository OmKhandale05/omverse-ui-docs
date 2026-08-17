'use client';

import { useState } from 'react';
import { Icon, type IconName } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table ─── */

const ICON_PROPS = [
  {
    name: 'name',
    type: 'IconName',
    default: '—',
    description: 'Icon identifier — required. Must be one of the 38 registered names.',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Icon size',
  },
  {
    name: 'filled',
    type: 'boolean',
    default: 'false',
    description: 'Render as a solid filled shape — use for toggle-on states (liked, saved, starred)',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: 'undefined',
    description: 'Accessible label for screen readers. Omit when the icon is next to visible text.',
  },
  {
    name: 'className',
    type: 'string',
    default: 'undefined',
    description: 'Extra CSS classes — use to set color via text-* utilities or currentColor',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Full set of valid icon names (38 total) ─── */

const ALL_ICONS: IconName[] = [
  'chevron-down',
  'chevron-up',
  'chevron-left',
  'chevron-right',
  'chevron-down-filled',
  'arrow-right',
  'arrow-left',
  'check',
  'check-circle',
  'close',
  'plus',
  'minus',
  'alert-circle',
  'info',
  'search',
  'edit',
  'settings',
  'bookmark',
  'heart',
  'star',
  'bell',
  'trash',
  'download',
  'upload',
  'share',
  'dots',
  'dots-vertical',
  'refresh',
  'eye',
  'eye-off',
  'mail',
  'lock',
  'play',
  'file-text',
  'credit-card',
  'users',
  'rocket',
  'message-square',
];

const API_PROPS = ICON_PROPS;

/* ─── Code snippets ─── */

const USAGE_CODE = `import { Icon } from 'omverse-ui'

// Basic
<Icon name="heart" />

// Sizes: sm · md (default) · lg · xl
<Icon name="heart" size="lg" />

// Colored via CSS currentColor — wrap in a colored element
<span style={{ color: 'var(--color-error)' }}>
  <Icon name="heart" />
</span>

// Filled (solid) state — bookmarks, likes, stars
<Icon name="heart" filled />`;

const SIZES_CODE = `<Icon name="star" size="sm" />
<Icon name="star" size="md" />
<Icon name="star" size="lg" />
<Icon name="star" size="xl" />`;

const COLORS_CODE = `// Icon has no color prop — use CSS currentColor via className or a wrapper
<span style={{ color: 'var(--color-text-primary)' }}>   <Icon name="heart" /> </span>
<span style={{ color: 'var(--color-primary)' }}>         <Icon name="heart" /> </span>
<span style={{ color: 'var(--color-secondary)' }}>       <Icon name="heart" /> </span>
<span style={{ color: 'var(--color-success)' }}>         <Icon name="heart" /> </span>
<span style={{ color: 'var(--color-warning)' }}>         <Icon name="heart" /> </span>
<span style={{ color: 'var(--color-error)' }}>           <Icon name="heart" /> </span>`;

const FILLED_CODE = `// filled=false (default) → stroke outline
<Icon name="heart"    />
<Icon name="star"     />
<Icon name="bookmark" />

// filled=true → solid shape — use for toggle-on / active states
<Icon name="heart"    filled />
<Icon name="star"     filled />
<Icon name="bookmark" filled />`;

/* ─── Color tokens ─── */

const COLORS: { label: string; token: string }[] = [
  { label: 'default',   token: 'var(--color-text-primary)'  },
  { label: 'primary',   token: 'var(--color-primary)'       },
  { label: 'secondary', token: 'var(--color-secondary)'     },
  { label: 'success',   token: 'var(--color-success)'       },
  { label: 'warning',   token: 'var(--color-warning)'       },
  { label: 'error',     token: 'var(--color-error)'         },
];

/* ─── Page ─── */

export default function IconPage() {
  const [search, setSearch] = useState('');

  const filtered = ALL_ICONS.filter((name) =>
    name.includes(search.toLowerCase().trim())
  );

return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Display', 'Icon']}        title="Icon"        description="Lucide icons wrapped in a consistent Icon component. Every component in omverse-ui uses this — swap the underlying source in one file."        tags={['38 icons', 'Lucide', 'Searchable', '4 sizes', 'Filled state']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Lucide icons wrapped in a consistent Icon component. Every component in omverse-ui uses this — swap the underlying source in one file.">
          <div className="component-doc-prose">
            <p>Use Icon to present and interact with structured information in a predictable, accessible way.</p>
            <p>The component examples below demonstrate practical variations you can adapt to your own interface.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Root container and spacing boundary.</li>
            <li>Primary content and optional secondary metadata.</li>
            <li>State indicators and utility affordances (icons, badges, controls).</li>
            <li>Optional helper text, grouping, and behavioral wrappers.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Choose Icon when a repeated, structured interaction is required.</li>
            <li>Use it for clear, consistent operations across similar surfaces.</li>
            <li>Use in forms, lists, and action workflows where clarity matters.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use only for decorative layout without interaction meaning.</li>
            <li>Avoid duplicating the same behavior without distinct user context.</li>
            <li>Prefer simpler HTML or textual content for static, non-interactive labels.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Component variants should be documented by API props and examples below.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-stack">
            <p>Common states include idle, active, disabled, focused, and loading/pending states where applicable.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-stack">
            <p>Behavior should remain deterministic and keyboard-friendly, with clear visual feedback for every state transition.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Use semantic structure and visible labels whenever possible.</li>
            <li>Preserve keyboard navigation and focus visibility.</li>
            <li>Announce status and changes when context requires it.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Prefer short, clear labels.</li>
            <li>Keep content actions scannable and outcome-oriented.</li>
            <li>Use consistent wording across similar components.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
          <div style={{ padding: '28px 40px' }}>
          
            {/* ── Section 1: Usage ── */}
            <CodeBlock filename="App.tsx" code={USAGE_CODE} />
          
            {/* ── Section 2: Sizes ── */}
            <ComponentPreview
              title="Sizes"
              description="sm · md (default) · lg · xl — tied to the design system spacing scale"
            >
              <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
                <Icon name="star" size="sm" />
                <Icon name="star" size="md" />
                <Icon name="star" size="lg" />
                <Icon name="star" size="xl" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIZES_CODE} />
          
            {/* ── Section 3: Colors ── */}
            <ComponentPreview
              title="Colors"
              description="Icon has no color prop — set color via CSS currentColor using a wrapper or className"
            >
              <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap' }}>
                {COLORS.map(({ label, token }) => (
                  <div
                    key={label}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 6,
                      color: token,
                    }}
                  >
                    <Icon name="heart" size="lg" />
                    <span style={{
                      fontSize: 10,
                      color: 'var(--color-text-tertiary)',
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                    }}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={COLORS_CODE} />
          
            {/* ── Section 4: Filled ── */}
            <ComponentPreview
              title="Filled state"
              description="filled renders a solid shape instead of a stroke outline — use for toggle-on / active states"
            >
              <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
                {/* Outline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    outline
                  </span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    <Icon name="heart"    size="lg" />
                    <Icon name="star"     size="lg" />
                    <Icon name="bookmark" size="lg" />
                    <Icon name="bell"     size="lg" />
                  </div>
                </div>
          
                {/* Filled */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 500, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    filled
                  </span>
                  <div style={{ display: 'flex', gap: 12, color: 'var(--color-primary)' }}>
                    <Icon name="heart"    size="lg" filled />
                    <Icon name="star"     size="lg" filled />
                    <Icon name="bookmark" size="lg" filled />
                    <Icon name="bell"     size="lg" filled />
                  </div>
                </div>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={FILLED_CODE} />
          
            {/* ── Section 5: Icon browser ── */}
            <ComponentPreview
              title="All icons"
              description="All 38 registered icons — click any to copy the name to clipboard"
              align="start"
            >
              <div style={{ width: '100%' }}>
                {/* Search input */}
                <input
                  type="text"
                  placeholder="Search icons…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    width: '100%',
                    height: 36,
                    padding: '0 12px',
                    borderRadius: 8,
                    border: '0.5px solid var(--color-border-tertiary)',
                    background: 'var(--color-background-secondary)',
                    fontSize: 13,
                    color: 'var(--color-text-primary)',
                    outline: 'none',
                    marginBottom: 12,
                    boxSizing: 'border-box',
                  }}
                />
          
                {/* Count */}
                <p style={{
                  fontSize: 11,
                  color: 'var(--color-text-tertiary)',
                  marginBottom: 12,
                  fontWeight: 500,
                }}>
                  {filtered.length} {filtered.length === 1 ? 'icon' : 'icons'}
                </p>
          
                {/* Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(88px, 1fr))',
                  gap: 8,
                }}>
                  {filtered.map((name) => (
                    <button
                      key={name}
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(name).catch(() => {});
                      }}
                      title={`Click to copy: ${name}`}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 6,
                        padding: '12px 8px',
                        borderRadius: 8,
                        border: '0.5px solid var(--color-border-tertiary)',
                        background: 'var(--color-background-secondary)',
                        cursor: 'pointer',
                        transition: 'background 150ms, border-color 150ms',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          'var(--color-surface)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          'var(--color-border-primary)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background =
                          'var(--color-background-secondary)';
                        (e.currentTarget as HTMLButtonElement).style.borderColor =
                          'var(--color-border-tertiary)';
                      }}
                    >
                      <Icon name={name} size="md" />
                      <span style={{
                        fontSize: 10,
                        color: 'var(--color-text-tertiary)',
                        textAlign: 'center',
                        lineHeight: 1.3,
                        wordBreak: 'break-all',
                      }}>
                        {name}
                      </span>
                    </button>
                  ))}
                </div>
          
                {filtered.length === 0 && (
                  <p style={{ fontSize: 13, color: 'var(--color-text-tertiary)', textAlign: 'center', padding: '32px 0' }}>
                    No icons match &ldquo;{search}&rdquo;
                  </p>
                )}
              </div>
            </ComponentPreview>
          
            {/* ── Props table ── */}
          
          </div>
          </div>
        </ComponentDocSection>
        <ComponentDocSection id="props-api" title="Props / API">
          <div className="component-doc-stack">
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>Api Props</p>
            <PropsTable props={API_PROPS} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components">
          <div className="component-doc-prose">
          <ul className="component-doc-prose">
            <li>Use Icon alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep icon behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
