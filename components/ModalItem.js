import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";
import { useContext, useState } from "react";
import COLORS from "../constants/COLORS";
import { ThemeContext } from "../context/Contexts";
import { BlurView } from "expo-blur";

const ModalItem = ({ modalVisible, handleModal }) => {
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);
  const router = useRouter();

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modal}>
        <Text style={styles.headingText}>Are you sure you want to leave? </Text>
        <View style={styles.buttonWrapper}>
          <Pressable onPress={() => router.back()} style={styles.button}>
            <Text style={styles.text}>Yes</Text>
          </Pressable>
          <Pressable onPress={() => handleModal(false)} style={styles.button}>
            <Text style={styles.text}>No</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalItem;

const styling = (theme) =>
  StyleSheet.create({
    modal: {
      height: 250,
      width: 250,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: COLORS[theme].light,
      position: "absolute",
      top: Dimensions.get("window").height / 2 - 125,
      left: Dimensions.get("window").width / 2 - 125,
      borderRadius: 20,
    },
    buttonWrapper: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
    },
    button: {
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 10,
      backgroundColor: COLORS[theme].backgroundColor,
    },
    headingText: {
      color: COLORS[theme].backgroundColor,
      padding: 10,
      fontSize: 20,
    },
    text: {
      color: COLORS[theme].light,
    },
  });
