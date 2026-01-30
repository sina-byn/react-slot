'use client';

import Link from 'next/link';

export type NavItem = { label: string; href: string };

const ITEMS: NavItem[] = [
  { label: 'Home', href: '#' },
  { label: 'About', href: '#' },
  { label: 'Contact', href: '#' },
];

export function Header() {
  return (
    <header className='flex items-center justify-center fixed top-6 inset-x-0 z-20 isolate mt-6'>
      <div className='w-full max-w-2xl flex items-center justify-between gap-x-4 bg-linear-to-b from-white/2.5 via-white/1 to-white/2.5 backdrop-blur-lg ring ring-stone-400/50 rounded-full p-4 pt-4.5'>
        <div className='text-gray-300 px-4'>
          <Link href='#' className='font-bold tracking-wide'>
            React Slot
          </Link>
        </div>

        <nav className='text-gray-300'>
          <ul className='flex items-center gap-x-8'>
            {ITEMS.map(item => (
              <li key={item.label}>
                <Link href={item.href} className='px-4'>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
