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
import { ActivityIndicator, Pressable, View } from "react-native";
import { useEffect } from "react";

[BrainIcon, CaretRightIcon, LockKeyIcon, SignOutIcon, UserGearIcon].forEach(iconWithClassName);

export default function ProfileScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const isProfileLoading = useAuthStore((state) => state.isProfileLoading);
  const profileError = useAuthStore((state) => state.profileError);
  const name = user?.fullName || "Pengguna";
  const email = user?.email || "Email tidak tersedia";

  useEffect(() => {
    if (token) {
      void fetchProfile();
    }
  }, [fetchProfile, token]);

  const handleLogout = () => {
    logout();
    router.replace("/auth/login");
  };

  return (
    <ProfileShell title="Profil">
      <View className="mt-7 flex-row items-center justify-center gap-5">
        <ProfileAvatar
          avatarUrl={user?.avatarUrl}
          name={name}
          onEdit={() => router.push("/dashboard/profile/edit")}
        />
        <View className="min-w-0 flex-1">
          <Text className="font-poppins-semibold text-xl leading-6 text-neutral-700">
            {name}
          </Text>
          <Text className="font-poppins text-sm text-neutral-700">{email}</Text>
        </View>
      </View>

      {isProfileLoading ? (
        <View className="mt-4 flex-row items-center justify-center gap-2">
          <ActivityIndicator color="#609966" size="small" />
          <Text className="font-poppins text-xs text-neutral-500">Memuat profil...</Text>
        </View>
      ) : null}

      {profileError ? (
        <View className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3">
          <Text className="text-center font-poppins text-xs text-red-600">{profileError}</Text>
          <Pressable className="mt-2 active:opacity-60" onPress={() => void fetchProfile()}>
            <Text className="text-center font-poppins-semibold text-xs text-primary-300">
              Coba Lagi
            </Text>
          </Pressable>
        </View>
      ) : null}

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

      <ProfileSignoutDialog onConfirmLogout={handleLogout} />
    </ProfileShell>
  );
}
