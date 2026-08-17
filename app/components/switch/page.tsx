'use client';

import { useState } from 'react';
import { Switch } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table ─── */

const SWITCH_PROPS = [
  { name: 'label',           type: 'ReactNode',                                                                  default: '—',         description: 'Label text shown next to the switch' },
  { name: 'helperText',      type: 'string',                                                                     default: '—',         description: 'Helper text shown below the label' },
  { name: 'description',     type: 'string',                                                                     default: '—',         description: 'Description inside the card (card=true only)' },
  { name: 'size',            type: "'sm' | 'md' | 'lg'",                                                        default: "'md'",      description: 'Size of the switch' },
  { name: 'color',           type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",       default: "'default'", description: 'Color when on' },
  { name: 'labelPosition',   type: "'left' | 'right'",                                                          default: "'right'",   description: 'Position of the label relative to the switch' },
  { name: 'checkedIcon',     type: 'string',                                                                     default: '—',         description: 'Icon name shown inside the thumb when on' },
  { name: 'uncheckedIcon',   type: 'string',                                                                     default: '—',         description: 'Icon name shown inside the thumb when off' },
  { name: 'card',            type: 'boolean',                                                                    default: 'false',     description: 'Wraps the switch in a bordered card' },
  { name: 'disabled',        type: 'boolean',                                                                    default: 'false',     description: 'Disables the switch' },
  { name: 'checked',         type: 'boolean',                                                                    default: '—',         description: 'Controlled checked state' },
  { name: 'defaultChecked',  type: 'boolean',                                                                    default: 'false',     description: 'Uncontrolled initial checked state' },
  { name: 'onChange',        type: 'React.ChangeEventHandler<HTMLInputElement>',                                 default: '—',         description: 'Change event callback' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const API_PROPS = SWITCH_PROPS;

/* ─── Code snippets ─── */

const STATES_CODE = `<Switch label="Off" />
<Switch label="On"            defaultChecked />
<Switch label="Disabled off"  disabled />
<Switch label="Disabled on"   disabled defaultChecked />`;

const COLORS_CODE = `<Switch label="Default (primary)" color="default"   defaultChecked />
<Switch label="Secondary"         color="secondary" defaultChecked />
<Switch label="Success"           color="success"   defaultChecked />
<Switch label="Warning"           color="warning"   defaultChecked />
<Switch label="Error"             color="error"     defaultChecked />
<Switch label="Info"              color="info"      defaultChecked />`;

const SIZES_CODE = `<Switch label="Small"            size="sm" defaultChecked />
<Switch label="Medium (default)" size="md" defaultChecked />
<Switch label="Large"            size="lg" defaultChecked />`;

const ICONS_CODE = `const [wifi, setWifi]   = useState(true)
const [bell, setBell]   = useState(false)
const [check, setCheck] = useState(true)

<Switch
  label="Wi-Fi"
  checkedIcon="check"
  uncheckedIcon="close"
  checked={wifi}
  onChange={e => setWifi(e.target.checked)}
/>
<Switch
  label="Notifications"
  checkedIcon="bell"
  checked={bell}
  onChange={e => setBell(e.target.checked)}
/>
<Switch
  label="Sync"
  checkedIcon="check"
  checked={check}
  onChange={e => setCheck(e.target.checked)}
/>`;

const LABEL_POS_CODE = `const [left, setLeft]   = useState(true)
const [right, setRight] = useState(false)

<Switch label="Label on the right (default)" labelPosition="right" checked={right} onChange={e => setRight(e.target.checked)} />
<Switch label="Label on the left"            labelPosition="left"  checked={left}  onChange={e => setLeft(e.target.checked)} />`;

const CARD_CODE = `const [darkMode,  setDarkMode]  = useState(false)
const [autoSave,  setAutoSave]  = useState(true)
const [analytics, setAnalytics] = useState(false)

<Switch
  card
  label="Dark mode"
  description="Switch to a darker color scheme"
  checked={darkMode}
  onChange={e => setDarkMode(e.target.checked)}
/>
<Switch
  card
  label="Auto-save"
  description="Save your work automatically every minute"
  checked={autoSave}
  onChange={e => setAutoSave(e.target.checked)}
/>
<Switch
  card
  label="Analytics"
  description="Help improve the product by sharing usage data"
  checked={analytics}
  onChange={e => setAnalytics(e.target.checked)}
  disabled
/>`;

/* ─── Page ─── */

export default function SwitchPage() {
  const [wifi,      setWifi]      = useState(true);
  const [bell,      setBell]      = useState(false);
  const [syncOn,    setSyncOn]    = useState(true);
  const [labelLeft, setLabelLeft] = useState(true);
  const [labelRight, setLabelRight] = useState(false);
  const [darkMode,   setDarkMode]  = useState(false);
  const [autoSave,   setAutoSave]  = useState(true);
  const [analytics,  setAnalytics] = useState(false);

return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Form', 'Switch']}        title="Switch"        description="6 colors · 3 sizes · icons · label positions · card style"        tags={['States', 'Colors', 'Sizes', 'With icons', 'Label position', 'Card style']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="6 colors · 3 sizes · icons · label positions · card style">
          <div className="component-doc-prose">
            <p>Use Switch to present and interact with structured information in a predictable, accessible way.</p>
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
            <li>Choose Switch when a repeated, structured interaction is required.</li>
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
          {/* ── Content ── */}
          <div style={{ padding: '28px 40px' }}>
          
            {/* ── Section 1: States ── */}
            <ComponentPreview
              title="States"
              description="Off, on, disabled off, and disabled on"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch label="Off" />
                <Switch label="On"           defaultChecked />
                <Switch label="Disabled off" disabled />
                <Switch label="Disabled on"  disabled defaultChecked />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={STATES_CODE} />
          
            {/* ── Section 2: Colors ── */}
            <ComponentPreview
              title="Colors"
              description="Six color variants — default, secondary, success, warning, error, and info"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch label="Default (primary)" color="default"   defaultChecked />
                <Switch label="Secondary"         color="secondary" defaultChecked />
                <Switch label="Success"           color="success"   defaultChecked />
                <Switch label="Warning"           color="warning"   defaultChecked />
                <Switch label="Error"             color="error"     defaultChecked />
                <Switch label="Info"              color="info"      defaultChecked />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={COLORS_CODE} />
          
            {/* ── Section 3: Sizes ── */}
            <ComponentPreview
              title="Sizes"
              description="sm, md (default), and lg switch sizes"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch label="Small"            size="sm" defaultChecked />
                <Switch label="Medium (default)" size="md" defaultChecked />
                <Switch label="Large"            size="lg" defaultChecked />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIZES_CODE} />
          
            {/* ── Section 4: With icons ── */}
            <ComponentPreview
              title="With icons"
              description="Show icons inside the thumb using checkedIcon and uncheckedIcon props"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch
                  label="Wi-Fi"
                  checkedIcon="check"
                  uncheckedIcon="close"
                  checked={wifi}
                  onChange={e => setWifi(e.target.checked)}
                />
                <Switch
                  label="Notifications"
                  checkedIcon="bell"
                  checked={bell}
                  onChange={e => setBell(e.target.checked)}
                />
                <Switch
                  label="Sync"
                  checkedIcon="check"
                  checked={syncOn}
                  onChange={e => setSyncOn(e.target.checked)}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={ICONS_CODE} />
          
            {/* ── Section 5: Label positions ── */}
            <ComponentPreview
              title="Label positions"
              description="Label can appear on the right (default) or left of the switch"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <Switch
                  label="Label on the right (default)"
                  labelPosition="right"
                  checked={labelRight}
                  onChange={e => setLabelRight(e.target.checked)}
                />
                <Switch
                  label="Label on the left"
                  labelPosition="left"
                  checked={labelLeft}
                  onChange={e => setLabelLeft(e.target.checked)}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={LABEL_POS_CODE} />
          
            {/* ── Section 6: Card style ── */}
            <ComponentPreview
              title="Card style"
              description="Bordered card layout — ideal for settings panels"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 380 }}>
                <Switch
                  card
                  label="Dark mode"
                  helperText="Switch to a darker color scheme"
                  checked={darkMode}
                  onChange={e => setDarkMode(e.target.checked)}
                />
                <Switch
                  card
                  label="Auto-save"
                  helperText="Save your work automatically every minute"
                  checked={autoSave}
                  onChange={e => setAutoSave(e.target.checked)}
                />
                <Switch
                  card
                  label="Analytics"
                  helperText="Help improve the product by sharing usage data"
                  checked={analytics}
                  onChange={e => setAnalytics(e.target.checked)}
                  disabled
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={CARD_CODE} />
          
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
            <li>Use Switch alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep switch behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
