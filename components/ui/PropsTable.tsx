interface PropRow {
  name: string;
  type: string;
  default: string;
  description: string;
}

interface PropsTableProps {
  props: PropRow[];
}

export function PropsTable({ props }: PropsTableProps) {
  return (
    <div style={{ marginBottom: 40 }}>
      {/* Section heading */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 500,
          color: 'var(--color-text-primary)',
          letterSpacing: '-0.01em',
          marginBottom: 12,
        }}
      >
        Props
      </p>

      {/* Table wrapper */}
      <div
        style={{
          border: '0.5px solid var(--color-border-tertiary)',
          borderRadius: 10,
          overflow: 'hidden',
        }}
      >
        {/* Header row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '140px minmax(0,1.4fr) 90px minmax(0,1fr)',
            columnGap: 16,
            padding: '7px 16px',
            background: 'var(--color-background-secondary)',
            borderBottom: '0.5px solid var(--color-border-tertiary)',
          }}
        >
          {(['Prop', 'Type', 'Default', 'Description'] as const).map(h => (
            <span
              key={h}
              style={{
                fontSize: 10,
                fontWeight: 500,
                color: 'var(--color-text-tertiary)',
                textTransform: 'uppercase',
                letterSpacing: '0.07em',
              }}
            >
              {h}
            </span>
          ))}
        </div>

        {/* Data rows */}
        {props.map((row, i) => (
          <div
            key={row.name}
            style={{
              display: 'grid',
              gridTemplateColumns: '140px minmax(0,1.4fr) 90px minmax(0,1fr)',
              columnGap: 16,
              padding: '10px 16px',
              borderBottom:
                i < props.length - 1
                  ? '0.5px solid var(--color-border-tertiary)'
                  : undefined,
              alignItems: 'start',
            }}
          >
            {/* name */}
            <code
              style={{
                fontSize: 12,
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                color: 'var(--color-text-primary)',
              }}
            >
              {row.name}
            </code>

            {/* type */}
            <span
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                wordBreak: 'break-word',
                lineHeight: 1.7,
              }}
            >
              {row.type}
            </span>

            {/* default */}
            <code
              style={{
                fontSize: 11,
                fontFamily: 'var(--font-mono)',
                fontWeight: 400,
                color: 'var(--color-text-tertiary)',
              }}
            >
              {row.default}
            </code>

            {/* description */}
            <span
              style={{
                fontSize: 12,
                fontWeight: 400,
                color: 'var(--color-text-secondary)',
                lineHeight: 1.65,
              }}
            >
              {row.description}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
