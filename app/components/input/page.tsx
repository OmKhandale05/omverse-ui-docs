'use client'

import { Input } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist,
  Anatomy,
  BehaviorGrid,
  ComponentDocSection,
  ComponentDocumentation,
  ContentGuidelines,
  GuidanceList,
  KeyboardTable,
  RelatedComponents,
  StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const INPUT_PROPS = [
  { name: 'variant', type: "'outlined' | 'filled' | 'floating'", default: "'outlined'", description: 'Sets the container and label treatment.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls field height, spacing, and type size.' },
  { name: 'label', type: 'string', default: 'undefined', description: 'Visible label associated with the field.' },
  { name: 'required', type: 'boolean', default: 'false', description: 'Adds the required indicator and aria-required.' },
  { name: 'optional', type: 'boolean', default: 'false', description: 'Adds an optional indicator beside the label.' },
  { name: 'helperText', type: 'string', default: 'undefined', description: 'Persistent guidance associated through aria-describedby.' },
  { name: 'error', type: 'boolean', default: 'false', description: 'Applies invalid styling and aria-invalid.' },
  { name: 'errorText', type: 'string', default: 'undefined', description: 'Actionable validation message that replaces helper text.' },
  { name: 'success', type: 'boolean', default: 'false', description: 'Applies the successful validation state.' },
  { name: 'successText', type: 'string', default: 'undefined', description: 'Confirmation text that replaces helper text.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows async progress and applies aria-busy.' },
  { name: 'leadingIcon', type: 'IconName', default: 'undefined', description: 'Decorative icon before the editable value.' },
  { name: 'trailingIcon', type: 'IconName', default: 'undefined', description: 'Decorative icon after the editable value.' },
  { name: 'clearable', type: 'boolean', default: 'false', description: 'Shows a clear action when the field has a value.' },
  { name: 'passwordToggle', type: 'boolean', default: 'false', description: 'Adds a password visibility control.' },
  { name: 'prefix', type: 'ReactNode', default: 'undefined', description: 'Non-editable content before the value, such as a currency symbol.' },
  { name: 'suffix', type: 'ReactNode', default: 'undefined', description: 'Non-editable content after the value, such as a unit.' },
  { name: 'maxLength', type: 'number', default: 'undefined', description: 'Limits the maximum number of entered characters.' },
  { name: 'showCount', type: 'boolean', default: 'false', description: 'Shows the current count when maxLength is provided.' },
  { name: 'textarea', type: 'boolean', default: 'false', description: 'Renders a multiline text area.' },
  { name: 'rows', type: 'number', default: '3', description: 'Sets the initial visible rows in textarea mode.' },
  { name: 'copyable', type: 'boolean', default: 'false', description: 'Adds a copy action, usually for read-only values.' },
  { name: 'wrapperClassName', type: 'string', default: 'undefined', description: 'Adds classes to the outer field wrapper.' },
] as const

const BASIC_CODE = `import { Input } from 'omverse-ui'

<Input
  label="Work email"
  type="email"
  placeholder="name@company.com"
  helperText="Use the address connected to your organization."
/>`

const VARIANTS_CODE = `<Input variant="outlined" label="Project name" />
<Input variant="filled" label="Project name" />
<Input variant="floating" label="Project name" />`

const VALIDATION_CODE = `<Input
  label="Work email"
  value={email}
  onChange={(event) => setEmail(event.target.value)}
  error={submitted && !isValidEmail(email)}
  errorText="Enter a valid work email address."
  success={isValidEmail(email)}
  successText="Email address verified."
/>`

const COMPOSITION_CODE = `<Input label="Website" prefix="https://" placeholder="example.com" />
<Input label="Budget" prefix="$" suffix="USD" inputMode="decimal" />
<Input label="Password" type="password" passwordToggle />
<Input label="API key" value={apiKey} readOnly copyable />
<Input label="Summary" textarea rows={4} maxLength={240} showCount />`

const INPUT_STATES = [
  { state: 'Default', trigger: 'Field is available', visual: 'Neutral border and supporting text', interaction: 'Accepts text and native input behavior' },
  { state: 'Focus', trigger: 'Keyboard, pointer, or assistive input', visual: 'Primary border and visible focus treatment', interaction: 'Caret and editing controls become active' },
  { state: 'Populated', trigger: 'A value is present', visual: 'Value replaces placeholder; floating label remains raised', interaction: 'Value can be edited or cleared' },
  { state: 'Loading', trigger: 'Async validation is running', visual: 'Progress indicator in the trailing slot', interaction: 'Field remains editable unless the workflow prevents it' },
  { state: 'Error', trigger: 'Validation fails', visual: 'Error border, icon, and actionable message', interaction: 'Focus remains in the field for correction' },
  { state: 'Success', trigger: 'Validation succeeds', visual: 'Success border, icon, and confirmation', interaction: 'Editing remains available' },
  { state: 'Read only', trigger: 'Value can be viewed but not edited', visual: 'Read-only surface treatment', interaction: 'Value remains focusable and copyable' },
  { state: 'Disabled', trigger: 'Field is unavailable', visual: 'Reduced emphasis', interaction: 'Removed from editing and normal focus order' },
]

