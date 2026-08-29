import AuthHeader from "@/components/auth/auth-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { Link } from "expo-router";
import { EnvelopeIcon } from "phosphor-react-native/src/icons/Envelope";
import { EyeIcon } from "phosphor-react-native/src/icons/Eye";
import { EyeSlashIcon } from "phosphor-react-native/src/icons/EyeSlash";
import { KeyIcon } from "phosphor-react-native/src/icons/Key";
import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Daftarkan icon ke NativeWind
iconWithClassName(EnvelopeIcon);
iconWithClassName(KeyIcon);
iconWithClassName(EyeIcon);
iconWithClassName(EyeSlashIcon);

export default function Login() {
  // 1. State untuk toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AuthHeader />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["bottom", "left", "right"]}
        className="items-center px-8 flex justify-between"
      >
        <View className="flex w-full ">
          <View className="flex items-center">
            <Text className="pt-6 text-3xl font-feather-bold text-primary-300">
              Masuk ke Mutacare
            </Text>
            <Text className="text-neutral-700 font-poppins text-center pt-1">
              Masuk untuk melanjutkan perjalanan terapimu{" "}
            </Text>
          </View>

          <View className="flex gap-4 pt-10 w-full">
            {/* Input Email */}
            <View>
              <Label className="font-poppins-semibold text-base">Email</Label>
              <View className="relative justify-center mt-1">
                <EnvelopeIcon
                  size={28}
                  className="absolute left-3.5 z-10 text-secondary-300"
                />
                <Input
                  placeholder="Masukkan Alamat Email Anda"
                  keyboardType="email-address"
                  className="pl-14"
                />
              </View>
            </View>

            {/* Input Kata Sandi */}
            <View>
              <Label className="font-poppins-semibold text-base">
                Kata Sandi
              </Label>
              <View className="relative justify-center mt-1">
                <KeyIcon
                  size={28}
                  className="absolute left-3.5 z-10 text-secondary-300"
                />
                <Input
                  placeholder="Masukkan Kata Sandi Anda"
                  secureTextEntry={!showPassword}
                  className="pl-14 pr-14"
                />
                <Pressable
                  onPress={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3.5 z-10 p-1"
                  hitSlop={8}
                >
                  {showPassword ? (
                    <EyeSlashIcon size={28} className="text-neutral-700" />
                  ) : (
                    <EyeIcon size={28} className="text-neutral-300" />
                  )}
                </Pressable>
              </View>
            </View>
            <Link href="/assessment" asChild>
              <Button className="bg-primary-300 w-full h-16 rounded-lg justify-center items-center">
                <Text className="text-white font-poppins-semibold text-lg">
                  Lanjut
                </Text>
              </Button>
            </Link>
          </View>

          <View className="flex justify-center items-center py-4 gap-2">
            <Text className="font-poppins text-neutral-700">
              Atau Masuk Dengan
            </Text>
            <Pressable className="h-16 w-16 border border-primary-300 rounded-2xl items-center justify-center active:bg-neutral-100">
              <Image
                source={require("../../../assets/logo/google-logo.png")}
                className="h-10 w-10"
                resizeMode="contain"
              />
            </Pressable>
          </View>
        </View>

        <View>
          <Text className="font-poppins text-neutral-700 text-center">
            Belum punya akun?{" "}
            <Link href="/auth/register" asChild>
              <Text className="font-poppins underline text-brand-accent">
                Daftar Akun
              </Text>
            </Link>
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
}
