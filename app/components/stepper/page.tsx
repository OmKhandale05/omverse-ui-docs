'use client';

import { useState } from 'react';
import { Stepper, Button, type StepItem, type StepperVariant } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const STEPPER_PROPS = [
  {
    name: 'steps',
    type: 'StepItem[]',
    default: '—',
    description: 'Array of step items — id, label, description, icon, status, optional, content',
  },
  {
    name: 'activeStep',
    type: 'number',
    default: '—',
    description: 'Index of the active step (0-based) — required',
  },
  {
    name: 'variant',
    type: "'default' | 'pill' | 'dot' | 'badge' | 'gradient' | 'icon' | 'card' | 'progress' | 'timeline' | 'checklist'",
    default: "'default'",
    description: 'Visual style of the stepper',
  },
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'Direction of the step trail',
  },
  {
    name: 'onStepClick',
    type: '(index: number, step: StepItem) => void',
    default: 'undefined',
    description: 'Callback when a step is clicked',
  },
  {
    name: 'clickable',
    type: 'boolean',
    default: 'false',
    description: 'Allow clicking completed steps to navigate back',
  },
  {
    name: 'color',
    type: "'default' | 'success' | 'secondary'",
    default: "'default'",
    description: 'Color scheme applied to active and done indicators',
  },
  {
    name: 'showContent',
    type: 'boolean',
    default: 'false',
    description: 'Show step content below (horizontal) or beside (vertical)',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Shared step data ─── */

const STEPS: StepItem[] = [
  { id: 'account',  label: 'Account',  description: 'Create your account'  },
  { id: 'profile',  label: 'Profile',  description: 'Set up your profile'  },
  { id: 'settings', label: 'Settings', description: 'Configure settings'   },
  { id: 'done',     label: 'Done',     description: 'All set!'             },
];

const ICON_STEPS: StepItem[] = [
  { id: 'account',  label: 'Account',  description: 'Create your account',  icon: 'users'    },
  { id: 'profile',  label: 'Profile',  description: 'Set up your profile',  icon: 'edit'     },
  { id: 'settings', label: 'Settings', description: 'Configure settings',   icon: 'settings' },
  { id: 'done',     label: 'Done',     description: 'All set!',             icon: 'check'    },
];

const ERROR_STEPS: StepItem[] = [
  { id: 'account',  label: 'Account',  description: 'Create your account' },
  { id: 'profile',  label: 'Profile',  description: 'Verification failed', status: 'error' },
  { id: 'settings', label: 'Settings', description: 'Configure settings'   },
  { id: 'done',     label: 'Done',     description: 'All set!'             },
];

/* ─── All 10 variants ─── */

const ALL_VARIANTS: { variant: StepperVariant; description: string }[] = [
  { variant: 'default',   description: 'Numbered circles with connector line'       },
  { variant: 'pill',      description: 'Pill-shaped step indicators'                },
  { variant: 'dot',       description: 'Minimal dot indicators'                     },
  { variant: 'badge',     description: 'Badge / chip with step number'              },
  { variant: 'gradient',  description: 'Brand gradient on active step'              },
  { variant: 'icon',      description: 'Icon-based indicators'                      },
  { variant: 'card',      description: 'Each step is a full card'                   },
  { variant: 'progress',  description: 'Progress bar connecting all steps'          },
  { variant: 'timeline',  description: 'Timeline style — best vertical'             },
  { variant: 'checklist', description: 'Checkbox list — task completion style'      },
];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Stepper } from 'omverse-ui'

const steps = [
  { id: 'account',  label: 'Account',  description: 'Create your account' },
  { id: 'profile',  label: 'Profile',  description: 'Set up your profile' },
  { id: 'settings', label: 'Settings', description: 'Configure settings'  },
  { id: 'done',     label: 'Done',     description: 'All set!'            },
]

const [activeStep, setActiveStep] = useState(2);

<Stepper
  steps={steps}
  activeStep={activeStep}
  onStepClick={(i) => setActiveStep(i)}
  clickable
/>`;

const VARIANTS_CODE = `// 10 visual variants
<Stepper steps={steps} activeStep={2} variant="default" />
<Stepper steps={steps} activeStep={2} variant="pill" />
<Stepper steps={steps} activeStep={2} variant="dot" />
<Stepper steps={steps} activeStep={2} variant="badge" />
<Stepper steps={steps} activeStep={2} variant="gradient" />
<Stepper steps={steps} activeStep={2} variant="icon" />
<Stepper steps={steps} activeStep={2} variant="card" />
<Stepper steps={steps} activeStep={2} variant="progress" />
<Stepper steps={steps} activeStep={2} variant="timeline" />
<Stepper steps={steps} activeStep={2} variant="checklist" />`;

const VERTICAL_CODE = `<Stepper
  steps={steps}
  activeStep={activeStep}
  orientation="vertical"
  clickable
  onStepClick={(i) => setActiveStep(i)}
/>`;

const ERROR_CODE = `// Set status='error' on any step
const steps = [
  { id: 'account',  label: 'Account',  description: 'Create your account'  },
  { id: 'profile',  label: 'Profile',  description: 'Verification failed', status: 'error' },
  { id: 'settings', label: 'Settings', description: 'Configure settings'   },
  { id: 'done',     label: 'Done',     description: 'All set!'             },
]

