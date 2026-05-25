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
    description: 'Image URL',
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

const IMAGE_CODE = `<Avatar src="https://i.pravatar.cc/150?img=1" name="John Doe" size="md" />
<Avatar src="https://i.pravatar.cc/150?img=5" name="Jane Smith" size="md" />
<Avatar src="https://i.pravatar.cc/150?img=3" name="Bob Lee" size="md" />`;

const SHAPE_CODE = `<Avatar name="John Doe" size="md" shape="circle" />
<Avatar name="John Doe" size="md" shape="square" />`;

const STATUS_CODE = `<Avatar name="John Doe" size="md" status="online" />
<Avatar name="John Doe" size="md" status="offline" />
<Avatar name="John Doe" size="md" status="away" />
<Avatar name="John Doe" size="md" status="busy" />`;

const GROUP_CODE = `import { Avatar, AvatarGroup } from 'omverse-ui'

<AvatarGroup max={3}>
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

        {/* ── Section 1: Sizes ── */}
        <ComponentPreview
          title="Sizes"
          description="6 sizes from xs to 2xl — all fall back to initials when no image is provided"
        >
          <Avatar name="John Doe" size="xs" />
          <Avatar name="John Doe" size="sm" />
          <Avatar name="John Doe" size="md" />
          <Avatar name="John Doe" size="lg" />
          <Avatar name="John Doe" size="xl" />
          <Avatar name="John Doe" size="2xl" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SIZES_CODE} />

        {/* ── Section 2: With image ── */}
        <ComponentPreview
          title="With image"
          description="Automatically falls back to initials if the image fails to load"
        >
          <Avatar src="https://i.pravatar.cc/150?img=1" name="John Doe" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=5" name="Jane Smith" size="md" />
          <Avatar src="https://i.pravatar.cc/150?img=3" name="Bob Lee" size="md" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={IMAGE_CODE} />

        {/* ── Section 3: Shape ── */}
        <ComponentPreview
          title="Shape"
          description="Circle (default) or square with size-appropriate border radius"
        >
          <Avatar name="John Doe" size="md" shape="circle" />
          <Avatar name="John Doe" size="md" shape="square" />
        </ComponentPreview>

        <CodeBlock filename="App.tsx" code={SHAPE_CODE} />

        {/* ── Section 4: Status ── */}
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

        {/* ── Section 5: Group ── */}
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

        {/* ── Props table ── */}
        <PropsTable props={AVATAR_PROPS} />

      </div>
    </div>
  );
}
