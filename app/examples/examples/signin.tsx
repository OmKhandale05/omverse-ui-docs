'use client'

import { useState } from 'react'
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Input,
} from 'omverse-ui'

/* ─── LogoMark ──────────────────────────────────────────────────────────── */

function LogoMark() {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 32,
        height: 32,
        borderRadius: 6,
        background: 'var(--color-on-surface, #1a1a1a)',
      }}
    >
      <svg width="16" height="16" viewBox="0 0 11 11" fill="none">
        <rect x="1"   y="1"   width="3.5" height="3.5" rx="0.5" fill="white" />
        <rect x="6.5" y="1"   width="3.5" height="3.5" rx="0.5" fill="white" />
        <rect x="1"   y="6.5" width="3.5" height="3.5" rx="0.5" fill="white" />
        <rect x="6.5" y="6.5" width="3.5" height="3.5" rx="0.5" fill="white" opacity="0.35" />
      </svg>
    </span>
  )
}

/* ─── Google SVG icon ───────────────────────────────────────────────────── */

function GoogleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

/* ─── SignIn ─────────────────────────────────────────────────────────────── */

export function SignIn() {
  const [mode, setMode]         = useState<'signin' | 'signup'>('signin')
  const [remember, setRemember] = useState(false)
  const [agreed, setAgreed]     = useState(false)

  return (
    <div style={{ padding: '40px 0', fontFamily: 'inherit' }}>
      <style>{`
        .signin-social { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media (max-width: 400px) {
          .signin-social { grid-template-columns: 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: 440, margin: '0 auto' }}>
        <Card variant="outlined">
          <CardBody>
            <div style={{ padding: '8px 8px 0' }}>

              {/* Logo + heading */}
              <div style={{ textAlign: 'center', marginBottom: 28 }}>
                <div style={{ marginBottom: 14 }}>
                  <LogoMark />
                </div>
                <p style={{ fontSize: 22, fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 6 }}>
                  {mode === 'signin' ? 'Welcome back' : 'Create your account'}
                </p>
                <p style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                  {mode === 'signin'
                    ? 'Sign in to omverse-ui'
                    : 'Start building beautiful UIs today'}
                </p>
              </div>

              {/* ── Sign In form ─────────────────────────────────────────── */}
              {mode === 'signin' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input
                    label="Email"
                    type="email"
                    variant="floating"
                    placeholder="you@example.com"
                  />
                  <Input
                    label="Password"
                    type="password"
                    variant="floating"
                  />

                  {/* Remember + Forgot */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Checkbox
                      label="Remember me"
                      checked={remember}
                      onChange={(e) => setRemember((e.target as HTMLInputElement).checked)}
                    />
                    <Button variant="text" size="sm">
                      Forgot password?
                    </Button>
                  </div>

                  {/* Sign in button */}
                  <div style={{ width: '100%' }}>
                    <Button variant="filled" size="lg" style={{ width: '100%' }}>
                      Sign in
                    </Button>
                  </div>

                  {/* Or divider */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0' }}>
                    <div style={{ flex: 1, height: 1, background: 'var(--color-outline-variant)' }} />
                    <span style={{ fontSize: 12, color: 'var(--color-text-disabled)', whiteSpace: 'nowrap' }}>
                      or continue with
                    </span>
                    <div style={{ flex: 1, height: 1, background: 'var(--color-outline-variant)' }} />
                  </div>

                  {/* Social buttons */}
                  <div className="signin-social">
                    <Button variant="outlined" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <GoogleIcon />
                      Google
                    </Button>
                    <Button variant="outlined" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'center' }}>
                      <i className="ti ti-brand-github" style={{ fontSize: 16 }} />
                      GitHub
                    </Button>
                  </div>

                  {/* Toggle */}
                  <div style={{ textAlign: 'center', paddingTop: 4 }}>
                    <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      {"Don't have an account? "}
                    </span>
                    <Button variant="text" size="sm" onClick={() => setMode('signup')}>
                      Sign up
                    </Button>
                  </div>
                </div>
              )}

              {/* ── Sign Up form ─────────────────────────────────────────── */}
              {mode === 'signup' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <Input
                    label="Full name"
                    variant="floating"
                  />
                  <Input
                    label="Email"
                    type="email"
                    variant="floating"
                    placeholder="you@example.com"
                  />
                  <Input
                    label="Password"
                    type="password"
                    variant="floating"
                    helperText="Min 8 characters"
                  />

                  <Checkbox
                    label="I agree to the Terms of Service and Privacy Policy"
                    checked={agreed}
                    onChange={(e) => setAgreed((e.target as HTMLInputElement).checked)}
                  />

                  {/* Create account button */}
                  <div style={{ width: '100%' }}>
                    <Button variant="filled" size="lg" style={{ width: '100%' }}>
                      Create account
                    </Button>
                  </div>

                  {/* Toggle */}
                  <div style={{ textAlign: 'center', paddingTop: 4 }}>
                    <span style={{ fontSize: 14, color: 'var(--color-text-secondary)' }}>
                      Already have an account?{' '}
                    </span>
                    <Button variant="text" size="sm" onClick={() => setMode('signin')}>
                      Sign in
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
