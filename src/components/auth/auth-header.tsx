import { LinearGradient } from "expo-linear-gradient";
import { View, useWindowDimensions } from "react-native";
import Logo from "../../../assets/logo/mutacare-logo.svg";

export default function AuthHeader() {
  const { width: screenWidth } = useWindowDimensions();
  const circleSize = screenWidth * 1.5;
  const headerHeight = 170;

  return (
    <View
      style={{
        width: "100%",
        height: headerHeight,
        overflow: "hidden",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <LinearGradient
        colors={["#EDF1D6", "#C2FFC7"]}
        style={{
          width: circleSize,
          height: circleSize,
          borderRadius: circleSize / 2,
          position: "absolute",
          top: -(circleSize - headerHeight),
          left: -(circleSize - screenWidth) / 2,
        }}
      />
      <Logo width={76} height={76} style={{ position: "absolute" }} />
    </View>
  );
}