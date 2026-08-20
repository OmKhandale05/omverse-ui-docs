import { DOCS_NAVIGATION, ENTERPRISE_NAVIGATION, EXAMPLE_NAVIGATION } from '@/lib/navigation'

export interface CommandItem {
  id: string
  label: string
  href: string
  group: string
  icon: string
}

export const COMMAND_GROUPS = [
  'Product',
  ...ENTERPRISE_NAVIGATION.map((section) => `Enterprise ${section.title}`),
  ...DOCS_NAVIGATION.map((section) => section.title),
  'Examples',
]

export const COMMAND_ITEMS: CommandItem[] = [
  {
    id: '/enterprise',
    label: 'Enterprise',
    href: '/enterprise',
    group: 'Product',
    icon: 'ti-building-skyscraper',
  },
  ...ENTERPRISE_NAVIGATION.flatMap((section) =>
    section.items.map((item) => ({
      id: item.href,
      label: item.label,
      href: item.href,
      group: `Enterprise ${section.title}`,
      icon: item.icon,
    })),
  ),
  ...DOCS_NAVIGATION.flatMap((section) =>
    section.items.map((item) => ({
      id: item.href,
      label: item.label,
      href: item.href,
      group: section.title,
      icon: item.icon,
    })),
  ),
  ...EXAMPLE_NAVIGATION.map((item) => ({
    id: item.href,
    label: item.label,
    href: item.href,
    group: 'Examples',
    icon: item.icon,
  })),
]
