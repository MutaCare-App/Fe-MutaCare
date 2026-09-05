import { iconWithClassName } from "@/lib/iconWithClassName";
import { useAuthStore } from "@/store/useAuthStore";
import { Tabs, useRouter } from "expo-router";
import { ChartBarIcon } from "phosphor-react-native/src/icons/ChartBar";
import { HouseIcon } from "phosphor-react-native/src/icons/House";
import { SignpostIcon } from "phosphor-react-native/src/icons/Signpost";
import { UserIcon } from "phosphor-react-native/src/icons/User";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

iconWithClassName(HouseIcon);
iconWithClassName(SignpostIcon);
iconWithClassName(ChartBarIcon);
iconWithClassName(UserIcon);

export default function DashboardTabsLayout() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const fetchProfile = useAuthStore((state) => state.fetchProfile);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!hasHydrated) return;

    if (!token) {
      router.replace("/auth/login");
    } else {
      void fetchProfile();
    }
  }, [fetchProfile, token, hasHydrated, router]);

  // Dynamically calculate bottom padding & tab bar height based on device safe area insets
  const bottomPadding = insets.bottom > 0 ? insets.bottom + 2 : 10;
  const tabHeight = 56 + bottomPadding;

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#609966",
        tabBarInactiveTintColor: "#9CA3AF",
        tabBarStyle: {
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          borderTopColor: "#F3F4F6",
          height: tabHeight,
          paddingBottom: bottomPadding,
          paddingTop: 6,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.06,
          shadowRadius: 10,
          elevation: 8,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 2,
        },
        tabBarLabelStyle: {
          fontFamily: "Poppins-Medium",
          fontSize: 11,
          marginTop: 2,
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
        listeners={({ navigation }) => ({
          tabPress: () => {
            navigation.navigate("progress", { screen: "index" });
          },
        })}
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
