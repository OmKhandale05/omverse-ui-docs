/* ─── Command-palette item registry ─────────────────────────────────────── */

export interface CommandItem {
  id:    string
  label: string
  href:  string
  group: string
  icon:  string   // Tabler icon name (without "ti-" prefix — added at render time)
}

export const COMMAND_GROUPS = [
  'Getting started',
  'Form',
  'Display',
  'Navigation',
  'Overlay',
  'Other',
  'Examples',
] as const

export type CommandGroup = typeof COMMAND_GROUPS[number]

export const COMMAND_ITEMS: CommandItem[] = [
  // ── Getting started ───────────────────────────────────────────────────
  { id: 'intro',   label: 'Introduction',  href: '/docs/introduction',  group: 'Getting started', icon: 'ti-book'         },
  { id: 'install', label: 'Installation',  href: '/docs/installation',  group: 'Getting started', icon: 'ti-package'      },
  { id: 'theming', label: 'Theming',       href: '/docs/theming',       group: 'Getting started', icon: 'ti-palette'      },
  { id: 'tokens',  label: 'Design tokens', href: '/docs/design-tokens', group: 'Getting started', icon: 'ti-color-swatch' },
  { id: 'dark',    label: 'Dark mode',     href: '/docs/dark-mode',     group: 'Getting started', icon: 'ti-moon'         },

  // ── Form ──────────────────────────────────────────────────────────────
  { id: 'button',     label: 'Button',     href: '/components/button',      group: 'Form', icon: 'ti-square-rounded'          },
  { id: 'input',      label: 'Input',      href: '/components/input',       group: 'Form', icon: 'ti-cursor-text'             },
  { id: 'select',     label: 'Select',     href: '/components/select',      group: 'Form', icon: 'ti-selector'                },
  { id: 'checkbox',   label: 'Checkbox',   href: '/components/checkbox',    group: 'Form', icon: 'ti-checkbox'                },
  { id: 'radio',      label: 'Radio',      href: '/components/radio',       group: 'Form', icon: 'ti-circle-dot'              },
  { id: 'switch',     label: 'Switch',     href: '/components/switch',      group: 'Form', icon: 'ti-toggle-right'            },
  { id: 'slider',     label: 'Slider',     href: '/components/slider',      group: 'Form', icon: 'ti-adjustments-horizontal'  },
  { id: 'datepicker', label: 'DatePicker', href: '/components/date-picker', group: 'Form', icon: 'ti-calendar'                },

  // ── Display ───────────────────────────────────────────────────────────
  { id: 'avatar',    label: 'Avatar',    href: '/components/avatar',    group: 'Display', icon: 'ti-user-circle'  },
  { id: 'badge',     label: 'Badge',     href: '/components/badge',     group: 'Display', icon: 'ti-badge'        },
  { id: 'card',      label: 'Card',      href: '/components/card',      group: 'Display', icon: 'ti-layout-cards' },
  { id: 'chip',      label: 'Chip',      href: '/components/chip',      group: 'Display', icon: 'ti-tag'          },
  { id: 'accordion', label: 'Accordion', href: '/components/accordion', group: 'Display', icon: 'ti-layout-list'  },
  { id: 'progress',  label: 'Progress',  href: '/components/progress',  group: 'Display', icon: 'ti-progress'     },
  { id: 'divider',   label: 'Divider',   href: '/components/divider',   group: 'Display', icon: 'ti-separator'    },

  // ── Navigation ────────────────────────────────────────────────────────
  { id: 'navbar',     label: 'Navbar',     href: '/components/navbar',     group: 'Navigation', icon: 'ti-layout-navbar'           },
  { id: 'breadcrumb', label: 'Breadcrumb', href: '/components/breadcrumb', group: 'Navigation', icon: 'ti-dots'                    },
  { id: 'tabs',       label: 'Tabs',       href: '/components/tabs',       group: 'Navigation', icon: 'ti-layout-bottombar'        },
  { id: 'pagination', label: 'Pagination', href: '/components/pagination', group: 'Navigation', icon: 'ti-dots-circle-horizontal'  },
  { id: 'stepper',    label: 'Stepper',    href: '/components/stepper',    group: 'Navigation', icon: 'ti-steps'                   },

  // ── Overlay ───────────────────────────────────────────────────────────
  { id: 'dialog',  label: 'Dialog',  href: '/components/dialog',  group: 'Overlay', icon: 'ti-layout-sidebar-right' },
  { id: 'tooltip', label: 'Tooltip', href: '/components/tooltip', group: 'Overlay', icon: 'ti-message-circle'       },
  { id: 'toast',   label: 'Toast',   href: '/components/toast',   group: 'Overlay', icon: 'ti-bell'                 },

  // ── Other ─────────────────────────────────────────────────────────────
  { id: 'icon',       label: 'Icon',       href: '/components/icon',        group: 'Other', icon: 'ti-icons'   },
  { id: 'iconbutton', label: 'IconButton', href: '/components/icon-button', group: 'Other', icon: 'ti-click'   },
  { id: 'spinner',    label: 'Spinner',    href: '/components/spinner',     group: 'Other', icon: 'ti-loader'  },

  // ── Examples ──────────────────────────────────────────────────────────
  { id: 'ex-dashboard', label: 'Dashboard', href: '/examples?id=dashboard', group: 'Examples', icon: 'ti-layout-dashboard' },
  { id: 'ex-mail',      label: 'Mail',      href: '/examples?id=mail',      group: 'Examples', icon: 'ti-mail'             },
  { id: 'ex-cards',     label: 'Cards',     href: '/examples?id=cards',     group: 'Examples', icon: 'ti-layout-cards'     },
  { id: 'ex-forms',     label: 'Forms',     href: '/examples?id=forms',     group: 'Examples', icon: 'ti-forms'            },
  { id: 'ex-music',     label: 'Music',     href: '/examples?id=music',     group: 'Examples', icon: 'ti-music'            },
  { id: 'ex-settings',  label: 'Settings',  href: '/examples?id=settings',  group: 'Examples', icon: 'ti-settings'         },
  { id: 'ex-signin',    label: 'Sign-in',   href: '/examples?id=signin',    group: 'Examples', icon: 'ti-login'            },
  { id: 'ex-pricing',   label: 'Pricing',   href: '/examples?id=pricing',   group: 'Examples', icon: 'ti-tag'              },
]
