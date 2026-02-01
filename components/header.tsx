'use client';

import Link from 'next/link';

import { XIcon, MenuIcon } from 'lucide-react';
import { SiGithub } from '@icons-pack/react-simple-icons';

import { cn } from '@/lib/utils';
import { useState } from 'react';

export type NavItem = { label: string; href: string };

const ITEMS: NavItem[] = [
  { label: 'Install', href: '#installation' },
  { label: 'Usage', href: '#usage' },
  { label: 'Props', href: '#props' },
  { label: 'Rules', href: '#rules' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setMenuOpen(prev => !prev);
  };

  return (
    <>
      <header className='flex items-center justify-center fixed top-4 inset-x-0 z-20 md:mt-8 px-4'>
        <div className='relative w-full max-w-2xl flex items-center justify-between gap-x-4 bg-linear-to-b from-white/2.5 via-white/1 to-white/2.5 backdrop-blur-lg ring ring-stone-400/50 rounded-full p-4'>
          <div className='flex items-center gap-x-2 text-gray-300 pl-2'>
            <button type='button' onClick={handleToggle} className='sm:hidden'>
              <MenuIcon />
            </button>
            <a href='#top' className='font-bold tracking-wide px-2'>
              React Slot
            </a>
          </div>

          <nav className='hidden sm:block text-gray-300 pr-2'>
            <ul className='flex items-center gap-x-4'>
              {ITEMS.map(item => (
                <li key={item.label}>
                  <Link href={item.href} className='px-2'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <a href='https://github.com/sina-byn/react-slot' target='_blank' className='sm:hidden'>
            <SiGithub className='size-5' />
          </a>
        </div>
      </header>

      <aside
        className={cn(
          'stack fixed isolate inset-0 left-0 z-50 pointer-events-none',
          menuOpen ? '*:pointer-events-auto' : '*:pointer-events-none',
        )}
      >
        <div
          onClick={handleToggle}
          className={cn(
            'size-full bg-background/75 transition-opacity duration-300 z-0',
            menuOpen ? 'opacity-100' : 'opacity-0',
          )}
        />

        <section
          className={cn(
            'w-[min(100%,300px)] bg-background text-gray-300 transition-transform duration-300 z-10 border-r p-4',
            menuOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          <header className='flex items-center justify-between border-b pb-2 mb-2'>
            <span className='font-semibold'>Menu</span>
            <button type='button' onClick={handleToggle}>
              <XIcon className='size-5' />
            </button>
          </header>
          <nav>
            <ul className='space-y-3'>
              {ITEMS.map(item => (
                <li key={item.label}>
                  <Link href={item.href} onClick={handleToggle} className='block'>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      </aside>
    </>
  );
}
