'use client'

import { useState } from 'react'
import {
  Avatar,
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardMedia,
  Chip,
  ChipGroup,
  Divider,
  Progress,
} from 'omverse-ui'

/* ─── Data ──────────────────────────────────────────────────────────────── */

const CARDS_DATA = [
  {
    id: 1, category: 'product',
    color: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
    icon: 'ti-box', name: 'Pro Kit', desc: 'Everything you need to ship faster.', price: '$49', tags: ['design', 'dev'],
  },
  {
    id: 2, category: 'profile',
    name: 'Aria Chen', role: 'Senior Designer', status: 'online' as const,
    bio: 'Crafting delightful interfaces since 2018. Loves typography and motion design.',
    posts: 142, followers: '4.2k', following: 89,
  },
  {
    id: 3, category: 'stats',
    label: 'Monthly Revenue', value: '$84,200', progress: 72, sub: '+18% from last month',
  },
  {
    id: 4, category: 'media',
    color: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
    title: 'Build with omverse-ui', category_label: 'Tutorial', duration: '12 min read',
  },
  {
    id: 5, category: 'product',
    color: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
    icon: 'ti-leaf', name: 'Eco Pack', desc: 'Sustainable components for modern apps.', price: '$29', tags: ['sustainable', 'ui'],
  },
  {
    id: 6, category: 'profile',
    name: 'Marcus Lee', role: 'Full Stack Engineer', status: 'busy' as const,
    bio: 'Building scalable systems. Open source enthusiast. Coffee addict.',
    posts: 87, followers: '2.1k', following: 203,
  },
]

const FILTERS = ['All', 'Product', 'Profile', 'Stats', 'Media']

/* ─── Card renderers ────────────────────────────────────────────────────── */

function ProductCard({ card }: { card: typeof CARDS_DATA[0] }) {
  const d = card as Extract<typeof CARDS_DATA[number], { category: 'product' }>
  return (
    <Card variant="elevated" interactive>
      <CardMedia>
        <div
          style={{
            height: 160,
            background: (d as any).color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <i
            className={`ti ${(d as any).icon}`}
            style={{ fontSize: 48, color: 'rgba(255,255,255,0.9)' }}
          />
        </div>
      </CardMedia>
      <CardBody>
        <p
          style={{
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 4,
          }}
        >
          {(d as any).name}
        </p>
        <p
          style={{
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            marginBottom: 10,
          }}
        >
          {(d as any).desc}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          {((d as any).tags as string[]).map((tag: string) => (
            <Chip key={tag} size="sm" variant="tonal">
              {tag}
            </Chip>
          ))}
        </div>
      </CardBody>
      <CardFooter divider>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {(d as any).price}
          </span>
          <Button variant="filled" size="sm">
            <i className="ti ti-shopping-cart" style={{ marginRight: 6 }} />
            Add to cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

function ProfileCard({ card }: { card: typeof CARDS_DATA[0] }) {
  const d = card as any
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar name={d.name} size="md" status={d.status} />}
        title={d.name}
        subtitle={d.role}
        action={
          <Button variant="ghost" size="sm">
            Follow
          </Button>
        }
      />
      <CardBody>
        <p
          style={{
            fontSize: 13,
            color: 'var(--color-text-secondary)',
            lineHeight: 1.6,
            marginBottom: 16,
          }}
        >
          {d.bio}
        </p>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {d.posts}
            </p>
            <p
              style={{
                fontSize: 11,
                color: 'var(--color-text-secondary)',
                marginTop: 2,
              }}
            >
              Posts
            </p>
          </div>
          <Divider />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {d.followers}
            </p>
            <p
              style={{
                fontSize: 11,
                color: 'var(--color-text-secondary)',
                marginTop: 2,
              }}
            >
              Followers
            </p>
          </div>
          <Divider />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <p
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: 'var(--color-text-primary)',
                margin: 0,
              }}
            >
              {d.following}
            </p>
            <p
              style={{
                fontSize: 11,
                color: 'var(--color-text-secondary)',
                marginTop: 2,
              }}
            >
              Following
            </p>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

function StatsCard({ card }: { card: typeof CARDS_DATA[0] }) {
  const d = card as any
  return (
    <Card variant="filled">
      <CardBody>
        <p
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
            marginBottom: 8,
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {d.label}
        </p>
        <p
          style={{
            fontSize: 32,
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 16,
            lineHeight: 1,
          }}
        >
          {d.value}
        </p>
        <Progress value={d.progress} variant="gradient" />
        <p
          style={{
            fontSize: 12,
            color: 'var(--color-success)',
            marginTop: 8,
            fontWeight: 500,
          }}
        >
          {d.sub}
        </p>
      </CardBody>
    </Card>
  )
}

function MediaCard({ card }: { card: typeof CARDS_DATA[0] }) {
  const d = card as any
  return (
    <Card variant="outlined" interactive>
      <CardMedia>
        <div
          style={{
            height: 160,
            background: d.color,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backdropFilter: 'blur(4px)',
            }}
          >
            <i className="ti ti-player-play-filled" style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '8px 14px 10px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }}
          >
            <p
              style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#fff',
                margin: 0,
              }}
            >
              {d.title}
            </p>
          </div>
        </div>
      </CardMedia>
      <CardBody>
        <p
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            marginBottom: 8,
          }}
        >
          {d.title}
        </p>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <Badge color="primary" variant="tonal" size="sm">
            {d.category_label}
          </Badge>
          <span
            style={{
              fontSize: 12,
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <i className="ti ti-clock" style={{ fontSize: 13 }} />
            {d.duration}
          </span>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─── Cards ──────────────────────────────────────────────────────────────── */

export function Cards() {
  const [filter, setFilter] = useState<string[]>(['All'])

  const activeFilter = filter[0] ?? 'All'

  const visible = CARDS_DATA.filter((c) =>
    activeFilter === 'All' ||
    c.category === activeFilter.toLowerCase()
  )

  function renderCard(card: typeof CARDS_DATA[0]) {
    switch (card.category) {
      case 'product': return <ProductCard key={card.id} card={card} />
      case 'profile': return <ProfileCard key={card.id} card={card} />
      case 'stats':   return <StatsCard   key={card.id} card={card} />
      case 'media':   return <MediaCard   key={card.id} card={card} />
      default:        return null
    }
  }

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{`
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 16px;
        }
        @media (max-width: 768px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .cards-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* Filter bar */}
      <ChipGroup
        mode="single"
        value={filter}
        onChange={setFilter}
        variant="tonal"
        size="sm"
      >
        {FILTERS.map((f) => (
          <Chip key={f} value={f}>
            {f}
          </Chip>
        ))}
      </ChipGroup>

      {/* Card grid */}
      <div className="cards-grid">
        {visible.map(renderCard)}
      </div>
    </div>
  )
}
