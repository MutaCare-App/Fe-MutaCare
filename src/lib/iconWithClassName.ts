import { cssInterop } from "nativewind";
import type { IconProps } from "phosphor-react-native";
import type { ComponentType } from "react";

export function iconWithClassName(icon: ComponentType<IconProps>) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
      },
    },
  });
}

declare module "phosphor-react-native" {
  interface IconProps {
    className?: string;
  }
}

