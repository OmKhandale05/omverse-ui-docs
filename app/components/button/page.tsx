'use client'

import { Button } from 'omverse-ui'
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

const BUTTON_PROPS = [
  { name: 'variant', type: "'filled' | 'outlined' | 'tonal' | 'text' | 'elevated' | 'gradient'", default: "'filled'", description: 'Sets visual emphasis and container treatment.' },
  { name: 'size', type: "'xs' | 'sm' | 'md' | 'lg' | 'xl'", default: "'md'", description: 'Controls height, horizontal padding, type size, and icon size.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows progress, preserves width, and prevents repeated activation.' },
  { name: 'success', type: 'boolean', default: 'false', description: 'Shows a confirmation icon for a completed action.' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Prevents interaction and communicates unavailability.' },
  { name: 'leadingIcon', type: 'IconName', default: 'undefined', description: 'Displays a decorative or reinforcing icon before the label.' },
  { name: 'trailingIcon', type: 'IconName', default: 'undefined', description: 'Displays a directional or reinforcing icon after the label.' },
  { name: 'fullWidth', type: 'boolean', default: 'false', description: 'Expands the button to the width of its containing block.' },
  { name: 'gradient', type: 'boolean', default: 'false', description: 'Applies the branded gradient treatment to supported variants.' },
] as const

const BASIC_CODE = `import { Button } from 'omverse-ui'

<Button onClick={handleSave}>Save changes</Button>`

const VARIANTS_CODE = `<Button variant="filled">Create project</Button>
<Button variant="outlined">Preview</Button>
<Button variant="tonal">Assign</Button>
<Button variant="text">Learn more</Button>
<Button variant="elevated">Open workspace</Button>
<Button variant="filled" gradient>Upgrade plan</Button>`

const EXAMPLES_CODE = `<Button leadingIcon="plus">Create issue</Button>
<Button variant="outlined" leadingIcon="download">Export report</Button>
<Button trailingIcon="arrow-right">Continue</Button>
<Button loading>Saving changes</Button>
<Button success>Saved</Button>`

const STATES = [
  { state: 'Default', trigger: 'No interaction', visual: 'Base container and label colors', interaction: 'Ready to receive focus or activation' },
  { state: 'Hover', trigger: 'Pointer rests over button', visual: 'State layer increases emphasis', interaction: 'Cursor indicates an actionable control' },
  { state: 'Focus', trigger: 'Keyboard or assistive input', visual: 'High-contrast focus ring', interaction: 'Enter or Space activates the action' },
  { state: 'Pressed', trigger: 'Pointer or key is held', visual: 'Pressed state layer', interaction: 'Action fires once on release' },
  { state: 'Loading', trigger: 'Action is in progress', visual: 'Spinner replaces or accompanies content', interaction: 'Repeated activation is blocked' },
  { state: 'Disabled', trigger: 'Action is unavailable', visual: 'Reduced emphasis', interaction: 'Removed from activation behavior' },
]

export default function ButtonPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Form', 'Button']}
        title="Button"
        description="Buttons trigger an action or event. Use their emphasis, content, and placement to make the next available action clear."
        tags={['6 variants', '5 sizes', 'Loading state', 'Icon support', 'Keyboard accessible']}
        storybookUrl="https://design-sys-components.vercel.app/?path=/story/components-button--button-stories"
      />

      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="A button communicates an action that happens in the current context. Its label should set a clear expectation of the result."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Default button" description="Use the filled variant for the primary action in a focused area.">
              <Button>Save changes</Button>
            </ComponentPreview>
            <CodeBlock filename="App.tsx" code={BASIC_CODE} />
            <div className="component-doc-prose">
              <p>Choose button emphasis based on action priority, not visual preference. Most surfaces need one primary action and a small number of supporting actions.</p>
              <div className="component-doc-callout">
                <i className="ti ti-bulb" aria-hidden="true" />
                <span>Use a link when the destination changes. Use a button when the current interface performs an operation, updates data, or reveals UI.</span>
              </div>
            </div>
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="anatomy"
          title="Anatomy"
          description="A button has a container, an action label, and optional supporting icons. The label is always the accessible name."
        >
          <Anatomy
            preview={
              <div className="component-anatomy-visual component-anatomy-visual--button">
                <Button leadingIcon="plus" trailingIcon="arrow-right">Create project</Button>
                <span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 12 }}>1</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 10, left: -34 }}>2</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 76 }}>3</span>
                <span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 10, right: -34 }}>4</span>
              </div>
            }
            items={[
              { number: 1, name: 'Container', description: 'Defines emphasis, boundary, target size, and interaction states.', required: true },
              { number: 2, name: 'Leading icon', description: 'Optional symbol that reinforces the action. Never replaces the label.' },
              { number: 3, name: 'Label', description: 'Uses a short verb phrase that describes the outcome.', required: true },
              { number: 4, name: 'Trailing icon', description: 'Optional directional cue for progression or disclosure.' },
            ]}
          />
        </ComponentDocSection>

        <ComponentDocSection
          id="when-to-use"
          title="When to use"
          description="Use a button for clear, immediate actions that operate within the current task or surface."
        >
          <GuidanceList tone="do" items={[
            { title: 'Submit or confirm a task', description: 'Save a form, create an item, apply changes, or confirm a decision.' },
            { title: 'Reveal an interface', description: 'Open a dialog, menu, drawer, file picker, or another interactive layer.' },
            { title: 'Trigger an operation', description: 'Refresh data, export a report, run a check, or retry a failed request.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection
          id="when-not-to-use"
          title="When not to use"
          description="Choose a more specific control when the interaction is navigation, selection, or a persistent setting."
        >
          <GuidanceList tone="dont" items={[
            { title: 'Do not use for navigation', description: 'Use a link when people move to another page, route, or external destination.' },
            { title: 'Do not use as a checkbox or switch', description: 'Use a selection control when the interface must communicate a persistent value.' },
            { title: 'Do not overload a surface', description: 'Too many competing buttons hide priority. Move secondary actions into menus or quieter controls.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection
          id="variants"
          title="Variants"
          description="Variants create an intentional hierarchy. Select the quietest treatment that still communicates the action’s importance."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Emphasis hierarchy" description="Filled is highest emphasis; text is lowest emphasis.">
              <Button variant="filled">Create project</Button>
              <Button variant="outlined">Preview</Button>
              <Button variant="tonal">Assign</Button>
              <Button variant="text">Learn more</Button>
              <Button variant="elevated">Open workspace</Button>
              <Button variant="filled" gradient>Upgrade plan</Button>
            </ComponentPreview>
            <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />
            <BehaviorGrid items={[
              { icon: 'ti-square-filled', title: 'Filled', description: 'Primary action in a focused area. Usually one per section or decision point.' },
              { icon: 'ti-square', title: 'Outlined', description: 'Supporting action that needs a visible boundary without competing with primary.' },
              { icon: 'ti-color-swatch', title: 'Tonal', description: 'Moderate emphasis for common actions on neutral surfaces.' },
              { icon: 'ti-typography', title: 'Text', description: 'Low-emphasis action used in compact or content-heavy contexts.' },
            ]} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="states"
          title="States"
          description="States provide immediate feedback about availability, focus, progress, and completion."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Operational states" description="Loading blocks repeated actions; success confirms completion; disabled communicates unavailability.">
              <Button loading>Saving</Button>
              <Button success>Saved</Button>
              <Button disabled>Unavailable</Button>
              <Button variant="outlined" disabled>Unavailable</Button>
            </ComponentPreview>
            <StateMatrix rows={STATES} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="behavior"
          title="Behavior"
          description="Button behavior must remain predictable across input methods, async actions, and responsive layouts."
        >
          <BehaviorGrid items={[
            { icon: 'ti-click', title: 'Activation', description: 'Fire one action per click, tap, Enter, or Space activation. Prevent accidental double submission.' },
            { icon: 'ti-loader-2', title: 'Async actions', description: 'Show loading immediately, preserve the label context, and block duplicate activation until completion.' },
            { icon: 'ti-arrows-horizontal', title: 'Responsive width', description: 'Keep intrinsic width by default. Use full width for narrow forms and stacked mobile actions.' },
            { icon: 'ti-focus-2', title: 'Focus continuity', description: 'Keep focus on the button after non-navigational actions unless a new modal context requires focus transfer.' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection
          id="accessibility"
          title="Accessibility"
          description="Buttons use native button semantics so keyboard, screen-reader, and alternative-input behavior works consistently."
        >
          <div className="component-doc-stack">
            <KeyboardTable rows={[
              { keys: ['Tab'], action: 'Moves focus to the button when it is available.' },
              { keys: ['Enter'], action: 'Activates the focused button.' },
              { keys: ['Space'], action: 'Activates the focused button on key release.' },
            ]} />
            <AccessibilityChecklist items={[
              'Use a visible text label that describes the outcome.',
              'Keep decorative icons hidden from the accessibility tree.',
              'Preserve a visible focus ring in every visual variant.',
              'Do not communicate state through color alone.',
              'Use disabled only when the action truly cannot run.',
              'Announce async completion or errors in the surrounding workflow when needed.',
            ]} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="content-guidelines"
          title="Content guidelines"
          description="Button labels should be concise, specific, and written from the user’s point of view."
        >
          <ContentGuidelines rules={[
            { label: 'Start with a verb', guidance: 'Describe the action directly instead of naming the object alone.', example: 'Create project' },
            { label: 'Name the outcome', guidance: 'Use specific labels when generic words could make people hesitate.', example: 'Send invitation' },
            { label: 'Use sentence case', guidance: 'Capitalize the first word and proper nouns. Avoid title case and punctuation.', example: 'Save changes' },
            { label: 'Keep labels stable', guidance: 'Loading feedback should preserve enough context to identify the action in progress.', example: 'Saving changes' },
          ]} />
        </ComponentDocSection>

        <ComponentDocSection
          id="examples"
          title="Examples"
          description="Compose icons, state, and width only when they improve comprehension or fit the surrounding workflow."
        >
          <div className="component-doc-stack">
            <ComponentPreview title="Product actions" description="Realistic actions across creation, export, progression, and async feedback.">
              <Button leadingIcon="plus">Create issue</Button>
              <Button variant="outlined" leadingIcon="download">Export report</Button>
              <Button trailingIcon="arrow-right">Continue</Button>
              <Button loading>Saving changes</Button>
              <Button success>Saved</Button>
            </ComponentPreview>
            <ComponentPreview title="Responsive form action" description="Full-width buttons work well at the bottom of narrow forms.">
              <div style={{ width: 'min(100%, 420px)' }}><Button fullWidth>Continue to review</Button></div>
            </ComponentPreview>
            <CodeBlock filename="App.tsx" code={EXAMPLES_CODE} />
          </div>
        </ComponentDocSection>

        <ComponentDocSection
          id="props-api"
          title="Props / API"
          description="Button extends native button attributes. Forward event handlers, data attributes, and ARIA attributes as needed."
        >
          <PropsTable props={BUTTON_PROPS} />
        </ComponentDocSection>

        <ComponentDocSection
          id="related-components"
          title="Related components"
          description="Choose the component that matches the intended interaction and information hierarchy."
        >
          <RelatedComponents items={[
            { name: 'IconButton', href: '/components/icon-button', description: 'Compact action with an accessible name', icon: 'ti-click' },
            { name: 'DropdownMenu', href: '/components/dropdown-menu', description: 'A grouped set of secondary actions', icon: 'ti-menu-2' },
            { name: 'Dialog', href: '/components/dialog', description: 'Focused tasks that require a response', icon: 'ti-layout-sidebar-right' },
            { name: 'Toast', href: '/components/toast', description: 'Non-blocking action feedback', icon: 'ti-bell' },
          ]} />
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
}
