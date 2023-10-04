import { View, Text } from "react-native";
import { Stack, Tabs } from "expo-router";
import Toast from "react-native-toast-message";

const BreathingLayout = () => {
  return (
    <>
      <Stack
        initialRouteName="breathing"
        screenOptions={{
          headerShown: false,
          animation: "none",
          // animationDuration: 500,
        }}
      />
      <Toast />
    </>
  );
};

export default BreathingLayout;
