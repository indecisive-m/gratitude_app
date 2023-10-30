import {
  View,
  Text,
  StyleSheet,
  Pressable,
  RefreshControl,
  Dimensions,
} from "react-native";
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
import {
  GestureDetector,
  Gesture,
  ScrollView,
  Directions,
  TextInput,
} from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import COLORS from "../../../constants/COLORS";
import Toast from "react-native-toast-message";
import ImagePicker from "../../../components/ImagePicker";
import { ThemeContext } from "../../../context/Contexts";
import GratitudeInput from "../../../components/GratitudeInput";
import Database from "../../../constants/Database";
import ModalItem from "../../../components/ModalItem";

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
  const [modalVisible, setModalVisible] = useState(false);
  const storeData = () => {
    if (mood && firstGratitude) {
      const date = new Date();
      const dateID = date.toISOString();

      db.transaction((tx) => {
        tx.executeSql(
          "INSERT INTO newGratitudeList (firstGratitude, secondGratitude, thirdGratitude, mood, imageURI, date) values (?, ?, ?, ?, ?, ?)",
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
            router.replace((href = "/gratitudes/quote"));
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

  const canGoBack = () => {
    if (mood || firstGratitude.length >= 1) {
      setModalVisible(true);
    } else {
      router.back();
    }
  };

  const swipeBack = Gesture.Fling()
    .direction(Directions.RIGHT)
    .onEnd(() => {
      runOnJS(canGoBack)();
    });

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

  const handleModal = (e) => {
    setModalVisible(e);
  };

  return (
    <GestureDetector gesture={swipeBack}>
      <View style={{ flex: 1 }}>
        <Stack.Screen
          options={{
            title: "Daily Gratitude",
            animation: "slide_from_bottom",
            gestureDirection: "horizontal",
            gestureEnabled: "true",
          }}
        />
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps={"never"}
        >
          <ModalItem modalVisible={modalVisible} handleModal={handleModal} />

          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>How are you feeling today?</Text>
            <View style={styles.emojiWrapper}>
              <Pressable
                onPress={() => setMood("sad")}
                style={[
                  styles.emoji,
                  { borderColor: COLORS.mood.sad },
                  mood === "sad"
                    ? { opacity: 1, backgroundColor: "#FFF" }
                    : mood === ""
                    ? { opacity: 0.7 }
                    : { opacity: 0.2 },
                ]}
              >
                <MaterialCommunityIcons
                  name="emoticon-sad"
                  size={50}
                  color={COLORS.mood.sad}
                />
                <Text style={[styles.emojiText, { color: COLORS.mood.sad }]}>
                  Sad
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMood("neutral")}
                style={[
                  styles.emoji,
                  { borderColor: COLORS.mood.neutral },
                  mood === "neutral"
                    ? { opacity: 1, backgroundColor: "#FFF" }
                    : mood === ""
                    ? { opacity: 0.9 }
                    : { opacity: 0.4 },
                ]}
              >
                <MaterialCommunityIcons
                  name="emoticon-neutral"
                  size={50}
                  color={COLORS.mood.neutral}
                />
                <Text
                  style={[styles.emojiText, { color: COLORS.mood.neutral }]}
                >
                  Meh
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setMood("happy")}
                style={[
                  styles.emoji,
                  { borderColor: COLORS.mood.happy },
                  mood === "happy"
                    ? { opacity: 1, backgroundColor: "#FFF" }
                    : mood === ""
                    ? { opacity: 0.7 }
                    : { opacity: 0.3 },
                ]}
              >
                <MaterialCommunityIcons
                  name="emoticon-happy"
                  size={50}
                  color={COLORS.mood.happy}
                />
                <Text style={[styles.emojiText, { color: COLORS.mood.happy }]}>
                  Happy
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>What are you grateful for today?</Text>
            <GratitudeInput
              name={"First Gratitude"}
              handleGratitude={handleFirstGratitude}
              gratitude={firstGratitude}
              optional={false}
            />

            {showSecond && (
              <GratitudeInput
                name={"Second Gratitude"}
                handleGratitude={handleSecondGratitude}
                gratitude={secondGratitude}
                optional={true}
              />
            )}

            {showThird && (
              <GratitudeInput
                name={"Third Gratitude"}
                handleGratitude={handleThirdGratitude}
                gratitude={thirdGratitude}
                optional={true}
              />
            )}
            <View>
              <ImagePicker handleImage={handleImage} />
            </View>
            <View style={styles.buttonContainer}>
              <Pressable
                style={styles.button}
                onPress={storeData}
                disabled={disabled ? true : false}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
        <StatusBar
          backgroundColor={COLORS[theme].light}
          barStyle={"dark-content"}
        />
      </View>
    </GestureDetector>
  );
};

const styling = (theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: COLORS[theme].light,
      flexGrow: 1,
      position: "relative",
    },
    headerContainer: {
      backgroundColor: COLORS[theme].light,
      padding: 20,
    },
    headerText: {
      fontSize: 22,
      paddingBottom: 20,
      color: COLORS[theme].backgroundColor,
    },
    inputContainer: {
      padding: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor: COLORS.dark.backgroundColor,
      flexGrow: 1,
      position: "relative",
    },
    text: {
      fontSize: 22,
      // paddingBottom: 10,
      color: COLORS[theme].secondary,
    },
    emojiWrapper: {
      flexDirection: "row",
      gap: 10,
      paddingBottom: 10,
    },
    emoji: {
      borderRadius: 20,
      borderWidth: 2,
      padding: 10,
      width: 100,
      justifyContent: "center",
      alignItems: "center",
    },
    emojiText: {
      alignSelf: "center",
      fontSize: 20,
    },
    buttonText: {
      fontSize: 24,
      color: COLORS[theme].grey,
    },
    buttonContainer: {
      justifyContent: "flex-end",
      flexGrow: 1,
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
