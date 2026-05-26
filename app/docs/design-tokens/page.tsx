'use client';

import { PageHeader } from '@/components/ui/PageHeader';

/* ─── Token definitions ─── */

interface Token {
  variable: string;
  label?: string;
  description: string;
}

const PRIMARY_TOKENS: Token[] = [
  { variable: '--color-primary',                description: 'Primary brand color' },
  { variable: '--color-on-primary',             description: 'Foreground color on primary surfaces' },
  { variable: '--color-primary-container',      description: 'Tinted background for primary-related UI' },
  { variable: '--color-on-primary-container',   description: 'Foreground on primary-container' },
];

const SECONDARY_TOKENS: Token[] = [
  { variable: '--color-secondary',              description: 'Secondary brand color' },
  { variable: '--color-on-secondary',           description: 'Foreground color on secondary surfaces' },
  { variable: '--color-secondary-container',    description: 'Tinted background for secondary-related UI' },
  { variable: '--color-on-secondary-container', description: 'Foreground on secondary-container' },
];

const BACKGROUND_TOKENS: Token[] = [
  { variable: '--color-background',             description: 'Page / app background' },
  { variable: '--color-surface',                description: 'Card and panel background' },
  { variable: '--color-surface-variant',        description: 'Alternate surface — chip backgrounds, tab lists' },
];

const TEXT_TOKENS: Token[] = [
  { variable: '--color-text-primary',   label: '--color-on-surface',         description: 'Primary text — headings and body' },
  { variable: '--color-text-secondary', label: '--color-on-surface-variant',  description: 'Secondary text — labels and captions' },
  { variable: '--color-text-tertiary',  description: 'Muted text — placeholders and hints' },
];

const BORDER_TOKENS: Token[] = [
  { variable: '--color-outline',          description: 'Strong border — input rings and dividers' },
  { variable: '--color-outline-variant',  description: 'Subtle border — sidebar edges and card outlines' },
];

const STATUS_TOKENS: Token[] = [
  { variable: '--color-error',    description: 'Error / destructive actions' },
  { variable: '--color-on-error', description: 'Foreground on error surfaces' },
  { variable: '--color-success',  description: 'Success states — mapped to #10B981' },
  { variable: '--color-warning',  description: 'Warning states — mapped to #F59E0B' },
  { variable: '--color-info',     description: 'Informational states' },
];

const RADIUS_TOKENS = [
  { variable: '--radius-sm',  value: '6px',   description: 'Small — badges, chips' },
  { variable: '--radius-md',  value: '8px',   description: 'Medium — inputs, buttons' },
  { variable: '--radius-lg',  value: '12px',  description: 'Large — cards, modals' },
  { variable: '--radius-xl',  value: '16px',  description: 'Extra large — drawers, sheets' },
];

/* ─── Token row component ─── */

function TokenRow({ token, isLast }: { token: Token; isLast: boolean }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      borderBottom: isLast ? undefined : '0.5px solid var(--color-border-tertiary)',
    }}>
      {/* Swatch */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: 6,
        background: `var(${token.variable})`,
        border: '0.5px solid var(--color-border-tertiary)',
        flexShrink: 0,
      }} />

      {/* Token name */}
      <code style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-primary)',
        fontWeight: 500,
        minWidth: 260,
        flexShrink: 0,
      }}>
        {token.variable}
        {token.label && (
          <span style={{
            fontSize: 11,
            color: 'var(--color-text-tertiary)',
            fontWeight: 400,
            display: 'block',
          }}>
            alias of {token.label}
          </span>
        )}
      </code>

      {/* Description */}
      <span style={{
        fontSize: 12,
        color: 'var(--color-text-secondary)',
        lineHeight: 1.5,
      }}>
        {token.description}
      </span>
    </div>
  );
}

/* ─── Token section component ─── */

