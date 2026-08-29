import { RadioGroup } from "@/components/ui/radio-group";
import { View } from "react-native";
import { AssessmentOptionItem } from "./assessment-option-item";

interface AssessmentOptionsListProps {
  options: string[];
  type: "checkbox" | "radio";
  selectedSelections: string[];
  onSelectOption: (option: string) => void;
}

export function AssessmentOptionsList({
  options,
  type,
  selectedSelections,
  onSelectOption,
}: AssessmentOptionsListProps) {
  if (type === "radio") {
    return (
      <RadioGroup
        value={selectedSelections[0] || ""}
        onValueChange={(val) => onSelectOption(val)}
        className="pt-6 gap-3"
      >
        {options.map((option, index) => {
          const isSelected = selectedSelections.includes(option);

          return (
            <AssessmentOptionItem
              key={index}
              option={option}
              type={type}
              isSelected={isSelected}
              onSelect={() => onSelectOption(option)}
            />
          );
        })}
      </RadioGroup>
    );
  }

  return (
    <View className="pt-6 gap-3">
      {options.map((option, index) => {
        const isSelected = selectedSelections.includes(option);

        return (
          <AssessmentOptionItem
            key={index}
            option={option}
            type={type}
            isSelected={isSelected}
            onSelect={() => onSelectOption(option)}
          />
        );
      })}
    </View>
  );
}

