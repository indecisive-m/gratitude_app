import { View, Text } from "react-native";
import { Stack, Tabs } from "expo-router";
import Toast from "react-native-toast-message";
import COLORS from "../../../constants/COLORS";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { ToastConfig } from "../../../constants/ToastConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const GratitudeLayout = () => {
  return (
    <>
      <Stack
        initialRouteName="gratitudes"
        screenOptions={{
          headerShown: false,
          animation: "none",
          // animationDuration: 500,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      />
      <Toast config={ToastConfig} />
    </>
  );
};

export default GratitudeLayout;
