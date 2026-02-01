import { CodeBlock } from '@/components/code-block';

type FileSourceProps = {
  file: string;
  filename?: string;
  transform?: (source: string) => string;
};

export function FileSource({ file, filename, transform }: FileSourceProps) {
  return (
    <div className='space-y-2'>
      <p className='prose prose-invert'>
        <code>{filename || file.split('/').at(-1)}</code>
      </p>
      <CodeBlock source={{ file }} transform={transform} />
    </div>
  );
}
