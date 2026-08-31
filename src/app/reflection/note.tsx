import { ReflectionShell } from "@/components/reflection/reflection-shell";
import { Text } from "@/components/ui/text";
import { useReflectionStore } from "@/store/useReflectionStore";
import { useRouter } from "expo-router";
import { KeyboardAvoidingView, Platform, TextInput, View } from "react-native";

export default function ReflectionNoteScreen() {
  const router = useRouter();
  const note = useReflectionStore((state) => state.note);
  const setNote = useReflectionStore((state) => state.setNote);

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ReflectionShell
        actionLabel="Selesai"
        onAction={() => router.push("/reflection/complete")}
        onBack={() => router.back()}
      >
        <View>
          <Text className="font-feather-bold text-2xl leading-[30px] tracking-[0.8px] text-primary-300">
            Tulis Apa Yang Kamu Rasakan Setelah Terapi Hari Ini
          </Text>

          <TextInput
            accessibilityLabel="Apa yang kamu rasakan"
            multiline
            onChangeText={setNote}
            placeholder="Apa Yang Kamu Rasakan"
            placeholderTextColor="#D4D4D4"
            textAlignVertical="top"
            value={note}
            className="mt-6 h-44 w-full rounded-2xl border border-neutral-300 p-3 font-poppins text-xs leading-[18px] tracking-[0.8px] text-neutral-700"
          />
        </View>
      </ReflectionShell>
    </KeyboardAvoidingView>
  );
}
