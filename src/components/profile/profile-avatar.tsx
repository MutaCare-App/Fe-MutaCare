import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CameraIcon } from "phosphor-react-native/src/icons/Camera";
import { ImageSourcePropType, Pressable, View } from "react-native";

iconWithClassName(CameraIcon);

const DEFAULT_AVATAR = require("../../../assets/images/dummy-profile.png");

interface ProfileAvatarProps {
  avatarUrl?: string | ImageSourcePropType | null;
  name: string;
  size?: "large" | "medium";
}

export function ProfileAvatar({ avatarUrl, name, size = "large" }: ProfileAvatarProps) {
  const imageSource = avatarUrl
    ? typeof avatarUrl === "string"
      ? { uri: avatarUrl }
      : avatarUrl
    : DEFAULT_AVATAR;
  const avatarClass = size === "large" ? "size-24" : "size-[94px]";

  return (
    <View className="relative self-start">
      <Avatar alt={`${name} avatar`} className={avatarClass}>
        <AvatarImage source={imageSource} />
        <AvatarFallback>
          <Text className="font-poppins-semibold text-xl text-neutral-600">
            {name.trim().charAt(0).toUpperCase() || "U"}
          </Text>
        </AvatarFallback>
      </Avatar>
      <Pressable
        accessibilityLabel="Ubah foto profil"
        className="absolute -bottom-0.5 -right-0.5 size-6 items-center justify-center rounded-full border border-neutral-200 bg-white"
        hitSlop={8}
      >
        <CameraIcon className="text-primary-300" size={14} />
      </Pressable>
    </View>
  );
}
