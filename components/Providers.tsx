'use client';

import dynamic from 'next/dynamic';
import { CommandPalette } from './CommandPalette';

const Toaster = dynamic(
  () => import('omverse-ui').then(mod => ({ default: mod.Toaster })),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster position="bottom-right" />
      <CommandPalette />
    </>
  );
}
