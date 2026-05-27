'use client'

import { useState } from 'react'
import { EXAMPLES } from './examples/index'
import { CodeBlock } from '@/components/ui/CodeBlock'

/* ─── Page ──────────────────────────────────────────────────────────────── */

export default function ExamplesPage() {
  const [activeId, setActiveId] = useState('dashboard')
  const [view, setView] = useState<'preview' | 'code'>('preview')
  const [copied, setCopied] = useState(false)

  const example  = EXAMPLES.find((e) => e.id === activeId)
  const Component = example?.component ?? null
  const code      = example?.code      ?? null

  async function handleCopy() {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  function handleTabChange(id: string) {
    setActiveId(id)
    setView('preview')
  }

  return (
    <div>
      {/* Responsive rules */}
      <style>{`
        .ex-header   { padding: 40px 48px 0; }
        .ex-tabs     { padding: 0 48px; }
        .ex-toggle   { padding: 10px 48px; }
        .ex-content  { padding: 32px 48px 64px; }
        @media (max-width: 767px) {
          .ex-header  { padding: 28px 20px 0; }
          .ex-tabs    { padding: 0 20px; }
          .ex-toggle  { padding: 8px 20px; }
          .ex-content { padding: 20px 20px 48px; }
        }
      `}</style>

      {/* ── Page header ── */}
      <div className="ex-header">
        <h1
          style={{
            fontSize: 26,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 6,
          }}
        >
          Examples
        </h1>
        <p
          style={{
            fontSize: 14,
            color: 'var(--color-text-secondary)',
            marginBottom: 28,
          }}
        >
          Full-page layouts built with omverse-ui.
        </p>
      </div>

      {/* ── Tab bar ── */}
      <div
        style={{
          borderBottom: '0.5px solid var(--color-outline-variant)',
          overflowX: 'auto',
          scrollbarWidth: 'none',
        }}
      >
        <div
          className="ex-tabs"
          style={{ display: 'flex', minWidth: 'max-content' }}
        >
          {EXAMPLES.map((ex) => {
            const isActive = ex.id === activeId
            return (
              <button
                key={ex.id}
                onClick={() => handleTabChange(ex.id)}
                style={{
                  position: 'relative',
                  padding: '10px 14px',
                  fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  color: isActive
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'color 150ms ease',
                }}
              >
                {ex.label}
                {isActive && (
                  <span
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: 1.5,
                      background: 'var(--color-text-primary)',
                      borderRadius: '2px 2px 0 0',
                    }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Preview / Code toggle bar ── */}
      <div
        className="ex-toggle"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          borderBottom: '0.5px solid var(--color-outline-variant)',
        }}
      >
        {/* Toggle pill */}
        <div
          style={{
            display: 'flex',
            background: 'var(--color-surface-variant)',
            borderRadius: 7,
            padding: 3,
            gap: 2,
          }}
        >
          {(['preview', 'code'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '4px 14px',
                fontSize: 12,
                fontWeight: view === v ? 500 : 400,
                borderRadius: 5,
                border: 'none',
                cursor: 'pointer',
                color:
                  view === v
                    ? 'var(--color-text-primary)'
                    : 'var(--color-text-secondary)',
                background:
                  view === v ? 'var(--color-background)' : 'transparent',
                transition: 'all 150ms ease',
              }}
            >
              {v === 'preview' ? 'Preview' : 'Code'}
            </button>
          ))}
        </div>

        {/* Copy button — only shown when code exists */}
        {code && (
          <button
            onClick={handleCopy}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '4px 12px',
              fontSize: 12,
              fontWeight: 400,
              borderRadius: 6,
              border: '0.5px solid var(--color-outline-variant)',
              background: 'transparent',
              color: copied
                ? 'var(--color-success)'
                : 'var(--color-text-secondary)',
              cursor: 'pointer',
              transition: 'color 150ms ease',
            }}
          >
            <i
              className={copied ? 'ti ti-check' : 'ti ti-copy'}
              style={{ fontSize: 13 }}
              aria-hidden="true"
            />
            {copied ? 'Copied!' : 'Copy'}
          </button>
        )}
      </div>

      {/* ── Content ── */}
      <div className="ex-content">
        {view === 'preview' && (
          Component ? (
            <Component />
          ) : (
            <ComingSoon label={example?.label ?? ''} />
          )
        )}

        {view === 'code' && (
          code ? (
            <CodeBlock
              code={code}
              filename={example?.filename ?? 'index.tsx'}
              language="tsx"
            />
          ) : (
            <ComingSoon label={example?.label ?? ''} />
          )
        )}
      </div>
    </div>
  )
}

/* ─── Coming Soon placeholder ────────────────────────────────────────────── */

function ComingSoon({ label }: { label: string }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px',
        gap: 12,
        borderRadius: 12,
        border: '0.5px dashed var(--color-outline-variant)',
        textAlign: 'center',
      }}
    >
      <i
        className="ti ti-layout-grid"
        style={{ fontSize: 32, color: 'var(--color-text-disabled)' }}
        aria-hidden="true"
      />
      <p
        style={{
          fontSize: 15,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
        }}
      >
        {label} — coming soon
      </p>
      <p
        style={{
          fontSize: 13,
          color: 'var(--color-text-secondary)',
          maxWidth: 300,
        }}
      >
        This example is being built. Check back soon.
      </p>
    </div>
  )
}
