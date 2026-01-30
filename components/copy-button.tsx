'use client';

import { useState } from 'react';

import { CopyIcon, CheckIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

type CopyButtonProps = { content: string; className?: string };

export function CopyButton({ content, className }: CopyButtonProps) {
  const [checked, setChecked] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      await window.navigator.clipboard.writeText(content);
      setChecked(true);

      const timeout = setTimeout(() => {
        setChecked(false);
        clearTimeout(timeout);
      }, 750);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Button
      size='icon'
      variant='secondary'
      disabled={checked}
      onClick={handleCopy}
      className={className}
    >
      {checked ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
