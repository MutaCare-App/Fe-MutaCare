import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { CaretRightIcon } from "phosphor-react-native/src/icons/CaretRight";
import { SignOutIcon } from "phosphor-react-native/src/icons/SignOut";
import * as React from "react";
import { Pressable, View } from "react-native";

iconWithClassName(SignOutIcon);
iconWithClassName(CaretRightIcon);

interface ProfileSignoutDialogProps {
  onConfirmLogout: () => void;
}

export function ProfileSignoutDialog({
  onConfirmLogout,
}: ProfileSignoutDialogProps) {
  return (
    <View className="mt-auto">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Keluar dari akun"
            className="h-12 flex-row items-center active:opacity-60"
          >
            <View className="w-8 items-start">
              <SignOutIcon className="text-red-500" size={20} />
            </View>
            <Text className="flex-1 font-poppins text-[13px] text-neutral-700">
              Keluar
            </Text>
            <CaretRightIcon className="text-neutral-700" size={20} />
          </Pressable>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Konfirmasi Keluar</AlertDialogTitle>
            <AlertDialogDescription>
              Apakah Anda yakin ingin keluar dari akun MutaCare?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>
              <Text className="font-poppins-semibold text-sm text-neutral-700">
                Batal
              </Text>
            </AlertDialogCancel>
            <AlertDialogAction onPress={onConfirmLogout}>
              <Text className="font-poppins-semibold text-sm text-white">
                Keluar
              </Text>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </View>
  );
}
