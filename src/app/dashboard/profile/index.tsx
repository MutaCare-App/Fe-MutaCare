import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ProfileMenuRow } from "@/components/profile/profile-menu-row";
import { ProfileShell } from "@/components/profile/profile-shell";
import { ProfileSignoutDialog } from "@/components/profile/profile-signout-dialog";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { LockKeyIcon } from "phosphor-react-native/src/icons/LockKey";
import { BrainIcon } from "phosphor-react-native/src/icons/Brain";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import { SignOutIcon } from "phosphor-react-native/src/icons/SignOut";
import { UserGearIcon } from "phosphor-react-native/src/icons/UserGear";
import { View } from "react-native";

[BrainIcon, CaretRightIcon, LockKeyIcon, SignOutIcon, UserGearIcon].forEach(iconWithClassName);

export default function ProfileScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const name = user?.fullName || "Lee Chaeryeong";
  const email = user?.email || "Chaery@Gmail.Com";

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <ProfileShell title="Profil">
      <View className="mt-7 flex-row items-center justify-center gap-5">
        <ProfileAvatar avatarUrl={user?.avatarUrl} name={name} />
        <View className="min-w-0 flex-1">
          <Text className="font-poppins-semibold text-xl leading-6 text-neutral-700">
            {name}
          </Text>
          <Text className="font-poppins text-sm text-neutral-700">{email}</Text>
        </View>
      </View>

      <View className="mt-8">
        <Text className="mb-1 font-poppins-semibold text-[15px] text-neutral-700">Akun</Text>
        <ProfileMenuRow
          icon={<UserGearIcon className="text-secondary-300" size={20} />}
          label="Ubah Profil"
          onPress={() => router.push("/dashboard/profile/edit")}
        />
        <ProfileMenuRow
          icon={<LockKeyIcon className="text-secondary-300" size={20} />}
          label="Ubah Kata Sandi"
          onPress={() => router.push("/dashboard/profile/password")}
        />

        <Text className="mb-1 mt-3 font-poppins-semibold text-[15px] text-neutral-700">Terapi</Text>
        <ProfileMenuRow
          icon={<BrainIcon className="text-secondary-300" size={20} />}
          label="Hasil Assessment Awal"
          onPress={() => router.push("/dashboard/profile/assessment")}
        />
      </View>

      {/* Micro-component Tombol Keluar dengan Dialog Konfirmasi */}
      <ProfileSignoutDialog onConfirmLogout={handleLogout} />
    </ProfileShell>
  );
}