function TokenSection({ title, tokens }: { title: string; tokens: Token[] }) {
  return (
    <div style={{ marginBottom: 32 }}>
      <p style={{
        fontSize: 11,
        fontWeight: 500,
        color: 'var(--color-text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        marginBottom: 10,
      }}>
        {title}
      </p>
      <div style={{
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '44px 1fr 1fr',
          columnGap: 12,
          padding: '7px 16px',
          background: 'var(--color-background-secondary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
        }}>
          {(['', 'Token', 'Description'] as const).map((h, i) => (
            <span key={i} style={{
              fontSize: 10,
              fontWeight: 500,
              color: 'var(--color-text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.07em',
            }}>
              {h}
            </span>
          ))}
        </div>

        {tokens.map((token, i) => (
          <TokenRow key={token.variable} token={token} isLast={i === tokens.length - 1} />
        ))}
      </div>
    </div>
  );
}

/* ─── Radius/spacing token row ─── */

function RadiusRow({ variable, value, description, isLast }: {
  variable: string;
  value: string;
  description: string;
  isLast: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '10px 16px',
      borderBottom: isLast ? undefined : '0.5px solid var(--color-border-tertiary)',
    }}>
      {/* Visual preview */}
      <div style={{
        width: 32,
        height: 32,
        borderRadius: `var(${variable})`,
        background: 'var(--color-primary-container)',
        border: '0.5px solid var(--color-primary)',
        flexShrink: 0,
      }} />

      {/* Token name */}
      <code style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-primary)',
        fontWeight: 500,
        minWidth: 140,
        flexShrink: 0,
      }}>
        {variable}
      </code>

      {/* Value */}
      <code style={{
        fontSize: 12,
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-primary)',
        fontWeight: 500,
        minWidth: 60,
        flexShrink: 0,
      }}>
        {value}
      </code>

      {/* Description */}
      <span style={{
        fontSize: 12,
        color: 'var(--color-text-secondary)',
      }}>
        {description}
      </span>
    </div>
  );
}

/* ─── Page ─── */

export default function DesignTokensPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Docs', 'Design tokens']}
        title="Design tokens"
        description="Complete reference of all CSS custom properties available in omverse-ui."
      />

      <div style={{ padding: '28px 40px', maxWidth: 760, margin: '0 auto' }}>

        <p style={{
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.7,
          marginBottom: 32,
          marginTop: 0,
        }}>
          All tokens are declared with{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>@theme</code> in{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>omverse-ui/styles</code> and are
          available as both CSS variables and Tailwind utility classes. Override any token in your own{' '}
          <code style={{ fontFamily: 'var(--font-mono)', fontSize: 12 }}>:root</code> block — see the{' '}
          <strong style={{ color: 'var(--color-text-primary)', fontWeight: 500 }}>Theming</strong> page for details.
        </p>

        {/* ── Color sections ── */}
        <h2 style={{
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 20,
          marginTop: 0,
        }}>
          Colors
        </h2>

        <TokenSection title="Primary" tokens={PRIMARY_TOKENS} />
        <TokenSection title="Secondary" tokens={SECONDARY_TOKENS} />
        <TokenSection title="Background" tokens={BACKGROUND_TOKENS} />
        <TokenSection title="Text" tokens={TEXT_TOKENS} />
        <TokenSection title="Border" tokens={BORDER_TOKENS} />
        <TokenSection title="Status" tokens={STATUS_TOKENS} />

        {/* ── Border radius section ── */}
        <h2 style={{
          fontSize: 16,
          fontWeight: 600,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: 20,
          marginTop: 8,
        }}>
          Border radius
        </h2>

        <div style={{
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 12,
          overflow: 'hidden',
          marginBottom: 32,
        }}>
          {/* Table header */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '44px 1fr 80px 1fr',
            columnGap: 12,
            padding: '7px 16px',
            background: 'var(--color-background-secondary)',
            borderBottom: '0.5px solid var(--color-border-tertiary)',
          }}>
            {(['', 'Token', 'Value', 'Description'] as const).map((h, i) => (
              <span key={i} style={{
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}>
                {h}
              </span>
            ))}
          </div>

          {RADIUS_TOKENS.map((t, i) => (
            <RadiusRow
              key={t.variable}
              variable={t.variable}
              value={t.value}
              description={t.description}
              isLast={i === RADIUS_TOKENS.length - 1}
            />
          ))}
        </div>

      </div>
    </div>
  );
}
