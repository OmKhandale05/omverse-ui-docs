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
  const [copyHovered, setCopyHovered] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ── Tokenizer-based syntax highlighter ─────────────────────────────
  // Processes the line left-to-right so tokens can never nest incorrectly.
  function highlight(rawLine: string): string {
    const out: string[] = [];
    let i = 0;
    const src = rawLine;

    /** Escape HTML special characters */
    function esc(s: string): string {
      return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
    }

    /** Wrap text in a colored span */
    function tok(color: string, text: string, extra?: string): string {
      const suf = extra ? `;${extra}` : '';
      return `<span style="color:${color}${suf}">${text}</span>`;
    }

    const KEYWORDS = new Set([
      'import', 'export', 'from', 'const', 'let', 'var', 'function', 'return',
      'default', 'type', 'interface', 'extends', 'async', 'await', 'if', 'else',
      'for', 'while', 'class', 'new', 'typeof', 'instanceof', 'null', 'undefined',
      'true', 'false', 'as', 'of', 'in', 'switch', 'case', 'break', 'continue',
      'throw', 'try', 'catch', 'finally', 'void', 'readonly', 'static', 'this',
    ]);

    while (i < src.length) {
      const ch = src[i];

      // ── Single-line comment → rest of line in gray italic ───────────
      if (ch === '/' && src[i + 1] === '/') {
        out.push(tok('#546E7A', esc(src.slice(i)), 'font-style:italic'));
        break;
      }

      // ── String literals: ", ', ` ─────────────────────────────────────
      if (ch === '"' || ch === "'" || ch === '`') {
        const q = ch;
        let j = i + 1;
        while (j < src.length) {
          if (src[j] === '\\') { j += 2; continue; }
          if (src[j] === q) { j++; break; }
          j++;
        }
        out.push(tok('#C3E88D', esc(src.slice(i, j))));
        i = j;
        continue;
      }

      // ── JSX / HTML tags: <Tag … > or </Tag> ─────────────────────────
      if (
        ch === '<' &&
        i + 1 < src.length &&
        (src[i + 1] === '/' || /[A-Za-z]/.test(src[i + 1]))
      ) {
        let j = i + 1;
        const isClosing = src[j] === '/';
        if (isClosing) j++;

        const nameStart = j;
        while (j < src.length && /[a-zA-Z0-9._-]/.test(src[j])) j++;
        const tagName = src.slice(nameStart, j);

        if (tagName) {
          // Emit tag opener: <TagName or </TagName
          out.push(tok('#F07178', '&lt;' + (isClosing ? '/' : '') + esc(tagName)));
          i = j;

          // Parse attributes until we reach > or />
          while (
            i < src.length &&
            !(src[i] === '>') &&
            !(src[i] === '/' && src[i + 1] === '>')
          ) {
            const ac = src[i];

            // Attribute value: quoted string
            if (ac === '"' || ac === "'" || ac === '`') {
              const q = ac;
              let k = i + 1;
              while (k < src.length) {
                if (src[k] === '\\') { k += 2; continue; }
                if (src[k] === q) { k++; break; }
                k++;
              }
              out.push(tok('#C3E88D', esc(src.slice(i, k))));
              i = k;
              continue;
            }

            // Attribute name (word chars)
            if (/[a-zA-Z_]/.test(ac)) {
              let k = i;
              while (k < src.length && /[a-zA-Z0-9_-]/.test(src[k])) k++;
              out.push(tok('#FFCB6B', esc(src.slice(i, k))));
              i = k;
              continue;
            }

            // Inline JSX expression { … }
            if (ac === '{') {
              let depth = 1;
              let k = i + 1;
              while (k < src.length && depth > 0) {
                if (src[k] === '{') depth++;
                else if (src[k] === '}') depth--;
                k++;
              }
              out.push(esc(src.slice(i, k)));
              i = k;
              continue;
            }

            // Anything else (spaces, =, etc.)
            out.push(esc(ac));
            i++;
          }

          // Closing delimiter: /> or >
          if (i < src.length) {
            if (src[i] === '/' && src[i + 1] === '>') {
              out.push(tok('#F07178', '/>'));
              i += 2;
            } else if (src[i] === '>') {
              out.push(tok('#F07178', '&gt;'));
              i++;
            }
          }
          continue;
        }
      }

      // ── Numbers ──────────────────────────────────────────────────────
      if (/[0-9]/.test(ch)) {
        let j = i;
        while (j < src.length && /[0-9._]/.test(src[j])) j++;
        out.push(tok('#F78C6C', esc(src.slice(i, j))));
        i = j;
        continue;
      }

      // ── Identifiers, keywords, PascalCase component names ────────────
      if (/[a-zA-Z_$]/.test(ch)) {
        let j = i;
        while (j < src.length && /[a-zA-Z0-9_$]/.test(src[j])) j++;
        const word = src.slice(i, j);

        if (KEYWORDS.has(word)) {
          out.push(tok('#C792EA', word));          // keywords  → purple
        } else if (/^[A-Z]/.test(word)) {
          out.push(tok('#82AAFF', word));           // PascalCase → blue
        } else {
          out.push(esc(word));                      // everything else → default
        }
        i = j;
        continue;
      }

      // ── Fallthrough: escape and emit ─────────────────────────────────
      out.push(esc(ch));
      i++;
    }

    return out.join('');
  }

  const lines = code.split('\n');
  // Width for the line-number column (e.g. 3 chars if 100+ lines)
  const lnWidth = String(lines.length).length;

  return (
    <div
      style={{
        background: '#0D0D12',
        border: '0.5px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 24,
      }}
    >
      {/* ── Top bar ──────────────────────────────────────────────────── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 36,
          padding: '0 14px',
          background: '#111118',
          borderBottom: '0.5px solid rgba(255,255,255,0.06)',
          flexShrink: 0,
        }}
      >
        {/* Left: traffic-light dots + filename */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* macOS-style dots */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#FF5F57',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#FFBD2E',
                flexShrink: 0,
              }}
            />
            <span
              style={{
                display: 'inline-block',
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: '#28CA41',
                flexShrink: 0,
              }}
            />
          </div>

          {/* Filename */}
          <span
            style={{
              fontSize: 11,
              fontFamily: 'var(--font-geist-mono), var(--font-mono), monospace',
              color: 'rgba(255,255,255,0.4)',
              userSelect: 'none',
              letterSpacing: '0.01em',
            }}
          >
            {filename}
          </span>
        </div>

        {/* Right: language badge + copy button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Language pill */}
          <span
            style={{
              fontSize: 10,
              fontFamily: 'var(--font-geist-mono), var(--font-mono), monospace',
              color: 'rgba(255,255,255,0.3)',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: 4,
              padding: '2px 7px',
              userSelect: 'none',
              letterSpacing: '0.04em',
            }}
          >
            {language}
          </span>

          {/* Copy button */}
          <button
            type="button"
            title={copied ? 'Copied!' : 'Copy'}
            onClick={handleCopy}
            onMouseEnter={() => setCopyHovered(true)}
            onMouseLeave={() => setCopyHovered(false)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 28,
              height: 28,
              borderRadius: 6,
              border: 'none',
              background: copyHovered && !copied
                ? 'rgba(255,255,255,0.08)'
                : 'transparent',
              color: copied
                ? '#10B981'
                : copyHovered
                ? 'rgba(255,255,255,0.7)'
                : 'rgba(255,255,255,0.3)',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              flexShrink: 0,
            }}
          >
            <i
              className={copied ? 'ti ti-check' : 'ti ti-copy'}
              aria-hidden="true"
              style={{ fontSize: 14 }}
            />
          </button>
        </div>
      </div>

      {/* ── Code body ────────────────────────────────────────────────── */}
      <div
        style={{
          padding: 16,
          fontFamily: 'var(--font-geist-mono), var(--font-mono), monospace',
          fontSize: 12,
          lineHeight: 1.8,
          background: '#0D0D12',
          overflowX: 'auto',
        }}
      >
        {lines.map((line, idx) => (
          <div key={idx} style={{ display: 'flex', minHeight: '1.8em' }}>
            {/* Line number */}
            <span
              style={{
                color: 'rgba(255,255,255,0.15)',
                userSelect: 'none',
                flexShrink: 0,
                width: `${lnWidth + 1}ch`,
                textAlign: 'right',
                marginRight: 20,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {idx + 1}
            </span>

            {/* Highlighted line content */}
            <span
              style={{ color: '#E2E8F0', flex: 1, whiteSpace: 'pre' }}
              // highlight() returns escaped + wrapped HTML — safe, never from user input
              dangerouslySetInnerHTML={{ __html: highlight(line) || ' ' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
