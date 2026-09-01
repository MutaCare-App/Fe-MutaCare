import {
  BottomSheetModal,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import * as ImagePicker from "expo-image-picker";
import { CameraIcon } from "phosphor-react-native/src/icons/Camera";
import { ImageIcon } from "phosphor-react-native/src/icons/Image";
import React, { forwardRef, useImperativeHandle, useRef } from "react";
import { Alert, Pressable, View } from "react-native";

iconWithClassName(CameraIcon);
iconWithClassName(ImageIcon);

interface AvatarPickerSheetProps {
  onSelectImage: (uri: string) => void;
}

export const AvatarPickerSheet = forwardRef<
  BottomSheetModal,
  AvatarPickerSheetProps
>(({ onSelectImage }, ref) => {
  const internalRef = useRef<BottomSheetModal>(null);

  useImperativeHandle(ref, () => internalRef.current as BottomSheetModal);

  const handleTakePhoto = async () => {
    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Izin Ditolak",
          "Izin akses kamera diperlukan untuk mengambil foto profil baru."
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onSelectImage(result.assets[0].uri);
      }
      internalRef.current?.dismiss();
    } catch (error) {
      Alert.alert("Gagal", "Terjadi kesalahan saat membuka kamera.");
    }
  };

  const handlePickFromGallery = async () => {
    try {
      const permission =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert(
          "Izin Ditolak",
          "Izin akses galeri diperlukan untuk memilih foto profil."
        );
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        onSelectImage(result.assets[0].uri);
      }
      internalRef.current?.dismiss();
    } catch (error) {
      Alert.alert("Gagal", "Terjadi kesalahan saat membuka galeri.");
    }
  };

  return (
    <BottomSheetModal
      ref={internalRef}
      enableDynamicSizing
      enablePanDownToClose
    >
      <BottomSheetView className="px-6 pt-2 pb-8">
        {/* Title */}
        <Text className="font-poppins-bold text-neutral-800 text-lg text-center">
          Ubah Foto Profil
        </Text>
        <Text className="font-poppins text-neutral-600 text-xs text-center mt-1 mb-5">
          Pilih sumber foto yang ingin Anda gunakan
        </Text>

        {/* Option 1: Kamera */}
        <Pressable
          onPress={handleTakePhoto}
          className="flex-row items-center gap-4 p-3.5 rounded-2xl bg-neutral-100/80 active:bg-neutral-200/80 mb-3"
        >
          <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
            <CameraIcon size={24} className="text-primary-300" />
          </View>
          <View className="flex-1">
            <Text className="font-poppins-semibold text-neutral-800 text-sm">
              Ambil dari Kamera
            </Text>
            <Text className="font-poppins text-neutral-500 text-xs mt-0.5">
              Gunakan kamera untuk mengambil foto baru
            </Text>
          </View>
        </Pressable>

        {/* Option 2: Galeri */}
        <Pressable
          onPress={handlePickFromGallery}
          className="flex-row items-center gap-4 p-3.5 rounded-2xl bg-neutral-100/80 active:bg-neutral-200/80"
        >
          <View className="w-12 h-12 rounded-full bg-white items-center justify-center">
            <ImageIcon size={24} className="text-secondary-300" />
          </View>
          <View className="flex-1">
            <Text className="font-poppins-semibold text-neutral-800 text-sm">
              Pilih dari Galeri
            </Text>
            <Text className="font-poppins text-neutral-500 text-xs mt-0.5">
              Pilih foto dari penyimpanan perangkat
            </Text>
          </View>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

AvatarPickerSheet.displayName = "AvatarPickerSheet";
