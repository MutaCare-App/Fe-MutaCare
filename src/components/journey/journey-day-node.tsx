import { Text } from "@/components/ui/text";
import { Image, ImageSourcePropType, Pressable } from "react-native";

export type JourneyDayStatus = "complete" | "current" | "locked";

interface JourneyDayNodeProps {
  day: number;
  image: ImageSourcePropType;
  onPress: () => void;
  status: JourneyDayStatus;
  style: { left: number; top: number };
}

export function JourneyDayNode({
  day,
  image,
  onPress,
  status,
  style,
}: JourneyDayNodeProps) {
  const statusLabel =
    status === "complete"
      ? "selesai"
      : status === "current"
        ? "sedang berjalan"
        : "terkunci";

  return (
    <Pressable
      accessibilityLabel={`Hari ke ${day}, ${statusLabel}`}
      accessibilityRole="button"
      className="active:opacity-70"
      hitSlop={6}
      onPress={onPress}
      style={{
        alignItems: "center",
        height: 110,
        position: "absolute",
        width: 85,
        ...style,
      }}
    >
      <Image
        resizeMode="contain"
        source={image}
        style={{ height: 85, width: 85 }}
      />
      <Text
        className="mt-1 text-center font-poppins-semibold text-base text-neutral-800"
        numberOfLines={1}
        style={{ width: 85 }}
      >
        Hari ke {day}
      </Text>
    </Pressable>
  );
}
