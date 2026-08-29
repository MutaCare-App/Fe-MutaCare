import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProgressScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["top", "bottom", "left", "right"]}
        className="px-6 items-center justify-center"
      >
        <Text className="font-feather-bold text-2xl text-primary-300">
          Kemajuan
        </Text>
        <Text className="font-poppins text-neutral-600 text-sm mt-2 text-center">
          Halaman statistik & kemajuan terapi akan segera hadir.
        </Text>
      </SafeAreaView>
    </View>
  );
}
