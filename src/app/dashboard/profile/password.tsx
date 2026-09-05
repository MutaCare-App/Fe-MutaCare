import { ProfileField } from "@/components/profile/profile-field";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, View } from "react-native";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const changePassword = useAuthStore((state) => state.changePassword);
  const isPasswordChanging = useAuthStore((state) => state.isPasswordChanging);
  const passwordError = useAuthStore((state) => state.passwordError);
  const clearPasswordError = useAuthStore((state) => state.clearPasswordError);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleField, setVisibleField] = useState<string | null>(null);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    clearPasswordError();
  }, [clearPasswordError]);

  const toggleVisibility = (field: string) => {
    setVisibleField((current) => (current === field ? null : field));
  };

  const handleSave = async () => {
    setLocalError(null);
    clearPasswordError();

    if (!currentPassword || !newPassword || !confirmPassword) {
      setLocalError("Lengkapi semua kolom kata sandi terlebih dahulu.");
      return;
    }
    if (newPassword.length < 6) {
      setLocalError("Kata sandi baru minimal 6 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setLocalError("Konfirmasi kata sandi baru harus sama.");
      return;
    }

    const success = await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (success) {
      Alert.alert("Berhasil", "Kata sandi Anda berhasil diperbarui.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  };

  return (
    <ProfileShell showBack title="Ubah Kata Sandi">
      <View className="mt-7 gap-3">
        <ProfileField
          label="Kata Sandi Saat Ini"
          onChangeText={setCurrentPassword}
          onToggleVisibility={() => toggleVisibility("current")}
          placeholder="••••••••••••"
          secureTextEntry={visibleField !== "current"}
          showValue={visibleField === "current"}
          value={currentPassword}
        />
        <ProfileField
          label="Kata Sandi Baru"
          onChangeText={setNewPassword}
          onToggleVisibility={() => toggleVisibility("new")}
          placeholder="Masukkan Kata Sandi Baru"
          secureTextEntry={visibleField !== "new"}
          showValue={visibleField === "new"}
          value={newPassword}
        />
        <ProfileField
          label="Konfirmasi Kata Sandi Baru"
          onChangeText={setConfirmPassword}
          onToggleVisibility={() => toggleVisibility("confirm")}
          placeholder="Konfirmasi Kata Sandi Baru"
          secureTextEntry={visibleField !== "confirm"}
          showValue={visibleField === "confirm"}
          value={confirmPassword}
        />

        {localError || passwordError ? (
          <View className="rounded-lg border border-red-200 bg-red-50 p-3">
            <Text className="text-center font-poppins text-xs text-red-600">
              {localError || passwordError}
            </Text>
          </View>
        ) : null}
      </View>

      <Button
        className="mb-3 mt-auto h-16 w-full rounded-lg bg-primary-300 active:bg-primary-400 justify-center items-center"
        disabled={isPasswordChanging}
        onPress={() => void handleSave()}
      >
        {isPasswordChanging ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text className="font-poppins-semibold text-lg text-white">Simpan Perubahan</Text>
        )}
      </Button>
    </ProfileShell>
  );
}
