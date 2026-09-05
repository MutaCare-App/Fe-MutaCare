import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { Tabs, useRouter } from "expo-router";
import { ChartBarIcon } from "phosphor-react-native/src/icons/ChartBar";
import { HouseIcon } from "phosphor-react-native/src/icons/House";
import { SignpostIcon } from "phosphor-react-native/src/icons/Signpost";
import { UserIcon } from "phosphor-react-native/src/icons/User";
import { useEffect } from "react";
import { Platform } from "react-native";

iconWithClassName(HouseIcon);
iconWithClassName(SignpostIcon);
iconWithClassName(ChartBarIcon);
iconWithClassName(UserIcon);

export default function DashboardTabsLayout() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.replace("/auth/login");
    } else {
      void fetchProfile();
    }
  }, [fetchProfile, token, hasHydrated, router]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#609966",
        tabBarInactiveTintColor: "#A1A1A1",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          height: Platform.OS === "ios" ? 96 : 96,
          paddingBottom: Platform.OS === "ios" ? 28 : 10,
          paddingTop: 8,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.05,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Beranda",
          tabBarIcon: ({ color, focused }) => (
            <HouseIcon
              size={24}
              color={color as string}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="journey"
        options={{
          title: "Perjalanan",
          tabBarIcon: ({ color, focused }) => (
            <SignpostIcon
              size={24}
              color={color as string}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: "Kemajuan",
          tabBarIcon: ({ color, focused }) => (
            <ChartBarIcon
              size={24}
              color={color as string}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color, focused }) => (
            <UserIcon
              size={24}
              color={color as string}
              weight={focused ? "fill" : "regular"}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate("profile", { screen: "index" });
          },
        })}
      />
    </Tabs>
  );
}
