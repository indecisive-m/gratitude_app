import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  ActivityIndicator,
} from "react-native";
import { Link, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/COLORS";
import { useLocalSearchParams } from "expo-router";
import { useContext } from "react";
import { ThemeContext } from "../../../context/Contexts";
import GratitudeInput from "../../../components/GratitudeInput";
import * as SelectImage from "expo-image-picker";
import Animated, {
  withTiming,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

const edit = () => {
  const [mood, setMood] = useState("");
  const [firstGratitude, setFirstGratitude] = useState("");
  const [secondGratitude, setSecondGratitude] = useState("");
  const [thirdGratitude, setThirdGratitude] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);

  const { id } = useLocalSearchParams();
  const opacity = useSharedValue(1);

  useEffect(() => {
    setIsLoading(true);
    getItem();
    const timeout = setTimeout(() => {
      handleAnimation();
    }, 3000);
    setIsLoading(false);
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const getItem = async () => {
    const getItem = await AsyncStorage.getItem(id);

    const { mood, firstGratitude, secondGratitude, thirdGratitude, imageURI } =
      JSON.parse(getItem);

    setMood(mood);
    setFirstGratitude(firstGratitude);
    setSecondGratitude(secondGratitude);
    setThirdGratitude(thirdGratitude);
    setImageURI(imageURI);
  };

  const storeData = async () => {
    try {
      const data = JSON.stringify({
        firstGratitude,
        secondGratitude,
        thirdGratitude,
        mood,
        id,
        imageURI,
      });
      await AsyncStorage.setItem(`${id}`, data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFirstGratitude = (text) => {
    setFirstGratitude(text);
  };
  const handleSecondGratitude = (text) => {
    setSecondGratitude(text);
  };

  const handleThirdGratitude = (text) => {
    setThirdGratitude(text);
  };

  const pickImage = async () => {
    let result = await SelectImage.launchImageLibraryAsync({
      mediaTypes: SelectImage.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImageURI(result.assets[0].uri);
    }
  };

  const animatedStyles = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const handleAnimation = () => {
    opacity.value = withTiming(0, { duration: 1000 });
  };

  const showImage = !imageURI ? (
    <Text style={styles.text}>Add a photo? </Text>
  ) : (
    <>
      <ImageBackground source={{ uri: imageURI }} style={styles.image} />
      <Animated.Text style={[styles.imageText, animatedStyles]}>
        Click image to change
      </Animated.Text>
    </>
  );

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, backgroundColor: COLORS.dark.backgroundColor }}
      />
    );
  }

  return (
    <View>
      <Stack.Screen
        options={{ title: "Edit Gratitude", animation: "slide_from_bottom" }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <Pressable onPress={pickImage}>{showImage}</Pressable>
        <View>
          <View style={styles.emojiWrapper}>
            <Pressable onPress={() => setMood("sad")}>
              <MaterialCommunityIcons
                name="emoticon-sad"
                size={50}
                color={COLORS.mood.sad}
                style={mood === "sad" ? { opacity: 1 } : { opacity: 0.3 }}
              />
            </Pressable>
            <Pressable onPress={() => setMood("neutral")}>
              <MaterialCommunityIcons
                name="emoticon-neutral"
                size={50}
                color={COLORS.mood.neutral}
                style={mood === "neutral" ? { opacity: 1 } : { opacity: 0.3 }}
              />
            </Pressable>
            <Pressable onPress={() => setMood("happy")}>
              <MaterialCommunityIcons
                name="emoticon-happy"
                size={50}
                color={COLORS.mood.happy}
                style={mood === "happy" ? { opacity: 1 } : { opacity: 0.3 }}
              />
            </Pressable>
          </View>
        </View>

        <GratitudeInput
          name={"First Gratitude"}
          handleGratitude={handleFirstGratitude}
          gratitude={firstGratitude}
          defaultValue={firstGratitude}
        />
        <GratitudeInput
          name={"Second Gratitude"}
          handleGratitude={handleSecondGratitude}
          gratitude={secondGratitude}
          defaultValue={secondGratitude}
        />
        <GratitudeInput
          name={"Third Gratitude"}
          handleGratitude={handleThirdGratitude}
          gratitude={thirdGratitude}
          defaultValue={thirdGratitude}
        />
        <Link replace href={{ pathname: "/" }} asChild>
          <Pressable onPress={storeData}>
            <Text style={styles.text}>Submit</Text>
          </Pressable>
        </Link>
      </ScrollView>
    </View>
  );
};

export default edit;

const styling = (theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: COLORS[theme].backgroundColor,
    },
    text: {
      fontSize: 24,
      paddingBottom: 10,
      color: "#FFF",
    },
    input: {
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "black",
      padding: 10,
      height: 200,
      fontSize: 20,
      textAlignVertical: "top",
      position: "relative",
      color: "#FFF",
    },
    wrapper: {
      paddingTop: 10,
    },
    emojiWrapper: {
      flexDirection: "row",
      gap: 10,
      paddingVertical: 20,
    },
    emoji: {
      borderRadius: 50,
    },
    counter: {
      fontSize: 10,
      position: "absolute",
      bottom: 5,
      right: 10,
    },
    image: {
      flex: 1,
      height: 300,
      objectFit: "cover",
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
    },
    imageText: {
      position: "absolute",
      bottom: 10,
      left: 10,
      fontSize: 14,
      backgroundColor: "black",
      color: "white",
      padding: 10,
      borderRadius: 50,
    },
  });
