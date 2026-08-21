'use client';

import { useState } from 'react';
import { Stepper, Button, type StepItem } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table ─── */

const STEPPER_PROPS = [
  { name: 'steps', type: 'StepItem[]', default: '[]', description: 'Array of step definitions' },
  { name: 'activeStep', type: 'number', default: '0', description: 'Index of the currently active step (0-based)' },
  { name: 'variant', type: "'default' | 'pill' | 'dot' | 'badge' | 'gradient' | 'icon' | 'card' | 'progress' | 'timeline' | 'checklist'", default: "'default'", description: 'Visual style of the stepper' },
  { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction of the stepper' },
  { name: 'color', type: "'default' | 'success' | 'secondary'", default: "'default'", description: 'Color scheme for active/completed steps' },
  { name: 'clickable', type: 'boolean', default: 'false', description: 'Allow clicking completed steps to go back' },
  { name: 'currentStep', type: 'number', default: '0', description: 'Alias for active step where supported by legacy variants' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const STEP_ITEM_PROPS = [
  { name: 'id', type: 'string', default: '—', description: 'Unique identifier for the step (required)' },
  { name: 'label', type: 'string', default: '—', description: 'Step label shown below/beside the indicator' },
  { name: 'sublabel', type: 'string', default: '—', description: 'Smaller secondary label' },
  { name: 'description', type: 'string', default: '—', description: 'Longer description text' },
  { name: 'icon', type: 'IconName', default: '—', description: 'Icon name for the step indicator (icon variant)' },
  { name: 'status', type: "'done' | 'active' | 'error' | 'pending'", default: '—', description: 'Explicit step status override' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Shows an optional badge on the step' },
  { name: 'content', type: 'ReactNode', default: '—', description: 'Content shown inside the step (timeline variant)' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Shared step data ─── */

const basicSteps: StepItem[] = [
  { id: 'account', label: 'Account setup', sublabel: 'Step 1', description: 'Create your account and choose a username.' },
  { id: 'email', label: 'Email verified', sublabel: 'Step 2', description: 'Verify your email address to continue.' },
  { id: 'profile', label: 'Profile details', sublabel: 'Step 3', description: 'Fill in your profile information.' },
  { id: 'payment', label: 'Payment method', sublabel: 'Step 4', description: 'Add a credit card or other payment method.' },
  { id: 'confirm', label: 'Confirmation', sublabel: 'Step 5', description: 'Review and confirm your details.' },
];

const iconSteps: StepItem[] = [
  { id: 'signup', label: 'Sign up', icon: 'users' },
  { id: 'verify', label: 'Verify', icon: 'mail' },
  { id: 'customize', label: 'Customize', icon: 'settings' },
  { id: 'launch', label: 'Launch', icon: 'rocket' },
];

const timelineSteps: StepItem[] = [
  {
    id: 'kickoff',
    label: 'Project kickoff',
    sublabel: 'Jan 10, 2025',
    content: (
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        <p>Initial meeting with the team. Scope and milestones were defined.</p>
      </div>
    ),
  },
  {
    id: 'design',
    label: 'Design phase',
    sublabel: 'Feb 3, 2025',
    content: (
      <div style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>
        <p>Wireframes and prototypes approved. Design system established.</p>
      </div>
    ),
  },
  {
    id: 'dev',
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
  { id: 'install', label: 'Install dependencies' },
  { id: 'configure', label: 'Configure environment' },
  { id: 'database', label: 'Set up database' },
  { id: 'migrate', label: 'Run migrations', optional: true },
  { id: 'deploy', label: 'Deploy to production' },
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

<Stepper steps={steps} activeStep={step} />`;

const VERTICAL_CODE = `<Stepper steps={steps.slice(0, 3)} activeStep={step} orientation="vertical" />`;
const PILL_CODE = `<Stepper steps={steps} activeStep={step} variant="pill" />`;
const DOT_CODE = `<Stepper steps={steps} activeStep={step} variant="dot" />`;
const BADGE_CODE = `<Stepper steps={steps.slice(0, 4)} activeStep={step} variant="badge" />`;
const GRADIENT_CODE = `<Stepper steps={steps.slice(0, 4)} activeStep={step} variant="gradient" />`;
const ICON_CODE = `const iconSteps: StepItem[] = [
  { label: 'Sign up', icon: 'users' },
  { label: 'Verify',  icon: 'mail'  },
  { label: 'Customize', icon: 'settings' },
  { label: 'Launch', icon: 'rocket' },
]

<Stepper steps={iconSteps} activeStep={step} variant="icon" />`;
const CARD_CODE = `<Stepper steps={steps.slice(0, 4)} activeStep={step} variant="card" />`;
const PROGRESS_BAR_CODE = `<Stepper steps={steps} activeStep={step} variant="progress" showProgressBar />`;
const TIMELINE_CODE = `const timelineSteps: StepItem[] = [
  { label: 'Project kickoff', sublabel: 'Jan 10, 2025', content: <p>Initial meeting. Scope and milestones defined.</p> },
  { label: 'Design phase',   sublabel: 'Feb 3, 2025',  content: <p>Wireframes and prototypes approved.</p> },
  { label: 'Development',    sublabel: 'Mar 15, 2025', content: <p>Core features implemented.</p> },
]

<Stepper steps={timelineSteps} activeStep={step} variant="timeline" orientation="vertical" />`;
const CHECKLIST_CODE = `const checklistSteps: StepItem[] = [
  { label: 'Install dependencies'  },
  { label: 'Configure environment' },
  { label: 'Set up database'       },
  { label: 'Run migrations', optional: true },
  { label: 'Deploy to production'  },
]

<Stepper steps={checklistSteps} activeStep={step} variant="checklist" orientation="vertical" />`;
const ERROR_CODE = `const steps: StepItem[] = [
  { label: 'Account', status: 'done' },
  { label: 'Verify',  status: 'error'    },
  { label: 'Profile', status: 'pending' },
  { label: 'Payment', status: 'pending' },
]

<Stepper steps={steps} currentStep={1} />`;

/* ─── Helpers ─── */

function StepControls({ step, setStep, max }: { step: number; setStep: (v: number) => void; max: number }) {
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

export default function StepperPage() {
  const [step, setStep] = useState(2);

  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Stepper']}
        title="Stepper"
        description="10 variants · horizontal · vertical · icon · timeline · checklist · progress bar · error state"
        tags={['Default', 'Vertical', 'Pill', 'Dot', 'Badge', 'Gradient', 'Icon', 'Card', 'Progress bar', 'Timeline', 'Checklist', 'Error state']}
      />

      <style>{`
        @media (max-width: 767px) {
          .stepper-page-content { padding: 12px !important; }
          .stepper-page-content .component-preview-canvas { padding: 12px !important; }
          .stepper-scroll-wrap {
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            min-width: 0;
            width: 100%;
          }
          .stepper-scroll-wrap > * { min-width: 500px; }
        }
      `}</style>

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Stepper helps users complete multi-stage workflows with visible progress.">
          <div className="component-doc-prose">
            <p>Use Stepper to present and interact with structured sequential tasks in a predictable, accessible way.</p>
            <p>Combine horizontal, vertical, and timeline modes based on user context.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Step indicators and connectors.</li>
            <li>Labels and optional sublabels.</li>
            <li>Icons and status markers where needed.</li>
            <li>Optional action and optional/description content.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Use when a task requires multiple sequential stages.</li>
            <li>Use when progress and completion state need to be explicit.</li>
            <li>Use in onboarding, checkouts, and setup flows.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use for unrelated or linear actions.</li>
            <li>Do not force strict steps where branching is required.</li>
            <li>Prefer tabs when jumps are frequent and random access is important.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Use variants based on your UI density and whether progress is numeric, icon, or timeline-oriented.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <ul className="component-doc-prose">
            <li>pending, done, active, and error states should be clearly differentiated.</li>
            <li>Error states should provide clear remediation guidance.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <p>Keep step progress stable, avoid layout jumps, and preserve keyboard focus when navigating steps.</p>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Preserve logical reading order and semantic labeling.</li>
            <li>Use explicit text for status and completion.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Use short labels and avoid long sentence fragments in step headers.</li>
            <li>Keep descriptions helpful and skimmable.</li>
            <li>Use optional indicators only when truly optional.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
            <style>{`
              @media (max-width: 767px) {
                .stepper-page-content { padding: 12px !important; }
              }
            `}</style>

            <div className="stepper-page-content" style={{ padding: '28px 40px' }}>
              <ComponentPreview
                title="Default — horizontal"
                description="Numbered circles with label and sublabel."
                layout="start"
              >
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps} activeStep={step} />
                  <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

              <ComponentPreview
                title="Default — vertical"
                description="Vertical orientation with connecting line between steps"
                layout="start"
              >
                <div>
                  <Stepper steps={basicSteps.slice(0, 3)} activeStep={Math.min(step, 2)} orientation="vertical" />
                  <StepControls step={Math.min(step, 2)} setStep={setStep} max={2} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={VERTICAL_CODE} />

              <ComponentPreview title="Pill" description="Pill-shaped step indicators" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps} activeStep={step} variant="pill" />
                  <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={PILL_CODE} />

              <ComponentPreview title="Dot" description="Minimal dot indicators" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps} activeStep={step} variant="dot" />
                  <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={DOT_CODE} />

              <ComponentPreview title="Badge" description="Numbered badge indicators with label" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps.slice(0, 4)} activeStep={Math.min(step, 3)} variant="badge" />
                  <StepControls step={Math.min(step, 3)} setStep={setStep} max={3} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={BADGE_CODE} />

              <ComponentPreview title="Gradient" description="Gradient fill on active and completed steps" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps.slice(0, 4)} activeStep={Math.min(step, 3)} variant="gradient" />
                  <StepControls step={Math.min(step, 3)} setStep={setStep} max={3} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />

              <ComponentPreview title="Icon" description="Custom icon inside each step indicator" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={iconSteps} activeStep={Math.min(step, iconSteps.length - 1)} variant="icon" />
                  <StepControls step={Math.min(step, iconSteps.length - 1)} setStep={setStep} max={iconSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={ICON_CODE} />

              <ComponentPreview title="Card" description="Each step rendered as a bordered card" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps.slice(0, 4)} activeStep={Math.min(step, 3)} variant="card" />
                  <StepControls step={Math.min(step, 3)} setStep={setStep} max={3} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={CARD_CODE} />

              <ComponentPreview title="Progress bar" description="showProgressBar renders a bar below indicators" layout="start">
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper steps={basicSteps} activeStep={step} variant="progress" />
                  <StepControls step={step} setStep={setStep} max={basicSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={PROGRESS_BAR_CODE} />

              <ComponentPreview
                title="Timeline — vertical"
                description="Rich vertical timeline with dates and content inside each step"
                layout="start"
              >
                <div>
                  <Stepper
                    steps={timelineSteps}
                    activeStep={Math.min(step, timelineSteps.length - 1)}
                    variant="timeline"
                    orientation="vertical"
                  />
                  <StepControls step={Math.min(step, timelineSteps.length - 1)} setStep={setStep} max={timelineSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={TIMELINE_CODE} />

              <ComponentPreview
                title="Checklist style"
                description="Task-list style vertical stepper — supports optional steps"
                layout="start"
              >
                <div>
                  <Stepper
                    steps={checklistSteps}
                    activeStep={Math.min(step, checklistSteps.length - 1)}
                    variant="checklist"
                    orientation="vertical"
                  />
                  <StepControls step={Math.min(step, checklistSteps.length - 1)} setStep={setStep} max={checklistSteps.length - 1} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={CHECKLIST_CODE} />

              <ComponentPreview
                title="With error state"
                description="Use explicit status props to show complete, error, and pending states"
                layout="start"
              >
                <div className="stepper-scroll-wrap" style={{ width: '100%' }}>
                  <Stepper
                    steps={[
                      { id: 'account', label: 'Account', status: 'done' },
                      { id: 'verify', label: 'Verify', status: 'error' },
                      { id: 'profile', label: 'Profile', status: 'pending' },
                      { id: 'payment', label: 'Payment', status: 'pending' },
                    ]}
                    activeStep={1}
                  />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={ERROR_CODE} />
            </div>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API">
          <div className="component-doc-stack">
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>Stepper props</p>
            <PropsTable props={STEPPER_PROPS} />
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              StepItem shape
            </p>
            <PropsTable props={STEP_ITEM_PROPS} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components">
          <div className="component-doc-prose">
            <ul className="component-doc-prose">
              <li>Use Stepper with Form and Button for guided flows.</li>
              <li>Pair with Alert or NotificationCenter for progress feedback.</li>
              <li>Use Timeline or Card surfaces for richer narratives.</li>
            </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  );
}
