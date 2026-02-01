'use client';

import { CheckIcon } from 'lucide-react';

import { ActionButton } from './action-button';

import { Slot } from '@/components/slot';

export function Usage() {
  return (
    <div className='flex flex-col items-center justify-center gap-4 p-4'>
      <ActionButton>
        <Slot name='before'>
          <CheckIcon />
        </Slot>
        Submit
      </ActionButton>
      <ActionButton>
        <Slot name='after'>
          <CheckIcon />
        </Slot>
        Submit
      </ActionButton>
      <ActionButton>
        <Slot name='before'>
          <CheckIcon />
        </Slot>
        Submit
        <Slot name='after'>
          <CheckIcon />
        </Slot>
      </ActionButton>
    </div>
  );
}
