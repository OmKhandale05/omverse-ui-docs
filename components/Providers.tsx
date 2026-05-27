'use client';

import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () => import('omverse-ui').then(mod => ({ default: mod.Toaster })),
  { ssr: false }
);

const CommandPalette = dynamic(
  () => import('./CommandPalette').then(mod => ({ default: mod.CommandPalette })),
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
