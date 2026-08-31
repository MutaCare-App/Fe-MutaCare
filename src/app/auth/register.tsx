import AuthHeader from "@/components/auth/auth-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { Link, useRouter } from "expo-router";
import { EnvelopeIcon } from "phosphor-react-native/src/icons/Envelope";
import { EyeIcon } from "phosphor-react-native/src/icons/Eye";
import { EyeSlashIcon } from "phosphor-react-native/src/icons/EyeSlash";
import { KeyIcon } from "phosphor-react-native/src/icons/Key";
import { UserIcon } from "phosphor-react-native/src/icons/User";
import { useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Daftarkan icon ke NativeWind
iconWithClassName(UserIcon);
iconWithClassName(EnvelopeIcon);
iconWithClassName(KeyIcon);
iconWithClassName(EyeIcon);
iconWithClassName(EyeSlashIcon);

export default function Register() {
  const router = useRouter();
  const { registerUser, isLoading, error, clearError } = useAuthStore();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleRegister = async () => {
    setLocalError(null);
    clearError();

    if (!fullName.trim() || fullName.trim().length < 2) {
      setLocalError("Nama lengkap minimal 2 karakter");
      return;
    }

    if (!email.trim()) {
      setLocalError("Email wajib diisi");
      return;
    }

    if (!password || password.length < 6) {
      setLocalError("Kata sandi minimal 6 karakter");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Konfirmasi kata sandi tidak cocok dengan kata sandi");
      return;
    }

    const success = await registerUser({
      fullName: fullName.trim(),
      email: email.trim(),
      password,
      confirmPassword,
    });

    if (success) {
      // Redirect ke halaman assessment setelah berhasil registrasi
      router.replace("/assessment");
    }
  };

  const activeError = localError || error;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <AuthHeader />
      <SafeAreaView
        style={{ flex: 1 }}
        edges={["bottom", "left", "right"]}
        className="px-8"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between" }}
          className="w-full"
        >
          <View className="flex w-full">
            {/* Header Text */}
            <View className="flex items-center">
              <Text className="pt-6 text-3xl font-feather-bold text-primary-300">
                Buat Akun Baru
              </Text>
              <Text className="text-neutral-700 font-poppins text-center pt-1 text-sm">
                Buat Akun Agar Perjalanan Terapi Dan Perkembanganmu Dapat
                Tersimpan Dengan Aman.
              </Text>
            </View>

            {/* Banner Error jika ada */}
            {activeError && (
              <View className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <Text className="text-red-600 font-poppins text-sm text-center">
                  {activeError}
                </Text>
              </View>
            )}

            {/* Form Fields */}
            <View className="flex gap-4 pt-6 w-full">
              {/* Input Nama Lengkap */}
              <View>
                <Label className="font-poppins-semibold text-base">
                  Nama Lengkap
                </Label>
                <View className="relative justify-center mt-1">
                  <UserIcon
                    size={28}
                    className="absolute left-3.5 z-10 text-secondary-300"
                  />
                  <Input
                    placeholder="Masukkan Nama Lengkap Anda"
                    value={fullName}
                    onChangeText={(text) => {
                      setFullName(text);
                      setLocalError(null);
                    }}
                    className="pl-14"
                  />
                </View>
              </View>

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
                    autoCapitalize="none"
                    value={email}
                    onChangeText={(text) => {
                      setEmail(text);
                      setLocalError(null);
                    }}
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
                    placeholder="Buat Kata Sandi Anda"
                    secureTextEntry={!showPassword}
                    value={password}
                    onChangeText={(text) => {
                      setPassword(text);
                      setLocalError(null);
                    }}
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

              {/* Input Konfirmasi Kata Sandi */}
              <View>
                <Label className="font-poppins-semibold text-base">
                  Konfirmasi Kata Sandi
                </Label>
                <View className="relative justify-center mt-1">
                  <KeyIcon
                    size={28}
                    className="absolute left-3.5 z-10 text-secondary-300"
                  />
                  <Input
                    placeholder="Konfirmasi Kata Sandi Anda"
                    secureTextEntry={!showConfirmPassword}
                    value={confirmPassword}
                    onChangeText={(text) => {
                      setConfirmPassword(text);
                      setLocalError(null);
                    }}
                    className="pl-14 pr-14"
                  />
                  <Pressable
                    onPress={() => setShowConfirmPassword((prev) => !prev)}
                    className="absolute right-3.5 z-10 p-1"
                    hitSlop={8}
                  >
                    {showConfirmPassword ? (
                      <EyeSlashIcon size={28} className="text-neutral-700" />
                    ) : (
                      <EyeIcon size={28} className="text-neutral-300" />
                    )}
                  </Pressable>
                </View>
              </View>

              {/* Tombol Daftar */}
              <Button
                onPress={handleRegister}
                disabled={isLoading}
                className="bg-primary-300 w-full h-16 rounded-lg justify-center items-center mt-2"
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" size="small" />
                ) : (
                  <Text className="text-white font-poppins-semibold text-lg">
                    Daftar
                  </Text>
                )}
              </Button>
            </View>

            {/* Atau Daftar Dengan */}
            <View className="flex justify-center items-center py-4 gap-2">
              <Text className="font-poppins text-neutral-700">
                Atau Daftar Dengan
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

          {/* Footer: Sudah Memiliki Akun? Masuk */}
          <View className="py-4">
            <Text className="font-poppins text-neutral-700 text-center">
              Sudah Memiliki Akun?{" "}
              <Link href="/auth/login" asChild>
                <Text className="font-poppins underline text-brand-accent">
                  Masuk
                </Text>
              </Link>
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
