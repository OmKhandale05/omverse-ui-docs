'use client';

import { useState } from 'react';
import { Pagination, type PaginationProps } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

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

const API_PROPS = PAGINATION_PROPS;

/* ─── Code snippets ─── */

const DEFAULT_CODE = `import { Pagination } from 'omverse-ui'

const [page, setPage] = useState(3);

<Pagination
  page={page}
  totalPages={10}
  onPageChange={setPage}
/>`;

const VARIANTS_CODE = `// 16 visual variants
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

type Variant = NonNullable<PaginationProps['variant']>;

function PaginationDemo({
  variant,
  extraProps,
}: { variant: Variant; extraProps?: Partial<PaginationProps> }) {
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

const VARIANTS: { variant: Variant; description: string }[] = [
  { variant: 'default', description: 'Solid filled active page button' },
  { variant: 'outlined', description: 'Border on every page button' },
  { variant: 'pill', description: 'Rounded pill buttons' },
  { variant: 'simple', description: 'Minimal prev / next with page indicator' },
  { variant: 'compact', description: 'Tight layout for dense UIs' },
  { variant: 'underline', description: 'Underline indicator on active page' },
  { variant: 'floating', description: 'Elevated panel with drop shadow' },
  { variant: 'dark', description: 'Dark background for dark-mode dashboards' },
  { variant: 'glass-card', description: 'Frosted glass panel' },
  { variant: 'vercel', description: 'Vercel-style minimal with arrow buttons' },
  { variant: 'notion', description: 'Notion-style page selector' },
  { variant: 'linear', description: 'Linear-style dense row' },
  { variant: 'github', description: 'GitHub-style outlined group' },
  { variant: 'stripe', description: 'Stripe dashboard pagination' },
  { variant: 'dots', description: 'Dot indicators for carousel or gallery style' },
  { variant: 'segmented', description: 'Segmented control style' },
];

const variantLabel = {
  fontSize: 11,
  fontWeight: 500,
  color: 'var(--color-text-tertiary)',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  marginBottom: 10,
};

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
      onRowsPerPageChange={(r) => {
        setRowsPerPage(r);
        setPage(1);
      }}
    />
  );
}

export default function PaginationPage() {
  return (
    <div>
      <PageHeader
        breadcrumb={['Components', 'Navigation', 'Pagination']}
        title="Pagination"
        description="Page navigation component with 16 variants covering every real-world use case."
        tags={['16 variants', 'Ellipsis', 'Jump to page', 'Table', 'Dots', 'Loading']}
      />

      <ComponentDocumentation>
        <ComponentDocSection
          id="overview"
          title="Overview"
          description="Page navigation component with 16 variants covering every real-world use case."
        >
          <div className="component-doc-prose">
            <p>Use Pagination when users need a reliable way to navigate through many pages of items.</p>
            <p>The examples below show quick configuration and table-aware variants.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Input container and button group boundary.</li>
            <li>Visible page numbers, edge actions, and optional jump input.</li>
            <li>Optional table row-count selector and range display.</li>
            <li>Optional previous/next controls and compact states.</li>
          </ul>
          <CodeBlock
            filename="Diagram"
            code={`Pagination = { controls, prev/next, pages, optional table footer, optional jump }`}
          />
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>For paginating long item lists, search results, or data tables.</li>
            <li>When users need quick access to nearby pages and clear positioning.</li>
            <li>Where table totals must remain visible and editable.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Avoid using for short lists that never overflow one screen.</li>
            <li>Prefer infinite scroll when users rarely need direct page jumps.</li>
            <li>Do not hide pagination when state changes dramatically on each interaction.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Choose a variant by style and surface density.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-stack">
            <p>Common states include idle, hover, disabled, loading, and compact table states.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-stack">
            <p>Keep page controls predictable and focusable; validate jump input boundaries.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Preserve keyboard flow and visible focus states.</li>
            <li>Use clear labels and accessible text for control actions.</li>
            <li>Keep active page changes announced for assistive users.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Keep button text concise and readable.</li>
            <li>Use meaningful page-size values in table modes.</li>
            <li>Keep total item labels stable and obvious.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
            <div style={{ padding: '28px 40px' }}>
              <ComponentPreview
                title="Default"
                description="Solid filled active page button with ellipsis for large page counts"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
                  <PaginationDemo variant="default" />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={DEFAULT_CODE} />

              <ComponentPreview
                title="All variants"
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

              <ComponentPreview
                title="Jump to page"
                description="showJump adds a numeric input — type a page number and press Enter"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
                  <PaginationDemo variant="default" extraProps={{ showJump: true }} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={JUMP_CODE} />

              <ComponentPreview
                title="First and last buttons"
                description="showFirstLast adds ⏮ and ⏭ jump-to-edge buttons"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
                  <PaginationDemo variant="outlined" extraProps={{ showFirstLast: true }} />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={FIRST_LAST_CODE} />

              <ComponentPreview
                title="Table variant"
                description="Rows-per-page selector with item range label — built for data tables"
              >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 16 }}>
                  <TableDemo />
                </div>
              </ComponentPreview>
              <CodeBlock filename="App.tsx" code={TABLE_CODE} />

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
              <li>Use Pagination with Table and DataList surfaces.</li>
              <li>Pair with Search and Filters for large result sets.</li>
              <li>Use Button and Input for custom navigation controls.</li>
            </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  );
}
