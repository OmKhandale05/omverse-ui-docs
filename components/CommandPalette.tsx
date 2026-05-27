'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from 'cmdk'
import { COMMAND_GROUPS, COMMAND_ITEMS } from './commandItems'

/* ─── Search icon ─────────────────────────────────────────────────────────── */

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ flexShrink: 0, color: 'var(--color-text-disabled)' }}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  )
}

/* ─── CommandPalette ──────────────────────────────────────────────────────── */

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  /* Listen for the Navbar's search button (and mobile icon) */
  useEffect(() => {
    function handleOpen() { setOpen(true) }
    window.addEventListener('open-command-palette', handleOpen)
    return () => window.removeEventListener('open-command-palette', handleOpen)
  }, [])

  /* ⌘K / Ctrl+K keyboard shortcut — toggles the palette */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  function handleSelect(href: string) {
    setOpen(false)
    router.push(href)
  }

  return (
    <>
      {/* ── Global styles for cmdk attribute selectors ── */}
      <style>{`
        /* Backdrop */
        [cmdk-overlay] {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.48);
          backdrop-filter: blur(3px);
          -webkit-backdrop-filter: blur(3px);
          z-index: 200;
          animation: cmdk-overlay-in 180ms ease;
        }
        @keyframes cmdk-overlay-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* Dialog panel */
        [cmdk-dialog] {
          position: fixed;
          top: 18%;
          left: 50%;
          transform: translateX(-50%);
          width: min(92vw, 640px);
          z-index: 201;
          border-radius: 14px;
          overflow: hidden;
          background: var(--color-background);
          border: 0.5px solid var(--color-outline-variant);
          box-shadow:
            0 0 0 0.5px rgba(0,0,0,0.06),
            0 8px 24px rgba(0,0,0,0.10),
            0 32px 80px rgba(0,0,0,0.16);
          animation: cmdk-dialog-in 180ms ease;
        }
        @keyframes cmdk-dialog-in {
          from { opacity: 0; transform: translateX(-50%) translateY(-10px) scale(0.97); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);    }
        }

        /* Input */
        [cmdk-input] {
          flex: 1;
          min-width: 0;
          padding: 0;
          font-size: 15px;
          font-weight: 400;
          line-height: 1;
          color: var(--color-text-primary);
          background: transparent;
          border: none;
          outline: none;
          font-family: inherit;
          caret-color: var(--color-primary);
        }
        [cmdk-input]::placeholder {
          color: var(--color-text-disabled);
        }

        /* Scrollable results list */
        [cmdk-list] {
          max-height: 380px;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 6px;
          scrollbar-width: thin;
          scrollbar-color: var(--color-outline-variant) transparent;
        }
        [cmdk-list]::-webkit-scrollbar       { width: 4px; }
        [cmdk-list]::-webkit-scrollbar-track { background: transparent; }
        [cmdk-list]::-webkit-scrollbar-thumb { background: var(--color-outline-variant); border-radius: 4px; }

        /* Spacing between groups */
        [cmdk-group] + [cmdk-group] { margin-top: 2px; }

        /* Group label */
        [cmdk-group-heading] {
          font-size: 10px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.07em;
          color: var(--color-text-disabled);
          padding: 10px 10px 4px;
          user-select: none;
        }

        /* Individual item */
        [cmdk-item] {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 8px 10px;
          font-size: 14px;
          font-weight: 400;
          color: var(--color-text-secondary);
          border-radius: 7px;
          cursor: pointer;
          transition: background 80ms ease, color 80ms ease;
          outline: none;
          user-select: none;
        }
        [cmdk-item][data-selected='true'] {
          background: var(--color-surface);
          color: var(--color-text-primary);
          font-weight: 500;
        }
        [cmdk-item]:active {
          background: var(--color-surface-variant);
        }

        /* Empty state */
        [cmdk-empty] {
          padding: 40px 16px;
          text-align: center;
          font-size: 14px;
          color: var(--color-text-disabled);
        }
      `}</style>

      <CommandDialog open={open} onOpenChange={setOpen} label="Search docs and components">

        {/* ── Input row ── */}
        <div
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          10,
            padding:      '0 16px',
            height:       52,
            borderBottom: '0.5px solid var(--color-outline-variant)',
          }}
        >
          <SearchIcon />
          <CommandInput placeholder="Search components, docs, examples…" />
        </div>

        {/* ── Results ── */}
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {COMMAND_GROUPS.map((group) => {
            const items = COMMAND_ITEMS.filter((item) => item.group === group)
            if (!items.length) return null
            return (
              <CommandGroup key={group} heading={group}>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={`${item.label} ${item.group}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    <i
                      className={`ti ${item.icon}`}
                      style={{
                        fontSize:   15,
                        color:      'var(--color-text-disabled)',
                        flexShrink: 0,
                        width:      18,
                        textAlign:  'center',
                      }}
                      aria-hidden="true"
                    />
                    <span>{item.label}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            )
          })}
        </CommandList>

        {/* ── Footer hints ── */}
        <div
          style={{
            display:      'flex',
            alignItems:   'center',
            gap:          16,
            padding:      '8px 14px',
            borderTop:    '0.5px solid var(--color-outline-variant)',
            fontSize:     11,
            color:        'var(--color-text-disabled)',
          }}
        >
          {[
            { key: '↑↓', label: 'navigate' },
            { key: '↵',  label: 'open'     },
            { key: 'Esc', label: 'close'   },
          ].map(({ key, label }) => (
            <span key={key} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <kbd
                style={{
                  display:      'inline-flex',
                  alignItems:   'center',
                  justifyContent: 'center',
                  minWidth:     20,
                  height:       18,
                  padding:      '0 4px',
                  fontSize:     10,
                  fontWeight:   500,
                  fontFamily:   'inherit',
                  borderRadius: 4,
                  background:   'var(--color-surface-variant)',
                  color:        'var(--color-text-secondary)',
                  border:       '0.5px solid var(--color-outline-variant)',
                }}
              >
                {key}
              </kbd>
              {label}
            </span>
          ))}
        </div>

      </CommandDialog>
    </>
  )
}
