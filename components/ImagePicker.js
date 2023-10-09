import { useState, useContext } from "react";
import { Text, Pressable, Image, StyleSheet } from "react-native";
import * as SelectImage from "expo-image-picker";
import { ThemeContext } from "../context/Contexts";
import COLORS from "../constants/COLORS";

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
      <Pressable style={styles.button} onPress={pickImage}>
        <Text style={styles.text}>{addImageText}</Text>
      </Pressable>

      {image && <Image source={{ uri: image }} style={styles.image} />}
    </>
  );
};
export default ImagePicker;

const styling = (theme) =>
  StyleSheet.create({
    button: {
      padding: 10,
      backgroundColor: COLORS[theme].grey,
      borderRadius: 10,
      marginVertical: 10,
    },
    text: {
      color: COLORS[theme].primary,
      fontSize: 16,
    },
    image: {
      width: "100%",
      height: 300,
      marginBottom: 10,
      borderRadius: 10,
      alignSelf: "center",
    },
  });
