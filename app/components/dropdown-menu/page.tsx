'use client';

import {
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuCheckboxItem,
  MenuRadioItem,
  MenuAvatarItem,
  MenuColorPicker,
  MenuEmojiReactions,
  MenuHeader,
  MenuSearch,
  ContextMenu,
  Button,
} from 'omverse-ui';
import { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props table data ─── */

const DROPDOWN_PROPS = [
  {
    name: 'trigger',
    type: 'ReactNode',
    default: '—',
    description: 'Element that triggers the menu — usually a Button or IconButton',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '—',
    description: 'Menu content — use MenuItem, MenuSeparator, MenuGroup etc.',
  },
  {
    name: 'theme',
    type: "'light' | 'dark'",
    default: "'light'",
    description: 'Visual theme of the menu panel',
  },
  {
    name: 'align',
    type: "'start' | 'end' | 'center'",
    default: "'start'",
    description: 'Horizontal alignment relative to the trigger',
  },
  {
    name: 'side',
    type: "'bottom' | 'top'",
    default: "'bottom'",
    description: 'Which side of the trigger to open on',
  },
  {
    name: 'open',
    type: 'boolean',
    default: 'undefined',
    description: 'Controlled open state',
  },
  {
    name: 'onOpenChange',
    type: '(open: boolean) => void',
    default: 'undefined',
    description: 'Callback when open state changes',
  },
  {
    name: 'minWidth',
    type: 'number',
    default: 'undefined',
    description: 'Minimum width of the menu panel in px',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

const API_PROPS = DROPDOWN_PROPS;

/* ─── Code snippets ─── */

const BASIC_CODE = `import { DropdownMenu, MenuItem, MenuSeparator, Button } from 'omverse-ui'

<DropdownMenu trigger={<Button variant="outlined">Actions</Button>}>
  <MenuItem icon="edit"  shortcut="⌘E">Edit</MenuItem>
  <MenuItem icon="refresh">Duplicate</MenuItem>
  <MenuItem icon="share">Share</MenuItem>
  <MenuSeparator />
  <MenuItem icon="trash" intent="danger">Delete</MenuItem>
</DropdownMenu>`;

const GROUPS_CODE = `import { DropdownMenu, MenuItem, MenuSeparator, MenuGroup, Button } from 'omverse-ui'

<DropdownMenu trigger={<Button variant="outlined">View options</Button>}>
  <MenuGroup label="Layout">
    <MenuItem icon="dots">Grid view</MenuItem>
    <MenuItem icon="dots-vertical">List view</MenuItem>
  </MenuGroup>
  <MenuSeparator />
  <MenuGroup label="Sort by">
    <MenuItem>Name</MenuItem>
    <MenuItem>Date modified</MenuItem>
    <MenuItem>Size</MenuItem>
  </MenuGroup>
</DropdownMenu>`;

const CHECKBOX_CODE = `import { DropdownMenu, MenuCheckboxItem, Button } from 'omverse-ui'

const [sidebar,  setSidebar]  = useState(true);
const [toolbar,  setToolbar]  = useState(false);
const [statusbar, setStatusbar] = useState(true);

<DropdownMenu trigger={<Button variant="outlined">Toggle features</Button>}>
  <MenuCheckboxItem checked={sidebar}   onCheckedChange={setSidebar}>
    Show sidebar
  </MenuCheckboxItem>
  <MenuCheckboxItem checked={toolbar}   onCheckedChange={setToolbar}>
    Show toolbar
  </MenuCheckboxItem>
  <MenuCheckboxItem checked={statusbar} onCheckedChange={setStatusbar}>
    Show statusbar
  </MenuCheckboxItem>
</DropdownMenu>`;

const DARK_CODE = `<DropdownMenu trigger={<Button variant="filled">Dark menu</Button>} theme="dark">
  <MenuItem icon="edit">Edit</MenuItem>
  <MenuItem icon="refresh">Duplicate</MenuItem>
  <MenuSeparator />
  <MenuItem icon="trash" intent="danger">Delete</MenuItem>
</DropdownMenu>`;

const CONTEXT_CODE = `import { ContextMenu, MenuItem, MenuSeparator } from 'omverse-ui'

<ContextMenu
  menu={
    <>
      <MenuItem icon="download"  shortcut="⌘C">Copy</MenuItem>
      <MenuItem icon="minus"     shortcut="⌘X">Cut</MenuItem>
      <MenuItem icon="bookmark"  shortcut="⌘V">Paste</MenuItem>
      <MenuSeparator />
      <MenuItem icon="trash" intent="danger">Delete</MenuItem>
    </>
  }
>
  <div style={{ border: '1px dashed var(--color-border)', borderRadius: 8, padding: '20px 40px' }}>
    Right-click anywhere here
  </div>
</ContextMenu>`;

const HEADER_SEARCH_CODE = `import { DropdownMenu, MenuHeader, MenuSearch, MenuItem, MenuSeparator, Button } from 'omverse-ui'

const [query, setQuery] = useState('');

<DropdownMenu trigger={<Button variant="outlined">Profile menu</Button>}>
  <MenuHeader name="Jane Smith" email="jane@example.com" />
  <MenuSeparator />
  <MenuSearch value={query} onChange={setQuery} placeholder="Search..." />
  <MenuItem icon="users">Profile</MenuItem>
  <MenuItem icon="settings">Settings</MenuItem>
  <MenuSeparator />
  <MenuItem icon="arrow-right" intent="danger">Sign out</MenuItem>
</DropdownMenu>`;

const SELECTION_CODE = `import { DropdownMenu, MenuRadioItem, MenuAvatarItem, MenuSeparator, Button } from 'omverse-ui'

const [density, setDensity] = useState('comfortable');
const [owner, setOwner] = useState('Maya Chen');

<DropdownMenu trigger={<Button variant="outlined">Assignment</Button>} minWidth={260}>
  <MenuRadioItem checked={density === 'compact'} onSelect={() => setDensity('compact')}>
    Compact density
  </MenuRadioItem>
  <MenuRadioItem checked={density === 'comfortable'} onSelect={() => setDensity('comfortable')}>
    Comfortable density
  </MenuRadioItem>
  <MenuSeparator />
  <MenuAvatarItem name="Maya Chen" role="Design lead" selected={owner === 'Maya Chen'} onClick={() => setOwner('Maya Chen')} />
  <MenuAvatarItem name="Alex Morgan" role="Engineering" selected={owner === 'Alex Morgan'} onClick={() => setOwner('Alex Morgan')} />
</DropdownMenu>`;

const RICH_INPUTS_CODE = `import { DropdownMenu, MenuColorPicker, MenuEmojiReactions, Button } from 'omverse-ui'

const [color, setColor] = useState('#6366f1');

<DropdownMenu trigger={<Button variant="outlined">Customize</Button>} minWidth={240}>
  <MenuColorPicker value={color} onChange={setColor} />
  <MenuEmojiReactions onReact={(emoji) => console.log(emoji)} />
</DropdownMenu>`;

/* ─── Demos with state ─── */

function CheckboxDemo() {
  const [sidebar, setSidebar] = useState(true);
  const [toolbar, setToolbar] = useState(false);
  const [statusbar, setStatusbar] = useState(true);

  return (
    <DropdownMenu trigger={<Button variant="outlined">Toggle features</Button>}>
      <MenuCheckboxItem checked={sidebar} onCheckedChange={setSidebar}>
        Show sidebar
      </MenuCheckboxItem>
      <MenuCheckboxItem checked={toolbar} onCheckedChange={setToolbar}>
        Show toolbar
      </MenuCheckboxItem>
      <MenuCheckboxItem checked={statusbar} onCheckedChange={setStatusbar}>
        Show statusbar
      </MenuCheckboxItem>
    </DropdownMenu>
  );
}

function ProfileMenuDemo() {
  const [query, setQuery] = useState('');
  return (
    <DropdownMenu trigger={<Button variant="outlined">Profile menu</Button>}>
      <MenuHeader name="Jane Smith" email="jane@example.com" />
      <MenuSeparator />
      <MenuSearch value={query} onChange={setQuery} placeholder="Search..." />
      <MenuItem icon="users">Profile</MenuItem>
      <MenuItem icon="settings">Settings</MenuItem>
      <MenuSeparator />
      <MenuItem icon="arrow-right" intent="danger">Sign out</MenuItem>
    </DropdownMenu>
  );
}

function SelectionMenuDemo() {
  const [density, setDensity] = useState('comfortable');
  const [owner, setOwner] = useState('Maya Chen');

  return (
    <DropdownMenu trigger={<Button variant="outlined">Assignment</Button>} minWidth={260}>
      <MenuRadioItem checked={density === 'compact'} onSelect={() => setDensity('compact')}>
        Compact density
      </MenuRadioItem>
      <MenuRadioItem checked={density === 'comfortable'} onSelect={() => setDensity('comfortable')}>
        Comfortable density
      </MenuRadioItem>
      <MenuSeparator />
      <MenuAvatarItem name="Maya Chen" role="Design lead" selected={owner === 'Maya Chen'} onClick={() => setOwner('Maya Chen')} />
      <MenuAvatarItem name="Alex Morgan" role="Engineering" selected={owner === 'Alex Morgan'} onClick={() => setOwner('Alex Morgan')} />
    </DropdownMenu>
  );
}

function RichInputsMenuDemo() {
  const [color, setColor] = useState('#6366f1');

  return (
    <DropdownMenu trigger={<Button variant="outlined">Customize</Button>} minWidth={240}>
      <MenuColorPicker value={color} onChange={setColor} />
      <MenuEmojiReactions />
    </DropdownMenu>
  );
}

/* ─── Page ─── */

export default function DropdownMenuPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'DropdownMenu']}
        title="DropdownMenu"
        description="Floating panel of actions triggered by a button. Supports checkbox, radio, search, avatar items and context menus."
        tags={['MenuItem', 'Checkbox', 'Radio', 'Search', 'Context menu', 'Dark theme']}
      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="Floating panel of actions triggered by a button. Supports checkbox, radio, search, avatar items and context menus.">
          <div className="component-doc-stack">
            <ComponentPreview title="Action menu" description="Group secondary record actions behind one clearly labelled trigger.">
              <DropdownMenu trigger={<Button variant="outlined">Actions</Button>}>
                <MenuItem icon="edit" shortcut="⌘E">Edit</MenuItem>
                <MenuItem icon="refresh">Duplicate</MenuItem>
                <MenuItem icon="share">Share</MenuItem>
                <MenuSeparator />
                <MenuItem icon="trash" intent="danger">Delete</MenuItem>
              </DropdownMenu>
            </ComponentPreview>
            <CodeBlock filename="ActionMenu.tsx" code={BASIC_CODE} />
            <div className="component-doc-prose">
              <p>Use a dropdown menu for related actions that do not all need persistent visibility. Keep the most important action outside the menu.</p>
            </div>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Root container and trigger area with popover boundary.</li>
            <li>Menu content blocks grouped by sections and optional search controls.</li>
            <li>Action rows with icons, shortcuts, and state indicators.</li>
            <li>Context menu fallback surface for right-click or touch-hold use cases.</li>
          </ul>
          <CodeBlock filename="Diagram" code={`Trigger ──► MenuPanel ──► {MenuItem, MenuSeparator, MenuGroup, MenuCheckboxItem, MenuRadioItem, MenuAvatarItem...}`} />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Choose DropdownMenu for command surfaces that open from one control.</li>
            <li>Use for dense action sets that need contextual visibility on demand.</li>
            <li>Use in lists, cards, and toolbars where actions share the same context.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use only for decorative layout without interaction meaning.</li>
            <li>Avoid when actions are always visible and must not be hidden.</li>
            <li>Prefer tabs or segmented controls for primary navigation.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-prose">
            <p>Common variants include icon-only triggers, dark theme, compact width control, and table/context-menu entry styles.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-prose">
            <ul>
              <li>Idle, focus, open, disabled items, and checked/selected states.</li>
              <li>Radio/checkbox states should preserve visual grouping and semantics.</li>
              <li>Destructive actions should be clearly marked with intent styling.</li>
            </ul>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-prose">
            <p>Keep keyboard order natural and predictable. Right-click actions should mirror pointer interactions where possible.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Use visible labels with sufficient contrast, especially in compact menus.</li>
            <li>Preserve focus ring and keyboard navigation order.</li>
            <li>Use <code>intent=&quot;danger&quot;</code> and ARIA labels for destructive actions.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Keep action labels concise and action-oriented.</li>
            <li>Use similar phrasing across menus for consistency.</li>
            <li>Limit nested content density so one menu remains easy to scan.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
            <div style={{ padding: '28px 40px' }}>
              <ComponentPreview
                title="Basic"
                description="Standard action list with icon, keyboard shortcut and a destructive delete item"
              >
                <DropdownMenu trigger={<Button variant="outlined">Actions</Button>}>
                  <MenuItem icon="edit"    shortcut="⌘E">Edit</MenuItem>
                  <MenuItem icon="refresh">Duplicate</MenuItem>
                  <MenuItem icon="share">Share</MenuItem>
                  <MenuSeparator />
                  <MenuItem icon="trash" intent="danger">Delete</MenuItem>
                </DropdownMenu>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={BASIC_CODE} />

              <ComponentPreview
                title="With groups"
                description="MenuGroup organises items under a label — useful for settings and filter menus"
              >
                <DropdownMenu trigger={<Button variant="outlined">View options</Button>}>
                  <MenuGroup label="Layout">
                    <MenuItem icon="dots">Grid view</MenuItem>
                    <MenuItem icon="dots-vertical">List view</MenuItem>
                  </MenuGroup>
                  <MenuSeparator />
                  <MenuGroup label="Sort by">
                    <MenuItem>Name</MenuItem>
                    <MenuItem>Date modified</MenuItem>
                    <MenuItem>Size</MenuItem>
                  </MenuGroup>
                </DropdownMenu>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={GROUPS_CODE} />

              <ComponentPreview
                title="Checkbox items"
                description="MenuCheckboxItem shows a checked state and fires onCheckedChange"
              >
                <CheckboxDemo />
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={CHECKBOX_CODE} />

              <ComponentPreview
                title="Dark theme"
                description="theme='dark' gives the menu panel a dark background"
              >
                <DropdownMenu trigger={<Button variant="filled">Dark menu</Button>} theme="dark">
                  <MenuItem icon="edit">Edit</MenuItem>
                  <MenuItem icon="refresh">Duplicate</MenuItem>
                  <MenuSeparator />
                  <MenuItem icon="trash" intent="danger">Delete</MenuItem>
                </DropdownMenu>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={DARK_CODE} />

              <ComponentPreview
                title="Context menu — right click"
                description="ContextMenu wraps any element and shows a menu on right-click"
                align="start"
              >
                <ContextMenu
                  menu={
                    <>
                      <MenuItem icon="download"  shortcut="⌘C">Copy</MenuItem>
                      <MenuItem icon="minus"     shortcut="⌘X">Cut</MenuItem>
                      <MenuItem icon="bookmark"  shortcut="⌘V">Paste</MenuItem>
                      <MenuSeparator />
                      <MenuItem icon="trash" intent="danger">Delete</MenuItem>
                    </>
                  }
                >
                  <div style={{
                    border: '0.5px dashed var(--color-border)',
                    borderRadius: 8,
                    padding: '20px 40px',
                    fontSize: 13,
                    color: 'var(--color-text-tertiary)',
                    cursor: 'context-menu',
                    userSelect: 'none',
                  }}>
                    Right-click anywhere here
                  </div>
                </ContextMenu>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={CONTEXT_CODE} />

              <ComponentPreview
                title="Profile menu"
                description="MenuHeader with search and action items"
              >
                <ProfileMenuDemo />
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={HEADER_SEARCH_CODE} />

              <ComponentPreview
                title="Radio and avatar selection"
                description="MenuRadioItem handles exclusive settings while MenuAvatarItem presents people pickers"
              >
                <SelectionMenuDemo />
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={SELECTION_CODE} />

              <ComponentPreview
                title="Color and reaction inputs"
                description="MenuColorPicker and MenuEmojiReactions add rich inputs inside a menu"
              >
                <RichInputsMenuDemo />
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={RICH_INPUTS_CODE} />
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
              <li>Use DropdownMenu with Button for primary actions.</li>
              <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
              <li>Use layout containers to keep dropdown behavior visually consistent.</li>
            </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  );
}
