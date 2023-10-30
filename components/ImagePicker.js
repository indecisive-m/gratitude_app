import { useState, useContext } from "react";
import { Text, Pressable, Image, StyleSheet } from "react-native";
import * as SelectImage from "expo-image-picker";
import { ThemeContext } from "../context/Contexts";
import COLORS from "../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";

const ImagePicker = ({ handleImage }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [image, setImage] = useState(null);

  const styles = styling(theme);

  const addImageText = !image ? "Add a photo?" : "Change selected photo";

  const pickImage = async () => {
    let result = await SelectImage.launchImageLibraryAsync({
      mediaTypes: SelectImage.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      handleImage(result.assets[0].uri);
    }
  };

  return (
    <>
      {image && <Image source={{ uri: image }} style={styles.image} />}
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>{addImageText}</Text>
        <Ionicons name="images" style={styles.icon} />
      </Pressable>
    </>
  );
};
export default ImagePicker;

const styling = (theme) =>
  StyleSheet.create({
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      backgroundColor: COLORS[theme].grey,
      borderRadius: 10,
      marginVertical: 20,
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      // gap: 20,
    },
    text: {
      color: COLORS[theme].secondary,
      fontSize: 16,
    },
    image: {
      width: "100%",
      height: 300,
      marginTop: 20,
      borderRadius: 10,
      alignSelf: "center",
    },
    icon: {
      color: COLORS[theme].secondary,
      fontSize: 24,
    },
  });
