import ConfettiArtwork from "@/assets/images/journey/confetti.svg";
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
import { View } from "react-native";

interface JourneyWeekCompleteDialogProps {
  onContinue: () => void;
  onOpenChange: (open: boolean) => void;
  open: boolean;
  week: number;
}

export function JourneyWeekCompleteDialog({
  onContinue,
  onOpenChange,
  open,
  week,
}: JourneyWeekCompleteDialogProps) {
  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="max-w-[366px] gap-5 rounded-[20px] p-5">
        <AlertDialogHeader className="items-start gap-6">
          <View className="flex-row items-center gap-1.5">
            <AlertDialogTitle className="text-left text-sm tracking-[0.8px]">
              Minggu Ke-{week} Selesai
            </AlertDialogTitle>
            <ConfettiArtwork height={24} width={24} />
          </View>
          <AlertDialogDescription className="text-left text-xs leading-[15px] tracking-[0.8px] text-neutral-800">
            Selamat! Kamu telah menyelesaikan semua latihan pada Minggu Ke-{week}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2.5 pt-0">
          <AlertDialogCancel className="h-[38px] w-[97px] flex-none rounded-md bg-neutral-200 px-2">
            <Text className="font-poppins-semibold text-xs text-neutral-800">Kembali</Text>
          </AlertDialogCancel>
          <AlertDialogAction
            className="h-[38px] w-[97px] flex-none rounded-md bg-primary-300 px-2 active:bg-primary-400"
            onPress={onContinue}
          >
            <Text className="font-poppins-semibold text-xs text-white">Lanjut</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
