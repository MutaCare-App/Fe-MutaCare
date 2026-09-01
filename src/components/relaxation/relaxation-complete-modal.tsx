import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { iconWithClassName } from "@/lib/iconWithClassName";
import { ConfettiIcon } from "phosphor-react-native/src/icons/Confetti";
import { Modal, View } from "react-native";

iconWithClassName(ConfettiIcon);

interface RelaxationCompleteModalProps {
  onBack: () => void;
  onContinue: () => void;
  visible: boolean;
}

export function RelaxationCompleteModal({
  onBack,
  onContinue,
  visible,
}: RelaxationCompleteModalProps) {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <View className="flex-1 items-center justify-center bg-black/55 px-3.5">
        <View className="w-full rounded-[20px] bg-white p-5">
          <View className="flex-row items-center gap-1.5">
            <Text className="font-poppins-bold text-[15px] text-neutral-800">
              Relaksasi Selesai!
            </Text>
            <ConfettiIcon className="text-primary-300" size={20} weight="fill" />
          </View>

          <Text className="mt-6 font-poppins text-[13px] leading-5 text-neutral-700">
            Tubuhmu Sekarang Lebih Rileks Dan Siap Untuk{"\n"}Latihan Berikutnya.
          </Text>

          <View className="mt-5 flex-row justify-end gap-3">
            <Button
              className="h-10 min-w-24 rounded-md border border-neutral-300 bg-neutral-200 active:bg-neutral-300"
              onPress={onBack}
            >
              <Text className="font-poppins-semibold text-xs text-neutral-700">
                Kembali
              </Text>
            </Button>
            <Button
              className="h-10 min-w-24 rounded-md bg-primary-300 active:bg-primary-400"
              onPress={onContinue}
            >
              <Text className="font-poppins-semibold text-xs text-white">Lanjut</Text>
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}
