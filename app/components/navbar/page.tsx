'use client';

import { useState } from 'react';
import { Navbar, Sidebar, Button, type NavItem, type NavSection } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const NAVBAR_PROPS = [
  {
    name: 'variant',
    type: "'default' | 'saas' | 'vercel' | 'notion' | 'linear' | 'stripe' | 'glass' | 'dark' | 'floating' | 'centered' | 'frosted' | 'pill' | 'gradient' | 'outlined' | 'two-row' | 'command'",
    default: "'default'",
    description: 'Visual style of the navbar',
  },
  {
    name: 'items',
    type: 'NavItem[]',
    default: 'undefined',
    description: 'Nav items shown in the main/center area',
  },
  {
    name: 'activeId',
    type: 'string',
    default: 'undefined',
    description: 'ID of the currently active nav item',
  },
  {
    name: 'brandName',
    type: 'string',
    default: 'undefined',
    description: 'Brand name text shown in the logo area',
  },
  {
    name: 'logo',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Custom logo element (takes precedence over brandName)',
  },
  {
    name: 'actions',
    type: 'ReactNode',
    default: 'undefined',
    description: 'Right-side slot — buttons, avatar, search etc.',
  },
  {
    name: 'onItemClick',
    type: '(item: NavItem) => void',
    default: 'undefined',
    description: 'Callback fired when a nav item is clicked',
  },
  {
    name: 'subItems',
    type: 'NavItem[]',
    default: 'undefined',
    description: 'Sub-tabs for the two-row variant',
  },
  {
    name: 'title',
    type: 'string',
    default: 'undefined',
    description: 'Page title for two-row / notion variants',
  },
  {
    name: 'showSearch',
    type: 'boolean',
    default: 'false',
    description: 'Shows a ⌘K search trigger (command variant)',
  },
  {
    name: 'workspaceName',
    type: 'string',
    default: 'undefined',
    description: 'Workspace display name (linear variant)',
  },
  {
    name: 'workspaceIcon',
    type: 'string',
    default: 'undefined',
    description: 'Workspace icon / initials (linear variant)',
  },
  {
    name: 'user',
    type: '{ name: string; email?: string; avatarSrc?: string }',
    default: 'undefined',
    description: 'User info shown in the profile area',
  },
  {
    name: 'sections',
    type: 'NavSection[]',
    default: 'undefined',
    description: 'Sidebar section groups (sidebar layout)',
  },
  {
    name: 'collapsed',
    type: 'boolean',
    default: 'false',
    description: 'Collapsed state for sidebar variants',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Shared data ─── */

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects',  label: 'Projects' },
  { id: 'team',      label: 'Team' },
  { id: 'settings',  label: 'Settings' },
];

const SUB_ITEMS: NavItem[] = [
  { id: 'overview',  label: 'Overview' },
  { id: 'analytics', label: 'Analytics' },
  { id: 'reports',   label: 'Reports' },
];

const SIDEBAR_SECTIONS: NavSection[] = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'bookmark' },
      { id: 'projects',  label: 'Projects',  icon: 'file-text' },
      { id: 'team',      label: 'Team',      icon: 'users' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'settings', label: 'Settings', icon: 'settings' },
      { id: 'billing',  label: 'Billing',  icon: 'credit-card' },
    ],
  },
];

const USER = { name: 'Jane Smith', email: 'jane@acme.com' };
const ACTIONS = <Button size="sm" variant="filled">Get started</Button>;

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Navbar } from 'omverse-ui'

const items = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'projects',  label: 'Projects' },
  { id: 'team',      label: 'Team' },
  { id: 'settings',  label: 'Settings' },
]

<Navbar
  variant="default"
  brandName="Acme"
  items={items}
  activeId="dashboard"
  actions={<Button size="sm" variant="filled">Get started</Button>}
