import { MouseIcon, ChevronsDownIcon } from 'lucide-react';

export function ScrollDown() {
  return (
    <div className='absolute bottom-10 flex flex-col items-center gap-2.5'>
      <MouseIcon size={36} />
      <ChevronsDownIcon className='animate-bounce' />
    </div>
  );
}
