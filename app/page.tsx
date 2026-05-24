import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';

export default function HomePage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        textAlign: 'center',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          height: 24,
          padding: '0 10px',
          borderRadius: 9999,
          border: '0.5px solid var(--color-outline-variant)',
          fontSize: 11,
          color: 'var(--color-text-secondary)',
          marginBottom: 24,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--color-success)', display: 'inline-block' }} />
          v0.1.4 — Now available on npm
        </div>

        {/* Headline */}
        <h1 style={{
          fontSize: 52,
          fontWeight: 500,
          letterSpacing: '-0.04em',
          color: 'var(--color-text-primary)',
          lineHeight: 1.1,
          maxWidth: 640,
          marginBottom: 20,
        }}>
          Build interfaces faster with omverse-ui
        </h1>

        {/* Subtext */}
        <p style={{
          fontSize: 16,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          maxWidth: 480,
          marginBottom: 36,
          fontWeight: 400,
        }}>
          27 components built with Tailwind v4, TypeScript and CVA.
          Material Design 3 foundation. Fully typed. Dark mode ready.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 48 }}>
          <Link
            href="/docs/installation"
            style={{
              height: 36,
              padding: '0 20px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 500,
              background: '#000000',
              color: '#ffffff',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            Get started
            <i className="ti ti-arrow-right" aria-hidden="true" style={{ fontSize: 13 }} />
          </Link>
          <Link
            href="/components/button"
            style={{
              height: 36,
              padding: '0 20px',
              borderRadius: 9999,
              fontSize: 13,
              fontWeight: 400,
              background: 'transparent',
              color: 'var(--color-text-secondary)',
              border: '0.5px solid var(--color-border)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            View components
          </Link>
        </div>

        {/* Install snippet */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          height: 36,
          padding: '0 16px',
          borderRadius: 8,
          background: 'var(--color-surface)',
          border: '0.5px solid var(--color-outline-variant)',
          fontSize: 12,
          fontFamily: 'var(--font-mono)',
          color: 'var(--color-text-secondary)',
          marginBottom: 64,
        }}>
          <span style={{ color: 'var(--color-text-disabled)' }}>$</span>
          <span>npm install omverse-ui</span>
          <button
            type="button"
            aria-label="Copy install command"
            style={{
              marginLeft: 8,
              color: 'var(--color-text-disabled)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              fontSize: 13,
            }}
          >
            <i className="ti ti-copy" aria-hidden="true" />
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'flex',
          gap: 40,
          borderTop: '0.5px solid var(--color-outline-variant)',
          paddingTop: 32,
        }}>
          {[
            { value: '27', label: 'Components' },
            { value: '150+', label: 'Variants' },
            { value: 'v4', label: 'Tailwind' },
            { value: 'MIT', label: 'License' },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 20, fontWeight: 500, color: 'var(--color-text-primary)', letterSpacing: '-0.03em' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 11, color: 'var(--color-text-disabled)', marginTop: 2 }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}