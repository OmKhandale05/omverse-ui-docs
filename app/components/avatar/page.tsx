'use client';

import { Avatar, AvatarGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';

/* ─── Props table data ─── */

const AVATAR_PROPS = [
  {
    name: 'name',
    type: 'string',
    default: '—',
    description: 'Used for fallback initials and aria-label',
  },
  {
    name: 'src',
    type: 'string',
    default: 'undefined',
    description: 'Image URL — falls back to initials on error',
  },
  {
    name: 'size',
    type: "'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'",
    default: "'md'",
    description: 'Avatar size',
  },
  {
    name: 'shape',
    type: "'circle' | 'square'",
    default: "'circle'",
    description: 'Avatar shape',
  },
  {
    name: 'status',
    type: "'online' | 'offline' | 'away' | 'busy'",
    default: 'undefined',
    description: 'Status indicator dot',
  },
  {
    name: 'color',
    type: "'default' | 'secondary' | 'success' | 'warning' | 'error' | 'info'",
    default: 'undefined',
    description: 'Background color for initials fallback',
  },
  {
    name: 'clickable',
    type: 'boolean',
    default: 'false',
    description: 'Adds hover/focus styles and role="button"',
  },
] as const satisfies {
  name: string;
  type: string;
  default: string;
  description: string;
}[];

/* ─── Code snippets ─── */

const SIZES_CODE = `import { Avatar } from 'omverse-ui'

<Avatar name="John Doe" size="xs" />
<Avatar name="John Doe" size="sm" />
<Avatar name="John Doe" size="md" />
<Avatar name="John Doe" size="lg" />
<Avatar name="John Doe" size="xl" />
<Avatar name="John Doe" size="2xl" />`;

const SIZES_IMAGE_CODE = `<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="xs" />
<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="sm" />
<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="md" />
<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="lg" />
<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="xl" />
<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="2xl" />`;

const IMAGE_CODE = `<Avatar src="https://i.pravatar.cc/150?img=1" name="John Doe" size="md" />
<Avatar src="https://i.pravatar.cc/150?img=5" name="Jane Smith" size="md" />
<Avatar src="https://i.pravatar.cc/150?img=3" name="Bob Lee" size="md" />`;

const INITIALS_CODE = `<Avatar name="John Doe" size="md" />
<Avatar name="Alice Wang" size="md" />
<Avatar name="Bob Lee" size="md" />
<Avatar name="Sarah Connor" size="md" />`;

const SHAPE_CODE = `<Avatar name="John Doe" size="md" shape="circle" />
<Avatar name="John Doe" size="md" shape="square" />`;

const SQUARE_CODE = `<Avatar name="John Doe" size="sm" shape="square" />
<Avatar name="John Doe" size="md" shape="square" />
<Avatar name="John Doe" size="lg" shape="square" />
<Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="lg" shape="square" />`;

const STATUS_CODE = `<Avatar name="John Doe" size="md" status="online" />
<Avatar name="John Doe" size="md" status="offline" />
<Avatar name="John Doe" size="md" status="away" />
<Avatar name="John Doe" size="md" status="busy" />`;

const ALL_STATUS_CODE = `<Avatar name="John" size="lg" status="online" />
<Avatar name="Jane" size="lg" status="offline" />
<Avatar name="Bob" size="lg" status="away" />
<Avatar name="Alice" size="lg" status="busy" />`;

const GROUP_CODE = `import { Avatar, AvatarGroup } from 'omverse-ui'

<AvatarGroup max={3}>
  <Avatar src="https://i.pravatar.cc/150?img=1" name="John" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob" />
  <Avatar src="https://i.pravatar.cc/150?img=4" name="Alice" />
  <Avatar src="https://i.pravatar.cc/150?img=5" name="Tom" />
</AvatarGroup>`;

const GROUP_SIZES_CODE = `<AvatarGroup max={4} size="sm">
  <Avatar src="https://i.pravatar.cc/150?img=1" name="John" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob" />
  <Avatar src="https://i.pravatar.cc/150?img=4" name="Alice" />
  <Avatar src="https://i.pravatar.cc/150?img=5" name="Tom" />
</AvatarGroup>
<AvatarGroup max={4} size="md">
  <Avatar src="https://i.pravatar.cc/150?img=1" name="John" />
  <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane" />
  <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob" />
  <Avatar src="https://i.pravatar.cc/150?img=4" name="Alice" />
  <Avatar src="https://i.pravatar.cc/150?img=5" name="Tom" />
</AvatarGroup>`;

/* ─── Page ─── */

export default function AvatarPage() {
  return (
    <div>
      {/* ── Page header ── */}
      <PageHeader
        breadcrumb={['Components', 'Display', 'Avatar']}
        title="Avatar"
        description="User profile images with fallback initials, status indicators and group stacking."
        tags={['6 sizes', 'Circle & square', 'Status indicator', 'AvatarGroup', 'Fallback initials']}
      />

      {/* ── Content ── */}
      <div style={{ padding: '28px 40px' }}>

        {/* ── Section 1: Sizes (initials) ── */}
        <ComponentPreview
          title="Sizes"
          description="6 sizes from xs to 2xl — fallback to initials when no image is provided"
        >
          <Avatar name="John Doe" size="xs" />
          <Avatar name="John Doe" size="sm" />
          <Avatar name="John Doe" size="md" />
          <Avatar name="John Doe" size="lg" />
          <Avatar name="John Doe" size="xl" />
          <Avatar name="John Doe" size="2xl" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 2: All sizes with image ── */}
        <ComponentPreview
          title="All sizes with image"
          description="Same 6 sizes with a real image src"
        >
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="xs" />
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="sm" />
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="lg" />
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="xl" />
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="2xl" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_IMAGE_CODE} />

        {/* ── Section 3: With image ── */}
        <ComponentPreview
          title="With image"
          description="Automatically falls back to initials if the image fails to load"
        >
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John Doe" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=5" name="Jane Smith" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob Lee" size="md" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={IMAGE_CODE} />

        {/* ── Section 4: Fallback initials ── */}
        <ComponentPreview
          title="Fallback initials"
          description="Generates initials from the name prop — JD, AW, BL, SC"
        >
          <Avatar name="John Doe" size="md" />
          <Avatar name="Alice Wang" size="md" />
          <Avatar name="Bob Lee" size="md" />
          <Avatar name="Sarah Connor" size="md" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={INITIALS_CODE} />

        {/* ── Section 5: Shape ── */}
        <ComponentPreview
          title="Shape"
          description="Circle (default) or square with size-appropriate border radius"
        >
          <Avatar name="John Doe" size="md" shape="circle" />
          <Avatar name="John Doe" size="md" shape="square" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SHAPE_CODE} />

        {/* ── Section 6: Square shape sizes ── */}
        <ComponentPreview
          title="Square shape"
          description="Square shape across sizes — works with initials and images"
        >
          <Avatar name="John Doe" size="sm" shape="square" />
          <Avatar name="John Doe" size="md" shape="square" />
          <Avatar name="John Doe" size="lg" shape="square" />
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John" size="lg" shape="square" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SQUARE_CODE} />

        {/* ── Section 7: Status indicators ── */}
        <ComponentPreview
          title="Status indicators"
          description="Online (green), offline (gray), away (amber) and busy (red)"
        >
          <Avatar name="John Doe" size="md" status="online" />
          <Avatar name="John Doe" size="md" status="offline" />
          <Avatar name="John Doe" size="md" status="away" />
          <Avatar name="John Doe" size="md" status="busy" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={STATUS_CODE} />

        {/* ── Section 8: All status indicators (larger) ── */}
        <ComponentPreview
          title="All status indicators"
          description="Status dots at lg size for better visibility"
        >
          <Avatar name="John" size="lg" status="online" />
          <Avatar name="Jane" size="lg" status="offline" />
          <Avatar name="Bob" size="lg" status="away" />
          <Avatar name="Alice" size="lg" status="busy" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={ALL_STATUS_CODE} />

        {/* ── Section 9: Avatar group ── */}
        <ComponentPreview
          title="Avatar group"
          description="Stacks avatars with overlap — extras beyond max collapse into a count badge"
        >
          <AvatarGroup max={3}>
            <Avatar src="https://i.pravatar.cc/150?img=1" name="John" />
            <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane" />
            <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob" />
            <Avatar src="https://i.pravatar.cc/150?img=4" name="Alice" />
            <Avatar src="https://i.pravatar.cc/150?img=5" name="Tom" />
          </AvatarGroup>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GROUP_CODE} />

        {/* ── Section 10: Avatar group sizes ── */}
        <ComponentPreview
          title="Avatar group sizes"
          description="Group size prop is passed to all child avatars"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
            <AvatarGroup max={4} size="sm">
              <Avatar src="https://i.pravatar.cc/150?img=1" name="John" />
              <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane" />
              <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob" />
              <Avatar src="https://i.pravatar.cc/150?img=4" name="Alice" />
              <Avatar src="https://i.pravatar.cc/150?img=5" name="Tom" />
            </AvatarGroup>
            <AvatarGroup max={4} size="md">
              <Avatar src="https://i.pravatar.cc/150?img=1" name="John" />
              <Avatar src="https://i.pravatar.cc/150?img=2" name="Jane" />
              <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob" />
              <Avatar src="https://i.pravatar.cc/150?img=4" name="Alice" />
              <Avatar src="https://i.pravatar.cc/150?img=5" name="Tom" />
            </AvatarGroup>
          </div>
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={GROUP_SIZES_CODE} />

        {/* ── Props table ── */}
        <PropsTable props={AVATAR_PROPS} />

      </div>
    </div>
  );
}
