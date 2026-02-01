import { SiGithub } from '@icons-pack/react-simple-icons';

import { Button } from '@/components/ui/button';
import { DarkVeil } from '@/components/dark-veil';
import { CodeBlock } from '@/components/code-block';
import { ScrollDown } from '@/components/scroll-down';

import { GithubButton } from '@/components/github-button';
import { Stepper, StepperStep } from '@/components/stepper';

import { Usage } from '@/components/examples/usage';
import { FileSource } from '@/components/file-source';
import { BrowserWindow } from '@/components/browser-window';
import { ComponentProps } from '@/components/component-props';

import * as PackageInstall from '@/components/package-install';

export default function HomePage() {
  return (
    <div>
      <main>
        <div className='relative w-full'>
          <div className='stack w-full min-h-dvh relative'>
            {process.env.NODE_ENV !== 'development' && <DarkVeil />}

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
                  <Button size='lg' className='bg-brand hover:bg-darken text-white' asChild>
                    <a href='#installation'>Get Started</a>
                  </Button>

                  <GithubButton />
                </div>
              </div>

              <ScrollDown />
            </section>
          </div>
        </div>

        <section className='my-16 md:my-32'>
          <h2
            id='installation'
            className='text-3xl text-center font-semibold mx-auto mb-16 scroll-mt-30'
          >
            Installation
          </h2>

          <section className='space-y-20 md:space-y-28'>
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

                  <CodeBlock source={{ file: './components/slot.tsx' }} preClassName='max-h-200' />
                </StepperStep>
              </Stepper>
            </section>

            <section className='container max-w-4xl'>
              <h3
                id='usage'
                className='text-xl text-center font-semibold mx-auto scroll-mt-30 mb-4'
              >
                Usage
              </h3>

              <section className='space-y-10'>
                <FileSource file='./components/examples/action-button.tsx' />
                <FileSource
                  filename='App.tsx'
                  file='./components/examples/usage.tsx'
                  transform={code =>
                    code
                      .replace('Usage', 'App')
                      .replace('./action-button', '@/components/action-button')
                  }
                />
                <BrowserWindow>
                  <Usage />
                </BrowserWindow>
              </section>
            </section>

            <section className='container max-w-4xl'>
              <h3
                id='props'
                className='text-xl text-center font-semibold mx-auto scroll-mt-30 mb-4'
              >
                Props
              </h3>

              <section className='space-y-10'>
                <ComponentProps
                  name='Slottable'
                  props={{
                    strictDefault: {
                      type: 'boolean',
                      required: true,
                      default: 'false',
                      description: (
                        <>
                          If set to <code className='pl-1.5 mr-0.5'>true</code>
                          treats the <code className='pl-2.5'>DEFAULT</code> slot <u>strictly</u>.
                          <a href='#default-slot' className='text-blue-400 ml-1'>
                            Read more
                          </a>
                        </>
                      ),
                    },
                    scope: {
                      type: 'string',
                      required: false,
                      default: 'Slottable',
                      description: 'Used to show error messages - intended for library authors',
                    },
                    children: {
                      type: 'React.ReactNode',
                      required: true,
                      description: 'Children of the Slottable',
                    },
                  }}
                />
                <ComponentProps
                  name='Template'
                  props={{
                    children: {
                      type: 'React.ReactNode',
                      required: true,
                      description: 'Children of the Template',
                    },
                  }}
                />
                <ComponentProps
                  name='Slot'
                  props={{
                    name: {
                      type: 'string',
                      required: false,
                      default: 'DEFAULT',
                      description: 'name of the slot',
                    },
                    children: {
                      type: 'React.ReactNode',
                      required: true,
                      description: 'Children of the Template',
                    },
                  }}
                />
                <ComponentProps
                  name='SlotPlaceholder'
                  props={{
                    name: {
                      type: 'string',
                      required: false,
                      default: 'DEFAULT',
                      description: 'name of the slot',
                    },
                    children: {
                      type: 'React.ReactNode',
                      required: false,
                      default: 'null',
                      description: 'Default outlet',
                    },
                  }}
                />
              </section>
            </section>

            <section className='container max-w-4xl'>
              <h3
                id='rules'
                className='text-xl text-center font-semibold mx-auto scroll-mt-30 mb-4'
              >
                Rules & Behaviour
              </h3>

              <section className='space-y-10'>
                <section id='ssr-compatibility' className='space-y-2'>
                  <h4 className='title'>SSR Compatibility</h4>
                  <div className='prose prose-invert'>
                    <p>
                      When using this library with Next.js, your components must be client
                      components. Make sure to mark them with <code>{"'use client'"}</code> at the
                      top of the file{' '}
                      <mark className='bg-red-500/30 text-foreground'>
                        to avoid confusing or misleading errors.
                      </mark>
                    </p>
                  </div>
                </section>

                <section id='default-slot' className='space-y-2'>
                  <h4 className='title'>Default Slot</h4>
                  <div className='prose prose-invert'>
                    <p>
                      By default, any content that is not wrapped in a <code>{'<Slot />'}</code> is
                      treated as part of the <code>{"<Slot name='DEFAULT' />"}</code> slot and is
                      appended to the end of the rendered children.
                    </p>

                    <p>
                      When <code>strictDefault</code> is set to <code>true</code>, the default slot
                      is ignored unless it is explicitly defined using either{' '}
                      <code>{'<SlotPlaceholder />'}</code> or{' '}
                      <code>{"<SlotPlaceholder name='DEFAULT' />"}</code>.
                    </p>

                    <p>
                      When <code>strictDefault</code> is set to <code>false</code>, the default slot
                      behaves more flexibly:
                    </p>

                    <ul>
                      <li>
                        If a default slot placeholder is explicitly defined, the default slot is
                        rendered at that location.
                      </li>
                      <li>
                        If no default slot placeholder is defined, the default slot content is
                        appended to the end of the children.
                      </li>
                    </ul>
                  </div>
                </section>

                <section id='template' className='space-y-2'>
                  <h4 className='title'>Template</h4>
                  <div className='prose prose-invert'>
                    <p>
                      A single <code>{'<Template />'}</code> component is required{' '}
                      <mark className='bg-blue-500/30 text-foreground'>as a direct child</mark> of{' '}
                      <code>{'<Slottable />'}</code>
                    </p>

                    <p>
                      This component defines the final rendered structure and determines where each
                      slot is placed using <code>{'<SlotPlaceholder />'}</code> components.
                    </p>

                    <section>
                      <p>
                        If you already have a <code>{'<Template />'}</code> as a direct child of{' '}
                        <code>{'<Slottable />'}</code>, but still encounter the error{' '}
                        <code>A single template is required as a direct child of Slottable</code>,
                        make sure your component is marked as a client component by adding{' '}
                        <code>
                          <a href='#ssr-compatibility'>{`'use client'`}</a>
                        </code>{' '}
                        at the top of the file.
                      </p>
                    </section>
                  </div>
                </section>
              </section>
            </section>

            <footer className='container max-w-4xl text-sm'>
              <a
                target='_blank'
                className='inline-flex items-center gap-x-2'
                href='https://github.com/sina-byn/react-slot'
              >
                <SiGithub className='size-5' />
                Github
              </a>
              <p className='text-center mx-auto mt-2'>
                Developed by{' '}
                <a target='_blank' href='https://sina-byn.vercel.app/' className='text-blue-400'>
                  Sina Bayandorian
                </a>
              </p>
            </footer>
          </section>
        </section>
      </main>
    </div>
  );
}
