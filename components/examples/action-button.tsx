import { Button } from '@/components/ui/button';

import { Slottable, Template, SlotPlaceholder } from '@/components/slot';

type ActionButtonProps = React.ComponentProps<typeof Button>;

export function ActionButton({ type = 'button', children, ...props }: ActionButtonProps) {
  return (
    <Button type={type} {...props}>
      <Slottable>
        {children}
        <Template>
          <SlotPlaceholder name='before' />
          <SlotPlaceholder />
          <SlotPlaceholder name='after' />
        </Template>
      </Slottable>
    </Button>
  );
}
