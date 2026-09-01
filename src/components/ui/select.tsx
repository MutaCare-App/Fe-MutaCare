import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { TextClassContext } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@rn-primitives/select";
import { CaretDownIcon } from "phosphor-react-native/src/icons/CaretDown";
import { CaretUpIcon } from "phosphor-react-native/src/icons/CaretUp";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { FadeIn, FadeOut, ReduceMotion } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

iconWithClassName(CaretDownIcon);
iconWithClassName(CaretUpIcon);
iconWithClassName(CheckIcon);

type Option = SelectPrimitive.Option;

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Value>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Value> & {
    className?: string;
  }
>(({ className, ...props }, ref) => {
  const { value } = SelectPrimitive.useRootContext();
  return (
    <SelectPrimitive.Value
      ref={ref}
      className={cn(
        "font-poppins text-neutral-700 text-base line-clamp-1 flex flex-row items-center gap-2",
        !value && "text-neutral-400",
        className
      )}
      {...props}
    />
  );
});
SelectValue.displayName = SelectPrimitive.Value.displayName;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> & {
    children?: React.ReactNode;
  }
>(({ className, children, ...props }, ref) => {
  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(
        "border-secondary-300 bg-white flex h-14 w-full flex-row items-center justify-between gap-2 rounded-lg border px-4 shadow-sm shadow-black/5 active:bg-neutral-50",
        props.disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <>{children}</>
      <CaretDownIcon size={22} className="text-neutral-700" />
    </SelectPrimitive.Trigger>
  );
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function SelectContent({
  className,
  children,
  position = "popper",
  portalHost,
  style,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content> & {
  className?: string;
  portalHost?: string;
}) {
  const { triggerPosition } = SelectPrimitive.useRootContext();

  const customStyle = React.useMemo(() => {
    const flattened = StyleSheet.flatten(style) || {};
    if (Platform.OS !== "web" && triggerPosition?.width) {
      return { ...flattened, width: triggerPosition.width };
    }
    return flattened;
  }, [triggerPosition?.width, style]);

  return (
    <SelectPrimitive.Portal hostName={portalHost}>
      <FullWindowOverlay>
        <SelectPrimitive.Overlay
          style={Platform.select({ native: StyleSheet.absoluteFill })}
          asChild={Platform.OS !== "web"}
        >
          <NativeOnlyAnimatedView
            className="z-50"
            entering={FadeIn.reduceMotion(ReduceMotion.System)}
            exiting={FadeOut.reduceMotion(ReduceMotion.System)}
            as="Pressable"
          >
            <TextClassContext.Provider value="text-neutral-800">
              <SelectPrimitive.Content
                className={cn(
                  "bg-white border-neutral-200 relative z-50 rounded-2xl border shadow-lg p-1.5",
                  className
                )}
                style={customStyle}
                position={position}
                {...props}
              >
                <SelectScrollUpButton />
                <SelectPrimitive.Viewport className="p-1 w-full">
                  {children}
                </SelectPrimitive.Viewport>
                <SelectScrollDownButton />
              </SelectPrimitive.Content>
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </SelectPrimitive.Overlay>
      </FullWindowOverlay>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      className={cn(
        "font-poppins-semibold text-neutral-500 px-3 py-2 text-xs",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        "active:bg-primary-100/50 relative flex h-12 w-full flex-row items-center justify-between rounded-xl px-3 py-2",
        props.disabled && "opacity-50",
        className
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="font-poppins text-neutral-700 text-base flex-1" />
      <View className="flex size-5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon size={20} weight="bold" className="text-primary-300" />
        </SelectPrimitive.ItemIndicator>
      </View>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      className={cn("bg-neutral-200 -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  if (Platform.OS !== "web") {
    return null;
  }
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <CaretUpIcon size={16} className="text-neutral-600" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  if (Platform.OS !== "web") {
    return null;
  }
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <CaretDownIcon size={16} className="text-neutral-600" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  type Option,
};
