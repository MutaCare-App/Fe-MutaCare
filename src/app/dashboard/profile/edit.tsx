import { ProfileAvatar } from "@/components/profile/profile-avatar";
import { ProfileField } from "@/components/profile/profile-field";
import { ProfileSelect } from "@/components/profile/profile-select";
import { ProfileShell } from "@/components/profile/profile-shell";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { UpdateUserProfilePayload } from "@/services/userService";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, View } from "react-native";

function isValidDate(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) return false;

  const [, year, month, day] = match;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  return (
    date.getUTCFullYear() === Number(year) &&
    date.getUTCMonth() === Number(month) - 1 &&
    date.getUTCDate() === Number(day)
  );
}

export default function EditProfileScreen() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const clearProfileError = useAuthStore((state) => state.clearProfileError);
  const isProfileUpdating = useAuthStore((state) => state.isProfileUpdating);
  const profileError = useAuthStore((state) => state.profileError);
  const name = user?.fullName || "Pengguna";
  const [nickname, setNickname] = useState(user?.nickname || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || "");
  const [validationError, setValidationError] = useState<string | null>(null);

  const touchedFields = useRef<{
    nickname?: boolean;
    gender?: boolean;
    dateOfBirth?: boolean;
    avatarUrl?: boolean;
  }>({});

  useEffect(() => {
    clearProfileError();
    if (token) {
      void fetchProfile();
    }
  }, [fetchProfile, clearProfileError, token]);

  useEffect(() => {
    if (user) {
      if (!touchedFields.current.nickname) setNickname(user.nickname || "");
      if (!touchedFields.current.gender) setGender(user.gender || "");
      if (!touchedFields.current.dateOfBirth) setDateOfBirth(user.dateOfBirth || "");
      if (!touchedFields.current.avatarUrl) setAvatarUrl(user.avatarUrl || "");
    }
  }, [user]);

  const handleSave = async () => {
    const normalizedNickname = nickname.trim();
    const normalizedDateOfBirth = dateOfBirth.trim();

    setValidationError(null);
    clearProfileError();

    if (normalizedDateOfBirth && !isValidDate(normalizedDateOfBirth)) {
      setValidationError("Tanggal lahir harus menggunakan format YYYY-MM-DD yang valid.");
      return;
    }

    const payload: UpdateUserProfilePayload = {};
    if (normalizedNickname !== (user?.nickname || "")) {
      payload.nickname = normalizedNickname;
    }
    if (gender && gender !== (user?.gender || "")) {
      payload.gender = gender;
    }
    if (normalizedDateOfBirth !== (user?.dateOfBirth || "")) {
      payload.dateOfBirth = normalizedDateOfBirth;
    }
    if (avatarUrl && avatarUrl !== (user?.avatarUrl || "")) {
      payload.avatarUrl = avatarUrl;
    }

    if (Object.keys(payload).length === 0) {
      router.back();
      return;
    }

    const success = await updateProfile(payload);

    if (success) {
      router.back();
    }
  };

  return (
    <ProfileShell showBack title="Ubah Profil">
      <View className="mt-5 flex w-full items-center justify-center">
        <ProfileAvatar
          avatarUrl={avatarUrl}
          name={name}
          onSelectImage={(uri) => {
            touchedFields.current.avatarUrl = true;
            setAvatarUrl(uri);
          }}
          size="medium"
        />
      </View>

      <View className="mt-7 gap-2">
        <Text className="mb-1 font-poppins-semibold text-base text-neutral-700">Informasi Anda</Text>
        <ProfileField
          editable={false}
          label="Nama Lengkap"
          value={name}
        />
        <ProfileField
          label="Nama Panggilan"
          onChangeText={(text) => {
            touchedFields.current.nickname = true;
            setNickname(text);
          }}
          placeholder="Masukkan nama panggilan"
          value={nickname}
        />
        <ProfileField
          autoCapitalize="none"
          keyboardType="numbers-and-punctuation"
          label="Tanggal Lahir"
          maxLength={10}
          onChangeText={(text) => {
            touchedFields.current.dateOfBirth = true;
            setDateOfBirth(text);
          }}
          placeholder="YYYY-MM-DD"
          value={dateOfBirth}
        />
        <ProfileSelect
          label="Jenis Kelamin"
          onValueChange={(value) => {
            touchedFields.current.gender = true;
            setGender(value);
          }}
          options={["Perempuan", "Laki-laki"]}
          placeholder="Jenis Kelamin"
          value={gender}
        />

        {validationError || profileError ? (
          <View className="rounded-lg border border-red-200 bg-red-50 p-3">
            <Text className="text-center font-poppins text-xs text-red-600">
              {validationError || profileError}
            </Text>
          </View>
        ) : null}
      </View>

      <Button
        className="mb-3 mt-auto h-16 w-full rounded-lg bg-primary-300 active:bg-primary-400 justify-center items-center"
        disabled={isProfileUpdating}
        onPress={() => void handleSave()}
      >
        {isProfileUpdating ? (
          <ActivityIndicator color="#fff" size="small" />
        ) : (
          <Text className="font-poppins-semibold text-lg text-white">Simpan Perubahan</Text>
        )}
      </Button>
    </ProfileShell>
  );
}
