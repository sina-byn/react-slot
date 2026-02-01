type BrowserWindowProps = {
  children: React.ReactNode;
};

export function BrowserWindow({ children }: BrowserWindowProps) {
  return (
    <article className='rounded-t-xl overflow-hidden'>
      <header className='flex items-center justify-between gap-x-4 bg-muted p-2'>
        <div className='flex items-center gap-x-2 shrink-0 *:shrink-0'>
          <span className='size-3 bg-red-500 rounded-full' />
          <span className='size-3 bg-yellow-500 rounded-full' />
          <span className='size-3 bg-green-500 rounded-full' />
        </div>

        <div className='text-xs rounded-lg bg-background text-muted-foreground truncate py-1 px-4'>
          http://localhost:3000
        </div>

        <div className='w-13 hidden sm:block' />
      </header>

      <div className='grid grid-cols-1 min-h-32 border-4 border-t-0 border-muted rounded-b-xl'>{children}</div>
    </article>
  );
}