export default function InputPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Form', 'Input']}
        title="Input"
        description="Inputs let people enter or edit text. Clear labels, purposeful guidance, and timely validation make the expected value easy to understand."
        tags={['3 variants', '3 sizes', 'Validation', 'Password disclosure', 'Textarea', 'Character count']}
      />

      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Use an input to collect a short text value that people can understand and complete without a specialized selection control."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Labeled input" description="A visible label identifies the value; helper text explains requirements that are not obvious from the label.">
              <div style={{ width: 'min(100%, 420px)' }}>
                <Input label="Work email" type="email" placeholder="name@company.com" helperText="Use the address connected to your organization." />
              </div>
            </ComponentPreview>
            <CodeBlock filename="ProfileForm.tsx" code={BASIC_CODE} />
            <div className="component-doc-callout">
              <i className="ti ti-info-circle" aria-hidden="true" />
              <span>A placeholder is an example or formatting hint—not a replacement for a visible label. Placeholders disappear after entry and are not a reliable field name.</span>
            </div>
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="The field combines a persistent label, editable control, optional affordances, and supporting feedback linked to the control."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual" style={{ width: 270 }}>
                <Input label="Workspace URL" prefix="https://" suffix=".omverse.app" defaultValue="acme" helperText="You can change this later in workspace settings." />
                <span className="component-anatomy-marker" style={{ top: -8, left: -8 }}>1</span>
                <span className="component-anatomy-marker" style={{ top: 34, left: -8 }}>2</span>
                <span className="component-anatomy-marker" style={{ top: 56, left: 18 }}>3</span>
                <span className="component-anatomy-marker" style={{ top: 56, left: 94 }}>4</span>
                <span className="component-anatomy-marker" style={{ top: 56, right: 4 }}>5</span>
                <span className="component-anatomy-marker" style={{ bottom: -8, left: -8 }}>6</span>
              </div>
            }
            items={[
              { number: 1, name: 'Label', description: 'Names the value in concise, familiar language.', required: true },
              { number: 2, name: 'Container', description: 'Communicates boundary, focus, validation, and availability.', required: true },
              { number: 3, name: 'Prefix or leading icon', description: 'Provides non-editable context such as protocol, currency, or data type.' },
              { number: 4, name: 'Editable value', description: 'The entered text and caret inside the native control.', required: true },
              { number: 5, name: 'Suffix or action', description: 'Shows units or a clear, copy, or password disclosure action.' },
              { number: 6, name: 'Supporting text', description: 'Provides guidance, validation feedback, or a character count.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use" description="Use an input when people need to enter a value that cannot be selected efficiently from a known set.">
          <GuidanceList tone="do" items={[
            { title: 'Collect unique or open-ended text', description: 'Names, email addresses, URLs, identifiers, search terms, and short descriptions.' },
            { title: 'Allow direct editing', description: 'Use when people must review and modify a value character by character.' },
            { title: 'Apply native input capabilities', description: 'Choose an appropriate type and inputMode for email, phone, URL, numeric, and password values.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use" description="Prefer a specialized control when choices, formatting, or interaction constraints are known in advance.">
          <GuidanceList tone="dont" items={[
            { title: 'Do not use for a small known set', description: 'Use Select, Radio, Checkbox, or Switch so available choices remain visible and valid.' },
            { title: 'Do not use for dates or ranges', description: 'Use DatePicker or Slider when structured selection prevents formatting errors.' },
            { title: 'Do not imitate rich text or code editing', description: 'Use a purpose-built editor when syntax, formatting, mentions, or large documents are required.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants" description="Variants change field presentation without changing semantics. Keep one treatment consistent within a form.">
          <div className="component-doc-stack">
            <ComponentPreview title="Container treatments" description="Outlined is the general default; filled supports denser surfaces; floating preserves a compact label inside the field.">
              <Input variant="outlined" label="Outlined" placeholder="Project name" />
              <Input variant="filled" label="Filled" placeholder="Project name" />
              <Input variant="floating" label="Floating" placeholder="Project name" />
            </ComponentPreview>
            <CodeBlock filename="ProjectForm.tsx" code={VARIANTS_CODE} />
            <BehaviorGrid items={[
              { icon: 'ti-square', title: 'Outlined', description: 'Default choice for forms on plain or mixed surfaces.' },
              { icon: 'ti-square-filled', title: 'Filled', description: 'Useful in compact forms where a tonal surface groups editable controls.' },
              { icon: 'ti-text-resize', title: 'Floating', description: 'Keeps a compact label visible while people enter or review a value.' },
              { icon: 'ti-arrows-vertical', title: 'Sizes', description: 'Use one size within a form. Medium provides the standard 44px control height.' },
            ]} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States" description="Field states explain whether a value can be edited, whether validation is running, and how people can correct a problem.">
          <div className="component-doc-stack">
            <ComponentPreview title="Validation and availability" description="Messages explain the state in text so color and icons are never the only signal.">
              <Input label="Default" helperText="Supporting guidance" />
              <Input label="Checking" loading helperText="Checking availability…" defaultValue="acme" />
              <Input label="Invalid" error errorText="Use at least three characters." defaultValue="a" />
              <Input label="Verified" success successText="Workspace name is available." defaultValue="acme" />
              <Input label="Read only" readOnly value="ORG-2048" copyable />
              <Input label="Disabled" disabled value="Unavailable" />
            </ComponentPreview>
            <StateMatrix rows={INPUT_STATES} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior" description="Input behavior follows the native control while adding predictable labeling, validation, and optional field actions.">
          <BehaviorGrid items={[
            { icon: 'ti-cursor-text', title: 'Editing', description: 'Use controlled or uncontrolled values. Do not transform text while someone is actively typing unless the format requires it.' },
            { icon: 'ti-alert-circle', title: 'Validation', description: 'Validate after a meaningful interaction such as blur or submit. Avoid showing an error before people can respond.' },
            { icon: 'ti-loader-2', title: 'Async checks', description: 'Debounce remote validation, show progress, and ignore stale responses when the value changes.' },
            { icon: 'ti-forms', title: 'Form layout', description: 'Align fields in a clear reading order and keep labels, requirements, and message placement consistent.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility" description="Input connects its visible label and supporting message to a native form control and exposes validation state programmatically.">
          <div className="component-doc-stack">
            <KeyboardTable rows={[
              { keys: ['Tab'], action: 'Moves focus to the field and then to any trailing field action.' },
              { keys: ['Shift', 'Tab'], action: 'Moves focus to the previous interactive control.' },
              { keys: ['Esc'], action: 'Preserves native browser behavior; clear only through the visible clear action.' },
            ]} />
            <AccessibilityChecklist items={[
              'Provide a visible label for every editable field.',
              'Use the correct native type and autocomplete value.',
              'Link helper and validation text with aria-describedby.',
              'Expose invalid values with aria-invalid.',
              'Keep error messages specific and actionable.',
              'Do not disable paste in password or verification fields.',
              'Maintain a visible focus indication in every variant.',
              'Ensure clear, copy, and password actions have accessible names.',
            ]} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Labels and messages should make the expected value and correction path immediately understandable.">
          <ContentGuidelines rules={[
            { label: 'Use noun labels', guidance: 'Name the information being requested rather than writing a question or instruction.', example: 'Work email' },
            { label: 'Show realistic examples', guidance: 'Use placeholder text only for format or domain examples, never essential instructions.', example: 'name@company.com' },
            { label: 'Explain constraints early', guidance: 'Put stable requirements in helper text instead of waiting for an avoidable error.', example: 'Use 8–64 characters.' },
            { label: 'Write actionable errors', guidance: 'State what is wrong and how to fix it without blaming the person.', example: 'Enter a valid work email address.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples" description="Compose field affordances only when they reduce ambiguity or support a specific workflow.">
          <div className="component-doc-stack">
            <ComponentPreview title="Validation" description="Pair programmatic validation state with clear, adjacent feedback.">
              <div style={{ width: 'min(100%, 420px)' }}><Input label="Work email" defaultValue="alex@" error errorText="Enter a complete email address, such as alex@company.com." /></div>
            </ComponentPreview>
            <ComponentPreview title="Structured values" description="Prefixes and suffixes clarify which part of the displayed value is editable.">
              <Input label="Website" prefix="https://" placeholder="example.com" />
              <Input label="Budget" prefix="$" suffix="USD" inputMode="decimal" />
              <Input label="Password" type="password" passwordToggle />
              <Input label="API key" value="sk_live_4f3a…" readOnly copyable />
              <Input label="Summary" textarea rows={4} maxLength={240} showCount helperText="Describe the goal and expected outcome." />
            </ComponentPreview>
            <CodeBlock filename="AccountForm.tsx" code={VALIDATION_CODE} />
            <CodeBlock filename="WorkspaceForm.tsx" code={COMPOSITION_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="props-api" title="Props / API" description="Input extends native input attributes except size and prefix, which use the component-specific API.">
          <PropsTable props={INPUT_PROPS} />
        </ComponentDocSection>

        <ComponentDocSection id="related-components" title="Related components" description="Use the control that best matches the type and number of available values.">
          <RelatedComponents items={[
            { name: 'Select', href: '/components/select', description: 'Choose one option from a known list', icon: 'ti-selector' },
            { name: 'DatePicker', href: '/components/date-picker', description: 'Enter a date or date range safely', icon: 'ti-calendar' },
            { name: 'Checkbox', href: '/components/checkbox', description: 'Select independent options', icon: 'ti-checkbox' },
            { name: 'Radio', href: '/components/radio', description: 'Choose one visible option', icon: 'ti-circle-dot' },
          ]} />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
