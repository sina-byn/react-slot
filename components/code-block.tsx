import fs from 'node:fs';

import clsx from 'clsx';

import { codeToHtml, type BundledLanguage } from 'shiki';

import { cn } from '@/lib/utils';
import { CopyButton } from '@/components/copy-button';

type CodeBlockProps = {
  lang?: BundledLanguage;
  source: string | { file: string };
  className?: string;
  preClassName?: string;
};

export async function CodeBlock({ lang = 'tsx', source, className, preClassName }: CodeBlockProps) {
  const code = typeof source === 'string' ? source : fs.readFileSync(source.file, 'utf-8');

  const highlighted = await codeToHtml(code, {
    lang,
    theme: 'github-dark',
    transformers: [
      {
        pre(node) {
          node.properties.class = clsx(
            node.properties.class,
            'max-h-128 bg-background! overflow-auto pr-4',
            preClassName,
          );
        },
      },
    ],
  });

  return (
    <article
      className={cn(
        'scroller relative items-center bg-muted p-1 rounded-xl overflow-hidden',
        className,
      )}
    >
      <div
        dangerouslySetInnerHTML={{ __html: highlighted }}
        className='bg-background rounded-lg overflow-hidden pl-4 pt-2 min-h-11'
      />
      <CopyButton content={code} className='absolute top-2 right-2 cursor-pointer' />
    </article>
  );
}
