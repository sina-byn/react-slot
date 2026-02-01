'use client';

import * as React from 'react';

const DEFAULT_SLOT = 'DEFAULT';

type Slot = React.ReactNode;

type Slots = Record<string, Slot>;

type SlotName = typeof DEFAULT_SLOT | (string & {});

type SlotContext = { scope: string };

const SlotContext = React.createContext<SlotContext | null>(null);

export function useSlots(caller: string) {
  const context = React.use(SlotContext);

  if (!context) {
    throw new Error(`${caller} must be used inside a Slottable`);
  }

  return context;
}

type Slottable = {
  scope?: string;
  strictDefault?: boolean;
  children: React.ReactNode;
};

export function Slottable({ children, scope = 'Slottable', strictDefault = true }: Slottable) {
  const { slots, template, defaultSlot } = React.useMemo(() => {
    const slots: Slots = {};
    const defaultSlot: React.ReactNode[] = [];

    let template: TemplateElement | undefined;

    React.Children.forEach(children, child => {
      if (isSlot(child)) {
        const { name: slot = DEFAULT_SLOT, children } = child.props;

        if (slot in slots) {
          throw new Error(`Duplicate slot: ${slot} was found`);
        }

        slots[slot] = children;
        return;
      }

      if (isTemplate(child)) {
        if (template) {
          throw new Error(
            'A duplicate Template was found. Only one direct Template child is allowed',
          );
        }

        template = child;
        return;
      }

      defaultSlot.push(child);
    });

    return {
      slots,
      template,
      defaultSlot,
    };
  }, [children]);

  if (template == null) {
    throw new Error(`A single template is required as a direct child of ${scope}`);
  }

  const [tree, foundDefault] = React.useMemo(
    () =>
      traverse(template, {
        placeholder(placeholder) {
          const slot = placeholder.props.name ?? DEFAULT_SLOT;
          const isDefaultSlot = slot === DEFAULT_SLOT;
          const outlet = isDefaultSlot ? defaultSlot : slots[slot];

          return outlet ?? null;
        },
      }),
    [children],
  );

  const renderDefault = !strictDefault && !foundDefault;

  const context: SlotContext = { scope };

  return (
    <SlotContext value={context}>
      {tree}
      {renderDefault && defaultSlot}
    </SlotContext>
  );
}

type Visitors = {
  placeholder: (element: SlotPlaceholderElement) => React.ReactNode;
};

function traverse(template: TemplateElement, visitors: Visitors) {
  const { placeholder } = visitors;

  let foundDefault = false;

  const traverseChildren = (children: React.ReactNode): React.ReactNode[] => {
    return (
      React.Children.map(children, child => {
        if (isSlotPlaceholder(child)) {
          const slot = child.props.name ?? DEFAULT_SLOT;
          const isDefault = slot === DEFAULT_SLOT;
          if (isDefault && !foundDefault) foundDefault = true;

          return placeholder(child);
        }

        if (isParent(child)) {
          const { children, ...props } = child.props;

          return React.cloneElement(child, props, ...traverseChildren(children));
        }

        return child;
      }) ?? []
    );
  };

  return [traverseChildren(template.props.children), foundDefault as boolean] as const;
}

const TemplateContext = React.createContext(false);

type TemplateProps = {
  children: React.ReactNode;
};

export function Template({ children }: TemplateProps) {
  const hasTemplate = React.use(TemplateContext);

  if (hasTemplate) {
    throw new Error('A duplicate Template was found. Only one direct Template child is allowed');
  }

  return <TemplateContext.Provider value={true}>{children}</TemplateContext.Provider>;
}

type SlotPlaceholderProps = {
  name?: SlotName;
  children?: React.ReactNode;
};

export function SlotPlaceholder(_props: SlotPlaceholderProps) {
  return null;
}

type SlotProps = {
  name?: SlotName;
  children: React.ReactNode;
};

export function Slot({ name = DEFAULT_SLOT, children }: SlotProps) {
  const { scope } = useSlots(`Slot: ${name}`);

  React.useEffect(() => {
    throw new Error(`Slot: ${name} must be a direct child of ${scope}`);
  }, [name, scope, children]);

  return null;
}

type SlotElement = React.ReactElement<SlotProps>;

function isSlot(child: React.ReactNode): child is SlotElement {
  const isElement = React.isValidElement<typeof Slot>(child);
  return isElement && child.type === Slot;
}

type TemplateElement = React.ReactElement<TemplateProps>;

function isTemplate(child: React.ReactNode): child is TemplateElement {
  const isElement = React.isValidElement<typeof Template>(child);
  return isElement && child.type === Template;
}

type SlotPlaceholderElement = React.ReactElement<SlotPlaceholderProps>;

function isSlotPlaceholder(child: React.ReactNode): child is SlotPlaceholderElement {
  const isElement = React.isValidElement<typeof SlotPlaceholder>(child);
  return isElement && child.type === SlotPlaceholder;
}

type ParentElement = React.ReactElement<Required<React.PropsWithChildren>>;

function isParent(child: React.ReactNode): child is ParentElement {
  const isElement = React.isValidElement<React.PropsWithChildren>(child);
  return isElement && child.props.children !== undefined;
}

// TODO: later add ref to the Provider after
// TODO: support for Fragment refs' is added
