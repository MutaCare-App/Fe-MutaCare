import AuthHeader from "@/components/auth/auth-header";
import { Text } from "@/components/ui/text";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function Login() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AuthHeader />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["bottom", "left", "right"]}
        className="items-center"
      >
        <View className="flex items-center ">
          <Text className="pt-6 text-3xl font-feather-bold text-primary-300">
            Masuk ke Mutacare
          </Text>
          <Text className="text-neutral-700 font-poppins text-center  pt-1">
            Masuk untuk melanjutkan perjalanan terapimu{" "}
          </Text>
        </View>
        <View className="pt-10 w-full px-6">
          <View>
            <Label className="font-poppins-semibold text-base">Email</Label>
            <EnvelopeIcon />
            <Input placeholder="Masukkan Alamat Email Anda" keyboardType="email-address" className="mt-1"/>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
