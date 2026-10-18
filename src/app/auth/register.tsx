import AuthErrorBanner from "@/components/auth/auth-error-banner";
import AuthFooterLink from "@/components/auth/auth-footer-link";
import AuthHeader from "@/components/auth/auth-header";
import AuthInput from "@/components/auth/auth-input";
import AuthSocialButton from "@/components/auth/auth-social-button";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { registerSchema } from "@/schemas/authSchema";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter, useFocusEffect } from "expo-router";
import { EnvelopeIcon } from "phosphor-react-native/src/icons/Envelope";
import { KeyIcon } from "phosphor-react-native/src/icons/Key";
import { UserIcon } from "phosphor-react-native/src/icons/User";
import { useState, useEffect, useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

iconWithClassName(UserIcon);
iconWithClassName(EnvelopeIcon);
iconWithClassName(KeyIcon);

export default function Register() {
  const router = useRouter();
  const { registerUser, loginWithGoogle, isLoading, error, clearError } = useAuthStore();
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  useFocusEffect(
    useCallback(() => {
      useAuthStore.getState().resetLoading();
      setIsGoogleSubmitting(false);
      clearError();
      setFullName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmPassword(false);
      setLocalError(null);
      try {
        WebBrowser.dismissAuthSession();
      } catch {}
    }, [])
  );
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

    const parseResult = registerSchema.safeParse({
      fullName,
      email,
      password,
      confirmPassword,
    });

    if (!parseResult.success) {
      setLocalError(parseResult.error.issues[0]?.message || "Input tidak valid");
      return;
    }

    const success = await registerUser(parseResult.data);

    if (success) {
      router.replace("/assessment");
    }
  };

  const handleGoogleRegister = async () => {
    if (isGoogleSubmitting) return;
    setIsGoogleSubmitting(true);
    setLocalError(null);
    clearError();

    try {
      const success = await loginWithGoogle();

      if (success) {
        // Direct to initial assessment screen as requested
        router.replace("/assessment");
      }
    } finally {
      setIsGoogleSubmitting(false);
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
            contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", paddingBottom: 48 }}
            className="w-full"
          >
            <View className="flex w-full">
              <View className="flex items-center">
                <Text className="pt-6 text-3xl font-feather-bold text-primary-300">
                  Buat Akun Baru
                </Text>
                <Text className="text-neutral-700 font-poppins text-center pt-1 text-sm">
                  Buat Akun Agar Perjalanan Terapi Dan Perkembanganmu Dapat
                  Tersimpan Dengan Aman.
                </Text>
              </View>

              <AuthErrorBanner message={activeError} />

              <View className="flex gap-4 pt-6 w-full">
                <AuthInput
                  label="Nama Lengkap"
                  placeholder="Masukkan Nama Lengkap Anda"
                  value={fullName}
                  onChangeText={(text) => {
                    setFullName(text);
                    setLocalError(null);
                    clearError();
                  }}
                  icon={<UserIcon size={28} className="text-secondary-300" />}
                />

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
                  placeholder="Buat Kata Sandi Anda"
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

                <AuthInput
                  label="Konfirmasi Kata Sandi"
                  placeholder="Konfirmasi Kata Sandi Anda"
                  isPassword
                  showPassword={showConfirmPassword}
                  onTogglePassword={() => setShowConfirmPassword((prev) => !prev)}
                  value={confirmPassword}
                  onChangeText={(text) => {
                    setConfirmPassword(text);
                    setLocalError(null);
                    clearError();
                  }}
                  icon={<KeyIcon size={28} className="text-secondary-300" />}
                />

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

              <AuthSocialButton
                title="Atau Daftar Dengan"
                onPress={handleGoogleRegister}
                isLoading={isGoogleSubmitting}
                disabled={isGoogleSubmitting}
              />
            </View>

            <AuthFooterLink
              prompt="Sudah Memiliki Akun?"
              actionText="Masuk"
              href="/auth/login"
            />
          </ScrollView>
        </SafeAreaView>
      </View>
    </KeyboardAvoidingView>
  );
}
