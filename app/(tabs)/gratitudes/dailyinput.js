import { View, Text, StyleSheet, Pressable } from "react-native";
import {
  Link,
  Stack,
  useNavigation,
  usePathname,
  useRouter,
} from "expo-router";
import * as SQLite from "expo-sqlite";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState, useContext, useLayoutEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/COLORS";
import Toast from "react-native-toast-message";
import ImagePicker from "../../../components/ImagePicker";
import { ThemeContext } from "../../../context/Contexts";
import GratitudeInput from "../../../components/GratitudeInput";
import Database from "../../../constants/Database";

const dailyinput = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);

  const router = useRouter();

  const db = Database;

  const [mood, setMood] = useState("");

  const [firstGratitude, setFirstGratitude] = useState("");
  const [secondGratitude, setSecondGratitude] = useState("");
  const [thirdGratitude, setThirdGratitude] = useState("");
  const [imageURI, setImageURI] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  const storeData = () => {
    if (mood && firstGratitude) {
      const date = new Date();
      const dateID = date.toISOString();

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO newGratitude (firstGratitude, secondGratitude, thirdGratitude, mood, imageURI, date) values (?, ?, ?, ?, ?, ?)",
          [
            firstGratitude,
            secondGratitude,
            thirdGratitude,
            mood,
            imageURI,
            dateID,
          ],
          (txObj, resultSet) => {
            setFirstGratitude("");
            setSecondGratitude("");
            setThirdGratitude("");
            setImageURI("");
            setMood("");
            router.replace((href = "/gratitudes"));
          },
          (txObj, error) => console.log(error)
        );
      });
    } else {
      Toast.show({
        type: "error",
        text1: "Please select a mood and enter at least one gratitude",
        position: "bottom",
        autoHide: true,
        visibilityTime: 2000,
      });
    }
  };

  const handleFirstGratitude = (text) => {
    setFirstGratitude(text);
    setShowSecond(true);
  };

  const handleSecondGratitude = (text) => {
    setSecondGratitude(text);
    setShowThird(true);
  };

  const handleThirdGratitude = (text) => {
    setThirdGratitude(text);
  };

  const handleMood = (input) => {
    setMood(input);
  };

  const handleImage = async (uri) => {
    setImageURI(uri);
  };

  return (
    <View style={{ flex: 1 }}>
      <Stack.Screen
        options={{
          title: "Daily Gratitude",
          animation: "slide_from_bottom",
        }}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          <Text style={styles.text}>How has your day been?</Text>
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
        <View>
          <Text style={styles.text}>
            What three things are you grateful for today?
          </Text>
        </View>
        <GratitudeInput
          name={"First Gratitude"}
          handleGratitude={handleFirstGratitude}
          gratitude={firstGratitude}
        />

        {showSecond && (
          <GratitudeInput
            name={"Second Gratitude"}
            handleGratitude={handleSecondGratitude}
            gratitude={secondGratitude}
          />
        )}

        {showThird && (
          <GratitudeInput
            name={"Third Gratitude"}
            handleGratitude={handleThirdGratitude}
            gratitude={thirdGratitude}
          />
        )}
        <View>
          <ImagePicker handleImage={handleImage} />
        </View>

        <Pressable
          style={styles.button}
          onPress={storeData}
          disabled={disabled ? true : false}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styling = (theme) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: COLORS[theme].backgroundColor,
      flexGrow: 1,
    },
    text: {
      fontSize: 24,
      paddingBottom: 10,
      color: COLORS[theme].secondary,
    },
    emojiWrapper: {
      flexDirection: "row",
      gap: 10,
      paddingBottom: 10,
    },
    emoji: {
      borderRadius: 50,
    },
    buttonText: {
      fontSize: 24,
      color: COLORS[theme].grey,
    },
    button: {
      backgroundColor: COLORS[theme].primary,
      padding: 10,
      borderRadius: 10,
      justifyContent: "center",
      alignItems: "center",
    },
  });
export default dailyinput;
