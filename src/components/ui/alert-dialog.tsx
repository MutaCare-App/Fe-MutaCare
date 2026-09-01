import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { cn } from "@/lib/utils";
import * as AlertDialogPrimitive from "@rn-primitives/alert-dialog";
import * as React from "react";
import { Platform, View, type ViewProps } from "react-native";
import { FadeIn, FadeOut, ReduceMotion } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

const AlertDialog = AlertDialogPrimitive.Root;

const AlertDialogTrigger = AlertDialogPrimitive.Trigger;

const AlertDialogPortal = AlertDialogPrimitive.Portal;

const FullWindowOverlay =
  Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function AlertDialogOverlay({
  className,
  children,
  ...props
}: Omit<
  React.ComponentProps<typeof AlertDialogPrimitive.Overlay>,
  "asChild"
> & {
  children?: React.ReactNode;
}) {
  return (
    <FullWindowOverlay>
      <AlertDialogPrimitive.Overlay
        className={cn(
          "absolute inset-0 z-50 flex-1 items-center justify-center bg-black/50 p-4",
          className
        )}
        {...props}
        asChild={Platform.OS !== "web"}
      >
        <NativeOnlyAnimatedView
          className="flex-1 w-full items-center justify-center"
          entering={FadeIn.duration(200).delay(50).reduceMotion(ReduceMotion.System)}
          exiting={FadeOut.duration(150).reduceMotion(ReduceMotion.System)}
          as="Pressable"
        >
          <>{children}</>
        </NativeOnlyAnimatedView>
      </AlertDialogPrimitive.Overlay>
    </FullWindowOverlay>
  );
}

function AlertDialogContent({
  className,
  portalHost,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content> & {
  portalHost?: string;
}) {
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogPrimitive.Content
          className={cn(
            "bg-white border-neutral-200 z-50 flex w-full max-w-sm flex-col gap-4 rounded-3xl border p-6 shadow-xl",
            className
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("flex flex-col items-center gap-1.5", className)}
      {...props}
    />
  );
}

function AlertDialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        "flex-row items-center justify-end gap-3 pt-2 w-full",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      className={cn(
        "font-poppins-bold text-lg text-neutral-800 text-center",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      className={cn(
        "font-poppins text-sm text-neutral-600 text-center",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action
      className={cn(
        "h-12 flex-1 flex-row items-center justify-center rounded-xl bg-red-500 active:bg-red-600 px-4",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel
      className={cn(
        "h-12 flex-1 flex-row items-center justify-center rounded-xl border border-neutral-300 bg-white active:bg-neutral-100 px-4",
        className
      )}
      {...props}
    />
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
