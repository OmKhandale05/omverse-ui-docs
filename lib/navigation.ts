export interface NavigationItem {
  label: string
  href: string
  icon: string
  variantCount?: number
  badge?: 'new'
}

export interface NavigationSection {
  title: string
  items: NavigationItem[]
}

/** Canonical registry used by every navigation and discovery surface. */
export const DOCS_NAVIGATION: NavigationSection[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', href: '/docs/introduction', icon: 'ti-book' },
      { label: 'Installation', href: '/docs/installation', icon: 'ti-package' },
      { label: 'Theming', href: '/docs/theming', icon: 'ti-palette' },
      { label: 'Design tokens', href: '/docs/design-tokens', icon: 'ti-color-swatch' },
      { label: 'Dark mode', href: '/docs/dark-mode', icon: 'ti-moon' },
    ],
  },
  {
    title: 'Form',
    items: [
      { label: 'Button', href: '/components/button', icon: 'ti-square-rounded' },
      { label: 'Input', href: '/components/input', icon: 'ti-cursor-text' },
      { label: 'Textarea', href: '/components/textarea', icon: 'ti-align-left', badge: 'new' },
      { label: 'SearchField', href: '/components/search-field', icon: 'ti-search', badge: 'new' },
      { label: 'FileUpload', href: '/components/file-upload', icon: 'ti-cloud-upload', badge: 'new' },
      { label: 'SegmentedControl', href: '/components/segmented-control', icon: 'ti-layout-columns', badge: 'new' },
      { label: 'SplitButton', href: '/components/split-button', icon: 'ti-layout-distribute-horizontal', badge: 'new' },
      { label: 'InlineEdit', href: '/components/inline-edit', icon: 'ti-pencil', badge: 'new' },
      { label: 'TransferList', href: '/components/transfer-list', icon: 'ti-arrows-exchange', badge: 'new' },
      { label: 'Select', href: '/components/select', icon: 'ti-selector' },
      { label: 'Checkbox', href: '/components/checkbox', icon: 'ti-checkbox' },
      { label: 'Radio', href: '/components/radio', icon: 'ti-circle-dot' },
      { label: 'Switch', href: '/components/switch', icon: 'ti-toggle-right' },
      { label: 'Slider', href: '/components/slider', icon: 'ti-adjustments-horizontal', badge: 'new' },
      { label: 'DatePicker', href: '/components/date-picker', icon: 'ti-calendar', badge: 'new' },
    ],
  },
  {
    title: 'Display',
    items: [
      { label: 'Avatar', href: '/components/avatar', icon: 'ti-user-circle' },
      { label: 'Badge', href: '/components/badge', icon: 'ti-badge' },
      { label: 'Card', href: '/components/card', icon: 'ti-layout-cards' },
      { label: 'Chip', href: '/components/chip', icon: 'ti-tag' },
      { label: 'Accordion', href: '/components/accordion', icon: 'ti-layout-list' },
      { label: 'Progress', href: '/components/progress', icon: 'ti-progress' },
      { label: 'Divider', href: '/components/divider', icon: 'ti-separator' },
    ],
  },
  {
    title: 'Enterprise',
    items: [
      { label: 'DataTable', href: '/components/data-table', icon: 'ti-table', badge: 'new' },
      { label: 'FilterBar', href: '/components/filter-bar', icon: 'ti-filter', badge: 'new' },
      { label: 'Toolbar', href: '/components/toolbar', icon: 'ti-layout-navbar', badge: 'new' },
      { label: 'TreeView', href: '/components/tree-view', icon: 'ti-hierarchy-2', badge: 'new' },
      { label: 'Combobox', href: '/components/combobox', icon: 'ti-list-search', badge: 'new' },
      { label: 'SidePanel', href: '/components/side-panel', icon: 'ti-layout-sidebar-right', badge: 'new' },
      { label: 'CommandBar', href: '/components/command-bar', icon: 'ti-command', badge: 'new' },
      { label: 'EmptyState', href: '/components/empty-state', icon: 'ti-layout-align-middle', badge: 'new' },
      { label: 'AuditLog', href: '/components/audit-log', icon: 'ti-history', badge: 'new' },
      { label: 'Alert', href: '/components/alert', icon: 'ti-alert-circle', badge: 'new' },
    ],
  },
  {
    title: 'Navigation',
    items: [
      { label: 'Navbar', href: '/components/navbar', icon: 'ti-layout-navbar', variantCount: 16 },
      { label: 'Breadcrumb', href: '/components/breadcrumb', icon: 'ti-dots', variantCount: 11 },
      { label: 'Tabs', href: '/components/tabs', icon: 'ti-layout-bottombar', variantCount: 11 },
      { label: 'Pagination', href: '/components/pagination', icon: 'ti-dots-circle-horizontal', variantCount: 17 },
      { label: 'Stepper', href: '/components/stepper', icon: 'ti-steps', variantCount: 10 },
    ],
  },
  {
    title: 'Overlay',
    items: [
      { label: 'Dialog', href: '/components/dialog', icon: 'ti-layout-sidebar-right' },
      { label: 'Popover', href: '/components/popover', icon: 'ti-bubble' },
      { label: 'DropdownMenu', href: '/components/dropdown-menu', icon: 'ti-menu-2' },
      { label: 'Tooltip', href: '/components/tooltip', icon: 'ti-message-circle' },
      { label: 'Toast', href: '/components/toast', icon: 'ti-bell' },
    ],
  },
  {
    title: 'Other',
    items: [
      { label: 'Icon', href: '/components/icon', icon: 'ti-icons' },
      { label: 'IconButton', href: '/components/icon-button', icon: 'ti-click' },
      { label: 'Spinner', href: '/components/spinner', icon: 'ti-loader' },
    ],
  },
]

export const EXAMPLE_NAVIGATION: NavigationItem[] = [
  { label: 'Dashboard', href: '/examples?id=dashboard', icon: 'ti-layout-dashboard' },
  { label: 'Mail', href: '/examples?id=mail', icon: 'ti-mail' },
  { label: 'Cards', href: '/examples?id=cards', icon: 'ti-layout-cards' },
  { label: 'Forms', href: '/examples?id=forms', icon: 'ti-forms' },
  { label: 'Music', href: '/examples?id=music', icon: 'ti-music' },
  { label: 'Settings', href: '/examples?id=settings', icon: 'ti-settings' },
  { label: 'Sign-in', href: '/examples?id=signin', icon: 'ti-login' },
  { label: 'Pricing', href: '/examples?id=pricing', icon: 'ti-tag' },
]

export const DOCS_ROUTES = DOCS_NAVIGATION.flatMap((section) => section.items)
