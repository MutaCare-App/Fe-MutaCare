import { CbtShell } from "@/components/cbt/cbt-shell";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Pressable, View } from "react-native";

interface CbtChoiceScreenProps {
  onBack: () => void;
  onNext: () => void;
  onSelect: (option: string) => void;
  options: string[];
  progress: number;
  title: string;
  value: string | null;
}

export function CbtChoiceScreen({
  onBack,
  onNext,
  onSelect,
  options,
  progress,
  title,
  value,
}: CbtChoiceScreenProps) {
  return (
    <CbtShell
      actionLabel="Lanjut"
      disabled={!value}
      onAction={onNext}
      onBack={onBack}
      progress={progress}
    >
      <Text className="font-feather-bold text-2xl leading-[30px] tracking-[0.8px] text-primary-300">
        {title}
      </Text>

      <View className="mt-4 gap-3">
        {options.map((option) => {
          const isSelected = option === value;

          return (
            <Pressable
              key={option}
              accessibilityRole="radio"
              accessibilityState={{ checked: isSelected }}
              className={cn(
                "min-h-9 w-full flex-row items-center gap-3 rounded-full border border-neutral-300 px-3 py-1.5 active:bg-neutral-50",
                isSelected && "border-primary-300 bg-primary-100/30"
              )}
              onPress={() => onSelect(option)}
            >
              <View
                className={cn(
                  "size-[17px] items-center justify-center rounded-full border border-neutral-300",
                  isSelected && "border-primary-300"
                )}
              >
                {isSelected ? (
                  <View className="size-[9px] rounded-full bg-primary-300" />
                ) : null}
              </View>

              <Text className="flex-1 font-poppins text-[15px] leading-6 tracking-[0.8px] text-neutral-700">
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </CbtShell>
  );
}
