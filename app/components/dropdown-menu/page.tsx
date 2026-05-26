'use client';

import {
  DropdownMenu,
  MenuItem,
  MenuSeparator,
  MenuGroup,
  MenuCheckboxItem,
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

/* ─── Checkbox demo with state ─── */

function CheckboxDemo() {
  const [sidebar,   setSidebar]   = useState(true);
  const [toolbar,   setToolbar]   = useState(false);
  const [statusbar, setStatusbar] = useState(true);

  return (
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
    </DropdownMenu>
  );
}

/* ─── Profile menu demo (MenuHeader + MenuSearch) ─── */

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

/* ─── Page ─── */

export default function DropdownMenuPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Overlay', 'DropdownMenu']}
        title="DropdownMenu"
        description="Floating panel of actions triggered by a button. Supports checkbox, radio, search, avatar items and context menus."
        tags={['MenuItem', 'Checkbox', 'Radio', 'Search', 'Context menu', 'Dark theme']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Basic ── */}
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

        {/* ── Section 2: With groups ── */}
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

        {/* ── Section 3: Checkbox items ── */}
        <ComponentPreview
          title="Checkbox items"
          description="MenuCheckboxItem shows a checked state and fires onCheckedChange — ideal for toggleable settings"
        >
          <CheckboxDemo />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CHECKBOX_CODE} />

        {/* ── Section 4: Dark theme ── */}
        <ComponentPreview
          title="Dark theme"
          description="theme='dark' gives the menu panel a dark background — works on any trigger"
        >
          <DropdownMenu trigger={<Button variant="filled">Dark menu</Button>} theme="dark">
            <MenuItem icon="edit">Edit</MenuItem>
            <MenuItem icon="refresh">Duplicate</MenuItem>
            <MenuSeparator />
            <MenuItem icon="trash" intent="danger">Delete</MenuItem>
          </DropdownMenu>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DARK_CODE} />

        {/* ── Section 5: Context menu ── */}
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

        {/* ── Section 6: Profile menu with header + search ── */}
        <ComponentPreview
          title="Profile menu"
          description="MenuHeader shows user info at the top; MenuSearch adds a live search field inside the panel"
        >
          <ProfileMenuDemo />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={HEADER_SEARCH_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={DROPDOWN_PROPS} />

      </div>
    </div>
  );
}
