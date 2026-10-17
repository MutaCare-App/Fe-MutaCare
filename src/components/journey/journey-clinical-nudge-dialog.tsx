import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { PlantIcon } from "phosphor-react-native/src/icons/Plant";
import React from "react";
import { View } from "react-native";

iconWithClassName(PlantIcon);

export interface JourneyClinicalNudgeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  targetDay: number;
  onRest: () => void;
  onContinue: () => void;
}

export function JourneyClinicalNudgeDialog({
  open,
  onOpenChange,
  targetDay,
  onRest,
  onContinue,
}: JourneyClinicalNudgeDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="max-w-[366px] gap-4 rounded-[24px] p-6 bg-white border border-neutral-100 shadow-xl">
        <AlertDialogHeader className="items-start gap-3">
          <View className="flex-row items-center gap-2">
            <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center">
              <PlantIcon size={18} className="text-emerald-600" weight="fill" />
            </View>
            <AlertDialogTitle className="text-left font-feather-bold text-lg text-primary-300">
              Target Hari Ini Selesai!
            </AlertDialogTitle>
          </View>

          <AlertDialogDescription className="text-left font-poppins text-xs leading-5 text-neutral-700">
            Kerja bagus! Secara psikologis, sistem saraf dan pikiranmu membutuhkan waktu jeda (<Text className="font-poppins-semibold text-neutral-800">Spacing Effect</Text>) agar latihan hari ini terendapkan dengan optimal.
          </AlertDialogDescription>

          <View className="w-full bg-emerald-50/70 border border-emerald-200/60 rounded-xl p-3">
            <Text className="font-poppins-medium text-[11px] leading-4 text-emerald-800">
              💡 <Text className="font-poppins-semibold">Rekomendasi Klinis:</Text> Disarankan untuk beristirahat hingga besok dan mempraktikkan kenyamanan bicaramu hari ini di situasi nyata.
            </Text>
          </View>
        </AlertDialogHeader>

        <AlertDialogFooter className="flex-col gap-2.5 pt-2">
          {/* Option 1: Rest until tomorrow (Recommended) */}
          <AlertDialogAction
            className="h-11 w-full rounded-xl bg-primary-300 active:bg-primary-400 justify-center items-center"
            onPress={onRest}
          >
            <Text className="font-poppins-semibold text-xs text-white">
              Istirahat Sampai Besok (Disarankan)
            </Text>
          </AlertDialogAction>

          {/* Option 2: Continue anyway for practice / demo */}
          <AlertDialogCancel
            className="h-10 w-full rounded-xl border border-neutral-200 bg-neutral-50 active:bg-neutral-100 justify-center items-center"
            onPress={onContinue}
          >
            <Text className="font-poppins text-xs text-neutral-600">
              Tetap Lanjut ke Hari {targetDay}
            </Text>
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
