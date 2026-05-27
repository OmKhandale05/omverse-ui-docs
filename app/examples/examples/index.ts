import type { ComponentType } from 'react'
import { Dashboard } from './dashboard'
import { dashboardCode } from './dashboard.code'
import { Mail } from './mail'
import { mailCode } from './mail.code'
import { Cards } from './cards'
import { cardsCode } from './cards.code'
import { Forms } from './forms'
import { formsCode } from './forms.code'
import { Settings } from './settings'
import { settingsCode } from './settings.code'
import { Music } from './music'
import { musicCode } from './music.code'
import { SignIn } from './signin'
import { signinCode } from './signin.code'
import { Pricing } from './pricing'
import { pricingCode } from './pricing.code'

/* ─── Types ─────────────────────────────────────────────────────────────── */

export interface ExampleDef {
  id: string
  label: string
  filename: string
  component: ComponentType | null
  code: string | null
}

/* ─── Registry ──────────────────────────────────────────────────────────── */

export const EXAMPLES: ExampleDef[] = [
  {
    id:        'dashboard',
    label:     'Dashboard',
    filename:  'dashboard.tsx',
    component: Dashboard,
    code:      dashboardCode,
  },
  {
    id:        'mail',
    label:     'Mail',
    filename:  'mail.tsx',
    component: Mail,
    code:      mailCode,
  },
  {
    id:        'cards',
    label:     'Cards',
    filename:  'cards.tsx',
    component: Cards,
    code:      cardsCode,
  },
  {
    id:        'forms',
    label:     'Forms',
    filename:  'forms.tsx',
    component: Forms,
    code:      formsCode,
  },
  {
    id:        'music',
    label:     'Music',
    filename:  'music.tsx',
    component: Music,
    code:      musicCode,
  },
  {
    id:        'settings',
    label:     'Settings',
    filename:  'settings.tsx',
    component: Settings,
    code:      settingsCode,
  },
  {
    id:        'signin',
    label:     'Sign-in',
    filename:  'signin.tsx',
    component: SignIn,
    code:      signinCode,
  },
  {
    id:        'pricing',
    label:     'Pricing',
    filename:  'pricing.tsx',
    component: Pricing,
    code:      pricingCode,
  },
]
