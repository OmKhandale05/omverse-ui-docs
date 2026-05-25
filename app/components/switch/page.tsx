'use client';

import { Switch } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const SWITCH_PROPS = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown next to the switch',
  },
  {
    name: 'helperText',
    type: 'string',
    default: 'undefined',
    description: 'Helper text shown below the label',
  },
  {
    name: 'labelPosition',
    type: "'left' | 'right'",
    default: "'right'",
    description: 'Position of the label — right (default) or left (switch pinned to the right)',
  },
  {
    name: 'checkedIcon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon shown inside the thumb when switch is ON',
  },
  {
    name: 'uncheckedIcon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon shown inside the thumb when switch is OFF',
  },
  {
    name: 'card',
    type: 'boolean',
    default: 'false',
    description: 'Wraps in a bordered card — label becomes card title, helperText becomes description',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
    default: "'default'",
    description: 'Track color when the switch is on',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Switch size',
  },
  {
    name: 'checked',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled checked state',
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: 'Initial checked state (uncontrolled)',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the switch',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Switch } from 'omverse-ui'

<Switch label="Airplane mode" />
<Switch label="Dark mode" defaultChecked />
<Switch label="Disabled" disabled />`;

const COLORS_CODE = `<Switch label="Default"   color="default"   defaultChecked />
<Switch label="Secondary" color="secondary" defaultChecked />
<Switch label="Success"   color="success"   defaultChecked />
<Switch label="Warning"   color="warning"   defaultChecked />
<Switch label="Error"     color="error"     defaultChecked />
<Switch label="Info"      color="info"      defaultChecked />`;

const SIZES_CODE = `<Switch size="sm" label="Small switch"  defaultChecked />
<Switch size="md" label="Medium switch" defaultChecked />
<Switch size="lg" label="Large switch"  defaultChecked />`;

const LABEL_POSITION_CODE = `<Switch label="Label on the right" labelPosition="right" defaultChecked />
<Switch label="Label on the left"  labelPosition="left"  defaultChecked />`;

const ICONS_CODE = `<Switch label="Auto-sync"     checkedIcon="refresh" color="success" defaultChecked />
<Switch label="Notifications" checkedIcon="bell"    color="default" defaultChecked />
<Switch label="Auto-play"     checkedIcon="play"    uncheckedIcon="close" />`;

const CARD_CODE = `<Switch
  label="Email notifications"
  helperText="Receive updates and alerts via email"
  card
  defaultChecked
/>
<Switch
  label="Push notifications"
  helperText="Get notified on your mobile device"
  card
/>
<Switch
  label="SMS alerts"
  helperText="Critical alerts only"
  card
  disabled
/>`;

/* ─── Page ─── */

export default function SwitchPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Switch']}
        title="Switch"
        description="An on/off toggle that takes effect immediately. Supports 6 colors, 3 sizes, label positioning, thumb icons and card style."
        tags={['6 colors', '3 sizes', 'Label position', 'Thumb icons', 'Card style']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="Default, pre-checked and disabled states"
        >
          <Switch label="Airplane mode" />
          <Switch label="Dark mode" defaultChecked />
          <Switch label="Disabled" disabled />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 colors applied to the track when the switch is on"
        >
          <Switch label="Default"   color="default"   defaultChecked />
          <Switch label="Secondary" color="secondary" defaultChecked />
          <Switch label="Success"   color="success"   defaultChecked />
          <Switch label="Warning"   color="warning"   defaultChecked />
          <Switch label="Error"     color="error"     defaultChecked />
          <Switch label="Info"      color="info"      defaultChecked />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg"
        >
          <Switch size="sm" label="Small switch"  defaultChecked />
          <Switch size="md" label="Medium switch" defaultChecked />
          <Switch size="lg" label="Large switch"  defaultChecked />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: Label position ── */}
        <ComponentPreview
          title="Label position"
          description="Label right (default) or left — left position pins the switch to the end of the row"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: 280 }}>
            <Switch label="Label on the right" labelPosition="right" defaultChecked />
            <Switch label="Label on the left"  labelPosition="left"  defaultChecked />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LABEL_POSITION_CODE} />

        {/* ── Section 5: With thumb icons ── */}
        <ComponentPreview
          title="With thumb icons"
          description="Icon shown inside the thumb — checkedIcon for ON state, uncheckedIcon for OFF state"
        >
          <Switch label="Auto-sync"     checkedIcon="refresh" color="success" defaultChecked />
          <Switch label="Notifications" checkedIcon="bell"   color="default" defaultChecked />
          <Switch label="Auto-play"     checkedIcon="play"   uncheckedIcon="close" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICONS_CODE} />

        {/* ── Section 6: Card style ── */}
        <ComponentPreview
          title="Card style"
          description="Wraps each switch in a bordered card — label becomes the title, helperText becomes the description"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: 340 }}>
            <Switch
              label="Email notifications"
              helperText="Receive updates and alerts via email"
              card
              defaultChecked
            />
            <Switch
              label="Push notifications"
              helperText="Get notified on your mobile device"
              card
            />
            <Switch
              label="SMS alerts"
              helperText="Critical alerts only"
              card
              disabled
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={SWITCH_PROPS} />

      </div>
    </div>
  );
}
