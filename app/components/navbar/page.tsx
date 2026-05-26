'use client';

import { useState } from 'react';
import { Navbar, Sidebar, Button, Avatar, Icon, type NavItem, type NavSection } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props tables ─── */

const NAVBAR_PROPS = [
  { name: 'items',           type: 'NavItem[]',                                       default: '[]',       description: 'Main navigation items' },
  { name: 'activeId',        type: 'string',                                          default: '—',        description: 'ID of the currently active item' },
  { name: 'onItemClick',     type: '(item: NavItem) => void',                         default: '—',        description: 'Callback when an item is clicked' },
  { name: 'variant',         type: "'saas' | 'centered' | 'pill' | 'stripe' | 'outlined' | 'vercel' | 'linear' | 'command' | 'notion' | 'two-row' | 'glass' | 'frosted' | 'gradient'", default: "'saas'", description: 'Navbar style preset' },
  { name: 'logo',            type: 'ReactNode',                                       default: '—',        description: 'Logo element shown on the left' },
  { name: 'actions',         type: 'ReactNode',                                       default: '—',        description: 'Content rendered on the right side' },
  { name: 'title',           type: 'string',                                          default: '—',        description: 'Page title (two-row variant)' },
  { name: 'subItems',        type: 'NavItem[]',                                       default: '—',        description: 'Secondary nav items (two-row variant)' },
  { name: 'activeSubId',     type: 'string',                                          default: '—',        description: 'Active secondary item ID (two-row)' },
  { name: 'onSubItemClick',  type: '(item: NavItem) => void',                         default: '—',        description: 'Callback for secondary item clicks' },
  { name: 'workspaceName',   type: 'string',                                          default: '—',        description: 'Workspace name (linear variant)' },
  { name: 'workspaceIcon',   type: 'ReactNode',                                       default: '—',        description: 'Workspace icon (linear variant)' },
  { name: 'breadcrumb',      type: 'ReactNode[]',                                     default: '—',        description: 'Breadcrumb items (notion variant)' },
  { name: 'showSearch',      type: 'boolean',                                         default: 'false',    description: 'Shows a search button (command variant)' },
  { name: 'onSearchClick',   type: '() => void',                                      default: '—',        description: 'Callback when search is clicked' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const SIDEBAR_PROPS = [
  { name: 'sections',        type: 'NavSection[]',                                    default: '[]',       description: 'Grouped navigation sections' },
  { name: 'activeId',        type: 'string',                                          default: '—',        description: 'ID of the currently active item' },
  { name: 'onItemClick',     type: '(item: NavItem) => void',                         default: '—',        description: 'Callback when an item is clicked' },
  { name: 'collapsed',       type: 'boolean',                                         default: 'false',    description: 'Collapses the sidebar to icon-only mode' },
  { name: 'header',          type: 'ReactNode',                                       default: '—',        description: 'Content at the top of the sidebar' },
  { name: 'footer',          type: 'ReactNode',                                       default: '—',        description: 'Content at the bottom of the sidebar' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Shared data ─── */

const mainItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard',  icon: 'layout-dashboard' },
  { id: 'projects',  label: 'Projects',   icon: 'folder' },
  { id: 'team',      label: 'Team',       icon: 'users' },
  { id: 'analytics', label: 'Analytics',  icon: 'bar-chart-2' },
  { id: 'settings',  label: 'Settings',   icon: 'settings' },
];

const subItems: NavItem[] = [
  { id: 'general',     label: 'General'     },
  { id: 'security',    label: 'Security'    },
  { id: 'billing',     label: 'Billing'     },
  { id: 'integrations', label: 'Integrations' },
];

const sidebarSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard',  icon: 'layout-dashboard' },
      { id: 'projects',  label: 'Projects',   icon: 'folder' },
      { id: 'analytics', label: 'Analytics',  icon: 'bar-chart-2' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'team',      label: 'Team',       icon: 'users' },
      { id: 'settings',  label: 'Settings',   icon: 'settings' },
    ],
  },
];

/* ─── Code snippets ─── */

const SAAS_CODE = `import { Navbar, type NavItem } from 'omverse-ui'

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
  { id: 'projects',  label: 'Projects',  icon: 'folder' },
  { id: 'team',      label: 'Team',      icon: 'users' },
  { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2' },
  { id: 'settings',  label: 'Settings',  icon: 'settings' },
]

<Navbar
  variant="saas"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  logo={<span style={{ fontWeight: 700 }}>Acme</span>}
  actions={<Avatar size="sm" src="https://i.pravatar.cc/150?img=1" />}
/>`;

