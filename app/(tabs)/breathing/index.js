import { Pressable, StyleSheet, Text, View, StatusBar } from "react-native";
import { useContext, useState } from "react";
import { Stack, useRouter } from "expo-router";
import { ThemeContext } from "../../../context/Contexts";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";

import COLORS from "../../../constants/COLORS";

const index = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const [animationPlaying, setAnimationPlaying] = useState(false);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [text, setText] = useState("");
  const [repetitions, setRepetitions] = useState(140000);
  const [counter, setCounter] = useState(0);

  const router = useRouter();

  const onLayout = (e) => {
    let { height, width } = e.nativeEvent.layout;
    setHeight(height);
    setWidth(width);
  };

  const styles = styling(theme, height, width);

  const opacity1 = useSharedValue(0);
  const opacity2 = useSharedValue(0);
  const opacity3 = useSharedValue(0);
  const opacity4 = useSharedValue(0);

  const ringOneAnimation = useAnimatedStyle(() => ({
    opacity: opacity1.value,
  }));

  const ringTwoAnimation = useAnimatedStyle(() => ({
    opacity: opacity2.value,
  }));

  const ringThreeAnimation = useAnimatedStyle(() => ({
    opacity: opacity3.value,
  }));

  const ringFourAnimation = useAnimatedStyle(() => ({
    opacity: opacity4.value,
  }));

  const breatheInAnimation = () => {
    setAnimationPlaying(true);
    setCounter((prev) => prev + 1);

    setText("Breathe In for 4 Seconds");

    opacity4.value = withTiming(1, { duration: 1000 });

    opacity3.value = withDelay(1000, withTiming(1, { duration: 1000 }));

    opacity2.value = withDelay(2000, withTiming(1, { duration: 1000 }));

    opacity1.value = withDelay(
      3000,
      withTiming(1, { duration: 1000 }, () => runOnJS(holdAnimation)())
    );
  };

  const holdAnimation = () => {
    setText("Hold for 4 Seconds");
    opacity4.value = withSequence(
      withTiming(0.3, { duration: 2000 }),
      withTiming(1, { duration: 2000 })
    );
    opacity3.value = withSequence(
      withTiming(0.3, { duration: 2000 }),
      withTiming(1, { duration: 2000 })
    );
    opacity2.value = withSequence(
      withTiming(0.3, { duration: 2000 }),
      withTiming(1, { duration: 2000 })
    );
    opacity1.value = withSequence(
      withTiming(0.3, { duration: 2000 }),
      withTiming(1, { duration: 2000 })
    );
    setTimeout(() => {
      breatheOutAnimation();
    }, 4000);
  };

  const breatheOutAnimation = () => {
    setText("Breathe Out for 6 Seconds");
    opacity1.value = withTiming(0, { duration: 1500 });
    opacity2.value = withDelay(1500, withTiming(0, { duration: 1500 }));
    opacity3.value = withDelay(3000, withTiming(0, { duration: 1500 }));
    opacity4.value = withDelay(4500, withTiming(0, { duration: 1500 }));
  };

  const breathingAnimation = () => {
    breatheInAnimation();

    const breathing = setInterval(breatheInAnimation, 14000);

    setTimeout(() => {
      clearInterval(breathing);
      router.replace("/breathing/");
    }, repetitions);
  };

  const stopAnimation = () => {
    router.replace("/breathing/");
  };

  const button = !animationPlaying ? (
    <Pressable onPress={breathingAnimation}>
      <Text style={styles.button}>Start</Text>
    </Pressable>
  ) : (
    <Pressable onPress={stopAnimation}>
      <Text style={styles.button}>Stop</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <Text style={styles.text}>Deep Breathing</Text>
      <Text style={styles.breathingText}>{text}</Text>
      <View style={styles.ringWrapper} onLayout={onLayout}>
        <Animated.View
          style={[styles.ringOne, styles.ring, ringOneAnimation]}
        ></Animated.View>
        <Animated.View
          style={[styles.ringTwo, styles.ring, ringTwoAnimation]}
        ></Animated.View>
        <Animated.View
          style={[styles.ringThree, styles.ring, ringThreeAnimation]}
        ></Animated.View>
        <Animated.View
          style={[styles.ringFour, styles.ring, ringFourAnimation]}
        ></Animated.View>
      </View>
      {button}
      <Text style={styles.counter}>{`${counter} / 10`}</Text>
      <StatusBar
        backgroundColor={COLORS[theme].backgroundColor}
        barStyle={"light-content"}
      />
    </View>
  );
};

export default index;

const styling = (theme, height, width) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[theme].backgroundColor,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
    },
    text: {
      color: COLORS[theme].primary,
      fontSize: 24,
    },
    breathingText: {
      color: COLORS[theme].primary,
      fontSize: 18,
      padding: 20,
    },
    ringWrapper: {
      position: "relative",
      flex: 1,
      marginVertical: 10,
    },
    ring: {
      borderWidth: 5,
      borderRadius: 1000,
      borderColor: COLORS[theme].medium,
      //   justifyContent: "center",
      //   alignItems: "center",
    },
    ringOne: {
      position: "absolute",
      height: 275,
      width: 275,
      top: height / 2 - 137.5,
      left: width / 2 - 137.5,
    },
    ringTwo: {
      height: 200,
      width: 200,
      position: "absolute",
      top: height / 2 - 100,
      left: width / 2 - 100,
    },
    ringThree: {
      height: 125,
      width: 125,
      position: "absolute",
      top: height / 2 - 62.5,
      left: width / 2 - 62.5,
    },
    ringFour: {
      height: 50,
      width: 50,
      position: "absolute",
      top: height / 2 - 25,
      left: width / 2 - 25,
    },
    button: {
      color: COLORS[theme].backgroundColor,
      fontSize: 16,
      backgroundColor: COLORS[theme].medium,
      paddingHorizontal: 30,
      paddingVertical: 10,
      borderRadius: 10,
    },
    counter: {
      fontSize: 16,
      color: COLORS[theme].primary,
      paddingTop: 10,
    },
  });
