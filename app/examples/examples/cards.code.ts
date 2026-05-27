export const cardsCode = `'use client'

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

/* ─── Filter tabs ────────────────────────────────────────────────────────── */

const FILTERS = [
  { id: 'all',      label: 'All'      },
  { id: 'product',  label: 'Product'  },
  { id: 'profile',  label: 'Profile'  },
  { id: 'stats',    label: 'Stats'    },
  { id: 'article',  label: 'Article'  },
  { id: 'feature',  label: 'Feature'  },
]

/* ─── 1. Product card (elevated, interactive) ───────────────────────────── */

function ProductCard() {
  const [wishlisted, setWishlisted] = useState(false)
  return (
    <Card variant="elevated" interactive>
      {/* Media area — real image with absolutely positioned actions */}
      <div style={{ position: 'relative' }}>
        <CardMedia
          src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=600&h=340&fit=crop&auto=format&q=80"
          alt="Pro Component Kit"
          height={168}
        />
        {/* "New" badge — top left */}
        <div style={{ position: 'absolute', top: 10, left: 12 }}>
          <Badge color="primary" variant="filled" size="sm">New</Badge>
        </div>
        {/* Wishlist — top right */}
        <button
          onClick={(e) => { e.stopPropagation(); setWishlisted(!wishlisted) }}
          style={{
            position: 'absolute', top: 10, right: 10,
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(0,0,0,0.35)',
            backdropFilter: 'blur(6px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: wishlisted ? '#f43f5e' : '#fff',
            transition: 'all 150ms',
          }}
        >
          <i className={wishlisted ? 'ti ti-heart-filled' : 'ti ti-heart'} style={{ fontSize: 16 }} />
        </button>
      </div>

      <CardBody>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 4 }}>
          <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Pro Component Kit
          </p>
          <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--color-primary)' }}>\$49</span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.5, marginBottom: 12 }}>
          Every component you need to ship polished products faster.
        </p>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <Chip size="sm" variant="tonal">Design</Chip>
          <Chip size="sm" variant="tonal">Dev</Chip>
          <Chip size="sm" variant="tonal">50+ components</Chip>
        </div>
      </CardBody>

      <CardFooter divider>
        <div style={{ display: 'flex', gap: 8, width: '100%' }}>
          <Button variant="filled" size="sm" style={{ flex: 1 }}>
            <i className="ti ti-shopping-cart" style={{ marginRight: 6 }} />
            Add to cart
          </Button>
          <Button variant="outlined" size="sm">Preview</Button>
        </div>
      </CardFooter>
    </Card>
  )
}

/* ─── 2. Profile card (outlined) ────────────────────────────────────────── */

function ProfileCard() {
  const [following, setFollowing] = useState(false)
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={<Avatar name="Aria Chen" size="md" status="online" />}
        title="Aria Chen"
        subtitle="Senior Designer · San Francisco"
        action={
          <Button
            variant={following ? 'tonal' : 'filled'}
            size="sm"
            onClick={() => setFollowing(!following)}
          >
            {following ? 'Following' : 'Follow'}
          </Button>
        }
      />
      <CardBody>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 16 }}>
          Crafting delightful interfaces since 2018. Loves typography, motion design, and building design systems.
        </p>

        {/* Tags */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
          <Chip size="sm" variant="tonal">Figma</Chip>
          <Chip size="sm" variant="tonal">React</Chip>
          <Chip size="sm" variant="tonal">Motion</Chip>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'var(--color-surface-variant)', borderRadius: 8, overflow: 'hidden' }}>
          {[
            { label: 'Posts',     value: '142'  },
            { label: 'Followers', value: '4.2k' },
            { label: 'Following', value: '89'   },
          ].map((stat, i) => (
            <div key={stat.label} style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
              {i > 0 && <Divider orientation="vertical" style={{ height: 32 }} />}
              <div style={{ flex: 1, textAlign: 'center', padding: '10px 0' }}>
                <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--color-text-primary)', margin: 0 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 11, color: 'var(--color-text-secondary)', margin: 0 }}>
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardBody>
    </Card>
  )
}

/* ─── 3. Stats card (filled) ─────────────────────────────────────────────── */

function StatsCard() {
  return (
    <Card variant="filled">
      <CardBody>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--color-text-secondary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Monthly Revenue
          </p>
          <Badge color="success" variant="tonal" size="sm">+18%</Badge>
        </div>
        <p style={{ fontSize: 34, fontWeight: 700, color: 'var(--color-text-primary)', lineHeight: 1, marginBottom: 4 }}>
          \$84,200
        </p>
        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginBottom: 16 }}>
          vs \$71,350 last month
        </p>
        <Progress value={72} variant="gradient" />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>\$0</span>
          <span style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>Goal: \$120k</span>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─── 4. Article card (outlined, interactive) ────────────────────────────── */

function ArticleCard() {
  return (
    <Card variant="outlined" interactive>
      {/* Wrap media in a relative div so the badge can be pinned to a corner */}
      <div style={{ position: 'relative' }}>
        <CardMedia
          src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=300&fit=crop&auto=format&q=80"
          alt="Code editor"
          height={148}
        />
        <div style={{ position: 'absolute', top: 10, left: 12 }}>
          <Badge color="info" variant="filled" size="sm">Tutorial</Badge>
        </div>
      </div>
      <CardBody>
        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }}>
          Building UI components with omverse-ui
        </p>
        <p style={{ fontSize: 13, color: 'var(--color-text-secondary)', lineHeight: 1.6, marginBottom: 14 }}>
          Learn how to compose flexible, accessible components using the full component API.
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatar name="Om K." size="xs" />
            <span style={{ fontSize: 12, color: 'var(--color-text-secondary)' }}>Om K.</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: 'var(--color-text-disabled)' }}>
            <i className="ti ti-clock" style={{ fontSize: 13 }} />
            12 min read
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

/* ─── 5. Feature card (gradient) ─────────────────────────────────────────── */

function FeatureCard() {
  return (
    <Card variant="gradient">
      <CardBody>
        <div
          style={{
            width: 44, height: 44, borderRadius: 12,
            background: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 14,
          }}
        >
          <i className="ti ti-sparkles" style={{ fontSize: 22, color: '#fff' }} />
        </div>
        <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
          Gradient variant
        </p>
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', lineHeight: 1.6, marginBottom: 16 }}>
          Eye-catching branded cards for feature highlights, announcements, and CTAs.
        </p>
        <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
          <Badge variant="filled" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}>
            Brand
          </Badge>
          <Badge variant="filled" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff', border: 'none' }}>
            Highlight
          </Badge>
        </div>
        <Button variant="elevated" size="sm" style={{ background: '#fff', color: 'var(--color-primary)', fontWeight: 600 }}>
          Learn more
        </Button>
      </CardBody>
    </Card>
  )
}

/* ─── 6. Glass card (glass on color background) ──────────────────────────── */

function GlassCard() {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #10b981 0%, #0891b2 100%)',
        borderRadius: 12,
        padding: 2,
      }}
    >
      <Card variant="glass" style={{ borderRadius: 11 }}>
        <CardBody>
          <div
            style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 14,
            }}
          >
            <i className="ti ti-shield-check" style={{ fontSize: 22, color: '#fff' }} />
          </div>
          <p style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 6 }}>
            Glass variant
          </p>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: 16 }}>
            Frosted glass effect for use on colorful or image backgrounds.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: -8 }}>
              {['JD', 'AR', 'MK'].map((n) => (
                <Avatar key={n} name={n} size="xs" style={{ marginLeft: -6, border: '2px solid rgba(255,255,255,0.3)' }} />
              ))}
            </div>
            <Button variant="outlined" size="sm" style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.4)' }}>
              Join
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}

/* ─── Cards page ─────────────────────────────────────────────────────────── */

type FilterId = typeof FILTERS[number]['id']

const CARD_CATEGORIES: Record<string, FilterId[]> = {
  product: ['product'],
  profile: ['profile'],
  stats:   ['stats'],
  article: ['article'],
  feature: ['feature'],
  glass:   ['feature'],
}

export function Cards() {
  const [activeFilter, setActiveFilter] = useState<string[]>(['all'])
  const filter = activeFilter[0] ?? 'all'

  const cards: { id: string; category: FilterId; node: React.ReactNode }[] = [
    { id: 'product',  category: 'product', node: <ProductCard /> },
    { id: 'profile',  category: 'profile', node: <ProfileCard /> },
    { id: 'stats',    category: 'stats',   node: <StatsCard />   },
    { id: 'article',  category: 'article', node: <ArticleCard /> },
    { id: 'feature',  category: 'feature', node: <FeatureCard /> },
    { id: 'glass',    category: 'feature', node: <GlassCard />   },
  ]

  const visible = cards.filter((c) => filter === 'all' || c.category === filter)

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{\`
        .cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-top: 16px;
          align-items: start;
        }
        @media (max-width: 900px) {
          .cards-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .cards-grid { grid-template-columns: 1fr; }
        }
      \`}</style>

      {/* Filter */}
      <ChipGroup
        mode="single"
        value={activeFilter}
        onChange={setActiveFilter}
        variant="tonal"
        size="sm"
      >
        {FILTERS.map((f) => (
          <Chip key={f.id} value={f.id}>{f.label}</Chip>
        ))}
      </ChipGroup>

      {/* Grid */}
      <div className="cards-grid">
        {visible.map((c) => (
          <div key={c.id}>{c.node}</div>
        ))}
      </div>
    </div>
  )
}
`
