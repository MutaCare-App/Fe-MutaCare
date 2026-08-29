import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/utils";
import { Pressable } from "react-native";

interface AssessmentOptionItemProps {
  option: string;
  type: "checkbox" | "radio";
  isSelected: boolean;
  onSelect: () => void;
}

export function AssessmentOptionItem({
  option,
  type,
  isSelected,
  onSelect,
}: AssessmentOptionItemProps) {
  return (
    <Pressable
      onPress={onSelect}
      className={cn(
        "flex-row items-center border rounded-2xl px-4 py-4 active:bg-neutral-50 gap-3.5",
        isSelected
          ? "border-primary-300 bg-primary-100/20"
          : "border-neutral-200 bg-white"
      )}
    >
      {type === "checkbox" ? (
        <Checkbox
          checked={isSelected}
          onCheckedChange={onSelect}
        />
      ) : (
        <RadioGroupItem
          value={option}
          className={cn(isSelected && "border-primary-300")}
        />
      )}

      <Text
        className={cn(
          "font-poppins text-base flex-1",
          isSelected
            ? "text-primary-400 font-poppins-medium"
            : "text-neutral-700"
        )}
      >
        {option}
      </Text>
    </Pressable>
  );
}

