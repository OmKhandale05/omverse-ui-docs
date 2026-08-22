'use client';

import { IconButton } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table ─── */

const ICON_BUTTON_PROPS = [
  {
    name: 'icon',
    type: 'IconName',
    default: '—',
    description: 'Icon to display — required',
  },
  {
    name: 'aria-label',
    type: 'string',
    default: '—',
    description: 'Accessible label — TypeScript-required for icon-only buttons',
  },
  {
    name: 'variant',
    type: "'filled' | 'outlined' | 'tonal' | 'ghost' | 'standard' | 'destructive'",
    default: "'ghost'",
    description: 'Visual style',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Button size (all sizes keep a 44 × 44 px minimum touch target)',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: "'circle'",
    description: 'Button shape',
  },
  {
    name: 'toggle',
    type: 'boolean',
    default: 'false',
    description: 'Toggleable on / off state with aria-pressed',
  },
  {
    name: 'pressed',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled pressed state for toggle mode',
  },
  {
    name: 'onPressedChange',
    type: '(pressed: boolean) => void',
    default: 'undefined',
    description: 'Callback fired when pressed state changes',
  },
  {
    name: 'pressedIcon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon shown when toggle is in pressed state',
  },
  {
    name: 'badge',
    type: 'boolean | number',
    default: 'undefined',
    description: 'true → red dot  ·  number → count badge (capped at 99+)',
  },
  {
    name: 'tooltip',
    type: 'boolean',
    default: 'true',
    description: 'Show a tooltip with the aria-label text on hover / focus',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a loading spinner and disables interaction',
  },
  {
    name: 'gradient',
    type: 'boolean',
    default: 'false',
    description: 'Apply brand gradient background (filled / destructive variants)',
  },
  {
    name: 'fab',
    type: 'boolean',
    default: 'false',
    description: 'Floating action button style — adds elevation shadow',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

const API_PROPS = ICON_BUTTON_PROPS;

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { IconButton } from 'omverse-ui'

// 6 variants
<IconButton icon="heart" variant="filled"      aria-label="Like" />
<IconButton icon="heart" variant="outlined"    aria-label="Like" />
<IconButton icon="heart" variant="tonal"       aria-label="Like" />
<IconButton icon="heart" variant="ghost"       aria-label="Like" />
<IconButton icon="heart" variant="standard"    aria-label="Like" />
<IconButton icon="heart" variant="destructive" aria-label="Like" />

// gradient is a boolean prop (not a variant) — combine with filled:
<IconButton icon="heart" variant="filled" gradient aria-label="Like" />`;

const SIZES_CODE = `<IconButton icon="settings" size="xs" aria-label="Settings" />
<IconButton icon="settings" size="sm" aria-label="Settings" />
<IconButton icon="settings" size="md" aria-label="Settings" />
<IconButton icon="settings" size="lg" aria-label="Settings" />
<IconButton icon="settings" size="xl" aria-label="Settings" />`;

const SHAPE_CODE = `// circle (default)
<IconButton icon="plus" variant="filled" shape="circle" aria-label="Add" />

// square
<IconButton icon="plus" variant="filled" shape="square" aria-label="Add" />`;

const TOGGLE_CODE = `// Uncontrolled toggle — component manages its own state
<IconButton icon="heart"     variant="ghost" toggle aria-label="Like" />
<IconButton icon="bookmark"  variant="ghost" toggle aria-label="Bookmark" />
<IconButton icon="star"      variant="ghost" toggle aria-label="Star" />

// Controlled toggle with pressedIcon
<IconButton
  icon="bookmark"
  pressedIcon="bookmark"
  variant="ghost"
  toggle
  pressed={saved}
  onPressedChange={setSaved}
  aria-label="Save"
/>`;

const BADGE_CODE = `// Dot badge (true)
<IconButton icon="bell" variant="outlined" badge={true} aria-label="Notifications" />

// Count badge
<IconButton icon="bell"     variant="outlined" badge={3}  aria-label="3 notifications" />
<IconButton icon="mail"     variant="outlined" badge={12} aria-label="12 messages" />
<IconButton icon="bookmark" variant="outlined" badge={99} aria-label="99 saved items" />`;

const LOADING_CODE = `// loading shows a spinner and disables interaction
<IconButton icon="refresh" variant="filled"   loading aria-label="Refresh" />
<IconButton icon="upload"  variant="outlined" loading aria-label="Upload" />`;

const FAB_CODE = `// fab adds an elevation shadow — pair with size="xl" for classic FAB
<IconButton icon="plus" variant="filled" fab         aria-label="Add" />
<IconButton icon="edit" variant="tonal"  fab         aria-label="Edit" />
<IconButton icon="plus" variant="filled" fab size="xl" shape="square" aria-label="Add" />`;

const GRADIENT_CODE = `// gradient applies a brand gradient background (filled / destructive)
<IconButton icon="plus"  variant="filled"      gradient aria-label="Add" />
<IconButton icon="trash" variant="destructive" gradient aria-label="Delete" />`;

const DISABLED_CODE = `<IconButton icon="settings" variant="filled"   disabled aria-label="Settings" />
<IconButton icon="settings" variant="outlined" disabled aria-label="Settings" />
<IconButton icon="settings" variant="ghost"    disabled aria-label="Settings" />`;

/* ─── Shared row helper ─── */

const row: React.CSSProperties = {
  display: 'flex',
  gap: 12,
  alignItems: 'center',
  flexWrap: 'wrap',
};

/* ─── Page ─── */

export default function IconButtonPage() {
return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Form', 'IconButton']}        title="IconButton"        description="Icon-only button with tooltip, badge, toggle and FAB support. 6 variants, 5 sizes."        tags={['6 variants', '5 sizes', 'Toggle', 'Badge', 'Tooltip', 'FAB', 'Loading']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Icon-only button with tooltip, badge, toggle and FAB support. 6 variants, 5 sizes.">
          <div className="component-doc-stack">
            <ComponentPreview title="Icon button variants" description="Every icon-only action needs a concise accessible name.">
              <IconButton icon="heart" variant="filled" aria-label="Like" />
              <IconButton icon="heart" variant="outlined" aria-label="Like" />
              <IconButton icon="heart" variant="tonal" aria-label="Like" />
              <IconButton icon="heart" variant="ghost" aria-label="Like" />
              <IconButton icon="heart" variant="standard" aria-label="Like" />
              <IconButton icon="heart" variant="destructive" aria-label="Unlike" />
            </ComponentPreview>
            <CodeBlock filename="IconButtonExample.tsx" code={VARIANTS_CODE} />
            <div className="component-doc-prose">
              <p>Use icon buttons only for actions with widely understood symbols and provide an aria-label that describes the action.</p>
            </div>
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
            <li>Choose IconButton when a repeated, structured interaction is required.</li>
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
          
            {/* ── Section 1: Variants ── */}
            <ComponentPreview
              title="Variants"
              description="6 emphasis levels — filled · outlined · tonal · ghost · standard · destructive. gradient is a boolean prop applied on top of a variant."
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={row}>
                  <IconButton icon="heart" variant="filled"      aria-label="Like (filled)" />
                  <IconButton icon="heart" variant="outlined"    aria-label="Like (outlined)" />
                  <IconButton icon="heart" variant="tonal"       aria-label="Like (tonal)" />
                  <IconButton icon="heart" variant="ghost"       aria-label="Like (ghost)" />
                  <IconButton icon="heart" variant="standard"    aria-label="Like (standard)" />
                  <IconButton icon="heart" variant="destructive" aria-label="Like (destructive)" />
                </div>
                {/* gradient row */}
                <div style={row}>
                  <IconButton icon="heart" variant="filled"      gradient aria-label="Like (gradient)" />
                  <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>
                    variant=&quot;filled&quot; gradient
                  </span>
                </div>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />
          
            {/* ── Section 2: Sizes ── */}
            <ComponentPreview
              title="Sizes"
              description="xs · sm · md · lg · xl — all sizes keep a 44 × 44 px minimum touch target"
            >
              <div style={{ ...row, alignItems: 'flex-end' }}>
                <IconButton icon="settings" size="xs" aria-label="Settings (xs)" />
                <IconButton icon="settings" size="sm" aria-label="Settings (sm)" />
                <IconButton icon="settings" size="md" aria-label="Settings (md)" />
                <IconButton icon="settings" size="lg" aria-label="Settings (lg)" />
                <IconButton icon="settings" size="xl" aria-label="Settings (xl)" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIZES_CODE} />
          
            {/* ── Section 3: Shape ── */}
            <ComponentPreview
              title="Shape"
              description="circle (default) or square — square pairs well with FAB"
            >
              <div style={row}>
                <IconButton icon="plus" variant="filled" shape="circle" aria-label="Add (circle)" />
                <IconButton icon="plus" variant="filled" shape="square" aria-label="Add (square)" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SHAPE_CODE} />
          
            {/* ── Section 4: Toggle ── */}
            <ComponentPreview
              title="Toggle"
              description="toggle enables a pressed / unpressed state with aria-pressed — click to switch"
            >
              <div style={row}>
                <IconButton icon="heart"    variant="ghost" toggle aria-label="Like" />
                <IconButton icon="bookmark" variant="ghost" toggle aria-label="Bookmark" />
                <IconButton icon="star"     variant="ghost" toggle aria-label="Star" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={TOGGLE_CODE} />
          
            {/* ── Section 5: With badge ── */}
            <ComponentPreview
              title="With badge"
              description="badge={true} shows a red dot · badge={n} shows a count (capped at 99+)"
            >
              <div style={row}>
                <IconButton icon="bell"     variant="outlined" badge={true} aria-label="Notifications" />
                <IconButton icon="bell"     variant="outlined" badge={3}    aria-label="3 notifications" />
                <IconButton icon="mail"     variant="outlined" badge={12}   aria-label="12 messages" />
                <IconButton icon="bookmark" variant="outlined" badge={99}   aria-label="99 saved items" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={BADGE_CODE} />
          
            {/* ── Section 6: Loading ── */}
            <ComponentPreview
              title="Loading"
              description="loading replaces the icon with a spinner and disables interaction"
            >
              <div style={row}>
                <IconButton icon="refresh" variant="filled"   loading aria-label="Refresh" />
                <IconButton icon="upload"  variant="outlined" loading aria-label="Upload" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={LOADING_CODE} />
          
            {/* ── Section 7: FAB ── */}
            <ComponentPreview
              title="FAB (Floating Action Button)"
              description="fab adds an elevation shadow — pair with size='xl' and shape='square' for the classic Material FAB"
            >
              <div style={{ ...row, alignItems: 'flex-end' }}>
                <IconButton icon="plus" variant="filled" fab aria-label="Add" />
                <IconButton icon="edit" variant="tonal"  fab aria-label="Edit" />
                <IconButton icon="plus" variant="filled" fab size="xl" shape="square" aria-label="Add (xl)" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={FAB_CODE} />
          
            {/* ── Section 8: Gradient ── */}
            <ComponentPreview
              title="Gradient"
              description="gradient is a boolean prop — applies a brand gradient on filled and destructive variants"
            >
              <div style={row}>
                <IconButton icon="plus"  variant="filled"      gradient aria-label="Add (gradient)" />
                <IconButton icon="trash" variant="destructive" gradient aria-label="Delete (gradient)" />
                <IconButton icon="star"  variant="filled"      gradient size="lg" aria-label="Star (gradient lg)" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />
          
            {/* ── Section 9: Disabled ── */}
            <ComponentPreview
              title="Disabled"
              description="disabled reduces opacity and prevents all interaction"
            >
              <div style={row}>
                <IconButton icon="settings" variant="filled"   disabled aria-label="Settings" />
                <IconButton icon="settings" variant="outlined" disabled aria-label="Settings" />
                <IconButton icon="settings" variant="ghost"    disabled aria-label="Settings" />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={DISABLED_CODE} />
          
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
            <li>Use IconButton alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep iconbutton behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
