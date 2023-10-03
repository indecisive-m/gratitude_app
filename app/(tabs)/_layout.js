import { Tabs, usePathname, useSegments } from "expo-router";
import { StyleSheet, StatusBar } from "react-native";
import { ThemeContext } from "../../context/Contexts";
// import { StatusBar } from "expo-status-bar";

import COLORS from "../../constants/COLORS";
import { useMemo, useState, useContext } from "react";
import { FontAwesome } from "@expo/vector-icons";

const HomeLayout = () => {
  const [theme, setTheme] = useState("dark");
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  const pathname = usePathname();

  const hiddenPathNames = ["/gratitudes/dailyinput", "/gratitudes/[edit]"];

  return (
    <ThemeContext.Provider value={value}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: COLORS[theme].medium,
          tabBarInactiveTintColor: COLORS[theme].secondary,
          tabBarStyle: {
            backgroundColor: COLORS[theme].backgroundColor,
            borderTopWidth: 0,
            display: hiddenPathNames.includes(pathname) ? "none" : "flex",
          },
        }}
      >
        <Tabs.Screen
          name="gratitudes"
          options={{
            title: "Daily Gratitude",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <FontAwesome
                name="archive"
                size={18}
                color={focused ? COLORS[theme].medium : COLORS[theme].secondary}
              />
            ),
          }}
        />
        <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      </Tabs>
      <StatusBar
        backgroundColor={COLORS[theme].backgroundColor}
        barStyle={"light-content"}
      />
    </ThemeContext.Provider>
  );
};

export default HomeLayout;
