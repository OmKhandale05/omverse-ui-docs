'use client';

import { Button } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const BUTTON_PROPS = [
  {
    name: 'variant',
    type: "'filled' | 'outlined' | 'tonal' | 'text' | 'elevated' | 'gradient'",
    default: "'filled'",
    description: 'Visual style of the button',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'",
    default: "'md'",
    description: 'Controls height, padding and font size',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a spinner and disables interaction',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Disables the button and reduces opacity',
  },
  {
    name: 'leadingIcon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon shown before the label',
  },
  {
    name: 'trailingIcon',
    type: 'IconName',
    default: 'undefined',
    description: 'Icon shown after the label',
  },
  {
    name: 'fullWidth',
    type: 'boolean',
    default: 'false',
    description: 'Makes button take full container width',
  },
  {
    name: 'onClick',
    type: '() => void',
    default: 'undefined',
    description: 'Click handler',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Button } from 'omverse-ui'

<Button variant="filled">Filled</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="tonal">Tonal</Button>
<Button variant="text">Text</Button>
<Button variant="elevated">Elevated</Button>
<Button variant="filled" gradient>Gradient</Button>`;

const SIZES_CODE = `<Button size="xs">Extra small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
<Button size="xl">Extra large</Button>`;

const STATES_CODE = `<Button variant="filled" loading>Loading</Button>
<Button variant="filled" disabled>Disabled</Button>`;

const ICONS_CODE = `<Button variant="filled" leadingIcon="plus">Add item</Button>
<Button variant="outlined" trailingIcon="arrow-right">Continue</Button>`;

/* ─── Page ─── */

export default function ButtonPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Form', 'Button']}
        title="Button"
        description="Triggers an action or event. Supports 6 variants, 5 sizes, loading states, icon support and full keyboard accessibility."
        tags={['6 variants', '5 sizes', 'Loading state', 'Icon support', 'WAI-ARIA']}
        sourceUrl="https://github.com/OmKhandale05/design-sys-components/tree/main/src/components/Button"
        storybookUrl="https://design-sys-components.vercel.app/?path=/story/components-button--button-stories"
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Variants ── */}
        <ComponentPreview
          title="Variants"
          description="6 variants for different levels of visual emphasis"
        >
          <Button variant="filled">Filled</Button>
          <Button variant="outlined">Outlined</Button>
          <Button variant="tonal">Tonal</Button>
          <Button variant="text">Text</Button>
          <Button variant="elevated">Elevated</Button>
          <Button variant="filled" gradient>Gradient</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 2: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="5 sizes from xs to xl"
        >
          <Button size="xs">Extra small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra large</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 3: States ── */}
        <ComponentPreview
          title="States"
          description="Loading, disabled and success states"
        >
          <Button variant="filled" loading>Loading</Button>
          <Button variant="filled" disabled>Disabled</Button>
          <Button variant="outlined" disabled>Disabled</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STATES_CODE} />

        {/* ── Section 4: With icons ── */}
        <ComponentPreview
          title="With icons"
          description="Leading and trailing icon support"
        >
          <Button variant="filled" leadingIcon="plus">Add item</Button>
          <Button variant="outlined" trailingIcon="arrow-right">Continue</Button>
          <Button variant="tonal" leadingIcon="download">Download</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICONS_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={BUTTON_PROPS} />
      </div>
    </div>
  );
}