const CENTERED_CODE = `<Navbar variant="centered" items={items} activeId={active} onItemClick={item => setActive(item.id)}
  logo={<span style={{ fontWeight: 700 }}>Brand</span>}
  actions={<Button size="sm" variant="filled">Sign up</Button>}
/>`;

const PILL_CODE = `<Navbar variant="pill" items={items} activeId={active} onItemClick={item => setActive(item.id)}
  logo={<span style={{ fontWeight: 700 }}>App</span>}
  actions={<Button size="sm">Get started</Button>}
/>`;

const STRIPE_CODE = `<Navbar variant="stripe" items={items} activeId={active} onItemClick={item => setActive(item.id)}
  logo={<span style={{ fontWeight: 700 }}>Logo</span>}
  actions={<Button size="sm" variant="filled">Upgrade</Button>}
/>`;

const VERCEL_CODE = `<Navbar variant="vercel" items={items} activeId={active} onItemClick={item => setActive(item.id)}
  logo={<span style={{ fontWeight: 700 }}>▲</span>}
  actions={<Avatar size="sm" src="https://i.pravatar.cc/150?img=1" />}
/>`;

const LINEAR_CODE = `<Navbar
  variant="linear"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  workspaceName="Acme Corp"
  workspaceIcon={<span>🚀</span>}
/>`;

const COMMAND_CODE = `<Navbar
  variant="command"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  showSearch
  onSearchClick={() => console.log('search')}
  logo={<span style={{ fontWeight: 700 }}>App</span>}
/>`;

const NOTION_CODE = `<Navbar
  variant="notion"
  breadcrumb={[
    <span key="home">Home</span>,
    <span key="docs">Documentation</span>,
    <span key="page">Current page</span>,
  ]}
  actions={<Button size="sm" variant="outlined">Share</Button>}
/>`;

const TWO_ROW_CODE = `<Navbar
  variant="two-row"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  subItems={subItems}
  activeSubId={activeSub}
  onSubItemClick={item => setActiveSub(item.id)}
  title="Settings"
  logo={<span style={{ fontWeight: 700 }}>Brand</span>}
/>`;

const GLASS_CODE = `<div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 12, padding: 0, overflow: 'hidden' }}>
  <Navbar
    variant="glass"
    items={items}
    activeId={active}
    onItemClick={item => setActive(item.id)}
    logo={<span style={{ fontWeight: 700, color: '#fff' }}>Glass</span>}
  />
</div>`;

const SIDEBAR_CODE = `import { Sidebar, type NavSection } from 'omverse-ui'

const sections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-dashboard' },
      { id: 'projects',  label: 'Projects',  icon: 'folder' },
      { id: 'analytics', label: 'Analytics', icon: 'bar-chart-2' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { id: 'team',     label: 'Team',     icon: 'users'    },
      { id: 'settings', label: 'Settings', icon: 'settings' },
    ],
  },
]

<Sidebar
  sections={sections}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  collapsed={collapsed}
/>`;

/* ─── Page ─── */

