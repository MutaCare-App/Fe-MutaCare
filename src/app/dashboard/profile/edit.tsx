import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ProfileField } from "@/components/profile/profile-field";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { CaretDownIcon } from "phosphor-react-native/src/icons/CaretDown";
import { useState } from "react";
import { Pressable, View } from "react-native";

iconWithClassName(CaretDownIcon);

export default function EditProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const name = user?.fullName || "Lee Chaeryeong";
  const [email, setEmail] = useState(user?.email || "Chaery@Gmail.Com");
  const [fullName, setFullName] = useState(name);
  const [phone, setPhone] = useState("+62");
  const [gender, setGender] = useState("");

  const toggleGender = () => {
    setGender((current) => {
      if (!current) return "Perempuan";
      if (current === "Perempuan") return "Laki-laki";
      return "";
    });
  };

  return (
    <ProfileShell showBack title="Ubah Profil">
      <View className="mt-5 items-center">
        <ProfileAvatar avatarUrl={user?.avatarUrl} name={name} size="medium" />
      </View>

      <View className="mt-7 gap-2">
        <Text className="mb-1 font-poppins-semibold text-sm text-neutral-700">Informasi Anda</Text>
        <ProfileField
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          value={email}
        />
        <ProfileField label="Nama Lengkap" onChangeText={setFullName} value={fullName} />
        <ProfileField
          keyboardType="phone-pad"
          label="Nomor Handphone"
          onChangeText={setPhone}
          value={phone}
        />
        <View className="gap-1">
          <Text className="font-poppins-semibold text-xs text-neutral-700">Jenis Kelamin</Text>
          <Pressable
            accessibilityRole="button"
            className="h-10 flex-row items-center rounded-lg border border-secondary-300 bg-neutral-50 px-2.5"
            onPress={toggleGender}
          >
            <Text className={gender ? "flex-1 font-poppins text-[13px] text-neutral-700" : "flex-1 font-poppins text-[13px] text-neutral-300"}>
              {gender || "Jenis Kelamin"}
            </Text>
            <CaretDownIcon className="text-neutral-900" size={20} />
          </Pressable>
        </View>
      </View>

      <Button
        className="mb-3 mt-auto h-12 w-full rounded-lg bg-primary-300 active:bg-primary-400"
        onPress={() => router.back()}
      >
        <Text className="font-poppins-semibold text-base text-white">Simpan Perubahan</Text>
      </Button>
    </ProfileShell>
  );
}
