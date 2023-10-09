import { StyleSheet, View, Text, TextInput } from "react-native";
import COLORS from "../constants/COLORS";
import { useContext } from "react";

import { ThemeContext } from "../context/Contexts";

const GratitudeInput = ({ handleGratitude, gratitude, name, defaultValue }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>{name}</Text>
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
      paddingTop: 10,
    },
    text: {
      fontSize: 24,
      paddingBottom: 10,
      color: COLORS[theme].secondary,
    },
    input: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      height: 200,
      fontSize: 20,
      textAlignVertical: "top",
      backgroundColor: COLORS[theme].grey,
      color: COLORS[theme].primary,
    },
    counter: {
      fontSize: 10,
      position: "absolute",
      bottom: 5,
      right: 10,
      color: COLORS[theme].secondary,
    },
  });
