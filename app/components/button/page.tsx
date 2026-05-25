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
    name: 'success',
    type: 'boolean',
    default: 'false',
    description: 'Swaps leading icon to checkmark to confirm a completed action',
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
    description: 'Stretches the button to its container full width',
  },
  {
    name: 'gradient',
    type: 'boolean',
    default: 'false',
    description: 'Blue→purple gradient — only applies on filled and destructive variants',
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
<Button variant="filled" disabled>Disabled</Button>
<Button variant="outlined" disabled>Disabled</Button>`;

const ICONS_CODE = `<Button variant="filled" leadingIcon="plus">Add item</Button>
<Button variant="filled" trailingIcon="arrow-right">Continue</Button>
<Button variant="outlined" leadingIcon="download">Download</Button>
<Button variant="tonal" leadingIcon="share">Share</Button>
<Button variant="filled" gradient leadingIcon="star">Featured</Button>`;

const SUCCESS_CODE = `<Button variant="filled" success>Saved!</Button>
<Button variant="tonal" success>Done!</Button>`;

const FULL_WIDTH_CODE = `<Button variant="filled" fullWidth>Full width filled</Button>
<Button variant="outlined" fullWidth>Full width outlined</Button>`;

const ALL_SIZES_CODE = `{/* filled */}
<Button variant="filled" size="xs">xs</Button>
<Button variant="filled" size="sm">sm</Button>
<Button variant="filled" size="md">md</Button>
<Button variant="filled" size="lg">lg</Button>
<Button variant="filled" size="xl">xl</Button>

{/* outlined */}
<Button variant="outlined" size="xs">xs</Button>
<Button variant="outlined" size="sm">sm</Button>
<Button variant="outlined" size="md">md</Button>
<Button variant="outlined" size="lg">lg</Button>
<Button variant="outlined" size="xl">xl</Button>

{/* tonal */}
<Button variant="tonal" size="xs">xs</Button>
<Button variant="tonal" size="sm">sm</Button>
<Button variant="tonal" size="md">md</Button>
<Button variant="tonal" size="lg">lg</Button>
<Button variant="tonal" size="xl">xl</Button>`;

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
          description="6 variants covering the full emphasis spectrum"
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

        {/* ── Section 3: All sizes ── */}
        <ComponentPreview
          title="All sizes"
          description="xs → xl across filled, outlined and tonal variants"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Button key={size} variant="filled" size={size}>{size}</Button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Button key={size} variant="outlined" size={size}>{size}</Button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map(size => (
                <Button key={size} variant="tonal" size={size}>{size}</Button>
              ))}
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ALL_SIZES_CODE} />

        {/* ── Section 4: States ── */}
        <ComponentPreview
          title="States"
          description="Loading and disabled states"
        >
          <Button variant="filled" loading>Loading</Button>
          <Button variant="filled" disabled>Disabled</Button>
          <Button variant="outlined" disabled>Disabled</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STATES_CODE} />

        {/* ── Section 5: Success state ── */}
        <ComponentPreview
          title="Success state"
          description="Swaps the leading icon to a checkmark to confirm a completed action"
        >
          <Button variant="filled" success>Saved!</Button>
          <Button variant="tonal" success>Done!</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SUCCESS_CODE} />

        {/* ── Section 6: Icon combinations ── */}
        <ComponentPreview
          title="Icon combinations"
          description="Leading and trailing icon support across variants"
        >
          <Button variant="filled" leadingIcon="plus">Add item</Button>
          <Button variant="filled" trailingIcon="arrow-right">Continue</Button>
          <Button variant="outlined" leadingIcon="download">Download</Button>
          <Button variant="tonal" leadingIcon="share">Share</Button>
          <Button variant="filled" gradient leadingIcon="star">Featured</Button>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICONS_CODE} />

        {/* ── Section 7: Full width ── */}
        <ComponentPreview
          title="Full width"
          description="Stretches to fill the container — icons are pushed to the edges when both are present"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%' }}>
            <Button variant="filled" fullWidth>Full width filled</Button>
            <Button variant="outlined" fullWidth>Full width outlined</Button>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FULL_WIDTH_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={BUTTON_PROPS} />

      </div>
    </div>
  );
}
