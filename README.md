# omverse-ui Docs

Documentation website for **omverse-ui**, a modern React component library built with Tailwind CSS v4, TypeScript, CVA, and CSS custom properties.

This repo contains the public docs experience: installation guides, theming references, design tokens, live component previews, copyable code examples, and full-page UI examples built with the actual `omverse-ui` package.

## Overview

`omverse-ui-docs` is a Next.js documentation site designed to show the complete surface area of the `omverse-ui` component library in a polished, product-style interface.

It includes:

- A landing page for the component library
- Getting started docs for installation, theming, dark mode, and design tokens
- Component documentation pages with live previews and usage snippets
- Full-page examples for dashboards, forms, settings, pricing, mail, music, and more
- A command palette for fast navigation
- A responsive docs shell with desktop sidebar and mobile navigation
- Global Toaster setup for toast examples
- Tailwind v4 and `omverse-ui/styles` integration

## Tech Stack

- **Framework:** Next.js 16 App Router
- **React:** React 19
- **Styling:** Tailwind CSS v4
- **Component package:** `omverse-ui`
- **Icons:** Tabler Icons webfont
- **Syntax highlighting:** Shiki
- **Fonts:** Geist
- **Language:** TypeScript

## Project Structure

```txt
app/
  page.tsx                  # Landing page
  layout.tsx                # Root layout and providers
  globals.css               # Tailwind v4 + omverse-ui style imports

  docs/
    introduction/           # Product introduction
    installation/           # Setup guide
    theming/                # CSS variable theming guide
    design-tokens/          # Token reference
    dark-mode/              # Dark mode guide

  components/
    button/                 # Component docs pages
    input/
    select/
    checkbox/
    radio/
    switch/
    slider/
    date-picker/
    avatar/
    badge/
    card/
    chip/
    accordion/
    progress/
    divider/
    navbar/
    breadcrumb/
    tabs/
    pagination/
    stepper/
    dialog/
    tooltip/
    toast/
    icon/
    icon-button/
    spinner/

  examples/
    page.tsx                # Full-page examples browser
    examples/               # Example implementations and source snippets

components/
  Providers.tsx             # Toaster and command palette providers
  CommandPalette.tsx        # Global command palette
  commandItems.ts           # Searchable navigation items

  layout/
    Navbar.tsx              # Top navigation
    Sidebar.tsx             # Docs sidebar navigation
    DocsShell.tsx           # Shared docs layout shell

  ui/
    CodeBlock.tsx           # Copyable code block with highlighting
    ComponentPreview.tsx    # Live preview wrapper
    PageHeader.tsx          # Shared page header
    PropsTable.tsx          # Component props tables
```

## Component Coverage

The docs currently cover the main `omverse-ui` component groups:

### Form

- Button
- Input
- Select
- Checkbox
- Radio
- Switch
- Slider
- DatePicker

### Display

- Avatar
- Badge
- Card
- Chip
- Accordion
- Progress
- Divider

### Navigation

- Navbar
- Breadcrumb
- Tabs
- Pagination
- Stepper

### Overlay

- Dialog
- Tooltip
- Toast

### Other

- Icon
- IconButton
- Spinner

## Documentation Pages

The docs section explains how to use the package in real projects:

- **Introduction**: overview of the library, feature highlights, and next steps
- **Installation**: npm setup, Tailwind v4 setup, CSS imports, and Toaster setup
- **Theming**: how to override CSS custom properties for brand theming
- **Design tokens**: reference for color, radius, and token variables
- **Dark mode**: class and media-query based dark mode setup

## Examples

The examples section includes larger UI compositions built from `omverse-ui` components:

- Dashboard
- Forms
- Settings
- Pricing
- Sign in
- Mail
- Music
- Cards

Each example supports preview and code views, so the layout can be inspected and reused directly.

## Styling Setup

The project uses Tailwind v4 with the published `omverse-ui` styles.

```css
@import "tailwindcss";
@import "omverse-ui/styles";
@source "../node_modules/omverse-ui/dist/index.js";
```

This setup does three things:

- Loads Tailwind CSS v4
- Loads the `omverse-ui` design token stylesheet
- Tells Tailwind to scan the installed `omverse-ui` package for generated classes

## Toaster Setup

The root provider loads the `Toaster` dynamically to avoid server rendering issues with client-side external-store state.

```tsx
'use client';

import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () => import('omverse-ui').then(mod => ({ default: mod.Toaster })),
  { ssr: false }
);
```

This keeps toast examples available globally while avoiding hydration and `useSyncExternalStore` server snapshot issues.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```txt
http://localhost:3000
```

Build for production:

```bash
npm run build
```

Run lint:

```bash
npm run lint
```

## Available Scripts

```bash
npm run dev      # Start the local Next.js dev server
npm run build    # Build the production app
npm run start    # Start the production server
npm run lint     # Run ESLint
```

## Package Integration

The docs consume the published package directly:

```json
{
  "omverse-ui": "^0.1.10"
}
```

Next.js is configured to optimize imports from the package:

```ts
const nextConfig = {
  experimental: {
    optimizePackageImports: ['omverse-ui'],
  },
};
```

## Design Direction

The docs are intentionally minimal and documentation-first:

- Clean light-mode interface
- 0.5px borders
- CSS-variable driven colors
- Compact examples with copyable code
- Real component previews instead of static screenshots
- Responsive navigation for desktop and mobile

The goal is to make the component library feel easy to evaluate, easy to install, and easy to adopt in real React projects.

## Repository

GitHub: [OmKhandale05/omverse-ui-docs](https://github.com/OmKhandale05/omverse-ui-docs)
