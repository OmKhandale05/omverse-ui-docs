'use client';

import { Skeleton, Spinner } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table data ─── */

const SPINNER_PROPS = [
  {
    name: 'variant',
    type: "'circular' | 'ring' | 'dots' | 'bars' | 'dual' | 'pulse' | 'ripple' | 'gradient' | 'skeleton'",
    default: "'circular'",
    description: 'Spinner animation style',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: "'md'",
    description: 'Spinner size',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'white'",
    default: "'default'",
    description: 'Spinner color',
  },
  {
    name: 'label',
    type: 'string',
    default: 'undefined',
    description: 'Label shown relative to the spinner',
  },
  {
    name: 'labelPosition',
    type: "'top' | 'bottom' | 'left' | 'right'",
    default: "'bottom'",
    description: 'Position of the label relative to the spinner',
  },
  {
    name: 'overlay',
    type: 'boolean',
    default: 'false',
    description: 'Covers a parent (position: relative) with a semi-transparent overlay',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

const API_PROPS = SPINNER_PROPS;

/* ─── Code snippets ─── */

const VARIANTS_CODE = `import { Spinner } from 'omverse-ui'

<Spinner variant="circular" />
<Spinner variant="ring" />
<Spinner variant="dots" />
<Spinner variant="bars" />
<Spinner variant="dual" />
<Spinner variant="pulse" />
<Spinner variant="ripple" />
<Spinner variant="gradient" />`;

const SIZES_CODE = `<Spinner variant="circular" size="xs" />
<Spinner variant="circular" size="sm" />
<Spinner variant="circular" size="md" />
<Spinner variant="circular" size="lg" />
<Spinner variant="circular" size="xl" />
<Spinner variant="circular" size="2xl" />`;

const COLORS_CODE = `<Spinner variant="circular" color="default"   />
<Spinner variant="circular" color="secondary" />
<Spinner variant="circular" color="success"   />
<Spinner variant="circular" color="warning"   />
<Spinner variant="circular" color="error"     />
<Spinner variant="circular" color="white"     />`;

const LABEL_CODE = `<Spinner variant="circular" label="Loading..."          />
<Spinner variant="dots"     label="Please wait"         />
<Spinner variant="ring"     label="Fetching data..."    labelPosition="right" />`;

const SKELETON_CODE = `import { Skeleton } from 'omverse-ui'

                <Skeleton style={{ width: '100%', height: 20 }} />
                <Skeleton style={{ width: '80%',  height: 20 }} />
                <Skeleton style={{ width: '60%',  height: 20 }} />
                <Skeleton style={{ width: 300,    height: 120, borderRadius: 8 }} />`;

/* ─── Page ─── */

export default function SpinnerPage() {
return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Display', 'Spinner']}        title="Spinner"        description="Loading indicators in 9 variants with size and color control. Includes Skeleton for shimmer placeholders."        tags={['9 variants', '6 sizes', '6 colors', 'Skeleton', 'Overlay']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Loading indicators in 9 variants with size and color control. Includes Skeleton for shimmer placeholders.">
          <div className="component-doc-stack">
            <ComponentPreview title="Spinner variants" description="Choose one motion style consistently within a product surface.">
              {(['circular', 'ring', 'dots', 'bars', 'dual', 'pulse', 'ripple', 'gradient'] as const).map((variant) => <Spinner key={variant} variant={variant} label={`${variant} loading`} />)}
            </ComponentPreview>
            <CodeBlock filename="SpinnerExample.tsx" code={VARIANTS_CODE} />
            <div className="component-doc-prose">
              <p>Use a spinner for short operations with unknown progress. Use a skeleton when preserving the shape of loading content improves orientation.</p>
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
            <li>Choose Spinner when a repeated, structured interaction is required.</li>
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
          
            {/* ── Section 1: Variants ── */}
            <ComponentPreview
              title="Variants"
              description="circular (default), ring, dots, bars, dual, pulse, ripple and gradient"
            >
              <Spinner variant="circular" />
              <Spinner variant="ring" />
              <Spinner variant="dots" />
              <Spinner variant="bars" />
              <Spinner variant="dual" />
              <Spinner variant="pulse" />
              <Spinner variant="ripple" />
              <Spinner variant="gradient" />
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />
          
            {/* ── Section 2: Sizes ── */}
            <ComponentPreview
              title="Sizes"
              description="xs, sm, md (default), lg, xl and 2xl"
            >
              <Spinner variant="circular" size="xs" />
              <Spinner variant="circular" size="sm" />
              <Spinner variant="circular" size="md" />
              <Spinner variant="circular" size="lg" />
              <Spinner variant="circular" size="xl" />
              <Spinner variant="circular" size="2xl" />
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIZES_CODE} />
          
            {/* ── Section 3: Colors ── */}
            <ComponentPreview
              title="Colors"
              description="default, secondary, success, warning, error and white"
            >
              <Spinner variant="circular" color="default"   />
              <Spinner variant="circular" color="secondary" />
              <Spinner variant="circular" color="success"   />
              <Spinner variant="circular" color="warning"   />
              <Spinner variant="circular" color="error"     />
              <Spinner variant="circular" color="white"     />
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={COLORS_CODE} />
          
            {/* ── Section 4: With label ── */}
            <ComponentPreview
              title="With label"
              description="label adds text — labelPosition controls placement: top, bottom (default), left or right"
            >
              <Spinner variant="circular" label="Loading..."       />
              <Spinner variant="dots"     label="Please wait"      />
              <Spinner variant="ring"     label="Fetching data..." labelPosition="right" />
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={LABEL_CODE} />
          
            {/* ── Section 5: Skeleton ── */}
            <ComponentPreview
              title="Skeleton"
              description="Shimmer placeholders shown while content loads — size via style or className"
              align="start"
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 300 }}>
                <Skeleton style={{ width: '100%', height: 20 }} />
                <Skeleton style={{ width: '80%',  height: 20 }} />
                <Skeleton style={{ width: '60%',  height: 20 }} />
                <Skeleton style={{ width: 300, height: 120, borderRadius: 8 }} />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SKELETON_CODE} />
          
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
            <li>Use Spinner alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep spinner behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
