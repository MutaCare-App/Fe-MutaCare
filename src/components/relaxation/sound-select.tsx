import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretDownIcon } from "phosphor-react-native/src/icons/CaretDown";
import { CheckIcon } from "phosphor-react-native/src/icons/Check";
import { SpeakerHighIcon } from "phosphor-react-native/src/icons/SpeakerHigh";
import { useState } from "react";
import { Modal, Pressable, View } from "react-native";

[CaretDownIcon, CheckIcon, SpeakerHighIcon].forEach(iconWithClassName);

const SOUND_OPTIONS = ["Hujan", "Ombak", "Suara Hutan"];

interface SoundSelectProps {
  onValueChange: (value: string) => void;
  value: string;
}

export function SoundSelect({ onValueChange, value }: SoundSelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectSound = (sound: string) => {
    onValueChange(sound);
    setIsOpen(false);
  };

  return (
    <>
      <Pressable
        accessibilityLabel={`Suara relaksasi: ${value}`}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
        className="h-10 w-full flex-row items-center rounded-full border border-white px-2.5 active:bg-white/10"
        onPress={() => setIsOpen(true)}
      >
        <View className="size-7 items-center justify-center rounded-full border border-white">
          <SpeakerHighIcon className="text-white" size={16} weight="fill" />
        </View>
        <Text className="ml-3 flex-1 font-poppins-medium text-base text-white">
          {value}
        </Text>
        <CaretDownIcon className="text-white" size={22} weight="bold" />
      </Pressable>

      <Modal
        animationType="fade"
        onRequestClose={() => setIsOpen(false)}
        transparent
        visible={isOpen}
      >
        <View className="flex-1 justify-end">
          <Pressable
            accessibilityLabel="Tutup pilihan suara relaksasi"
            className="absolute inset-0 bg-black/30"
            onPress={() => setIsOpen(false)}
          />
          <View className="rounded-t-3xl bg-white px-5 pb-8 pt-5">
            <View className="mb-4 h-1 w-10 self-center rounded-full bg-neutral-300" />
            <Text className="mb-3 font-poppins-semibold text-base text-neutral-700">
              Pilih Suara Relaksasi
            </Text>
            {SOUND_OPTIONS.map((sound) => {
              const isSelected = sound === value;

              return (
                <Pressable
                  accessibilityRole="radio"
                  accessibilityState={{ checked: isSelected }}
                  className="h-12 flex-row items-center rounded-lg px-3 active:bg-primary-100"
                  key={sound}
                  onPress={() => selectSound(sound)}
                >
                  <Text className="flex-1 font-poppins text-sm text-neutral-700">
                    {sound}
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
    </>
  );
}
