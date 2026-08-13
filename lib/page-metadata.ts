import type { Metadata } from 'next'

export function componentMetadata(name: string, group: string, path: string): Metadata {
  return {
    title: `${name} | omverse-ui`,
    description: `${name} ${group.toLowerCase()} component documentation with live examples, usage guidance, and a typed API reference for omverse-ui.`,
    alternates: { canonical: path },
  }
}

export function guideMetadata(title: string, description: string, path: string): Metadata {
  return {
    title: `${title} | omverse-ui`,
    description,
    alternates: { canonical: path },
  }
}