/>`;

const GLASS_CODE = `// glass and gradient variants need a coloured background
<div style={{ background: 'linear-gradient(135deg,#1E3A8A,#4C1D95)', padding: 20, borderRadius: 12 }}>
  <Navbar variant="glass" brandName="Acme" items={items} activeId="dashboard" />
</div>`;

const TWO_ROW_CODE = `<Navbar
  variant="two-row"
  brandName="Acme"
  title="Dashboard"
  items={items}
  activeId="dashboard"
  subItems={[
    { id: 'overview',  label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
    { id: 'reports',   label: 'Reports' },
  ]}
  activeSubId="overview"
/>`;

const COMMAND_CODE = `<Navbar
  variant="command"
  brandName="Acme"
  items={items}
  activeId="dashboard"
  showSearch
  onSearchClick={() => setSearchOpen(true)}
/>`;

const LINEAR_CODE = `<Navbar
  variant="linear"
  workspaceName="Acme"
  workspaceIcon="A"
  items={items}
  activeId="dashboard"
/>`;

const SIDEBAR_CODE = `import { Sidebar } from 'omverse-ui'

<Sidebar
  sections={[
    {
      label: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: 'bookmark' },
        { id: 'projects',  label: 'Projects',  icon: 'file-text' },
        { id: 'team',      label: 'Team',      icon: 'users' },
      ],
    },
    {
      label: 'Settings',
      items: [
        { id: 'settings', label: 'Settings', icon: 'settings' },
        { id: 'billing',  label: 'Billing',  icon: 'credit-card' },
      ],
    },
  ]}
  activeId="dashboard"
  brandName="Acme"
  user={{ name: 'Jane Smith', email: 'jane@acme.com' }}
