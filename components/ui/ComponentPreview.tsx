interface ComponentPreviewProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function ComponentPreview({
  title,
  description,
  children,
}: ComponentPreviewProps) {
  return (
    <div style={{ marginBottom: 24 }}>
      {/* Section title */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          marginBottom: 4,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </p>

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
      <div
        style={{
          background: 'var(--color-background-secondary)',
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 12,
          padding: 32,
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          minHeight: 80,
        }}
      >
        {/* Live indicator */}
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            fontSize: 10,
            color: 'var(--color-text-tertiary)',
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

        {children}
      </div>
    </div>
  );
}