import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretDownIcon } from "phosphor-react-native/src/icons/CaretDown";
import { CaretUpIcon } from "phosphor-react-native/src/icons/CaretUp";
import React from "react";
import { Pressable, View } from "react-native";

iconWithClassName(CaretDownIcon);
iconWithClassName(CaretUpIcon);

export interface ReflectionDayRecord {
  dayNumber: number;
  label: string;
  note?: string | null;
}

interface ReflectionAccordionItemProps {
  item: ReflectionDayRecord;
  isOpen: boolean;
  onToggle: () => void;
}

export function ReflectionAccordionItem({
  item,
  isOpen,
  onToggle,
}: ReflectionAccordionItemProps) {
  return (
    <View className="border-b border-neutral-200">
      <Pressable
        onPress={onToggle}
        className="flex-row items-center justify-between py-3.5 active:opacity-70"
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Text className="font-poppins-medium text-base text-neutral-800">
          {item.label}
        </Text>
        {isOpen ? (
          <CaretUpIcon size={18} className="text-neutral-500" />
        ) : (
          <CaretDownIcon size={18} className="text-neutral-500" />
        )}
      </Pressable>

      {isOpen && (
        <View className="pb-3.5 pt-0.5">
          <Text className="font-poppins text-base text-neutral-600 italic leading-5">
            {item.note || "Belum ada catatan refleksi untuk hari ini."}
          </Text>
        </View>
      )}
    </View>
  );
}

export default ReflectionAccordionItem;
