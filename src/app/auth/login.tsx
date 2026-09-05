import AuthErrorBanner from "@/components/auth/auth-error-banner";
import AuthFooterLink from "@/components/auth/auth-footer-link";
import AuthHeader from "@/components/auth/auth-header";
import AuthInput from "@/components/auth/auth-input";
import AuthSocialButton from "@/components/auth/auth-social-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { loginSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { EnvelopeIcon } from "phosphor-react-native/src/icons/Envelope";
import { KeyIcon } from "phosphor-react-native/src/icons/Key";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Daftarkan icon ke NativeWind
iconWithClassName(EnvelopeIcon);
iconWithClassName(KeyIcon);

export default function Login() {
  const router = useRouter();
  const { loginUser, isLoading, error, clearError } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const handleLogin = async () => {
    setLocalError(null);
    clearError();

    const parseResult = loginSchema.safeParse({
      email,
      password,
    });

    if (!parseResult.success) {
      setLocalError(parseResult.error.issues[0]?.message || "Input tidak valid");
      return;
    }

    const success = await loginUser(parseResult.data);

    if (success) {
      router.replace("/assessment");
    }
  };

  const activeError = localError || error;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#fff" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View style={{ flex: 1, backgroundColor: "#fff" }}>
        <AuthHeader />
        <SafeAreaView
          style={{ flex: 1 }}
          edges={["bottom", "left", "right"]}
          className="px-8"
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", paddingBottom: 32 }}
            className="w-full"
          >
            <View className="flex w-full">
              {/* Header Text */}
              <View className="flex items-center">
                <Text className="pt-6 text-3xl font-feather-bold text-primary-300">
                  Masuk ke Mutacare
                </Text>
                <Text className="text-neutral-700 font-poppins text-center pt-1">
                  Masuk untuk melanjutkan perjalanan terapimu
                </Text>
              </View>

              {/* Banner Error */}
              <AuthErrorBanner message={activeError} />

              {/* Form Fields */}
              <View className="flex gap-4 pt-6 w-full">
                <AuthInput
                  label="Email"
                  placeholder="Masukkan Alamat Email Anda"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setLocalError(null);
                    clearError();
                  }}
                  icon={<EnvelopeIcon size={28} className="text-secondary-300" />}
                />

                <AuthInput
                  label="Kata Sandi"
                  placeholder="Masukkan Kata Sandi Anda"
                  isPassword
                  showPassword={showPassword}
                  onTogglePassword={() => setShowPassword((prev) => !prev)}
                  value={password}
                  onChangeText={(text) => {
                    setPassword(text);
                    setLocalError(null);
                    clearError();
                  }}
                  icon={<KeyIcon size={28} className="text-secondary-300" />}
                />

                {/* Tombol Masuk */}
                <Button
                  onPress={handleLogin}
                  disabled={isLoading}
                  className="bg-primary-300 w-full h-16 rounded-lg justify-center items-center mt-2"
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" size="small" />
                  ) : (
                    <Text className="text-white font-poppins-semibold text-lg">
                      Masuk
                    </Text>
                  )}
                </Button>
              </View>

              {/* Atau Masuk Dengan */}
              <AuthSocialButton title="Atau Masuk Dengan" />
            </View>

            {/* Footer */}
            <AuthFooterLink
              prompt="Belum punya akun?"
              actionText="Daftar Akun"
              href="/auth/register"
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}