/>`;

/* ─── Shared wrapper style ─── */

const navWrap: React.CSSProperties = {
  width: '100%',
  overflow: 'hidden',
  borderRadius: 10,
  border: '1px solid var(--color-border-primary)',
};

const darkBg: React.CSSProperties = {
  background: 'linear-gradient(135deg,#1E3A8A,#4C1D95)',
  padding: 20,
  borderRadius: 12,
  width: '100%',
};

/* ─── Page ─── */

export default function NavbarPage() {
  const [activeId, setActiveId] = useState('dashboard');
  const [activeSubId, setActiveSubId] = useState('overview');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleClick = (item: NavItem) => setActiveId(item.id);

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Navbar']}
        title="Navbar"
        description="Flexible navigation component for web apps. 16 variants covering every real-world use case including sidebar."
        tags={['16 variants', 'Sidebar', 'Collapsible', 'Dark mode', 'Search']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── 1. Default ── */}
        <ComponentPreview
          title="Default"
          description="Clean horizontal navbar — logo left, items center, actions right"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="default" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── 2. SaaS ── */}
        <ComponentPreview
          title="SaaS"
          description="Modern SaaS product layout with subtle background and pill indicator"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="saas" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 3. Vercel ── */}
        <ComponentPreview
          title="Vercel"
          description="Inspired by Vercel's minimal dark-on-white nav with bordered dividers"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="vercel" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 4. Notion ── */}
        <ComponentPreview
          title="Notion"
          description="Workspace style with a page title in the header area"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="notion" brandName="Acme" title="My Workspace" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 5. Linear ── */}
        <ComponentPreview
          title="Linear"
          description="Dense sidebar-style nav with workspace switcher and icon strip"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="linear" workspaceName="Acme Corp" workspaceIcon="A" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LINEAR_CODE} />

        {/* ── 6. Stripe ── */}
        <ComponentPreview
          title="Stripe"
          description="Documentation-style nav with bold brand and category links"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="stripe" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 7. Dark ── */}
        <ComponentPreview
          title="Dark"
          description="Full dark background — ideal for apps with a dark-first aesthetic"
          align="start"
        >
          <div style={{ ...navWrap, border: 'none' }}>
            <Navbar variant="dark" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 8. Glass ── */}
        <ComponentPreview
          title="Glass"
          description="Frosted-glass effect — best used on coloured or image backgrounds"
          align="start"
        >
          <div style={darkBg}>
            <div style={{ ...navWrap, border: 'none' }}>
              <Navbar variant="glass" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GLASS_CODE} />

        {/* ── 9. Floating ── */}
        <ComponentPreview
          title="Floating"
          description="Elevated pill-shaped bar with a drop shadow — floats above the page content"
          align="start"
        >
          <div style={{ padding: '20px 0', width: '100%' }}>
            <Navbar variant="floating" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 10. Centered ── */}
        <ComponentPreview
          title="Centered"
          description="All items center-aligned — marketing and landing page style"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="centered" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 11. Frosted ── */}
        <ComponentPreview
          title="Frosted"
          description="Sticky frosted-glass with backdrop blur — stays legible over any content"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="frosted" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 12. Pill ── */}
        <ComponentPreview
          title="Pill"
          description="Each nav item is a pill — active item gets a solid fill"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="pill" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 13. Gradient ── */}
        <ComponentPreview
          title="Gradient"
          description="Brand gradient background — bold and eye-catching hero bars"
          align="start"
        >
          <div style={{ ...navWrap, border: 'none' }}>
            <Navbar variant="gradient" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 14. Outlined ── */}
        <ComponentPreview
          title="Outlined"
          description="Full border around the navbar — lightweight and subtle"
          align="start"
        >
          <div style={navWrap}>
            <Navbar variant="outlined" brandName="Acme" items={NAV_ITEMS} activeId={activeId} onItemClick={handleClick} actions={ACTIONS} />
          </div>
        </ComponentPreview>

        {/* ── 15. Two-row ── */}
        <ComponentPreview
          title="Two-row"
          description="Primary nav on top, contextual sub-tabs below — dashboard and admin panels"
          align="start"
        >
          <div style={navWrap}>
            <Navbar
              variant="two-row"
              brandName="Acme"
              title="Dashboard"
              items={NAV_ITEMS}
              activeId={activeId}
              onItemClick={handleClick}
              subItems={SUB_ITEMS}
              activeSubId={activeSubId}
              actions={ACTIONS}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TWO_ROW_CODE} />

        {/* ── 16. Command ── */}
        <ComponentPreview
          title="Command"
          description="⌘K search trigger built-in — command palette pattern for power users"
          align="start"
        >
          <div style={navWrap}>
            <Navbar
              variant="command"
              brandName="Acme"
              items={NAV_ITEMS}
              activeId={activeId}
              onItemClick={handleClick}
              showSearch
              actions={ACTIONS}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COMMAND_CODE} />

        {/* ── Sidebar ── */}
        <ComponentPreview
          title="Sidebar"
          description="Vertical dashboard navigation with sections, icons, user profile and collapsible state"
          align="start"
        >
          <div style={{ display: 'flex', gap: 0, height: 380, borderRadius: 10, overflow: 'hidden', border: '1px solid var(--color-border-primary)', width: '100%', maxWidth: 680 }}>
            <Sidebar
              sections={SIDEBAR_SECTIONS}
              activeId={activeId}
              onItemClick={handleClick}
              brandName="Acme"
              user={USER}
              collapsed={sidebarCollapsed}
            />
            <div style={{ flex: 1, padding: 24, background: 'var(--color-surface-secondary, #F8FAFC)' }}>
              <div style={{ fontSize: 13, color: 'var(--color-text-tertiary)', marginBottom: 12 }}>Page content</div>
              <button
                style={{
                  fontSize: 12,
                  padding: '6px 12px',
                  borderRadius: 6,
                  border: '1px solid var(--color-border-primary)',
                  background: 'none',
                  cursor: 'pointer',
                  color: 'var(--color-text-secondary)',
                }}
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              >
                {sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              </button>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIDEBAR_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={NAVBAR_PROPS} />

      </div>
    </div>
  );
}
