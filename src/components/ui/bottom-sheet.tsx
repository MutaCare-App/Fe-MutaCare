import GorhomBottomSheet, {
  BottomSheetBackdrop as GorhomBottomSheetBackdrop,
  BottomSheetFooter as GorhomBottomSheetFooter,
  BottomSheetModal as GorhomBottomSheetModal,
  BottomSheetScrollView as GorhomBottomSheetScrollView,
  BottomSheetTextInput as GorhomBottomSheetTextInput,
  BottomSheetView as GorhomBottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useCallback } from "react";

export type BottomSheet = GorhomBottomSheet;
export type BottomSheetModal = GorhomBottomSheetModal;
export type BottomSheetBackdropProps = React.ComponentProps<
  typeof GorhomBottomSheetBackdrop
>;

// Backdrop Kustom dengan animasi fade default
function BottomSheetBackdrop({
  disappearsOnIndex = -1,
  appearsOnIndex = 0,
  opacity = 0.5,
  ...props
}: BottomSheetBackdropProps) {
  return (
    <GorhomBottomSheetBackdrop
      disappearsOnIndex={disappearsOnIndex}
      appearsOnIndex={appearsOnIndex}
      opacity={opacity}
      {...props}
    />
  );
}

// Wrapper BottomSheet Standard
const BottomSheet = forwardRef<
  GorhomBottomSheet,
  React.ComponentProps<typeof GorhomBottomSheet> & {
    backgroundClassName?: string;
    handleIndicatorClassName?: string;
  }
>(
  (
    {
      backgroundClassName,
      handleIndicatorClassName,
      backgroundStyle,
      handleIndicatorStyle,
      ...props
    },
    ref
  ) => {
    return (
      <GorhomBottomSheet
        ref={ref}
        backgroundStyle={[
          {
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
          backgroundStyle,
        ]}
        handleIndicatorStyle={[
          {
            backgroundColor: "#D1D5DB",
            width: 40,
            height: 4,
            borderRadius: 999,
          },
          handleIndicatorStyle,
        ]}
        {...props}
      />
    );
  }
);
BottomSheet.displayName = "BottomSheet";

// Wrapper BottomSheet Modal
const BottomSheetModal = forwardRef<
  GorhomBottomSheetModal,
  React.ComponentProps<typeof GorhomBottomSheetModal> & {
    backgroundClassName?: string;
    handleIndicatorClassName?: string;
  }
>(
  (
    {
      backgroundClassName,
      handleIndicatorClassName,
      backgroundStyle,
      handleIndicatorStyle,
      backdropComponent,
      ...props
    },
    ref
  ) => {
    const defaultBackdrop = useCallback(
      (backdropProps: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop {...backdropProps} />
      ),
      []
    );

    return (
      <GorhomBottomSheetModal
        ref={ref}
        backdropComponent={backdropComponent ?? defaultBackdrop}
        backgroundStyle={[
          {
            backgroundColor: "#ffffff",
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
          },
          backgroundStyle,
        ]}
        handleIndicatorStyle={[
          {
            backgroundColor: "#D1D5DB",
            width: 40,
            height: 4,
            borderRadius: 999,
          },
          handleIndicatorStyle,
        ]}
        {...props}
      />
    );
  }
);
BottomSheetModal.displayName = "BottomSheetModal";

// Re-export View, ScrollView, TextInput, Footer
const BottomSheetView = GorhomBottomSheetView;
const BottomSheetScrollView = GorhomBottomSheetScrollView;
const BottomSheetTextInput = GorhomBottomSheetTextInput;
const BottomSheetFooter = GorhomBottomSheetFooter;

export {
  BottomSheet,
  BottomSheetBackdrop,
  BottomSheetFooter,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
};
