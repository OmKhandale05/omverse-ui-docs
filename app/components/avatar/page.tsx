'use client';

import { Avatar, AvatarGroup } from 'omverse-ui';
import { PageHeader } from '@/components/ui/PageHeader';
import { ComponentPreview } from '@/components/ui/ComponentPreview';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PropsTable } from '@/components/ui/PropsTable';
import { ComponentDocSection, ComponentDocumentation } from '@/components/docs/ComponentDocumentation'

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

const API_PROPS = AVATAR_PROPS;

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
            <PageHeader        breadcrumb={['Components', 'Display', 'Avatar']}        title="Avatar"        description="User profile images with fallback initials, status indicators and group stacking."        tags={['6 sizes', 'Circle & square', 'Status indicator', 'AvatarGroup', 'Fallback initials']}      />

      <ComponentDocumentation>
        <ComponentDocSection id="overview" title="Overview" description="User profile images with fallback initials, status indicators and group stacking.">
          <div className="component-doc-prose">
            <p>Use Avatar to present and interact with structured information in a predictable, accessible way.</p>
            <p>The component examples below demonstrate practical variations you can adapt to your own interface.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="anatomy" title="Anatomy">
          <ul className="component-doc-prose">
            <li>Root container and spacing boundary.</li>
            <li>Primary content and optional secondary metadata.</li>
            <li>State indicators and utility affordances (icons, badges, controls).</li>
            <li>Optional helper text, grouping, and behavioral wrappers.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-to-use" title="When to use">
          <ul className="component-doc-prose">
            <li>Choose Avatar when a repeated, structured interaction is required.</li>
            <li>Use it for clear, consistent operations across similar surfaces.</li>
            <li>Use in forms, lists, and action workflows where clarity matters.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="when-not-to-use" title="When not to use">
          <ul className="component-doc-prose">
            <li>Do not use only for decorative layout without interaction meaning.</li>
            <li>Avoid duplicating the same behavior without distinct user context.</li>
            <li>Prefer simpler HTML or textual content for static, non-interactive labels.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="variants" title="Variants">
          <div className="component-doc-stack">
            <p>Component variants should be documented by API props and examples below.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="states" title="States">
          <div className="component-doc-stack">
            <p>Common states include idle, active, disabled, focused, and loading/pending states where applicable.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="behavior" title="Behavior">
          <div className="component-doc-stack">
            <p>Behavior should remain deterministic and keyboard-friendly, with clear visual feedback for every state transition.</p>
          </div>
        </ComponentDocSection>

        <ComponentDocSection id="accessibility" title="Accessibility">
          <ul className="component-doc-prose">
            <li>Use semantic structure and visible labels whenever possible.</li>
            <li>Preserve keyboard navigation and focus visibility.</li>
            <li>Announce status and changes when context requires it.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="content-guidelines" title="Content guidelines">
          <ul className="component-doc-prose">
            <li>Prefer short, clear labels.</li>
            <li>Keep content actions scannable and outcome-oriented.</li>
            <li>Use consistent wording across similar components.</li>
          </ul>
        </ComponentDocSection>

        <ComponentDocSection id="examples" title="Examples">
          <div className="component-doc-stack">
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
            <li>Use Avatar alongside Button for primary actions.</li>
            <li>Pair with Alert or NotificationCenter for contextual feedback.</li>
            <li>Use layout containers to keep avatar behavior visually consistent.</li>
          </ul>
          </div>
        </ComponentDocSection>
      </ComponentDocumentation>
    </div>
  )
  }
