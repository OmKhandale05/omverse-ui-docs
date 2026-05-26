'use client';

import { useState } from 'react';
import { Stepper, Button, type StepItem } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table ─── */

const STEPPER_PROPS = [
  { name: 'steps',          type: 'StepItem[]',                                            default: '[]',          description: 'Array of step definitions' },
  { name: 'currentStep',    type: 'number',                                                default: '0',           description: 'Index of the currently active step (0-based)' },
  { name: 'variant',        type: "'default' | 'pill' | 'dot' | 'badge' | 'gradient' | 'icon' | 'card' | 'progress-bar' | 'timeline' | 'checklist'", default: "'default'", description: 'Visual style of the stepper' },
  { name: 'orientation',    type: "'horizontal' | 'vertical'",                             default: "'horizontal'", description: 'Direction of the stepper' },
  { name: 'showProgressBar', type: 'boolean',                                              default: 'false',       description: 'Renders a progress bar below the steps' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const STEP_ITEM_PROPS = [
  { name: 'label',       type: 'string',    default: '—',     description: 'Step label shown below/beside the indicator' },
  { name: 'sublabel',    type: 'string',    default: '—',     description: 'Smaller secondary label' },
  { name: 'description', type: 'string',    default: '—',     description: 'Longer description text' },
  { name: 'icon',        type: 'string',    default: '—',     description: 'Icon name for the step indicator' },
  { name: 'status',      type: "'complete' | 'active' | 'error' | 'pending'", default: '—', description: 'Explicit step status override' },
  { name: 'optional',    type: 'boolean',   default: 'false', description: 'Shows an optional badge on the step' },
  { name: 'content',     type: 'ReactNode', default: '—',     description: 'Content shown inside the step (timeline variant)' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Shared step data ─── */

const basicSteps: StepItem[] = [
  { label: 'Account setup',    sublabel: 'Step 1', description: 'Create your account and choose a username.' },
  { label: 'Email verified',   sublabel: 'Step 2', description: 'Verify your email address to continue.' },
  { label: 'Profile details',  sublabel: 'Step 3', description: 'Fill in your profile information.' },
  { label: 'Payment method',   sublabel: 'Step 4', description: 'Add a credit card or other payment method.' },
  { label: 'Confirmation',     sublabel: 'Step 5', description: 'Review and confirm your details.' },
];

const iconSteps: StepItem[] = [
  { label: 'Sign up',   icon: 'user'         },
  { label: 'Verify',    icon: 'mail'         },
  { label: 'Customize', icon: 'settings'     },
  { label: 'Launch',    icon: 'rocket'       },
];

const timelineSteps: StepItem[] = [
  {
    label: 'Project kickoff',
    sublabel: 'Jan 10, 2025',
    content: (
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        <p>Initial meeting with the team. Scope and milestones were defined.</p>
      </div>
    ),
  },
  {
    label: 'Design phase',
    sublabel: 'Feb 3, 2025',
    content: (
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        <p>Wireframes and prototypes approved. Design system established.</p>
      </div>
    ),
  },
  {
    label: 'Development',
    sublabel: 'Mar 15, 2025',
    content: (
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        <p>Core features implemented and integrated with the backend API.</p>
      </div>
    ),
  },
];

const checklistSteps: StepItem[] = [
  { label: 'Install dependencies'    },
  { label: 'Configure environment'   },
  { label: 'Set up database'         },
  { label: 'Run migrations',  optional: true },
  { label: 'Deploy to production'    },
];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Stepper, type StepItem } from 'omverse-ui'

const steps: StepItem[] = [
  { label: 'Account setup',   sublabel: 'Step 1', description: 'Create your account.' },
  { label: 'Email verified',  sublabel: 'Step 2', description: 'Verify your email.'   },
  { label: 'Profile details', sublabel: 'Step 3', description: 'Fill in your profile.'},
  { label: 'Payment method',  sublabel: 'Step 4', description: 'Add payment method.'  },
  { label: 'Confirmation',    sublabel: 'Step 5', description: 'Review and confirm.'  },
]

<Stepper steps={steps} currentStep={step} />

<div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
  <Button onClick={() => setStep(s => Math.max(0, s - 1))}>Prev</Button>
  <Button onClick={() => setStep(s => Math.min(steps.length - 1, s + 1))}>Next</Button>
</div>`;

const VERTICAL_CODE = `<Stepper steps={steps.slice(0, 3)} currentStep={step} orientation="vertical" />`;

const PILL_CODE = `<Stepper steps={steps} currentStep={step} variant="pill" />`;

const DOT_CODE = `<Stepper steps={steps} currentStep={step} variant="dot" />`;

const BADGE_CODE = `<Stepper steps={steps.slice(0, 4)} currentStep={step} variant="badge" />`;

const GRADIENT_CODE = `<Stepper steps={steps.slice(0, 4)} currentStep={step} variant="gradient" />`;

const ICON_CODE = `const iconSteps: StepItem[] = [
  { label: 'Sign up',   icon: 'user'     },
  { label: 'Verify',    icon: 'mail'     },
  { label: 'Customize', icon: 'settings' },
  { label: 'Launch',    icon: 'rocket'   },
]

<Stepper steps={iconSteps} currentStep={step} variant="icon" />`;

const CARD_CODE = `<Stepper steps={steps.slice(0, 4)} currentStep={step} variant="card" />`;

const PROGRESS_BAR_CODE = `<Stepper steps={steps} currentStep={step} variant="progress-bar" showProgressBar />`;

const TIMELINE_CODE = `const timelineSteps: StepItem[] = [
  {
    label: 'Project kickoff',
    sublabel: 'Jan 10, 2025',
    content: <p>Initial meeting. Scope and milestones defined.</p>,
  },
  {
    label: 'Design phase',
    sublabel: 'Feb 3, 2025',
    content: <p>Wireframes and prototypes approved.</p>,
  },
  {
    label: 'Development',
    sublabel: 'Mar 15, 2025',
    content: <p>Core features implemented.</p>,
  },
]

<Stepper steps={timelineSteps} currentStep={step} variant="timeline" orientation="vertical" />`;

const CHECKLIST_CODE = `const checklistSteps: StepItem[] = [
  { label: 'Install dependencies'  },
  { label: 'Configure environment' },
  { label: 'Set up database'       },
  { label: 'Run migrations', optional: true },
  { label: 'Deploy to production'  },
]

<Stepper steps={checklistSteps} currentStep={step} variant="checklist" orientation="vertical" />`;

const ERROR_CODE = `const steps: StepItem[] = [
  { label: 'Account', status: 'complete' },
  { label: 'Verify',  status: 'error'    },
  { label: 'Profile', status: 'pending'  },
  { label: 'Payment', status: 'pending'  },
]

<Stepper steps={steps} currentStep={1} />`;

/* ─── Step controls helper ─── */

function StepControls({
  step, setStep, max,
}: { step: number; setStep: (v: number) => void; max: number }) {
  return (
    <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
      <Button
        size="sm"
        variant="outlined"
        onClick={() => setStep(Math.max(0, step - 1))}
        disabled={step === 0}
      >
        Prev
      </Button>
      <Button
        size="sm"
        variant="filled"
        onClick={() => setStep(Math.min(max, step + 1))}
        disabled={step === max}
      >
        Next
      </Button>
      <span style={{ fontSize: 12, color: 'var(--color-text-secondary)', alignSelf: 'center' }}>
        Step {step + 1} / {max + 1}
      </span>
    </div>
  );
}

/* ─── Page ─── */

export default function StepperPage() {
  const [step, setStep] = useState(2);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Stepper']}
        title="Stepper"
        description="10 variants · horizontal · vertical · icon · timeline · checklist · progress bar · error state"
        tags={['Default', 'Vertical', 'Pill', 'Dot', 'Badge', 'Gradient', 'Icon', 'Card', 'Progress bar', 'Timeline', 'Checklist', 'Error state']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Default horizontal ── */}
        <ComponentPreview
          title="Default — horizontal"
          description="Numbered circles with label and sublabel — steps before current are marked complete"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps} currentStep={step} />
            <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── Section 2: Default vertical ── */}
        <ComponentPreview
          title="Default — vertical"
          description="Vertical orientation with connecting line between steps"
          layout="start"
        >
          <div>
            <Stepper steps={basicSteps.slice(0, 3)} currentStep={Math.min(step, 2)} orientation="vertical" />
            <StepControls step={Math.min(step, 2)} setStep={setStep} max={2} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

        {/* ── Section 3: Pill ── */}
        <ComponentPreview
          title="Pill"
          description="Pill-shaped step indicators"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps} currentStep={step} variant="pill" />
            <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PILL_CODE} />

        {/* ── Section 4: Dot ── */}
        <ComponentPreview
          title="Dot"
          description="Minimal dot indicators — great for compact progress"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps} currentStep={step} variant="dot" />
            <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DOT_CODE} />

        {/* ── Section 5: Badge ── */}
        <ComponentPreview
          title="Badge"
          description="Numbered badge indicators with label"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps.slice(0, 4)} currentStep={Math.min(step, 3)} variant="badge" />
            <StepControls step={Math.min(step, 3)} setStep={setStep} max={3} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={BADGE_CODE} />

        {/* ── Section 6: Gradient ── */}
        <ComponentPreview
          title="Gradient"
          description="Gradient fill on active and completed steps"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps.slice(0, 4)} currentStep={Math.min(step, 3)} variant="gradient" />
            <StepControls step={Math.min(step, 3)} setStep={setStep} max={3} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />

        {/* ── Section 7: Icon ── */}
        <ComponentPreview
          title="Icon"
          description="Custom icon inside each step indicator"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={iconSteps} currentStep={Math.min(step, iconSteps.length - 1)} variant="icon" />
            <StepControls step={Math.min(step, iconSteps.length - 1)} setStep={setStep} max={iconSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ICON_CODE} />

        {/* ── Section 8: Card ── */}
        <ComponentPreview
          title="Card"
          description="Each step rendered as a bordered card"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps.slice(0, 4)} currentStep={Math.min(step, 3)} variant="card" />
            <StepControls step={Math.min(step, 3)} setStep={setStep} max={3} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CARD_CODE} />

        {/* ── Section 9: Progress bar ── */}
        <ComponentPreview
          title="Progress bar"
          description="showProgressBar renders a bar below the step indicators"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper steps={basicSteps} currentStep={step} variant="progress-bar" showProgressBar />
            <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PROGRESS_BAR_CODE} />

        {/* ── Section 10: Timeline vertical ── */}
        <ComponentPreview
          title="Timeline — vertical"
          description="Rich vertical timeline with dates and content inside each step"
          layout="start"
        >
          <div>
            <Stepper
              steps={timelineSteps}
              currentStep={Math.min(step, timelineSteps.length - 1)}
              variant="timeline"
              orientation="vertical"
            />
            <StepControls step={Math.min(step, timelineSteps.length - 1)} setStep={setStep} max={timelineSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TIMELINE_CODE} />

        {/* ── Section 11: Checklist style ── */}
        <ComponentPreview
          title="Checklist style"
          description="Task-list style vertical stepper — supports optional steps"
          layout="start"
        >
          <div>
            <Stepper
              steps={checklistSteps}
              currentStep={Math.min(step, checklistSteps.length - 1)}
              variant="checklist"
              orientation="vertical"
            />
            <StepControls step={Math.min(step, checklistSteps.length - 1)} setStep={setStep} max={checklistSteps.length - 1} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CHECKLIST_CODE} />

        {/* ── Section 12: With error ── */}
        <ComponentPreview
          title="With error state"
          description="Use explicit status props to show complete, error, and pending states"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Stepper
              steps={[
                { label: 'Account', status: 'complete' },
                { label: 'Verify',  status: 'error'    },
                { label: 'Profile', status: 'pending'  },
                { label: 'Payment', status: 'pending'  },
              ]}
              currentStep={1}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ERROR_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Stepper props
        </p>
        <PropsTable props={STEPPER_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          StepItem shape
        </p>
        <PropsTable props={STEP_ITEM_PROPS} />

      </div>
    </div>
  );
}
