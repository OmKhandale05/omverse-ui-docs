'use client';

import { Radio, RadioGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const RADIO_PROPS = [
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown next to the radio',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
    default: "'default'",
    description: 'Color applied when selected',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Radio button size',
  },
  {
    name: 'card',
    type: 'boolean',
    default: 'false',
    description: 'Wraps in a bordered card — use with description and badge props',
  },
  {
    name: 'description',
    type: 'string',
    default: 'undefined',
    description: 'Description shown inside the card below the label',
  },
  {
    name: 'badge',
    type: 'string',
    default: 'undefined',
    description: 'Badge shown in the top-right of the card (card mode only)',
  },
  {
    name: 'helperText',
    type: 'string',
    default: 'undefined',
    description: 'Helper text shown below the label',
  },
  {
    name: 'error',
    type: 'boolean',
    default: 'false',
    description: 'Error state — red border',
  },
  {
    name: 'errorText',
    type: 'string',
    default: 'undefined',
    description: 'Error message shown below the label',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the radio',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const BASIC_CODE = `import { Radio, RadioGroup } from 'omverse-ui'

<RadioGroup legend="Preferred contact" direction="horizontal">
  <Radio value="email" label="Email" />
  <Radio value="phone" label="Phone" />
  <Radio value="sms" label="SMS" />
</RadioGroup>`;

const COLORS_CODE = `<Radio label="Default"   color="default"   defaultChecked />
<Radio label="Secondary" color="secondary" defaultChecked />
<Radio label="Success"   color="success"   defaultChecked />
<Radio label="Warning"   color="warning"   defaultChecked />
<Radio label="Error"     color="error"     defaultChecked />
<Radio label="Info"      color="info"      defaultChecked />`;

const SIZES_CODE = `<RadioGroup direction="horizontal">
  <Radio value="sm" label="Small"  size="sm" />
  <Radio value="md" label="Medium" size="md" />
  <Radio value="lg" label="Large"  size="lg" />
</RadioGroup>`;

const BUTTON_CODE = `import { Radio, RadioGroup } from 'omverse-ui'

<RadioGroup display="button" direction="horizontal">
  <Radio value="monthly"  label="Monthly"  />
  <Radio value="yearly"   label="Yearly"   />
  <Radio value="lifetime" label="Lifetime" />
</RadioGroup>`;

const SEGMENTED_CODE = `<RadioGroup display="segmented" direction="horizontal">
  <Radio value="day"   label="Day"   />
  <Radio value="week"  label="Week"  />
  <Radio value="month" label="Month" />
  <Radio value="year"  label="Year"  />
</RadioGroup>`;

const CARD_CODE = `<RadioGroup display="card" direction="horizontal">
  <Radio value="starter" label="Starter" description="$0 / month" />
  <Radio value="pro"     label="Pro"     description="$12 / month" badge="Popular" />
  <Radio value="team"    label="Team"    description="$49 / month" />
</RadioGroup>`;

const DISABLED_CODE = `<RadioGroup direction="horizontal">
  <Radio value="a" label="Option A" />
  <Radio value="b" label="Option B" />
  <Radio value="c" label="Option C" disabled />
</RadioGroup>`;

/* ─── Page ─── */

export default function RadioPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Radio']}
        title="Radio"
        description="A control for selecting one option from a set. Supports 6 colors, 3 sizes and four display styles: default, button, segmented and card."
        tags={['6 colors', '3 sizes', 'Button style', 'Segmented', 'Card style']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
        <ComponentPreview
          title="Basic"
          description="Default radio buttons inside a RadioGroup — legend provides an accessible label for the group"
        >
          <RadioGroup legend="Preferred contact" direction="horizontal">
            <Radio value="email" label="Email" />
            <Radio value="phone" label="Phone" />
            <Radio value="sms" label="SMS" />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BASIC_CODE} />

        {/* ── Section 2: Colors ── */}
        <ComponentPreview
          title="Colors"
          description="6 colors applied to the selected state — pass color to RadioGroup or individual Radio"
        >
          <Radio label="Default"   color="default"   defaultChecked />
          <Radio label="Secondary" color="secondary" defaultChecked />
          <Radio label="Success"   color="success"   defaultChecked />
          <Radio label="Warning"   color="warning"   defaultChecked />
          <Radio label="Error"     color="error"     defaultChecked />
          <Radio label="Info"      color="info"      defaultChecked />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COLORS_CODE} />

        {/* ── Section 3: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="sm, md (default) and lg"
        >
          <RadioGroup direction="horizontal">
            <Radio value="sm" label="Small"  size="sm" />
            <Radio value="md" label="Medium" size="md" />
            <Radio value="lg" label="Large"  size="lg" />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 4: Button display ── */}
        <ComponentPreview
          title="Button display"
          description="Renders radios as pill-shaped buttons — ideal for billing period or mode selection"
        >
          <RadioGroup display="button" direction="horizontal">
            <Radio value="monthly"  label="Monthly"  />
            <Radio value="yearly"   label="Yearly"   />
            <Radio value="lifetime" label="Lifetime" />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BUTTON_CODE} />

        {/* ── Section 5: Segmented display ── */}
        <ComponentPreview
          title="Segmented display"
          description="Tab-like control — all options visible, one active at a time"
        >
          <RadioGroup display="segmented" direction="horizontal">
            <Radio value="day"   label="Day"   />
            <Radio value="week"  label="Week"  />
            <Radio value="month" label="Month" />
            <Radio value="year"  label="Year"  />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SEGMENTED_CODE} />

        {/* ── Section 6: Card display ── */}
        <ComponentPreview
          title="Card display"
          description="Bordered card per option — use description and badge props for plan selection UI"
          align="start"
        >
          <RadioGroup display="card" direction="horizontal">
            <Radio value="starter" label="Starter" description="$0 / month" />
            <Radio value="pro"     label="Pro"     description="$12 / month" badge="Popular" />
            <Radio value="team"    label="Team"    description="$49 / month" />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 7: Disabled ── */}
        <ComponentPreview
          title="Disabled"
          description="Individual radios can be disabled while the group stays interactive"
        >
          <RadioGroup direction="horizontal">
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
            <Radio value="c" label="Option C" disabled />
          </RadioGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DISABLED_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={RADIO_PROPS} />

      </div>
    </div>
  );
}
