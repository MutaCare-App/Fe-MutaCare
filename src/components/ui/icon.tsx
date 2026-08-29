import { TextClassContext } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { IconProps as PhosphorIconProps } from 'phosphor-react-native';
import { cssInterop } from 'nativewind';
import * as React from 'react';

type IconProps = PhosphorIconProps & {
  as: React.ComponentType<PhosphorIconProps>;
  className?: string;
  size?: number;
};

function IconImpl({ as: IconComponent, ...props }: IconProps) {
  return <IconComponent {...props} />;
}

cssInterop(IconImpl, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
});

function Icon({ as: IconComponent, className, size = 14, ...props }: IconProps) {
  const textClass = React.useContext(TextClassContext);
  return (
    <IconImpl
      as={IconComponent}
      className={cn('text-foreground', textClass, className)}
      size={size}
      {...props}
    />
  );
}

export { Icon };

