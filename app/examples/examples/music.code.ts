/**
 * Source code for the Music example — exported as a string
 * so it can be displayed in the Code panel of the Examples page.
 */
export const musicCode = `'use client'

import { useState } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  Chip,
  ChipGroup,
  Divider,
  Input,
  Slider,
} from 'omverse-ui'

/* ─── Data ──────────────────────────────────────────────────────────────── */

const TRACKS = [
  { id: 1, title: 'Cosmic Drift',    artist: 'Lunar Echo',    duration: '3:45', genre: 'Ambient',    color: 'linear-gradient(135deg, #6366f1, #ec4899)' },
  { id: 2, title: 'Neon Pulse',      artist: 'Circuit Break', duration: '4:12', genre: 'Electronic', color: 'linear-gradient(135deg, #06b6d4, #6366f1)' },
  { id: 3, title: 'Mountain High',   artist: 'Terra Folk',    duration: '3:28', genre: 'Acoustic',   color: 'linear-gradient(135deg, #10b981, #059669)' },
  { id: 4, title: 'Late Night Code', artist: 'Lo-Fi Dev',     duration: '5:01', genre: 'Lo-Fi',      color: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { id: 5, title: 'Solar Wind',      artist: 'Astral Plane',  duration: '3:55', genre: 'Synthwave',  color: 'linear-gradient(135deg, #8b5cf6, #06b6d4)' },
  { id: 6, title: 'City Rain',       artist: 'Urban Drift',   duration: '4:33', genre: 'Chillhop',   color: 'linear-gradient(135deg, #64748b, #334155)' },
]

function formatTime(s: number) {
  return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0')
}

/* ─── Music ─────────────────────────────────────────────────────────────── */

export function Music() {
  const [playing, setPlaying]         = useState(true)
  const [currentTime, setCurrentTime] = useState(83)
  const [volume, setVolume]           = useState(72)
  const [activeChip, setActiveChip]   = useState(['For You'])
  const [activeTrack, setActiveTrack] = useState(1)

  const activeTrackData = TRACKS.find((t) => t.id === activeTrack) ?? TRACKS[0]

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <style>{\`
        .music-layout {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .music-left  { width: 320px; flex-shrink: 0; }
        .music-right { flex: 1; min-width: 0; }
        @media (max-width: 767px) {
          .music-layout { flex-direction: column; }
          .music-left   { width: 100%; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(0.7); }
        }
      \`}</style>

      <div className="music-layout">

        {/* ── Left panel — Now Playing ──────────────────────────────────── */}
        <div className="music-left">
          <Card variant="elevated">
            <CardBody>

              {/* Album art */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  maxWidth: 240,
                  margin: '0 auto 20px',
                  borderRadius: 12,
                  background: activeTrackData.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <i
                  className="ti ti-music"
                  style={{ fontSize: 64, color: 'rgba(255,255,255,0.5)' }}
                />
              </div>

              {/* Track info */}
              <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 4 }}>
                {activeTrackData.title}
              </p>
              <p style={{ fontSize: 14, color: 'var(--color-text-secondary)', marginBottom: 2 }}>
                {activeTrackData.artist}
              </p>
              <p style={{ fontSize: 12, color: 'var(--color-text-disabled)', marginBottom: 16 }}>
                Nebula Sessions
              </p>

              {/* Like / More row */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                <Button variant="ghost" size="xs">
                  <i className="ti ti-heart" />
                </Button>
                <div style={{ flex: 1 }} />
                <Button variant="ghost" size="xs">
                  <i className="ti ti-dots" />
                </Button>
              </div>

              <Divider />

              {/* Progress */}
              <div style={{ margin: '16px 0 8px' }}>
                <Slider
                  value={currentTime}
                  onChange={setCurrentTime}
                  min={0}
                  max={225}
                  step={1}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>
                    {formatTime(currentTime)}
                  </span>
                  <span style={{ fontSize: 11, color: 'var(--color-text-disabled)' }}>3:45</span>
                </div>
              </div>

              {/* Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  marginBottom: 16,
                }}
              >
                <Button variant="ghost" size="sm">
                  <i className="ti ti-arrows-shuffle" />
                </Button>
                <Button variant="ghost" size="sm">
                  <i className="ti ti-player-skip-back-filled" />
                </Button>
                <Button
                  variant="filled"
                  size="md"
                  shape="pill"
                  onClick={() => setPlaying((p) => !p)}
                >
                  <i className={playing ? 'ti ti-player-pause-filled' : 'ti ti-player-play-filled'} />
                </Button>
                <Button variant="ghost" size="sm">
                  <i className="ti ti-player-skip-forward-filled" />
                </Button>
                <Button variant="ghost" size="sm">
                  <i className="ti ti-repeat" />
                </Button>
              </div>

              {/* Volume */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Button variant="ghost" size="xs" onClick={() => setVolume((v) => (v > 0 ? 0 : 72))}>
                  <i className={volume === 0 ? 'ti ti-volume-off' : 'ti ti-volume'} />
                </Button>
                <div style={{ flex: 1 }}>
                  <Slider value={volume} onChange={setVolume} min={0} max={100} />
                </div>
              </div>

            </CardBody>
          </Card>
        </div>

        {/* ── Right panel — Playlist ───────────────────────────────────── */}
        <div className="music-right">
          <Card variant="outlined">
            <CardBody>

              {/* Header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  Queue
                </p>
                <ChipGroup
                  mode="single"
                  value={activeChip}
                  onChange={setActiveChip}
                  size="sm"
                  variant="tonal"
                >
                  <Chip value="For You">For You</Chip>
                  <Chip value="Recently Played">Recently Played</Chip>
                  <Chip value="Liked">Liked</Chip>
                </ChipGroup>
              </div>

              {/* Search */}
              <div style={{ marginBottom: 12 }}>
                <Input placeholder="Search songs..." size="sm" />
              </div>

              {/* Track list */}
              <div>
                {TRACKS.map((track, i) => (
                  <div key={track.id}>
                    <div
                      onClick={() => setActiveTrack(track.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '10px 4px',
                        cursor: 'pointer',
                        borderRadius: 8,
                        background:
                          activeTrack === track.id
                            ? 'var(--color-primary-container)'
                            : 'transparent',
                        transition: 'background 0.15s',
                      }}
                    >
                      {/* Track number / playing indicator */}
                      <div style={{ width: 20, textAlign: 'center', flexShrink: 0 }}>
                        {activeTrack === track.id ? (
                          <span
                            style={{
                              display: 'inline-block',
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              background: 'var(--color-primary)',
                              animation: 'pulse-dot 1.2s ease-in-out infinite',
                            }}
                          />
                        ) : (
                          <span style={{ fontSize: 12, color: 'var(--color-text-disabled)' }}>
                            {track.id}
                          </span>
                        )}
                      </div>

                      {/* Album art */}
                      <div
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 6,
                          background: track.color,
                          flexShrink: 0,
                        }}
                      />

                      {/* Title + artist */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            fontSize: 13,
                            fontWeight: 500,
                            color:
                              activeTrack === track.id
                                ? 'var(--color-on-primary-container)'
                                : 'var(--color-text-primary)',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          {track.title}
                        </p>
                        <p style={{ fontSize: 12, color: 'var(--color-text-secondary)', marginTop: 1 }}>
                          {track.artist}
                        </p>
                      </div>

                      {/* Genre badge */}
                      <Badge color="secondary" variant="tonal" size="sm">
                        {track.genre}
                      </Badge>

                      {/* Duration */}
                      <span
                        style={{
                          fontSize: 12,
                          color: 'var(--color-text-disabled)',
                          flexShrink: 0,
                          minWidth: 32,
                          textAlign: 'right',
                        }}
                      >
                        {track.duration}
                      </span>
                    </div>
                    {i < TRACKS.length - 1 && <Divider />}
                  </div>
                ))}
              </div>

            </CardBody>
          </Card>
        </div>

      </div>
    </div>
  )
}
`
