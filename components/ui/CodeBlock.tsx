'use client';

import { useState } from 'react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeBlock({
  code,
  language = 'tsx',
  filename = 'App.tsx',
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Simple syntax highlighting
  function highlight(line: string): string {
    // 1. Escape HTML first
    let escaped = line
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    // 2. Comments first — stops keywords/strings inside them from being re-highlighted
    escaped = escaped.replace(
      /(\/\/.*$)/,
      '<span style="color:#6B7280;font-style:italic">$1</span>',
    );

    // 3. Strings — double quotes (handles both raw " and HTML-encoded &quot;)
    escaped = escaped.replace(
      /(&quot;|")((?:[^"\\]|\\.)*)(&quot;|")/g,
      '<span style="color:#10B981">"$2"</span>',
    );

    // 4. Strings — single quotes
    escaped = escaped.replace(
      /'([^']*)'/g,
      `<span style="color:#10B981">'$1'</span>`,
    );

    // 5. Keywords
    escaped = escaped.replace(
      /\b(import|export|from|const|let|var|function|return|default|type|interface|extends|async|await)\b/g,
      '<span style="color:#3B82F6">$1</span>',
    );

    return escaped;
  }

  const lines = code.split('\n');

  return (
    <div
      style={{
        border: '0.5px solid var(--color-border-tertiary)',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          background: 'var(--color-background-secondary)',
          borderBottom: '0.5px solid var(--color-border-tertiary)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-border-secondary)',
            }}
          />
          <span
            style={{
              fontSize: 11,
              color: 'var(--color-text-tertiary)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {filename}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          style={{
            fontSize: 11,
            color: copied ? 'var(--color-text-success)' : 'var(--color-text-tertiary)',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontFamily: 'inherit',
            transition: 'color 150ms',
          }}
        >
          <i
            className={copied ? 'ti ti-check' : 'ti ti-copy'}
            aria-hidden="true"
            style={{ fontSize: 12 }}
          />
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code body */}
      <div
        style={{
          padding: '14px 16px',
          fontFamily: 'var(--font-mono)',
          fontSize: 11,
          lineHeight: 1.8,
          background: 'var(--color-background-primary)',
          overflowX: 'auto',
        }}
      >
        {lines.map((line, i) => (
          <div key={i} style={{ display: 'flex', gap: 0 }}>
            <span
              style={{
                color: '#9CA3AF',
                marginRight: 16,
                userSelect: 'none',
                display: 'inline-block',
                width: 16,
                textAlign: 'right',
                flexShrink: 0,
              }}
            >
              {i + 1}
            </span>
            <span
              dangerouslySetInnerHTML={{ __html: highlight(line) || '&nbsp;' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}