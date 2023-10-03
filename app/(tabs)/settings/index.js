import { StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import React from "react";

const index = () => {
  return (
    <View>
      <Stack.Screen />
      <Text>settings</Text>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
