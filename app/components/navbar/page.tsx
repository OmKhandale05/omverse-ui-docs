'use client';

import { useState } from 'react';
import { Navbar, Sidebar, Button, Avatar, Icon, type NavItem, type NavSection } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

/* ─── Props tables ─── */

const NAVBAR_PROPS = [
  { name: 'items',          type: 'NavItem[]',                                       default: '[]',       description: 'Main navigation items' },
  { name: 'activeId',       type: 'string',                                          default: '—',        description: 'ID of the currently active item' },
  { name: 'onItemClick',    type: '(item: NavItem) => void',                         default: '—',        description: 'Callback when an item is clicked' },
  { name: 'variant',        type: "'saas' | 'centered' | 'pill' | 'stripe' | 'outlined' | 'vercel' | 'linear' | 'command' | 'notion' | 'two-row' | 'glass' | 'frosted' | 'gradient'", default: "'saas'", description: 'Navbar style preset' },
  { name: 'brandName',      type: 'string',                                          default: "'Brand'",  description: 'Brand name text shown when no logo element is provided' },
  { name: 'logo',           type: 'ReactNode',                                       default: '—',        description: 'Logo element — overrides brandName when provided' },
  { name: 'actions',        type: 'ReactNode',                                       default: '—',        description: 'Content rendered on the right side (buttons, avatar, search…)' },
  { name: 'title',          type: 'string',                                          default: '—',        description: 'Page title shown next to the brand (two-row variant)' },
  { name: 'subItems',       type: 'NavItem[]',                                       default: '[]',       description: 'Secondary nav items shown in the lower row (two-row variant)' },
  { name: 'activeSubId',    type: 'string',                                          default: '—',        description: 'Active secondary item ID (two-row variant)' },
  { name: 'workspaceName',  type: 'string',                                          default: "'Workspace'", description: 'Workspace name (linear variant)' },
  { name: 'workspaceIcon',  type: 'string',                                          default: "'WS'",     description: 'Workspace initials or emoji (linear variant)' },
  { name: 'user',           type: '{ name: string; email?: string; avatarSrc?: string }', default: '—', description: 'User info shown in the profile area (linear variant)' },
  { name: 'showSearch',     type: 'boolean',                                         default: 'false',    description: 'Shows a ⌘K search trigger (command variant)' },
  { name: 'onSearchClick',  type: '() => void',                                      default: '—',        description: 'Callback when the search trigger is clicked' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

const SIDEBAR_PROPS = [
  { name: 'sections',    type: 'NavSection[]',                    default: '[]',       description: 'Grouped navigation sections' },
  { name: 'activeId',    type: 'string',                          default: '—',        description: 'ID of the currently active item' },
  { name: 'onItemClick', type: '(item: NavItem) => void',         default: '—',        description: 'Callback when an item is clicked' },
  { name: 'collapsed',   type: 'boolean',                         default: 'false',    description: 'Collapses to icon-only mode' },
  { name: 'brandName',   type: 'string',                          default: "'Brand'",  description: 'Brand name shown in the header' },
  { name: 'logo',        type: 'ReactNode',                       default: '—',        description: 'Logo element — overrides brandName when provided' },
  { name: 'user',        type: '{ name: string; email?: string; avatarSrc?: string }', default: '—', description: 'User info shown in the footer area' },
] as const satisfies { name: string; type: string; default: string; description: string }[];

/* ─── Shared data — matches original stories exactly ─── */

const mainItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'info' },
  { id: 'projects',  label: 'Projects',  icon: 'info' },
  { id: 'team',      label: 'Team',      icon: 'info', badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: 'info' },
  { id: 'settings',  label: 'Settings',  icon: 'settings' },
];

const subItems: NavItem[] = [
  { id: 'general',      label: 'General' },
  { id: 'members',      label: 'Members' },
  { id: 'integrations', label: 'Integrations' },
  { id: 'billing',      label: 'Billing' },
  { id: 'danger',       label: 'Danger zone' },
];

const sidebarSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'info' },
      { id: 'projects',  label: 'Projects',  icon: 'info' },
      { id: 'team',      label: 'Team',      icon: 'info', badge: 3 },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'settings',      label: 'Settings',      icon: 'settings' },
      { id: 'notifications', label: 'Notifications', icon: 'bell', badge: 12 },
    ],
  },
];

const user = { name: 'John Doe', email: 'john@example.com' };

const API_PROPS = [
  ...NAVBAR_PROPS,
  ...SIDEBAR_PROPS,
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const SAAS_CODE = `import { Navbar, Button, type NavItem } from 'omverse-ui'

const items: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'info' },
  { id: 'projects',  label: 'Projects',  icon: 'info' },
  { id: 'team',      label: 'Team',      icon: 'info', badge: 3 },
  { id: 'analytics', label: 'Analytics', icon: 'info' },
  { id: 'settings',  label: 'Settings',  icon: 'settings' },
]

<Navbar
  variant="saas"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="DesignSystem"
  actions={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" variant="outlined">Log in</Button>
      <Button size="sm" variant="filled">Get started</Button>
    </div>
  }
/>`;

const CENTERED_CODE = `<Navbar
  variant="centered"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="✦ Brand"
  actions={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" variant="outlined">Log in</Button>
      <Button size="sm" variant="filled">Get started</Button>
    </div>
  }
/>`;

const PILL_CODE = `<Navbar
  variant="pill"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="⬡ App"
  actions={userActions}
/>`;

const STRIPE_CODE = `<Navbar
  variant="stripe"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="◈ Platform"
  actions={userActions}
/>`;

const OUTLINED_CODE = `<Navbar
  variant="outlined"
  items={items.slice(0, 4)}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="◇ App"
  actions={userActions}
/>`;

const VERCEL_CODE = `<Navbar
  variant="vercel"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="▲"
  actions={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" variant="outlined">Feedback</Button>
      <Button size="sm" variant="filled">Deploy</Button>
    </div>
  }
/>`;

const LINEAR_CODE = `<Navbar
  variant="linear"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  workspaceName="Design System"
  workspaceIcon="DS"
  user={{ name: 'John Doe', email: 'john@example.com' }}
/>`;

const COMMAND_CODE = `<Navbar
  variant="command"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="◈"
  showSearch
  onSearchClick={() => alert('⌘K')}
  actions={userActions}
/>`;

const NOTION_CODE = `<Navbar
  variant="notion"
  items={[
    { id: 'workspace',  label: 'Workspace',    onClick: () => setActive('workspace') },
    { id: 'design',     label: 'Design System', onClick: () => setActive('design') },
    { id: 'components', label: 'Components',   onClick: () => setActive('components') },
  ]}
  activeId="components"
  brandName="N"
  actions={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" variant="text">Share</Button>
      <Button size="sm" variant="filled">Publish</Button>
    </div>
  }
/>`;

const TWO_ROW_CODE = `<Navbar
  variant="two-row"
  title="Project settings"
  subItems={subItems}
  activeSubId={activeSub}
  onItemClick={item => setActiveSub(item.id)}
  brandName="◈"
/>`;

const GLASS_CODE = `<div style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)', borderRadius: 12, overflow: 'hidden' }}>
  <Navbar
    variant="glass"
    items={items.slice(0, 4)}
    activeId={active}
    onItemClick={item => setActive(item.id)}
    brandName="✦ Studio"
    actions={<Button size="sm" style={{ background: '#fff', color: '#6366f1', border: 'none' }}>Contact</Button>}
  />
</div>`;

const FROSTED_CODE = `<div style={{ background: 'linear-gradient(to right, #e2e8f0, #f1f5f9)', borderRadius: 12, padding: 20, overflow: 'hidden' }}>
  <Navbar
    variant="frosted"
    items={items.slice(0, 4)}
    activeId={active}
    onItemClick={item => setActive(item.id)}
    brandName="✦ Studio"
    actions={<Button size="sm" variant="filled">Get in touch</Button>}
  />
</div>`;

const GRADIENT_CODE = `<Navbar
  variant="gradient"
  items={items}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  brandName="◈ Platform"
  actions={
    <div style={{ display: 'flex', gap: 8 }}>
      <Button size="sm" variant="outlined" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>Docs</Button>
      <Button size="sm" style={{ background: '#fff', color: '#6366f1', border: 'none' }}>Upgrade</Button>
    </div>
  }
/>`;

const SIDEBAR_CODE = `import { Sidebar, type NavSection } from 'omverse-ui'

const sections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: 'info' },
      { id: 'projects',  label: 'Projects',  icon: 'info' },
      { id: 'team',      label: 'Team',      icon: 'info', badge: 3 },
    ],
  },
  {
    label: 'Account',
    items: [
      { id: 'settings',      label: 'Settings',      icon: 'settings' },
      { id: 'notifications', label: 'Notifications', icon: 'bell', badge: 12 },
    ],
  },
]

<Sidebar
  sections={sections}
  activeId={active}
  onItemClick={item => setActive(item.id)}
  collapsed={collapsed}
  brandName="DesignSys"
  user={{ name: 'John Doe', email: 'john@example.com' }}
/>`;

/* ─── Page ─── */

export default function NavbarPage() {
  const [active,    setActive]    = useState('dashboard');
  const [activeSub, setActiveSub] = useState('general');
  const [collapsed, setCollapsed] = useState(false);

  function handleClick(item: NavItem)    { setActive(item.id); }
  function handleSubClick(item: NavItem) { setActiveSub(item.id); }

  /* Shared action nodes — match original stories */
  const loginActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <Button size="sm" variant="outlined">Log in</Button>
      <Button size="sm" variant="filled">Get started</Button>
    </div>
  );

  const userActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        type="button"
        style={{ width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
      >
        <Icon name="search" size="sm" aria-hidden />
      </button>
      <button
        type="button"
        style={{ width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
      >
        <Icon name="bell" size="sm" aria-hidden />
      </button>
      <Avatar name="John Doe" size="xs" />
    </div>
  );

return (
    <div>
            <PageHeader        breadcrumb={['Components', 'Navigation', 'Navbar']}        title="Navbar"        description="16 variants · sidebar · two-row · command · glass · vercel · linear · stripe"        tags={['SaaS', 'Centered', 'Pill', 'Stripe', 'Outlined', 'Vercel', 'Linear', 'Command', 'Notion', 'Two-row', 'Glass', 'Frosted', 'Gradient', 'Sidebar']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="16 variants · sidebar · two-row · command · glass · vercel · linear · stripe">
          <div className="component-doc-prose">
            <p>Use Navbar to present and interact with structured information in a predictable, accessible way.</p>
            <p>The component examples below demonstrate practical variations you can adapt to your own interface.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Root container and spacing boundary.</li>
            <li>Primary content and optional secondary metadata.</li>
            <li>State indicators and utility affordances (icons, badges, controls).</li>
            <li>Optional helper text, grouping, and behavioral wrappers.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Choose Navbar when a repeated, structured interaction is required.</li>
            <li>Use it for clear, consistent operations across similar surfaces.</li>
            <li>Use in forms, lists, and action workflows where clarity matters.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use only for decorative layout without interaction meaning.</li>
            <li>Avoid duplicating the same behavior without distinct user context.</li>
            <li>Prefer simpler HTML or textual content for static, non-interactive labels.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Component variants should be documented by API props and examples below.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-stack">
            <p>Common states include idle, active, disabled, focused, and loading/pending states where applicable.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-stack">
            <p>Behavior should remain deterministic and keyboard-friendly, with clear visual feedback for every state transition.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Use semantic structure and visible labels whenever possible.</li>
            <li>Preserve keyboard navigation and focus visibility.</li>
            <li>Announce status and changes when context requires it.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Prefer short, clear labels.</li>
            <li>Keep content actions scannable and outcome-oriented.</li>
            <li>Use consistent wording across similar components.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
          {/* ── Content ── */}
          <div className="navbar-page-content" style={{ padding: '28px 40px' }}>
          
            {/* ── Section 1: SaaS ── */}
            <ComponentPreview
              title="SaaS (default)"
              description="Standard app navbar with brand, nav items and call-to-action buttons"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="saas"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="DesignSystem"
                  actions={loginActions}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SAAS_CODE} />
          
            {/* ── Section 2: Centered ── */}
            <ComponentPreview
              title="Centered links"
              description="Navigation items centered in the bar with logo and actions on the sides"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="centered"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="✦ Brand"
                  actions={loginActions}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={CENTERED_CODE} />
          
            {/* ── Section 3: Pill ── */}
            <ComponentPreview
              title="Pill segmented"
              description="Active item shown inside a pill-shaped segmented control"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="pill"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="⬡ App"
                  actions={userActions}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={PILL_CODE} />
          
            {/* ── Section 4: Stripe ── */}
            <ComponentPreview
              title="Stripe-style"
              description="Bottom border indicator — clean and minimal like Stripe's nav"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="stripe"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="◈ Platform"
                  actions={userActions}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={STRIPE_CODE} />
          
            {/* ── Section 5: Outlined ── */}
            <ComponentPreview
              title="Outlined segmented"
              description="Items grouped in a bordered segmented control — active item is filled"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="outlined"
                  items={mainItems.slice(0, 4)}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="◇ App"
                  actions={userActions}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={OUTLINED_CODE} />
          
            {/* ── Section 6: Vercel ── */}
            <ComponentPreview
              title="Vercel-style (dark)"
              description="Dark navbar with light text — inspired by Vercel's design language"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="vercel"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="▲"
                  actions={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Button size="sm" variant="outlined">Feedback</Button>
                      <Button size="sm" variant="filled">Deploy</Button>
                    </div>
                  }
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={VERCEL_CODE} />
          
            {/* ── Section 7: Linear ── */}
            <ComponentPreview
              title="Linear-style"
              description="Workspace switcher on the left with icon nav items — inspired by Linear"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="linear"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  workspaceName="Design System"
                  workspaceIcon="DS"
                  user={user}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={LINEAR_CODE} />
          
            {/* ── Section 8: Command ── */}
            <ComponentPreview
              title="Command bar"
              description="showSearch adds a ⌘K trigger — tap to open a command palette"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="command"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="◈"
                  showSearch
                  onSearchClick={() => alert('⌘K')}
                  actions={userActions}
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={COMMAND_CODE} />
          
            {/* ── Section 9: Notion ── */}
            <ComponentPreview
              title="Notion-style (breadcrumb)"
              description="items renders as a breadcrumb trail with chevron separators — ideal for wikis and docs"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="notion"
                  items={[
                    { id: 'workspace',  label: 'Workspace',     onClick: () => setActive('workspace') },
                    { id: 'design',     label: 'Design System', onClick: () => setActive('design') },
                    { id: 'components', label: 'Components',    onClick: () => setActive('components') },
                  ]}
                  activeId="components"
                  brandName="N"
                  actions={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Button size="sm" variant="text">Share</Button>
                      <Button size="sm" variant="filled">Publish</Button>
                    </div>
                  }
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={NOTION_CODE} />
          
            {/* ── Section 10: Two-row ── */}
            <ComponentPreview
              title="Two-row sticky"
              description="Brand + title on top row, subItems as tab strip on the second row"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="two-row"
                  title="Project settings"
                  subItems={subItems}
                  activeSubId={activeSub}
                  onItemClick={handleSubClick}
                  brandName="◈"
                  actions={
                    <button
                      type="button"
                      style={{
                        width: 28, height: 28, borderRadius: 6,
                        border: '1px solid var(--color-border)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: 'transparent', cursor: 'pointer',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      <Icon name="dots-vertical" size="sm" aria-hidden />
                    </button>
                  }
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={TWO_ROW_CODE} />
          
            {/* ── Section 11: Glass ── */}
            <ComponentPreview
              title="Glass (on colored bg)"
              description="Frosted-glass effect — place over a gradient or image background"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
              <div style={{ background: 'linear-gradient(to right, #6366f1, #8b5cf6)', borderRadius: 10, padding: 20, overflow: 'hidden' }}>
                <Navbar
                  variant="glass"
                  items={mainItems.slice(0, 4)}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="✦ Studio"
                  actions={
                    <Button size="sm" style={{ background: '#fff', color: '#6366f1', border: 'none' }}>
                      Contact
                    </Button>
                  }
                />
              </div>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={GLASS_CODE} />
          
            {/* ── Section 12: Frosted ── */}
            <ComponentPreview
              title="Frosted glass"
              description="Subtle backdrop-blur surface — works well on tinted or image backgrounds"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
              <div style={{ background: 'linear-gradient(to right, #e2e8f0, #f1f5f9)', borderRadius: 10, padding: 20, overflow: 'hidden' }}>
                <Navbar
                  variant="frosted"
                  items={mainItems.slice(0, 4)}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="✦ Studio"
                  actions={<Button size="sm" variant="filled">Get in touch</Button>}
                />
              </div>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={FROSTED_CODE} />
          
            {/* ── Section 13: Gradient brand ── */}
            <ComponentPreview
              title="Gradient brand"
              description="Gradient background navbar — high impact, ideal for landing pages"
              layout="start"
            >
              <div className="navbar-scroll-wrap" style={{ width: '100%' }}>
                <Navbar
                  variant="gradient"
                  items={mainItems}
                  activeId={active}
                  onItemClick={handleClick}
                  brandName="◈ Platform"
                  actions={
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Button size="sm" variant="outlined" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                        Docs
                      </Button>
                      <Button size="sm" style={{ background: '#fff', color: '#6366f1', border: 'none' }}>
                        Upgrade
                      </Button>
                    </div>
                  }
                />
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={GRADIENT_CODE} />
          
            {/* ── Section 14: Sidebar ── */}
            <ComponentPreview
              title="Sidebar"
              description="Vertical sidebar with grouped sections — collapses to icon-only mode"
              layout="start"
            >
              <div
                className="sidebar-preview"
                style={{
                  height: 400,
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '0.5px solid var(--color-border-tertiary)',
                  borderRadius: 8,
                  display: 'flex',
                }}
              >
                <Sidebar
                  sections={sidebarSections}
                  activeId={active}
                  onItemClick={handleClick}
                  collapsed={collapsed}
                  brandName="DesignSys"
                  user={user}
                />
                <div
                  className="sidebar-preview-body"
                  style={{
                    flex: 1,
                    padding: 16,
                    background: 'var(--color-surface-variant)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'space-between',
                  }}
                >
                  <p style={{ fontSize: 13, color: 'var(--color-text-secondary)' }}>Content area</p>
                  <Button
                    size="sm"
                    variant="outlined"
                    onClick={() => setCollapsed(c => !c)}
                  >
                    {collapsed ? 'Expand' : 'Collapse'} sidebar
                  </Button>
                </div>
              </div>
            </ComponentPreview>
          
            <CodeBlock filename="App.tsx" code={SIDEBAR_CODE} />
          
            {/* ── Props tables ── */}
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 8 }}>
              Navbar props
            </p>
          
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 8, marginTop: 24 }}>
              Sidebar props
            </p>
          
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
            <li>Use Navbar alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep navbar behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