export default function NavbarPage() {
  const [active,    setActive]    = useState('dashboard');
  const [activeSub, setActiveSub] = useState('general');
  const [collapsed, setCollapsed] = useState(false);

  const userActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button size="sm" variant="outlined">Sign in</Button>
      <Button size="sm" variant="filled">Sign up</Button>
    </div>
  );

  const avatarAction = (
    <Avatar size="sm" src="https://i.pravatar.cc/150?img=1" alt="User" />
  );

  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Navbar']}
        title="Navbar"
        description="13 variants · SaaS · Centered · Pill · Stripe · Vercel · Linear · Command · Notion · Two-row · Glass · Frosted · Gradient · Sidebar"
        tags={['SaaS', 'Centered', 'Pill', 'Stripe', 'Outlined', 'Vercel', 'Linear', 'Command', 'Notion', 'Two-row', 'Glass', 'Frosted', 'Gradient', 'Sidebar']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: SaaS ── */}
        <ComponentPreview
          title="SaaS"
          description="Standard app navbar with logo, nav items, and user avatar"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="saas"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Acme</span>}
              actions={avatarAction}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SAAS_CODE} />

        {/* ── Section 2: Centered ── */}
        <ComponentPreview
          title="Centered"
          description="Navigation items centered in the bar with logo and actions on the sides"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="centered"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Brand</span>}
              actions={userActions}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={CENTERED_CODE} />

        {/* ── Section 3: Pill ── */}
        <ComponentPreview
          title="Pill"
          description="Pill-shaped active indicator — great for marketing pages"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="pill"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>App</span>}
              actions={<Button size="sm">Get started</Button>}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={PILL_CODE} />

        {/* ── Section 4: Stripe ── */}
        <ComponentPreview
          title="Stripe"
          description="Bottom border indicator with a clean minimal look"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="stripe"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Logo</span>}
              actions={<Button size="sm" variant="filled">Upgrade</Button>}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STRIPE_CODE} />

        {/* ── Section 5: Outlined ── */}
        <ComponentPreview
          title="Outlined"
          description="Bordered active item indicator"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="outlined"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Brand</span>}
              actions={avatarAction}
            />
          </div>
        </ComponentPreview>

        {/* ── Section 6: Vercel (dark) ── */}
        <ComponentPreview
          title="Vercel — dark"
          description="Dark navbar inspired by Vercel's design language"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="vercel"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 800, fontSize: 18 }}>▲</span>}
              actions={avatarAction}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VERCEL_CODE} />

        {/* ── Section 7: Linear ── */}
        <ComponentPreview
          title="Linear"
          description="Workspace switcher on the left — inspired by Linear's nav"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="linear"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              workspaceName="Acme Corp"
              workspaceIcon={<span>🚀</span>}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LINEAR_CODE} />

        {/* ── Section 8: Command ── */}
        <ComponentPreview
          title="Command"
          description="Search button opens a command palette — use showSearch + onSearchClick"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="command"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              showSearch
              onSearchClick={() => {}}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>App</span>}
              actions={avatarAction}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={COMMAND_CODE} />

        {/* ── Section 9: Notion ── */}
        <ComponentPreview
          title="Notion"
          description="Breadcrumb-style header — ideal for document or wiki navigation"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="notion"
              breadcrumb={[
                <span key="home">Home</span>,
                <span key="docs">Documentation</span>,
                <span key="page">Current page</span>,
              ]}
              actions={<Button size="sm" variant="outlined">Share</Button>}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={NOTION_CODE} />

        {/* ── Section 10: Two-row ── */}
        <ComponentPreview
          title="Two-row"
          description="Primary nav on top, secondary subnav below — great for settings pages"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="two-row"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              subItems={subItems}
              activeSubId={activeSub}
              onSubItemClick={item => setActiveSub(item.id)}
              title="Settings"
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Brand</span>}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TWO_ROW_CODE} />

        {/* ── Section 11: Glass ── */}
        <ComponentPreview
          title="Glass"
          description="Frosted-glass effect — place over a gradient or image background"
          layout="start"
        >
          <div style={{ width: '100%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: 10, overflow: 'hidden' }}>
            <Navbar
              variant="glass"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Glass</span>}
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GLASS_CODE} />

        {/* ── Section 12: Frosted ── */}
        <ComponentPreview
          title="Frosted"
          description="Subtle backdrop-blur surface — works well on image or colored backgrounds"
          layout="start"
        >
          <div style={{ width: '100%', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', borderRadius: 10, overflow: 'hidden' }}>
            <Navbar
              variant="frosted"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16, color: '#fff' }}>Frosted</span>}
            />
          </div>
        </ComponentPreview>

        {/* ── Section 13: Gradient brand ── */}
        <ComponentPreview
          title="Gradient brand"
          description="Gradient background navbar for high-impact headers"
          layout="start"
        >
          <div style={{ width: '100%' }}>
            <Navbar
              variant="gradient"
              items={mainItems}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              logo={<span style={{ fontWeight: 700, fontSize: 16 }}>Brand</span>}
              actions={<Button size="sm" variant="filled">Get started</Button>}
            />
          </div>
        </ComponentPreview>

        {/* ── Section 14: Sidebar ── */}
        <ComponentPreview
          title="Sidebar"
          description="Vertical sidebar with grouped sections — supports collapsed icon-only mode"
          layout="start"
        >
          <div style={{ border: '1px solid var(--color-border-secondary)', borderRadius: 10, overflow: 'hidden', height: 280, display: 'flex' }}>
            <Sidebar
              sections={sidebarSections}
              activeId={active}
              onItemClick={item => setActive(item.id)}
              collapsed={collapsed}
              footer={
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setCollapsed(c => !c)}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  {collapsed ? '→' : '← Collapse'}
                </Button>
              }
            />
            <div style={{ flex: 1, padding: 20, fontSize: 13, color: 'var(--color-text-secondary)' }}>
              Active: <strong>{active}</strong>
            </div>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIDEBAR_CODE} />

        {/* ── Props tables ── */}
        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
          Navbar props
        </p>
        <PropsTable props={NAVBAR_PROPS} />

        <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
          Sidebar props
        </p>
        <PropsTable props={SIDEBAR_PROPS} />

      </div>
    </div>
  );
}
