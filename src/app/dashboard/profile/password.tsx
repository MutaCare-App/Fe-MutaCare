import { ProfileField } from "@/components/profile/profile-field";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, View } from "react-native";

export default function ChangePasswordScreen() {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visibleField, setVisibleField] = useState<string | null>(null);

  const toggleVisibility = (field: string) => {
    setVisibleField((current) => (current === field ? null : field));
  };

  const handleSave = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      Alert.alert("Kata sandi belum lengkap", "Lengkapi semua kolom kata sandi terlebih dahulu.");
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Konfirmasi tidak cocok", "Konfirmasi kata sandi baru harus sama.");
      return;
    }
    router.back();
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
      </View>

      <Button
        className="mb-3 mt-auto h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
        onPress={handleSave}
      >
        <Text className="font-poppins-semibold text-base text-white">Simpan Perubahan</Text>
      </Button>
    </ProfileShell>
  );
}
