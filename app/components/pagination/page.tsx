'use client';

import { useState } from 'react';
import { Pagination, type PaginationProps } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const PAGINATION_PROPS = [
  {
    name: 'page',
    type: 'number',
    default: '—',
    description: 'Current page (1-indexed) — required',
  },
  {
    name: 'totalPages',
    type: 'number',
    default: '—',
    description: 'Total number of pages — required',
  },
  {
    name: 'onPageChange',
    type: '(page: number) => void',
    default: '—',
    description: 'Callback fired when the page changes — required',
  },
  {
    name: 'variant',
    type: "'default' | 'outlined' | 'pill' | 'simple' | 'compact' | 'underline' | 'floating' | 'dark' | 'glass-card' | 'vercel' | 'notion' | 'linear' | 'github' | 'stripe' | 'dots' | 'table' | 'segmented'",
    default: "'default'",
    description: 'Visual style',
  },
  {
    name: 'siblings',
    type: 'number',
    default: '1',
    description: 'Number of sibling pages shown around the current page',
  },
  {
    name: 'showFirstLast',
    type: 'boolean',
    default: 'false',
    description: 'Show first and last page buttons',
  },
  {
    name: 'showPrevNext',
    type: 'boolean',
    default: 'true',
    description: 'Show previous and next buttons',
  },
  {
    name: 'showJump',
    type: 'boolean',
    default: 'false',
    description: 'Show a page jump input field',
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: 'Button size',
  },
  {
    name: 'loading',
    type: 'boolean',
    default: 'false',
    description: 'Shows a skeleton loading state',
  },
  {
    name: 'rowsPerPage',
    type: 'number',
    default: 'undefined',
    description: 'Current rows per page (table variant)',
  },
  {
    name: 'rowsPerPageOptions',
    type: 'number[]',
    default: 'undefined',
    description: 'Options for rows-per-page selector (table variant)',
  },
  {
    name: 'totalItems',
    type: 'number',
    default: 'undefined',
    description: 'Total item count shown as range label (table variant)',
  },
  {
    name: 'onRowsPerPageChange',
    type: '(rows: number) => void',
    default: 'undefined',
    description: 'Callback when rows-per-page changes (table variant)',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Pagination } from 'omverse-ui'

const [page, setPage] = useState(3);

<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
/>`;

const VARIANTS_CODE = `// 17 visual variants
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="default" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="outlined" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="pill" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="simple" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="compact" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="underline" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="floating" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="dark" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="glass-card" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="vercel" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="notion" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="linear" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="github" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="stripe" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="dots" />
<Pagination page={page} totalPages={10} onPageChange={setPage} variant="segmented" />`;

const TABLE_CODE = `<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  variant="table"
  totalItems={243}
  rowsPerPage={rowsPerPage}
  rowsPerPageOptions={[10, 25, 50, 100]}
  onRowsPerPageChange={setRowsPerPage}
/>`;

const JUMP_CODE = `// showJump adds a "Go to page" input
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  showJump
/>`;

const FIRST_LAST_CODE = `// showFirstLast adds ⏮ and ⏭ buttons
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  showFirstLast
/>`;

const LOADING_CODE = `// loading shows a skeleton placeholder
<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
  loading
/>`;

/* ─────────────────────────────
   Each variant gets its own
   local state so they don't
   interfere with each other.
─────────────────────────────── */

type Variant = NonNullable<PaginationProps['variant']>;

function PaginationDemo({ variant, extraProps }: { variant: Variant; extraProps?: Partial<PaginationProps> }) {
  const [page, setPage] = useState(3);
  return (
    <Pagination
      page={page}
      totalPages={10}
      onPageChange={setPage}
      variant={variant}
      {...extraProps}
    />
  );
}

/* ─── Variant metadata ─── */

const VARIANTS: { variant: Variant; description: string }[] = [
  { variant: 'default',    description: 'Solid filled active page button' },
  { variant: 'outlined',   description: 'Border on every page button' },
  { variant: 'pill',       description: 'Rounded pill buttons' },
  { variant: 'simple',     description: 'Minimal prev / next with page indicator' },
  { variant: 'compact',    description: 'Tight layout for dense UIs' },
  { variant: 'underline',  description: 'Underline indicator on active page' },
  { variant: 'floating',   description: 'Elevated pill with drop shadow' },
  { variant: 'dark',       description: 'Dark background for dark-mode dashboards' },
  { variant: 'glass-card', description: 'Frosted glass panel' },
  { variant: 'vercel',     description: 'Vercel-style minimal with arrow buttons' },
  { variant: 'notion',     description: 'Notion-style page selector' },
  { variant: 'linear',     description: 'Linear-style dense row' },
  { variant: 'github',     description: 'GitHub-style outlined group' },
  { variant: 'stripe',     description: 'Stripe dashboard pagination' },
  { variant: 'dots',       description: 'Dot indicators — carousel / gallery style' },
  { variant: 'segmented',  description: 'Segmented control style' },
];

/* ─── Page label style ─── */

const variantLabel: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 10,
};

/* ─── Table variant demo ─── */

function TableDemo() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  return (
    <Pagination
      page={page}
      totalPages={Math.ceil(243 / rowsPerPage)}
      onPageChange={setPage}
      variant="table"
      totalItems={243}
      rowsPerPage={rowsPerPage}
      rowsPerPageOptions={[10, 25, 50, 100]}
      onRowsPerPageChange={(r) => { setRowsPerPage(r); setPage(1); }}
    />
  );
}

/* ─── Page ─── */

export default function PaginationPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Pagination']}
        title="Pagination"
        description="Page navigation component with 17 variants covering every real-world use case."
        tags={['17 variants', 'Ellipsis', 'Jump to page', 'Table', 'Dots', 'Loading']}
      />

      <div style={{ padding: '28px 40px' }}>

        {/* ── Default ── */}
        <ComponentPreview
          title="Default"
          description="Solid filled active page button with ellipsis for large page counts"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
            <PaginationDemo variant="default" />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

        {/* ── All 17 variants ── */}
        <ComponentPreview
          title="All 17 variants"
          description="Every variant shown with page 3 of 10 — click to navigate"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 28 }}>
            {VARIANTS.map(({ variant, description }) => (
              <div key={variant} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <p style={{ ...variantLabel, textAlign: 'center' }}>{variant} — {description}</p>
                <PaginationDemo variant={variant} />
              </div>
            ))}
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={VARIANTS_CODE} />

        {/* ── Jump to page ── */}
        <ComponentPreview
          title="Jump to page"
          description="showJump adds a numeric input — type a page number and press Enter"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
            <PaginationDemo variant="default" extraProps={{ showJump: true }} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={JUMP_CODE} />

        {/* ── First / last ── */}
        <ComponentPreview
          title="First and last buttons"
          description="showFirstLast adds ⏮ and ⏭ jump-to-edge buttons"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
            <PaginationDemo variant="outlined" extraProps={{ showFirstLast: true }} />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={FIRST_LAST_CODE} />

        {/* ── Table variant ── */}
        <ComponentPreview
          title="Table variant"
          description="Rows-per-page selector with item range label — built for data tables"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
            <TableDemo />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={TABLE_CODE} />

        {/* ── Loading skeleton ── */}
        <ComponentPreview
          title="Loading state"
          description="loading prop shows a skeleton placeholder while data is fetching"
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
            <Pagination
              page={1}
              totalPages={10}
              onPageChange={() => {}}
              loading
            />
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={LOADING_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={PAGINATION_PROPS} />

      </div>
    </div>
  );
}
