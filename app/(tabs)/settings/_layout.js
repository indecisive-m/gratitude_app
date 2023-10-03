import { View, Text } from "react-native";
import { Stack, Tabs } from "expo-router";
import Toast from "react-native-toast-message";
import { useMemo, useState } from "react";

const SettingsLayout = () => {
  return <Stack initialRouteName="settings" />;
};

export default SettingsLayout;
