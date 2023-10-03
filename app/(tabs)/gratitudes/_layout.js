import { View, Text } from "react-native";
import { Stack, Tabs } from "expo-router";
import Toast from "react-native-toast-message";
import COLORS from "../../../constants/COLORS";

const GratitudeLayout = () => {
  return (
    <>
      <Stack
        initialRouteName="gratitudes"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_bottom",
        }}
      />
      <Toast />
    </>
  );
};

export default GratitudeLayout;
