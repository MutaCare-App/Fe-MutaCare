import { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface PaginationDotsProps {
  totalSteps: number;
  currentStep: number;
}

export default function PaginationDots({
  totalSteps,
  currentStep,
}: PaginationDotsProps) {
  return (
    <View style={{ flexDirection: "row", gap: 8 }}>
      {Array.from({ length: totalSteps }).map((_, index) => (
        <Dot key={index} isActive={index === currentStep} />
      ))}
    </View>
  );
}

function Dot({ isActive }: { isActive: boolean }) {
  const width = useSharedValue(isActive ? 24 : 8);
  const opacity = useSharedValue(isActive ? 1 : 0.4);

  useEffect(() => {
    width.value = withTiming(isActive ? 24 : 8, { duration: 250 });
    opacity.value = withTiming(isActive ? 1 : 0.4, { duration: 250 });
  }, [isActive]);

  const animatedStyle = useAnimatedStyle(() => ({
    width: width.value,
    opacity: opacity.value,
  }));

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: "#F6C75A", 
        },
        animatedStyle,
      ]}
    />
  );
}