import { Text } from "@/components/ui/text";
import * as React from "react";
import { TextInput, TextInputProps, View } from "react-native";

interface ProfilePhoneFieldProps
  extends Omit<TextInputProps, "onChangeText" | "value"> {
  label?: string;
  value?: string | null;
  onChangeText: (formattedValue: string, rawNumber: string) => void;
}

/**
 * Helper to format Indonesian phone number:
 * 1. Safely handles null/undefined input.
 * 2. Removes non-digits.
 * 3. Removes leading country code 62 if followed by more digits.
 * 4. Removes leading zero (e.g. "0812" -> "812").
 * 5. Formats into readable blocks: "812 3456 7890".
 */
export function formatPhoneNumber(input?: string | null): string {
  if (!input) return "";

  // Hanya ambil digit
  let digits = input.replace(/\D/g, "");

  // Buang awalan 62 jika user memasukkannya (hanya jika ada digit lanjutan)
  if (digits.startsWith("62") && digits.length > 2) {
    digits = digits.slice(2);
  }

  // Buang angka 0 di depan
  if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  // Batasi maksimal 13 digit
  digits = digits.slice(0, 13);

  // Format ke blok: xxx xxxx xxxx
  if (digits.length <= 3) {
    return digits;
  }
  if (digits.length <= 7) {
    return `${digits.slice(0, 3)} ${digits.slice(3)}`;
  }
  if (digits.length <= 11) {
    return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }
  return `${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7, 11)} ${digits.slice(11)}`;
}

export function ProfilePhoneField({
  label = "Nomor Handphone",
  value,
  onChangeText,
  ...props
}: ProfilePhoneFieldProps) {
  const handleChangeText = (text: string) => {
    const formatted = formatPhoneNumber(text);
    const raw = formatted.replace(/\s/g, "");
    onChangeText(formatted, raw ? `+62${raw}` : "");
  };

  return (
    <View className="gap-1.5 w-full">
      <Text className="font-poppins-semibold text-base text-neutral-700">
        {label}
      </Text>
      <View className="h-14 w-full flex-row items-center rounded-lg border border-secondary-300 bg-white shadow-sm shadow-black/5">
        {/* Prefix Badge +62 */}
        <View className="flex-row items-center gap-1.5 pl-4 pr-3">
          <Text className="text-base">🇮🇩</Text>
          <Text className="font-poppins-semibold text-base text-neutral-700">
            +62
          </Text>
        </View>

        {/* Divider Vertikal */}
        <View className="w-[1px] h-6 bg-neutral-200 mr-3" />

        {/* Input Nomor Utama */}
        <TextInput
          className="flex-1 h-full font-poppins text-base text-neutral-700 pr-4"
          keyboardType="phone-pad"
          placeholder="812 3456 7890"
          placeholderTextColor="#A3A3A3"
          value={formatPhoneNumber(value)}
          onChangeText={handleChangeText}
          maxLength={16} // Termasuk spasi
          {...props}
        />
      </View>
    </View>
  );
}
