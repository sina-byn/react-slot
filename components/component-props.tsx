import { TypeTable, type PropObject } from '@/components/type-table';

type ComponentPropsProps = {
  name: string;
  props: Record<string, PropObject>;
};

export function ComponentProps({ name, props }: ComponentPropsProps) {
  return (
    <section className='space-y-2'>
      <p className='prose prose-invert'>
        <code>{name}</code>
      </p>
      <TypeTable props={props} />
    </section>
  );
}