<Stepper steps={steps} activeStep={1} />`;

const NAV_CODE = `function WizardStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirst = activeStep === 0;
  const isLast  = activeStep === steps.length - 1;

  return (
    <div>
      <Stepper
        steps={steps}
        activeStep={activeStep}
        variant="gradient"
        clickable
        onStepClick={(i) => setActiveStep(i)}
      />

      <div style={{ marginTop: 24, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          disabled={isFirst}
          onClick={() => setActiveStep((s) => s - 1)}
        >
          Previous
        </Button>
        <Button
          variant="filled"
          onClick={() => setActiveStep((s) => Math.min(s + 1, steps.length - 1))}
        >
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}`;

/* ─── Label style ─── */

const variantLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 10,
};

/* ─── Wizard stepper with prev/next ─── */

function WizardStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const isFirst = activeStep === 0;
  const isLast  = activeStep === STEPS.length - 1;

  return (
    <div style={{ width: '100%', maxWidth: 600 }}>
      <Stepper
        steps={STEPS}
        activeStep={activeStep}
        variant="gradient"
        clickable
        onStepClick={(i) => setActiveStep(i)}
      />

      {/* Step content */}
      <div style={{
        marginTop: 20,
        padding: '16px 20px',
        border: '1px solid var(--color-border-primary)',
        borderRadius: 8,
        fontSize: 13,
        color: 'var(--color-text-secondary)',
        minHeight: 60,
        lineHeight: 1.6,
      }}>
        <strong style={{ color: 'var(--color-text-primary)', display: 'block', marginBottom: 4 }}>
          {STEPS[activeStep].label}
        </strong>
        {STEPS[activeStep].description}
      </div>

      {/* Navigation */}
      <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          size="sm"
          disabled={isFirst}
          onClick={() => setActiveStep((s) => s - 1)}
        >
          Previous
        </Button>
        <Button
          variant="filled"
          size="sm"
          onClick={() => !isLast && setActiveStep((s) => s + 1)}
        >
          {isLast ? 'Finish' : 'Next'}
        </Button>
      </div>
    </div>
  );
}

/* ─── Page ─── */

export default function StepperPage() {
  const [activeStep, setActiveStep] = useState(2);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Stepper']}
        title="Stepper"
        description="Multi-step progress indicator. 10 variants, horizontal and vertical orientations, clickable steps."
        tags={['10 variants', 'Horizontal', 'Vertical', 'Clickable', 'Error state', 'Timeline']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default ── */}
        <ComponentPreview
          title="Default"
          description="Numbered circles with connector — click any completed step to go back"
          align="start"
        >
          <div style={{ width: '100%', maxWidth: 640 }}>
            <Stepper
              steps={STEPS}
              activeStep={activeStep}
              clickable
              onStepClick={(i) => setActiveStep(i)}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: All 10 variants ── */}
        <ComponentPreview
          title="All 10 variants"
          description="default · pill · dot · badge · gradient · icon · card · progress · timeline · checklist"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%' }}>
            {ALL_VARIANTS.map(({ variant, description }) => (
              <div key={variant}>
                <p style={variantLabel}>{variant} — {description}</p>
                <Stepper
                  steps={variant === 'icon' ? ICON_STEPS : STEPS}
                  activeStep={activeStep}
                  variant={variant}
                  clickable
                  onStepClick={(i) => setActiveStep(i)}
                />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Section 3: Vertical orientation ── */}
        <ComponentPreview
          title="Vertical"
          description="orientation='vertical' — ideal for sidebar wizards and timeline flows"
          align="start"
        >
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
            <div>
              <p style={variantLabel}>default · vertical</p>
              <Stepper
                steps={STEPS}
                activeStep={activeStep}
                orientation="vertical"
                clickable
                onStepClick={(i) => setActiveStep(i)}
              />
            </div>
            <div>
              <p style={variantLabel}>timeline · vertical</p>
              <Stepper
                steps={STEPS}
                activeStep={activeStep}
                variant="timeline"
                orientation="vertical"
                clickable
                onStepClick={(i) => setActiveStep(i)}
              />
            </div>
            <div>
              <p style={variantLabel}>checklist · vertical</p>
              <Stepper
                steps={STEPS}
                activeStep={activeStep}
                variant="checklist"
                orientation="vertical"
                clickable
                onStepClick={(i) => setActiveStep(i)}
              />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Section 4: Error state ── */}
        <ComponentPreview
          title="Error state"
          description="Set status='error' on a StepItem to show the error indicator"
          align="start"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, width: '100%', maxWidth: 640 }}>
            <div>
              <p style={variantLabel}>default + error</p>
              <Stepper steps={ERROR_STEPS} activeStep={1} />
            </div>
            <div>
              <p style={variantLabel}>pill + error</p>
              <Stepper steps={ERROR_STEPS} activeStep={1} variant="pill" />
            </div>
            <div>
              <p style={variantLabel}>badge + error</p>
              <Stepper steps={ERROR_STEPS} activeStep={1} variant="badge" />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ERROR_CODE} />

        {/* ── Section 5: With prev / next navigation ── */}
        <ComponentPreview
          title="With prev / next navigation"
          description="Pair the Stepper with Button controls — clickable lets users jump back to earlier steps"
          align="start"
        >
          <WizardStepper />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={NAV_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={STEPPER_PROPS} />

      </div>
    </div>
  );
}
