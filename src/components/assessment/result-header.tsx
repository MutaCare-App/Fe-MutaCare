import { Text } from "@/components/ui/text";
import { Image, View } from "react-native";

interface ResultHeaderProps {
  title?: string;
  subtitle?: string;
}

export function ResultHeader({
  title = "Asesmen Selesai!",
  subtitle = "Terima Kasih Telah Menyelesaikan Asesmen. Kami Telah Menyiapkan Perjalanan Terapi Yang Sesuai Untukmu.",
}: ResultHeaderProps) {
  return (
    <View className="items-center w-full ">
      <View className="items-center justify-center mb-8 mt-2">
        <Image
          source={require("../../../assets/images/success-assessment.png")}
          className="w-70 h-70"
          resizeMode="contain"
        />
      </View>

      <View className="items-center px-2 mt-1">
        <Text className="font-feather-bold text-3xl text-primary-300 text-center">
          {title}
        </Text>
        <Text className="font-poppins text-neutral-700 text-center text-sm mt-1 leading-1">
          {subtitle}
        </Text>
      </View>
    </View>
  );
}
