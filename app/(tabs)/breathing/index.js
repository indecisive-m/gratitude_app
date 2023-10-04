import {
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { useContext } from "react";
import { Stack } from "expo-router";
import { ThemeContext } from "../../../context/Contexts";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
} from "react-native-reanimated";

import COLORS from "../../../constants/COLORS";

const index = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { height, width } = useWindowDimensions();

  const styles = styling(theme, height, width);

  const opacity1 = useSharedValue(1);
  const opacity2 = useSharedValue(1);
  const opacity3 = useSharedValue(1);

  const ringOneAnimation = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const ringTwoAnimation = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const ringThreeAnimation = useAnimatedStyle(() => ({
    opacity: opacity3.value,
  }));

  const handleAnimation = () => {
    opacity3.value = withSequence(
      withTiming(1, { duration: 1000 }),
      withTiming(0, { duration: 1000 })
    );

    opacity2.value = withDelay(
      2000,
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      )
    );
    opacity1.value = withDelay(
      4000,
      withSequence(
        withTiming(1, { duration: 1000 }),
        withTiming(0, { duration: 1000 })
      )
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.ringWrapper}>
        <Animated.View
          style={[styles.ringOne, styles.ring, ringOneAnimation]}
        ></Animated.View>
        <Animated.View
          style={[styles.ringTwo, styles.ring, ringTwoAnimation]}
        ></Animated.View>
        <Animated.View
          style={[styles.ringThree, styles.ring, ringThreeAnimation]}
        ></Animated.View>
      </View>
      <Pressable onPress={handleAnimation}>
        <Text style={{ color: "white" }}>Press</Text>
      </Pressable>
    </View>
  );
};

export default index;

const styling = (theme, height, w) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[theme].backgroundColor,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    text: { color: COLORS[theme].primary },
    ringWrapper: {
      position: "relative",
    },
    ring: {
      borderWidth: 5,
      borderRadius: 1000,
      borderColor: COLORS[theme].secondary,
      //   justifyContent: "center",
      //   alignItems: "center",
    },
    ringOne: {
      height: 300,
      width: 300,
      position: "relative",
    },
    ringTwo: {
      height: 200,
      width: 200,
      position: "absolute",
    },
    ringThree: {
      height: 100,
      width: 100,
      position: "absolute",
    },
  });
