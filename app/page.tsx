import { Button } from '@/components/ui/button';
import { DarkVeil } from '@/components/dark-veil';
import { CodeBlock } from '@/components/code-block';
import { ScrollDown } from '@/components/scroll-down';

import * as PackageInstall from '@/components/package-install';
import { Stepper, StepperStep } from '@/components/stepper';
import GitHubButton from 'react-github-btn';
import { GithubButton } from '@/components/github-button';

export default function HomePage() {
  return (
    <div>
      <main>
        <div className='relative w-full'>
          <div className='stack w-full min-h-dvh relative'>
            <DarkVeil />

            <section className='container relative flex items-center justify-center'>
              <div>
                <hgroup className='text-center'>
                  <h1 className='text-6xl text-brand font-bold mb-4'>React Slot</h1>
                  <p className='text-xl font-medium text-pretty'>Bring Vue-style slots to React</p>
                  <p className='text-xl font-medium text-pretty'>
                    Fine-grained control over component composition
                  </p>
                </hgroup>

                <div className='flex flex-col items-center justify-center gap-4 mt-12'>
                  <Button size='lg' className='bg-brand hover:bg-darken text-white'>
                    Get Started
                  </Button>

                  <GithubButton />
                </div>
              </div>

              <ScrollDown />
            </section>
          </div>
        </div>

        <section className='my-32'>
          <h2 className='text-3xl text-center font-semibold mx-auto mb-16'>Installation</h2>

          <section className='space-y-20'>
            <section className='container max-w-lg'>
              <h3 className='text-xl text-center font-semibold mx-auto mb-4'>CLI</h3>

              <div className='relative rounded-xl overflow-hidden p-0.5'>
                <PackageInstall.CommandTabs>
                  <PackageInstall.CommandBlock npxCmd='npx shadcn@latest add accordion' />
                </PackageInstall.CommandTabs>
              </div>
            </section>

            <section className='container max-w-4xl'>
              <h3 className='text-xl text-center font-semibold mx-auto mb-4'>Manual</h3>

              <Stepper>
                <StepperStep id={1} className='*:last:mb-0'>
                  <p className='prose prose-invert mb-4'>
                    Copy the content of <code>Slot.tsx</code>
                  </p>

                  <CodeBlock
                    source={{ file: './components/header.tsx' }}
                    preClassName='max-h-200'
                  />
                </StepperStep>
              </Stepper>
            </section>

            <section className='container max-w-4xl'>
              <h3 className='text-xl text-center font-semibold mx-auto mb-4'>Usage</h3>

              <section>
                <p className='prose prose-invert'>
                  <code>Button.tsx</code>
                </p>
              </section>
            </section>
          </section>
        </section>
      </main>
    </div>
  );
}
