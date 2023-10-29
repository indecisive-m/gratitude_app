import { StyleSheet, View, Text, TextInput } from "react-native";
import COLORS from "../constants/COLORS";
import { useContext } from "react";

import { ThemeContext } from "../context/Contexts";

const GratitudeInput = ({
  handleGratitude,
  gratitude,
  name,
  defaultValue,
  optional,
}) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);

  return (
    <View style={styles.wrapper}>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{name}</Text>
        {optional && <Text style={styles.optional}>optional</Text>}
      </View>
      <TextInput
        style={styles.input}
        placeholder="I am grateful for..."
        placeholderTextColor={
          theme === "dark" ? COLORS[theme].secondary : "#000"
        }
        multiline={true}
        defaultValue={defaultValue}
        maxLength={200}
        onChangeText={(text) => handleGratitude(text)}
      />
      <Text style={styles.counter}>{gratitude.length} / 200</Text>
    </View>
  );
};

export default GratitudeInput;

const styling = (theme) =>
  StyleSheet.create({
    wrapper: {
      paddingTop: 20,
    },
    text: {
      fontSize: 20,
      color: COLORS[theme].secondary,
      alignSelf: "baseline",
    },
    input: {
      borderRadius: 10,
      padding: 10,
      height: 180,
      fontSize: 18,
      textAlignVertical: "top",
      backgroundColor: COLORS[theme].grey,
      color: COLORS[theme].secondary,
    },
    counter: {
      fontSize: 10,
      position: "absolute",
      bottom: 5,
      right: 10,
      color: COLORS[theme].secondary,
    },
    optional: {
      fontSize: 10,
      color: COLORS[theme].secondary,
    },
    textWrapper: {
      flexDirection: "row",
      alignItems: "baseline",
      gap: 10,
      paddingBottom: 10,
    },
  });
