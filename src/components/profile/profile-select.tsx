import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretDownIcon } from "phosphor-react-native/src/icons/CaretDown";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";

iconWithClassName(CaretDownIcon);
iconWithClassName(CheckIcon);

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
  const [isOpen, setIsOpen] = useState(false);

  const selectOption = (option: string) => {
    onValueChange(option);
    setIsOpen(false);
  };

  return (
    <View className="gap-1">
      <Text className="font-poppins-semibold text-xs text-neutral-700">{label}</Text>
      <Pressable
        accessibilityLabel={`${label}: ${value || placeholder}`}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className="h-10 flex-row items-center rounded-lg border border-secondary-300 bg-neutral-50 px-2.5 active:bg-neutral-100"
        onPress={() => setIsOpen(true)}
      >
        <Text
          className={
            value
              ? "flex-1 font-poppins text-[13px] text-neutral-700"
              : "flex-1 font-poppins text-[13px] text-neutral-300"
          }
        >
          {value || placeholder}
        </Text>
        <CaretDownIcon className="text-neutral-900" size={20} />
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
        transparent
        visible={isOpen}
      >
        <View className="flex-1 justify-end">
          <Pressable
            accessibilityLabel={`Tutup pilihan ${label.toLowerCase()}`}
            className="absolute inset-0 bg-black/30"
            onPress={() => setIsOpen(false)}
          />
          <View className="rounded-t-3xl bg-white px-5 pb-8 pt-5">
            <View className="mb-4 h-1 w-10 self-center rounded-full bg-neutral-300" />
            <Text className="mb-3 font-poppins-semibold text-base text-neutral-700">
              Pilih {label}
            </Text>
            {options.map((option) => {
              const isSelected = value === option;

              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  className="h-12 flex-row items-center rounded-lg px-3 active:bg-primary-100"
                  key={option}
                  onPress={() => selectOption(option)}
                >
                  <Text className="flex-1 font-poppins text-sm text-neutral-700">
                    {option}
                  </Text>
                  {isSelected ? (
                    <CheckIcon className="text-primary-300" size={20} weight="bold" />
                  ) : null}
                </Pressable>
              );
            })}
          </View>
        </View>
      </Modal>
    </View>
  );
}
