import { useState } from "react";
import { Text, Pressable, Image } from "react-native";
import * as SelectImage from "expo-image-picker";

const ImagePicker = ({ handleImage }) => {
  const [image, setImage] = useState(null);

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
      <Pressable
        style={{ backgroundColor: "red", padding: 10 }}
        onPress={pickImage}
      >
        <Text>{addImageText}</Text>
      </Pressable>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 200, height: 200, margin: 10 }}
        />
      )}
    </>
  );
};
export default ImagePicker;
