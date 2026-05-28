'use client';

interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  /**
   * Controls the canvas layout mode.
   * - 'center' — flex, centred (default; suits small components)
   * - 'start'  — flex, top-left aligned (suits full-width layouts)
   * - 'grid'   — block display, padding 20px (suits grid children that manage their own layout)
   *
   * Supersedes the legacy `align` prop when provided.
   */
  layout?: 'center' | 'start' | 'grid';
  /**
   * @deprecated Use layout="start" instead.
   * Controls how children are aligned inside the canvas.
   */
  align?: 'center' | 'start';
  /**
   * @deprecated No longer needed with layout="grid".
   * When true the canvas background is transparent and border is removed.
   */
  transparent?: boolean;
}

export function ComponentPreview({
  title,
  description,
  children,
  layout,
  align = 'center',
  transparent = false,
}: ComponentPreviewProps) {
  // layout prop takes precedence; fall back to legacy align/transparent
  const resolvedLayout = layout ?? (align === 'start' ? 'start' : 'center');
  const isGrid   = resolvedLayout === 'grid';
  const isStart  = resolvedLayout === 'start';

  const canvasStyle: React.CSSProperties = {
    background: transparent ? 'transparent' : 'var(--color-background-secondary)',
    border: transparent ? 'none' : '0.5px solid var(--color-border-tertiary)',
    borderRadius: 12,
    minHeight: 80,
    ...(isGrid
      ? {
          display: 'block',
          padding: 20,
        }
      : {
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          padding: 32,
          alignItems: isStart ? 'flex-start' : 'center',
          justifyContent: isStart ? 'flex-start' : 'center',
        }),
  };

  return (
    <div style={{ marginBottom: 24 }}>
      {/* Title row with live indicator on the right */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
        <p
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </p>

        {/* Live indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 10,
            color: 'var(--color-text-tertiary)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--color-text-success)',
              display: 'inline-block',
            }}
          />
          Live preview
        </div>
      </div>

      {/* Section description */}
      {description && (
        <p
          style={{
            fontSize: 12,
            color: 'var(--color-text-secondary)',
            marginBottom: 12,
            lineHeight: 1.6,
          }}
        >
          {description}
        </p>
      )}

      {/* Canvas */}
      <div className="component-preview-canvas" style={canvasStyle}>
        {children}
      </div>
    </div>
  );
}
