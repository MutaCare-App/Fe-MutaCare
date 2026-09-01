import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ProfileField } from "@/components/profile/profile-field";
import { ProfilePhoneField } from "@/components/profile/profile-phone-field";
import { ProfileSelect } from "@/components/profile/profile-select";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

export default function EditProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const name = user?.fullName || "Lee Chaeryeong";
  const [email, setEmail] = useState(user?.email || "Chaery@Gmail.Com");
  const [fullName, setFullName] = useState(name);
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");

  return (
    <ProfileShell showBack title="Ubah Profil">
      <View className="mt-5 flex w-full items-center justify-center">
        <ProfileAvatar avatarUrl={user?.avatarUrl} name={name} size="medium" />
      </View>

      <View className="mt-7 gap-2">
        <Text className="mb-1 font-poppins-semibold text-base text-neutral-700">Informasi Anda</Text>
        <ProfileField
          autoCapitalize="none"
          keyboardType="email-address"
          label="Email"
          onChangeText={setEmail}
          value={email}
        />
        <ProfileField label="Nama Lengkap" onChangeText={setFullName} value={fullName} />
        <ProfilePhoneField
          label="Nomor Handphone"
          onChangeText={(formatted) => setPhone(formatted)}
          value={phone}
        />
        <ProfileSelect
          label="Jenis Kelamin"
          onValueChange={setGender}
          options={["Perempuan", "Laki-laki"]}
          placeholder="Jenis Kelamin"
          value={gender}
        />
      </View>

      <Button
        className="mb-3 mt-auto h-16 w-full rounded-lg bg-primary-300 active:bg-primary-400 justify-center items-center"
        onPress={() => router.back()}
      >
        <Text className="font-poppins-semibold text-lg text-white">Simpan Perubahan</Text>
      </Button>
    </ProfileShell>
  );
}
