import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ProfileMenuRow } from "@/components/profile/profile-menu-row";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { BrainIcon } from "phosphor-react-native/src/icons/Brain";
import { LockIcon } from "phosphor-react-native/src/icons/Lock";
import { SignOutIcon } from "phosphor-react-native/src/icons/SignOut";
import { UserCircleIcon } from "phosphor-react-native/src/icons/UserCircle";
import { Pressable, View } from "react-native";

[BrainIcon, LockIcon, SignOutIcon, UserCircleIcon].forEach(iconWithClassName);

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
      <View className="mt-7 flex-row items-center gap-5">
        <ProfileAvatar avatarUrl={user?.avatarUrl} name={name} />
        <View className="min-w-0 flex-1">
          <Text className="font-feather-bold text-[21px] leading-6 text-neutral-700">
            {name}
          </Text>
          <Text className="font-poppins text-xs text-neutral-700">{email}</Text>
        </View>
      </View>

      <View className="mt-8">
        <Text className="mb-1 font-poppins-semibold text-[15px] text-neutral-700">Akun</Text>
        <ProfileMenuRow
          icon={<UserCircleIcon className="text-secondary-300" size={20} />}
          label="Ubah Profil"
          onPress={() => router.push("/dashboard/profile/edit")}
        />
        <ProfileMenuRow
          icon={<LockIcon className="text-secondary-300" size={20} />}
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

      <Pressable
        className="mt-auto h-12 flex-row items-center active:opacity-60"
        onPress={handleLogout}
      >
        <View className="w-8 items-start">
          <SignOutIcon className="text-red-500" size={20} />
        </View>
        <Text className="flex-1 font-poppins text-[13px] text-neutral-700">Keluar</Text>
        <Text className="text-xl text-neutral-700">›</Text>
      </Pressable>
    </ProfileShell>
  );
}
