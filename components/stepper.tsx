import { cn } from '@/lib/utils';

type StepperProps = { children: React.ReactNode };

export function Stepper({ children }: StepperProps) {
  return <section className='grid grid-cols-1'>{children}</section>;
}

type StepperStepProps = StepperIndicatorProps & {
  children: React.ReactNode;
  className?: string;
};

export function StepperStep({ id, isLast, children, className }: StepperStepProps) {
  return (
    <section className={cn('relative isolate grid grid-cols-[auto_1fr] gap-x-4 w-full', className)}>
      <StepperIndicator id={id} isLast={isLast} />
      <div className={cn('w-full overflow-hidden', !isLast && 'mb-16')}>{children}</div>
    </section>
  );
}

type StepperIndicatorProps = {
  id: string | number;
  isLast?: boolean;
};

function StepperIndicator({ id, isLast }: StepperIndicatorProps) {
  return (
    <div className='grid place-items-center size-8 bg-muted rounded-full -mt-1'>
      <span className='text-sm text-center'>{id}</span>
      {!isLast && <div className='absolute w-px h-full top-0 -z-10 bg-muted-foreground/75'></div>}
    </div>
  );
}
