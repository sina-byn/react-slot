import { cn } from '@/lib/utils';

import { Card, CardContent } from '@/components/ui/card';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

export type PropObject = {
  type: string;
  default?: string;
  required?: boolean;
  description?: React.ReactNode;
};

type TypeTableProps = {
  props: Record<string, PropObject>;
};

export function TypeTable({ props }: TypeTableProps) {
  return (
    <Card className='py-0'>
      <CardContent className='grid grid-cols-[auto_1fr_auto] gap-x-4 px-1 py-1'>
        <div className='grid grid-cols-subgrid col-span-3 text-sm text-muted-foreground px-2 py-1'>
          <span>Prop</span>
          <span>Type</span>
        </div>

        <Accordion type='multiple' className='grid grid-cols-subgrid col-span-3'>
          {Object.entries(props).map(([prop, meta], index) => {
            const { type, required, description } = meta;

            return (
              <AccordionItem
                key={index}
                value={index.toString()}
                className={cn(
                  'col-span-3 grid grid-cols-subgrid last:mb-0!',
                  'rounded-lg overflow-hidden border! border-transparent',
                  'data-[state=open]:bg-background! data-[state=open]:border-border data-[state=open]:mb-2',
                  '*:first:grid *:first:grid-cols-subgrid *:col-span-3',
                )}
              >
                <AccordionTrigger className='col-span-3 grid grid-cols-subgrid font-[consolas] rounded-none p-2 hover:bg-muted hover:no-underline data-[state=open]:border-b'>
                  <span className='text-blue-400'>
                    {prop}
                    {!required && '?'}
                  </span>

                  <span className='truncate'>{type}</span>
                </AccordionTrigger>

                <AccordionContent className='text-sm p-2'>
                  {Boolean(description) && (
                    <p className='prose prose-invert text-sm text-muted-foreground not-last:mb-4'>{description}</p>
                  )}

                  {meta.default != null && (
                    <div className='grid grid-cols-[auto_1fr] gap-x-6'>
                      <span className='text-muted-foreground'>Default</span>
                      <p className='prose prose-invert -mt-1'>
                        <code className='text-blue-400'>{meta.default}</code>
                      </p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </CardContent>
    </Card>
  );
}
