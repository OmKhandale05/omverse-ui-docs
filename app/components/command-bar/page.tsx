'use client'

import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/ui/PageHeader'
import { ComponentPreview } from '@/components/ui/ComponentPreview'
import { CodeBlock } from '@/components/ui/CodeBlock'
import { PropsTable } from '@/components/ui/PropsTable'
import {
  AccessibilityChecklist, Anatomy, BehaviorGrid, ComponentDocSection,
  ComponentDocumentation, ContentGuidelines, GuidanceList, KeyboardTable,
  RelatedComponents, StateMatrix,
} from '@/components/docs/ComponentDocumentation'

const COMMAND_BAR_PROPS = [
  { name: 'commands', type: 'readonly CommandBarCommand[]', default: 'required', description: 'Commands available for search and execution.' },
  { name: 'open', type: 'boolean', default: 'undefined', description: 'Controlled visibility.' },
  { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial uncontrolled visibility.' },
  { name: 'onOpenChange', type: '(open: boolean) => void', default: 'undefined', description: 'Runs whenever visibility changes.' },
  { name: 'inputValue', type: 'string', default: 'undefined', description: 'Controlled search query.' },
  { name: 'defaultInputValue', type: 'string', default: "''", description: 'Initial uncontrolled query.' },
  { name: 'onInputValueChange', type: '(value: string) => void', default: 'undefined', description: 'Runs whenever the query changes.' },
  { name: 'title', type: 'string', default: "'Command menu'", description: 'Accessible title for the command surface.' },
  { name: 'placeholder', type: 'string', default: "'Search commands…'", description: 'Search prompt.' },
  { name: 'onCommandSelect', type: '(command) => void', default: 'undefined', description: 'Runs after an enabled command is selected.' },
  { name: 'filterCommand', type: '(command, query) => boolean', default: 'built-in text match', description: 'Custom command filtering logic.' },
  { name: 'loading', type: 'boolean', default: 'false', description: 'Shows asynchronous command progress.' },
  { name: 'emptyState', type: 'ReactNode', default: "'No commands found.'", description: 'Content shown when no command matches.' },
  { name: 'closeOnSelect', type: 'boolean', default: 'true', description: 'Closes after command execution.' },
  { name: 'hotkey', type: 'boolean', default: 'true', description: 'Enables the global Command/Ctrl+K shortcut.' },
  { name: 'returnFocusRef', type: 'RefObject<HTMLElement>', default: 'previous focus', description: 'Element focused after an overlay closes.' },
  { name: 'mode', type: "'overlay' | 'inline'", default: "'overlay'", description: 'Chooses modal palette or embedded search.' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Controls maximum command surface width.' },
] as const

const BASIC_CODE = `import { CommandBar, type CommandBarCommand } from 'omverse-ui'

const commands: CommandBarCommand[] = [
  { id: 'new-project', label: 'Create project', group: 'Actions', icon: 'plus', shortcut: ['⌘', 'N'], onSelect: createProject },
  { id: 'settings', label: 'Workspace settings', group: 'Navigate', icon: 'settings', onSelect: openSettings },
]

<CommandBar commands={commands} open={open} onOpenChange={setOpen} />`

const CONTROLLED_CODE = `<CommandBar
  commands={commands}
  inputValue={query}
  onInputValueChange={setQuery}
  filterCommand={(command, value) => rank(command, value) > 0}
  loading={isLoading}
  onCommandSelect={trackCommand}
/>`

const COMMANDS = [
  { id: 'create', label: 'Create project', detail: 'Start a new enterprise project', group: 'Actions', shortcut: '⌘ N' },
  { id: 'invite', label: 'Invite people', detail: 'Add members to this workspace', group: 'Actions' },
  { id: 'settings', label: 'Workspace settings', detail: 'Manage security and defaults', group: 'Navigate', shortcut: 'G S' },
  { id: 'audit', label: 'Audit reports', detail: 'Review governance activity', group: 'Navigate' },
]

function CommandBarPreview() {
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const results = useMemo(() => COMMANDS.filter((command) => `${command.label} ${command.detail} ${command.group}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <div className="command-bar-demo" role="dialog" aria-labelledby="command-bar-demo-title"><h3 id="command-bar-demo-title" className="sr-only">Command menu</h3><div className="command-bar-demo-search"><span aria-hidden>⌕</span><input role="combobox" aria-label="Command menu" aria-expanded="true" aria-controls="command-bar-demo-results" aria-activedescendant={results[active] ? `command-${results[active].id}` : undefined} value={query} placeholder="Search commands…" onChange={(event) => { setQuery(event.target.value); setActive(0) }} onKeyDown={(event) => { if (event.key === 'ArrowDown') { event.preventDefault(); setActive((value) => Math.min(value + 1, results.length - 1)) } if (event.key === 'ArrowUp') { event.preventDefault(); setActive((value) => Math.max(value - 1, 0)) } }} /><kbd>⌘ K</kbd></div><div id="command-bar-demo-results" role="listbox" aria-label="Command results">{results.length ? ['Actions', 'Navigate'].map((group) => { const items = results.filter((command) => command.group === group); return items.length ? <div key={group} role="group" aria-label={group}><strong>{group}</strong>{items.map((command) => { const index = results.indexOf(command); return <div key={command.id} id={`command-${command.id}`} role="option" aria-selected={index === active} onMouseEnter={() => setActive(index)}><span><b>{command.label}</b><small>{command.detail}</small></span>{command.shortcut && <kbd>{command.shortcut}</kbd>}</div> })}</div> : null }) : <p role="status">No commands found.</p>}</div><footer><span>↑↓ Navigate</span><span>↵ Run</span><span>{results.length} commands</span></footer></div>
}

export default function CommandBarPage() {
  return <div>
    <PageHeader breadcrumb={['Components', 'Enterprise', 'CommandBar']} title="CommandBar" description="CommandBar provides fast, searchable access to enterprise actions and destinations." tags={['⌘ / Ctrl K', 'Grouped commands', 'Active descendant', 'Overlay + inline', '3 widths']} />
    <ComponentDocumentation>
      <ComponentDocSection id="overview" title="Overview" description="Use CommandBar to help experienced and keyboard-oriented users find and execute actions without navigating through several interface layers."><div className="component-doc-stack"><ComponentPreview title="Workspace commands" description="Search the command set or use Arrow keys to change the active result." layout="start"><CommandBarPreview /></ComponentPreview><CodeBlock filename="WorkspaceCommands.tsx" code={BASIC_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="anatomy" title="Anatomy" description="CommandBar combines a named search field, grouped results, active command, shortcut hints, and keyboard guidance."><Anatomy preview={<div className="component-anatomy-visual command-bar-anatomy"><header><i>⌕</i><span>Search commands…</span><kbd>⌘ K</kbd></header><main><strong>Actions</strong><p className="active"><span>Create project<small>Start a new project</small></span><kbd>⌘ N</kbd></p><strong>Navigate</strong><p><span>Workspace settings</span></p></main><footer><span>↑↓ Navigate</span><span>↵ Run</span></footer><span className="component-anatomy-marker component-anatomy-marker--leader-down" style={{ top: -34, left: 94 }}>1</span><span className="component-anatomy-marker component-anatomy-marker--leader-right" style={{ top: 66, left: -34 }}>2</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 92, right: -34 }}>3</span><span className="component-anatomy-marker component-anatomy-marker--leader-left" style={{ top: 42, right: -34 }}>4</span><span className="component-anatomy-marker component-anatomy-marker--leader-up" style={{ bottom: -34, left: 94 }}>5</span></div>} items={[
        { number: 1, name: 'Command search', description: 'Filters the command set while retaining keyboard focus.' },
        { number: 2, name: 'Command group', description: 'Organizes related actions and destinations under a short heading.' },
        { number: 3, name: 'Active command', description: 'Identifies the result that Enter will execute.' },
        { number: 4, name: 'Shortcut hint', description: 'Teaches a direct keyboard path for a familiar command.' },
        { number: 5, name: 'Keyboard guidance', description: 'Summarizes navigation and execution keys.' },
      ]} /></ComponentDocSection>
      <ComponentDocSection id="when-to-use" title="When to use" description="Use CommandBar when an application has many actions or destinations that experienced users need to reach quickly."><GuidanceList tone="do" items={[{ title: 'Accelerate broad workflows', description: 'Search commands across projects, people, settings, reports, and navigation.' }, { title: 'Support keyboard-first work', description: 'Offer a global shortcut and predictable result navigation.' }, { title: 'Expose contextual commands', description: 'Build the command set from current permissions, selection, and workspace state.' }]} /></ComponentDocSection>
      <ComponentDocSection id="when-not-to-use" title="When not to use" description="CommandBar should complement discoverable navigation and controls, not replace them."><GuidanceList tone="dont" items={[{ title: 'Do not hide primary actions', description: 'Keep frequent and critical actions visible in Toolbar or page content.' }, { title: 'Do not use for value selection', description: 'Use Combobox when the result becomes a form value.' }, { title: 'Do not overload novice workflows', description: 'Maintain ordinary navigation and contextual help alongside commands.' }]} /></ComponentDocSection>
      <ComponentDocSection id="variants" title="Variants" description="Mode and width adapt CommandBar to global command palettes and embedded workspace search."><BehaviorGrid items={[{ icon: 'ti-command', title: 'Overlay', description: 'Provides a modal global command surface with focus containment.' }, { icon: 'ti-search', title: 'Inline', description: 'Embeds command search within a page or productivity workspace.' }, { icon: 'ti-folders', title: 'Grouped', description: 'Separates actions, navigation, records, and other command families.' }, { icon: 'ti-arrows-horizontal', title: 'Widths', description: 'Small, medium, and large accommodate command metadata.' }]} /></ComponentDocSection>
      <ComponentDocSection id="states" title="States" description="CommandBar coordinates visibility, query, active result, execution availability, progress, and empty feedback."><StateMatrix rows={[{ state: 'Closed', trigger: 'Palette is inactive', visual: 'No overlay surface', interaction: 'Global shortcut opens' }, { state: 'Open', trigger: 'Shortcut or trigger activates', visual: 'Search and grouped commands', interaction: 'Input receives focus' }, { state: 'Active', trigger: 'Keyboard or pointer movement', visual: 'Tonal row highlight', interaction: 'Enter executes' }, { state: 'Disabled command', trigger: 'Action is unavailable', visual: 'Reduced emphasis', interaction: 'Cannot execute' }, { state: 'Loading', trigger: 'Commands are resolving', visual: 'Progress and loading message', interaction: 'Query remains visible' }, { state: 'Empty', trigger: 'No command matches', visual: 'No-command message', interaction: 'Query remains editable' }]} /></ComponentDocSection>
      <ComponentDocSection id="behavior" title="Behavior" description="CommandBar owns discovery and invocation mechanics while applications own command availability, authorization, navigation, and side effects."><BehaviorGrid items={[{ icon: 'ti-keyboard', title: 'Global shortcut', description: 'Command/Ctrl+K toggles the overlay without entering text.' }, { icon: 'ti-focus-2', title: 'Active descendant', description: 'Focus stays in search while results are navigated.' }, { icon: 'ti-filter', title: 'Filtering', description: 'Default matching covers labels, descriptions, groups, and keywords.' }, { icon: 'ti-player-play', title: 'Execution', description: 'Enter runs the active enabled command and normally closes the palette.' }]} /></ComponentDocSection>
      <ComponentDocSection id="accessibility" title="Accessibility" description="Overlay CommandBar is a named modal dialog containing an editable combobox and grouped listbox with active-descendant navigation."><div className="component-doc-stack"><KeyboardTable rows={[{ keys: ['⌘', 'K'], action: 'Opens or closes the global command surface.' }, { keys: ['↑', '↓'], action: 'Moves the active command.' }, { keys: ['Home', 'End'], action: 'Moves to the first or last result.' }, { keys: ['Enter'], action: 'Executes the active enabled command.' }, { keys: ['Esc'], action: 'Closes and returns focus.' }, { keys: ['Tab'], action: 'Cycles through focusable overlay controls.' }]} /><AccessibilityChecklist items={['Give the command surface and result list concise names.', 'Keep DOM focus in the search input during result navigation.', 'Expose the active command with aria-activedescendant.', 'Announce disabled commands without allowing execution.', 'Trap and return focus in overlay mode.', 'Show shortcut hints as supplemental text, never the only label.']} /></div></ComponentDocSection>
      <ComponentDocSection id="content-guidelines" title="Content guidelines" description="Command labels should describe an immediate result and remain distinguishable when removed from their original screen."><ContentGuidelines rules={[{ label: 'Start with a verb', guidance: 'Name executable commands by their outcome.', example: 'Create project' }, { label: 'Name destinations', guidance: 'Use destination titles for navigation commands.', example: 'Workspace settings' }, { label: 'Add concise context', guidance: 'Use descriptions to distinguish similar commands.', example: 'Manage security and defaults' }, { label: 'Group by intent', guidance: 'Use short parallel headings.', example: 'Actions, Navigate' }]} /></ComponentDocSection>
      <ComponentDocSection id="examples" title="Examples" description="Controlled query and filtering support server-ranked or permission-aware command sets."><div className="component-doc-stack"><ComponentPreview title="Interactive command menu" description="Try filtering the realistic grouped command set." layout="start"><CommandBarPreview /></ComponentPreview><CodeBlock filename="ControlledCommands.tsx" code={CONTROLLED_CODE} /></div></ComponentDocSection>
      <ComponentDocSection id="props-api" title="Props / API" description="CommandBar extends div attributes; CommandBarCommand defines identity, content, grouping, discovery keywords, availability, shortcut hints, and execution."><PropsTable props={COMMAND_BAR_PROPS} /></ComponentDocSection>
      <ComponentDocSection id="related-components" title="Related components" description="Use adjacent patterns based on whether people are executing commands, choosing values, navigating, or acting on current content."><RelatedComponents items={[{ name: 'Combobox', href: '/components/combobox', description: 'Search and select governed values', icon: 'ti-list-search' }, { name: 'Toolbar', href: '/components/toolbar', description: 'Keep contextual actions visible', icon: 'ti-layout-navbar' }, { name: 'DropdownMenu', href: '/components/dropdown-menu', description: 'Expose a smaller local command set', icon: 'ti-menu-2' }, { name: 'Navbar', href: '/components/navbar', description: 'Keep destinations discoverable', icon: 'ti-layout-navbar' }]} /></ComponentDocSection>
    </ComponentDocumentation>
  </div>
}
