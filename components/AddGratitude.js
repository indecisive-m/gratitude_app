import { StyleSheet, Text, Pressable } from "react-native";
import { Link, useRouter } from "expo-router";
import { useContext } from "react";
import COLORS from "../constants/COLORS";
import { ThemeContext } from "../context/Contexts";
import {
  GestureDetector,
  Directions,
  Gesture,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

const AddGratitude = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = styling(theme);
  const router = useRouter();

  const swipe = Gesture.Fling()
    .direction(Directions.LEFT)
    .onEnd(() => {
      runOnJS(router.push)("/gratitudes/dailyinput");
    });

  return (
    <GestureDetector gesture={swipe}>
      <Link href={{ pathname: "/(tabs)/gratitudes/dailyinput" }} asChild>
        <Pressable style={styles.dailyContainer}>
          <Text style={styles.dailyText}>What are you grateful for today?</Text>
          <Text style={styles.clickText}>Press to add...</Text>
        </Pressable>
      </Link>
    </GestureDetector>
  );
};

export default AddGratitude;

const styling = (theme) =>
  StyleSheet.create({
    dailyContainer: {
      paddingBottom: 20,
      paddingHorizontal: 20,
      backgroundColor: COLORS[theme].backgroundColor,
    },
    dailyText: {
      fontSize: 20,
      color: COLORS[theme].primary,
    },
    clickText: {
      fontSize: 18,
      paddingTop: 10,
      color: COLORS[theme].secondary,
    },
  });
