import { Tabs, usePathname, useSegments } from "expo-router";
import { StyleSheet, StatusBar } from "react-native";
import { ThemeContext } from "../../context/Contexts";

import COLORS from "../../constants/COLORS";
import { useMemo, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

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
          tabBarActiveTintColor: COLORS[theme].backgroundColor,
          tabBarInactiveTintColor: COLORS[theme].secondary,
          tabBarStyle: {
            backgroundColor: COLORS[theme].backgroundColor,
            borderTopWidth: 0,
          },
          tabBarHideOnKeyboard: true,
          tabBarActiveBackgroundColor: COLORS[theme].primary,
          tabBarItemStyle: {
            borderRadius: 5,
          },
          gestureEnabled: "true",
        }}
      >
        <Tabs.Screen
          name="gratitudes"
          options={{
            title: "Gratitudes",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="open-book"
                size={20}
                color={focused ? COLORS[theme].grey : COLORS[theme].secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="charts"
          options={{
            title: "Charts",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <AntDesign
                name="piechart"
                size={20}
                color={focused ? COLORS[theme].grey : COLORS[theme].secondary}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="breathing"
          options={{
            title: "Breathing",
            headerShown: false,
            unmountOnBlur: true,
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="heart"
                size={20}
                color={focused ? COLORS[theme].grey : COLORS[theme].secondary}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Entypo
                name="cog"
                size={20}
                color={focused ? COLORS[theme].grey : COLORS[theme].secondary}
              />
            ),
          }}
        />
      </Tabs>
      <StatusBar
        backgroundColor={COLORS[theme].backgroundColor}
        barStyle={"light-content"}
      />
    </ThemeContext.Provider>
  );
};

export default HomeLayout;
