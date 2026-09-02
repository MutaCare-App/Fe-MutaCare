import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BottomSheetModal } from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CameraIcon } from "phosphor-react-native/src/icons/Camera";
import React, { useRef } from "react";
import { ImageSourcePropType, Pressable, View } from "react-native";
import { AvatarPickerSheet } from "./avatar-picker-sheet";

iconWithClassName(CameraIcon);

const DEFAULT_AVATAR = require("../../../assets/images/dummy-profile.png");

interface ProfileAvatarProps {
  avatarUrl?: string | ImageSourcePropType | null;
  name: string;
  size?: "large" | "medium";
  editable?: boolean;
  onEdit?: () => void;
  onSelectImage?: (uri: string) => void;
}

export function ProfileAvatar({
  avatarUrl,
  name,
  size = "large",
  editable = true,
  onEdit,
  onSelectImage,
}: ProfileAvatarProps) {
  const pickerSheetRef = useRef<BottomSheetModal>(null);

  const imageSource = avatarUrl
    ? typeof avatarUrl === "string"
      ? { uri: avatarUrl }
      : avatarUrl
    : DEFAULT_AVATAR;

  const avatarClass = size === "large" ? "size-24" : "size-[94px]";

  const handleOpenPicker = () => {
    if (!editable) return;
    if (onEdit) {
      onEdit();
      return;
    }
    pickerSheetRef.current?.present();
  };

  const handleImageSelected = (uri: string) => {
    onSelectImage?.(uri);
  };

  return (
    <>
      <View className="relative">
        <Pressable
          disabled={!editable}
          onPress={handleOpenPicker}
          className="active:opacity-80"
        >
          <Avatar alt={`${name} avatar`} className={avatarClass}>
            <AvatarImage source={imageSource} />
            <AvatarFallback>
              <Text className="font-poppins-semibold text-xl text-neutral-600">
                {name.trim().charAt(0).toUpperCase() || "U"}
              </Text>
            </AvatarFallback>
          </Avatar>
        </Pressable>

        {editable && (
          <Pressable
            accessibilityLabel="Ubah foto profil"
            className="absolute -bottom-0.5 -right-0.5 size-6 items-center justify-center rounded-full border border-neutral-200 bg-white active:bg-neutral-100"
            hitSlop={8}
            onPress={handleOpenPicker}
          >
            <CameraIcon className="text-primary-300" size={14} />
          </Pressable>
        )}
      </View>

      {editable && onSelectImage ? (
        <AvatarPickerSheet
          ref={pickerSheetRef}
          onSelectImage={handleImageSelected}
        />
      ) : null}
    </>
  );
}
