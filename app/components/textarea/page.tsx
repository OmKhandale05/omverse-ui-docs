'use client'

import { useState } from 'react'
import { Textarea } from 'omverse-ui'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import { AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection, ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable, RelatedComponents, StateMatrix } from '@/components/docs/ComponentDocumentation'

const PROPS = [
  { name: 'label', type: 'ReactNode', default: 'undefined', description: 'Visible field label.' }, { name: 'helperText', type: 'ReactNode', default: 'undefined', description: 'Supporting instruction below the field.' }, { name: 'errorText', type: 'ReactNode', default: 'undefined', description: 'Error message and invalid styling.' }, { name: 'successText', type: 'ReactNode', default: 'undefined', description: 'Success message and valid styling.' }, { name: 'showCount', type: 'boolean', default: 'false', description: 'Shows current and maximum character counts.' }, { name: 'autoResize', type: 'boolean', default: 'false', description: 'Expands height to fit content.' }, { name: 'variant', type: "'outlined' | 'filled' | 'underlined'", default: "'outlined'", description: 'Controls field treatment.' }, { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls minimum height, spacing, and type.' }, { name: 'resize', type: "'none' | 'vertical' | 'both'", default: "'vertical'", description: 'Controls manual resize direction.' }, { name: 'containerClassName', type: 'string', default: 'undefined', description: 'Class name for the field wrapper.' },
] as const
const BASIC = `import { Textarea } from 'omverse-ui'

<Textarea
  label="Change rationale"
  placeholder="Explain why this change is required…"
  helperText="This rationale is included in the audit record."
  maxLength={500}
  showCount
  required
/>`
const CONTROLLED = `<Textarea
  label="Review response"
  value={response}
  onChange={(event) => setResponse(event.target.value)}
  errorText={error}
  autoResize
/>`

function TextareaPreview() {
  const [value, setValue] = useState('')

  return (
    <Textarea
      label="Change rationale"
      value={value}
      onChange={(event) => setValue(event.target.value)}
      placeholder="Explain why this change is required…"
      helperText="This rationale is included in the audit record."
      showCount
      maxLength={500}
      required
    />
  )
}

function ErrorPreview() {
  return (
    <Textarea
      label="Review response"
      value="Approval requires another reviewer."
      errorText="Address the unresolved policy exception."
      onChange={() => {}}
      autoResize
    />
  )
}

export default function TextareaPage() { return <div><PageHeader breadcrumb={['Components', 'Enterprise', 'Textarea']} title="Textarea" description="Textarea captures multi-line free-form input with labeling, guidance, validation, and counting." tags={['3 variants', '3 sizes', 'Validation', 'Character count', 'Auto-resize']} /><ComponentDocumentation>
  <ComponentDocSection id="overview" title="Overview" description="Use Textarea for multi-line responses where people need space to explain, summarize, comment, or provide structured free-form context."><div className="component-doc-stack"><ComponentPreview title="Change rationale" description="Type to see the live character count update."><TextareaPreview /></ComponentPreview><CodeBlock filename="ChangeRationale.tsx" code={BASIC} /></div></ComponentDocSection>
  <ComponentDocSection id="anatomy" title="Anatomy" description="Textarea combines a persistent label, multi-line control, entered content, supporting feedback, and optional count or resize affordance."><Anatomy preview={<div className="component-anatomy-visual textarea-anatomy"><label>Change rationale *</label><section>Coordinate the migration with security and support.<i>◢</i></section><footer><span>Included in the audit record.</span><b>52 / 500</b></footer><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 60 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 66, left: -34 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 66, right: -34 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 58 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, right: 36 }}>5</span></div>} items={[{ number: 1, name: 'Label', description: 'Names the expected response and required state.' }, { number: 2, name: 'Input area', description: 'Provides a visible multi-line entry boundary.' }, { number: 3, name: 'Content', description: 'Wraps naturally and scrolls or expands as configured.' }, { number: 4, name: 'Supporting message', description: 'Provides guidance, error, or success feedback.' }, { number: 5, name: 'Count and resize', description: 'Shows length constraints and optional manual resizing.' }]} /></ComponentDocSection>
  <ComponentDocSection id="when-to-use" title="When to use" description="Use Textarea when a response may contain multiple sentences, paragraphs, or line breaks."><GuidanceList tone="do" items={[{ title: 'Collect rationale or notes', description: 'Give enough room for decisions, review comments, and operational context.' }, { title: 'Accept variable-length responses', description: 'Use counting to make meaningful limits visible.' }, { title: 'Preserve line breaks', description: 'Choose Textarea when formatting across lines helps comprehension.' }]} /></ComponentDocSection>
  <ComponentDocSection id="when-not-to-use" title="When not to use" description="Use a more constrained control when the expected value is short, enumerable, or structurally complex."><GuidanceList tone="dont" items={[{ title: 'Do not collect short identifiers', description: 'Use Input for names, IDs, emails, and single-line values.' }, { title: 'Do not hide governed choices', description: 'Use Select or Combobox for constrained values.' }, { title: 'Do not build a rich editor', description: 'Use a dedicated editor for formatting, mentions, or attachments.' }]} /></ComponentDocSection>
  <ComponentDocSection id="variants" title="Variants" description="Treatment, size, resizing, and content-driven height adapt the control to different form contexts."><BehaviorGrid items={[{ icon: 'ti-border-all', title: 'Outlined', description: 'Default visible field boundary.' }, { icon: 'ti-square-filled', title: 'Filled', description: 'Tonal surface for grouped forms.' }, { icon: 'ti-minus', title: 'Underlined', description: 'Compact treatment for restrained layouts.' }, { icon: 'ti-arrows-maximize', title: 'Resize behavior', description: 'None, vertical, both, or automatic height.' }]} /></ComponentDocSection>
  <ComponentDocSection id="states" title="States" description="Textarea communicates availability, focus, validation, and content constraints without replacing application validation."><StateMatrix rows={[{ state: 'Empty', trigger: 'No value entered', visual: 'Placeholder may provide an example', interaction: 'Ready for entry' }, { state: 'Focused', trigger: 'Control receives focus', visual: 'Primary border and ring', interaction: 'Text entry active' }, { state: 'Error', trigger: 'Value fails validation', visual: 'Error border and message', interaction: 'Editable correction' }, { state: 'Success', trigger: 'Value is confirmed', visual: 'Success border and message', interaction: 'Remains editable' }, { state: 'Disabled', trigger: 'Field unavailable', visual: 'Reduced emphasis', interaction: 'Not focusable' }, { state: 'Read-only', trigger: 'Value cannot change', visual: 'Tonal surface', interaction: 'Content remains selectable' }]} /></ComponentDocSection>
  <ComponentDocSection id="behavior" title="Behavior" description="Textarea follows native text-entry behavior and adds design-system guidance, validation, counting, and height management."><BehaviorGrid items={[{ icon: 'ti-text-wrap', title: 'Text wrapping', description: 'Long text wraps without horizontal scrolling by default.' }, { icon: 'ti-calculator', title: 'Character count', description: 'Count reflects controlled or uncontrolled values.' }, { icon: 'ti-arrows-vertical', title: 'Auto-resize', description: 'Height follows scroll height while manual resize is disabled.' }, { icon: 'ti-forms', title: 'Form integration', description: 'Native name, required, disabled, and maxLength remain available.' }]} /></ComponentDocSection>
  <ComponentDocSection id="accessibility" title="Accessibility" description="Textarea preserves native semantics and programmatically connects labels, messages, counts, and invalid state."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['Tab'], action: 'Moves focus into or away from the field.' }, { keys: ['Enter'], action: 'Creates a new line.' }, { keys: ['Shift', 'Tab'], action: 'Moves focus to the previous control.' }]} /><AccessibilityChecklist items={['Provide a persistent visible label for every textarea.', 'Use helper text for instructions that remain relevant during entry.', 'Expose invalid state and connect error text with aria-describedby.', 'Do not use placeholder text as the only label.', 'Set a meaningful maxLength before showing a limit count.', 'Keep resize or auto-resize behavior usable at high zoom.']} /></div></ComponentDocSection>
  <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Labels and guidance should make the expected depth, purpose, and constraints of the response clear."><ContentGuidelines rules={[{ label: 'Name the response', guidance: 'Use a concise noun phrase.', example: 'Change rationale' }, { label: 'Explain purpose', guidance: 'Say how the response will be used.', example: 'Included in the audit record.' }, { label: 'Demonstrate format', guidance: 'Use placeholder examples sparingly.', example: 'Summarize the customer impact…' }, { label: 'Write corrective errors', guidance: 'Explain how to resolve the problem.', example: 'Add at least 20 characters.' }]} /></ComponentDocSection>
  <ComponentDocSection id="examples" title="Examples" description="Controlled value and auto-resize support review workflows while validation remains application-owned."><div className="component-doc-stack"><ComponentPreview title="Controlled response"><ErrorPreview /></ComponentPreview><CodeBlock filename="ReviewResponse.tsx" code={CONTROLLED} /></div></ComponentDocSection>
  <ComponentDocSection id="props-api" title="Props / API" description="Textarea extends native textarea attributes except the conflicting size attribute."><PropsTable props={PROPS} /></ComponentDocSection>
  <ComponentDocSection id="related-components" title="Related components" description="Choose controls based on response length, value constraints, and editing complexity."><RelatedComponents items={[{ name: 'Input', href: '/components/input', description: 'Capture single-line values', icon: 'ti-cursor-text' }, { name: 'Combobox', href: '/components/combobox', description: 'Search governed options', icon: 'ti-list-search' }, { name: 'Alert', href: '/components/alert', description: 'Communicate form-level conditions', icon: 'ti-alert-circle' }, { name: 'Button', href: '/components/button', description: 'Submit or cancel form changes', icon: 'ti-square-rounded' }]} /></ComponentDocSection>
 </ComponentDocumentation></div> }
