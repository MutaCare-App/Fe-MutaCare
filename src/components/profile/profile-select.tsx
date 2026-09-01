import {
  Option,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import * as React from "react";
import { View } from "react-native";

interface ProfileSelectProps {
  label: string;
  onValueChange: (value: string) => void;
  options: string[];
  placeholder: string;
  value: string;
}

export function ProfileSelect({
  label,
  onValueChange,
  options,
  placeholder,
  value,
}: ProfileSelectProps) {
  const selectedOption: Option | undefined = value
    ? { value, label: value }
    : undefined;

  const handleValueChange = (option: Option | undefined) => {
    if (option?.value) {
      onValueChange(option.value);
    }
  };

  return (
    <View className="gap-1.5 w-full">
      <Text className="font-poppins-semibold text-base text-neutral-700">
        {label}
      </Text>
      <Select value={selectedOption} onValueChange={handleValueChange}>
        <SelectTrigger className="h-14">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {options.map((opt) => (
              <SelectItem key={opt} label={opt} value={opt}>
                {opt}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </View>
  );
}
