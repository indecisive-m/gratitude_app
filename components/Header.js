import { StyleSheet, Text, View, Pressable, Easing } from "react-native";
import COLORS from "../constants/COLORS";
import { useState, useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import Animated, {
  withTiming,
  withSequence,
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from "react-native-reanimated";
import { TextInput } from "react-native-gesture-handler";
import { ThemeContext } from "../context/Contexts";

const Header = ({ handleSearch, toggleInput, searchBarShown }) => {
  const [finished, setFinished] = useState(false);
  const opacity = useSharedValue(1);
  const width = useSharedValue("14%");
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = styling(theme);

  const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const animatedSearch = useAnimatedStyle(() => ({
    width: width.value,
  }));

  const handleAnimation = () => {
    opacity.value = withTiming(0, { duration: 500 }, () => {
      runOnJS(nextAnimation)();
    });
  };

  const nextAnimation = () => {
    setFinished(true),
      (width.value = withTiming("100%", { duration: 1000 }, () => {
        runOnJS(searchBar)(true);
      }));
  };

  const searchBar = () => {
    searchBarShown(true);
  };

  return (
    <View style={styles.container}>
      <View>
        {!finished && (
          <Animated.Text style={[styles.text, animatedStyles]}>
            Gratitude Journal
          </Animated.Text>
        )}
      </View>
      {!toggleInput && (
        <AnimatedPressable
          onPressOut={handleAnimation}
          style={[styles.search, animatedSearch]}
        >
          <AntDesign name="search1" size={24} color={COLORS.dark.primary} />
        </AnimatedPressable>
      )}
      {toggleInput && (
        <>
          <Text style={styles.hidden}>Search</Text>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor={COLORS.dark.secondary}
            onChangeText={(text) => handleSearch(text)}
            autoFocus={true}
          />
        </>
      )}
    </View>
  );
};

export default Header;

const styling = (theme) =>
  StyleSheet.create({
    container: {
      paddingBottom: 20,
      paddingHorizontal: 20,
      borderBottomWidth: 1,
      backgroundColor: COLORS[theme].backgroundColor,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    text: {
      fontSize: 24,
      color: COLORS[theme].primary,
    },
    search: {
      backgroundColor: COLORS[theme].grey,
      padding: 10,
      borderRadius: 50,
      borderColor: COLORS[theme].medium,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "flex-end",
      position: "relative",
    },
    input: {
      backgroundColor: COLORS[theme].grey,
      fontSize: 20,
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderRadius: 50,
      color: COLORS[theme].light,
      borderColor: COLORS[theme].medium,
      borderWidth: 1,
      justifyContent: "center",
      alignItems: "center",
      // position: "relative",
    },
    hidden: {
      position: "absolute",
      width: 1,
      height: 1,
      margin: -1,
      zIndex: -10000,
      overflow: "hidden",
      opacity: 0.00000001,
      pointerEvents: "none",
    },
  });
