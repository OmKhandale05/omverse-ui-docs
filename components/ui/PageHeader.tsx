interface PageHeaderProps {
  breadcrumb: string[];
  title: string;
  description: string;
  tags?: string[];
  sourceUrl?: string;
  storybookUrl?: string;
}

export function PageHeader({
  breadcrumb,
  title,
  description,
  tags = [],
  sourceUrl,
  storybookUrl,
}: PageHeaderProps) {
  return (
    <div
      style={{
        padding: '32px 40px 0',
        borderBottom: '0.5px solid var(--color-border-tertiary)',
      }}
    >
      {/* Breadcrumb */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 5,
          fontSize: 11,
          color: 'var(--color-text-tertiary)',
          marginBottom: 20,
        }}
      >
        {breadcrumb.map((crumb, i) => (
          <span key={crumb} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            {i > 0 && (
              <i
                className="ti ti-chevron-right"
                aria-hidden="true"
                style={{ fontSize: 10 }}
              />
            )}
            <span style={{ color: i === breadcrumb.length - 1 ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)' }}>
              {crumb}
            </span>
          </span>
        ))}
      </div>

      {/* Title row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          marginBottom: 10,
        }}
      >
        <h1
          style={{
            fontSize: 28,
            fontWeight: 500,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
          }}
        >
          {title}
        </h1>

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: 5 }}>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: 26,
                padding: '0 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <i className="ti ti-brand-github" aria-hidden="true" style={{ fontSize: 11 }} />
              Source
            </a>
          )}
          {storybookUrl && (
            <a
              href={storybookUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                height: 26,
                padding: '0 10px',
                borderRadius: 6,
                fontSize: 11,
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                background: 'var(--color-background-secondary)',
                border: '0.5px solid var(--color-border-tertiary)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <i className="ti ti-external-link" aria-hidden="true" style={{ fontSize: 11 }} />
              Storybook
            </a>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 400,
          color: 'var(--color-text-secondary)',
          lineHeight: 1.65,
          maxWidth: 500,
          marginBottom: 16,
        }}
      >
        {description}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 20 }}>
          {tags.map(tag => (
            <span
              key={tag}
              style={{
                fontSize: 11,
                padding: '3px 8px',
                borderRadius: 6,
                border: '0.5px solid var(--color-border-tertiary)',
                color: 'var(--color-text-tertiary)',
                fontWeight: 400,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}