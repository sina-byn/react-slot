import clsx from 'clsx';

import { codeToHtml } from 'shiki';

import { TabsContent } from '@/components/ui/tabs';
import { CopyButton } from '@/components/copy-button';

export const PACKAGE_MANAGERS: PackageManager[] = ['pnpm', 'npm', 'yarn', 'bun'] as const;

export type NpxCommand = `npx ${string}`;

export type PackageManager = 'npm' | 'pnpm' | 'yarn' | 'bun' | (string & {});

type CommandBlockProps = {
  npxCmd: NpxCommand;
};

export async function CommandBlock({ npxCmd }: CommandBlockProps) {
  return PACKAGE_MANAGERS.map(mgr => {
    const cmd = npxTo(mgr, npxCmd);

    return (
      <TabsContent key={mgr} value={mgr}>
        <div className='grid grid-cols-[1fr_auto] items-center gap-x-1'>
          <Code cmd={cmd} />
          <CopyButton content={cmd} className='bg-secondary! cursor-pointer' />
        </div>
      </TabsContent>
    );
  });
}

type CodeProps = { cmd: string };

async function Code({ cmd }: CodeProps) {
  const highlighted = await codeToHtml(cmd, {
    lang: 'shell',
    theme: 'github-dark',
    transformers: [
      {
        pre(node) {
          node.properties.class = clsx(node.properties.class, 'bg-background! overflow-x-auto p-2');
        },
      },
    ],
  });

  return (
    <div
      dangerouslySetInnerHTML={{ __html: highlighted }}
      className='px-2 bg-background rounded-lg overflow-x-auto'
    />
  );
}

function npxTo(mgr: PackageManager, cmd: string) {
  switch (mgr) {
    case 'npm':
      return cmd;

    case 'yarn':
      return cmd.replace('npx', 'yarn');

    case 'pnpm':
      return cmd.replace('npx', 'pnpm dlx');

    case 'bun':
      return cmd.replace('npx', 'bunx --bun');
  }

  return cmd;
}
