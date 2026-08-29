import { View } from "react-native";

interface ResultBadgeIconProps {
  children: React.ReactNode;
}

export function ResultBadgeIcon({ children }: ResultBadgeIconProps) {
  return (
    <View
      className="items-center justify-center bg-white border border-neutral-300 shrink-0"
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        overflow: "hidden",
      }}
    >
      {children}
    </View>
  );
}
