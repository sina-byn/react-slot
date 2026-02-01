'use client';

import { useState, useEffect, type JSX } from 'react';

import { cn } from '@/lib/utils';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import { PACKAGE_MANAGERS, type PackageManager } from './command-block';
import { SiBun, SiNpm, SiPnpm, SiYarn } from '@icons-pack/react-simple-icons';

const STORAGE_KEY = 'package-manager' as const;

const ICONS: Record<PackageManager, JSX.Element> = {
  npm: <SiNpm />,
  pnpm: <SiPnpm />,
  yarn: <SiYarn />,
  bun: <SiBun />,
} as const;

const packageManagerInit = () => {
  if (typeof window === 'undefined') return 'pnpm';

  const maybePackageManager = sessionStorage.getItem(STORAGE_KEY) as PackageManager;
  return maybePackageManager || 'pnpm';
};

type CommandTabsProps = {
  className?: string;
  children: React.ReactNode;
};

export function CommandTabs({ className, children }: CommandTabsProps) {
  const [pkgMgr, setPkgMgr] = useState<PackageManager>(packageManagerInit);

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, pkgMgr);
  }, [pkgMgr]);

  return (
    <article className={cn('scroller bg-muted p-1 rounded-xl overflow-hidden', className)}>
      <Tabs value={pkgMgr} onValueChange={setPkgMgr}>
        <div className='grid grid-cols-1 overflow-x-auto overflow-y-hidden -mb-1'>
          <TabsList className='flex items-center gap-x-1 pt-0.5'>
            {PACKAGE_MANAGERS.map(mgr => {
              const isCurrent = mgr === pkgMgr;

              return (
                <TabsTrigger
                  key={mgr}
                  value={mgr}
                  className={cn(
                    'flex items-center gap-x-2 [&_svg]:size-4 border-b border-transparent',
                    isCurrent ? '' : 'text-muted-foreground',
                  )}
                >
                  {ICONS[mgr]}
                  {mgr}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>
        {children}
      </Tabs>
    </article>
  );
}
