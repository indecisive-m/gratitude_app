import { StyleSheet, Text, Pressable, View, Image } from "react-native";
import { useContext } from "react";
import COLORS from "../constants/COLORS";
import { Link, useNavigation, useRouter } from "expo-router";
import Animated, { Easing, FadeInLeft } from "react-native-reanimated";
import { ThemeContext } from "../context/Contexts";

const GratitudeItem = ({ item, handleLongPress, selected }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  const styles = styling(theme);

  const highlighted = selected === item.id;

  const bulletPoint = "\u25AA";

  const idDate = new Date(item.date);

  const itemDate = idDate.toLocaleDateString();

  // TODO: figure out yesterday properly. As it stands it will not work on the first day of the month.

  const dateToday = new Date();

  const dateString = dateToday.toLocaleDateString();

  const dateArray = dateString.split("/");

  const subtractADay = dateArray[0] - 1;

  dateArray.splice(0, 1, subtractADay);

  const yesterday = dateArray.join("/");

  const date =
    itemDate === dateString
      ? "Today"
      : itemDate === yesterday
      ? "Yesterday"
      : itemDate;

  const moodColor =
    item.mood === "happy"
      ? COLORS.mood.happy
      : item.mood === "neutral"
      ? COLORS.mood.neutral
      : item.mood === "sad"
      ? COLORS.mood.sad
      : null;

  return (
    <Animated.View
      entering={FadeInLeft.duration(1500)
        .easing(Easing.elastic(1.2))
        .withInitialValues({
          transform: [{ translateX: -50 }],
        })}
    >
      <Link
        href={{
          pathname: "/(tabs)/gratitudes/[edit]",
          params: {
            id: item.id,
          },
        }}
        style={[styles.container, highlighted ? styles.highlighted : null]}
        onLongPress={() => handleLongPress(item)}
        asChild
      >
        <Pressable>
          <View style={{ width: "65%" }}>
            <Text
              style={[
                styles.text,
                styles.id,
                highlighted ? styles.highlighted : null,
              ]}
            >
              {date}
            </Text>
            <Text
              style={[styles.text, highlighted ? styles.highlighted : null]}
            >{`${bulletPoint} ${item.firstGratitude}`}</Text>
            {item.secondGratitude && (
              <Text
                style={[styles.text, highlighted ? styles.highlighted : null]}
              >{`${bulletPoint} ${item.secondGratitude}`}</Text>
            )}
            {item.thirdGratitude && (
              <Text
                style={[styles.text, highlighted ? styles.highlighted : null]}
              >{`${bulletPoint} ${item.thirdGratitude}`}</Text>
            )}
          </View>
          <View style={{ width: "45%", paddingRight: 5 }}>
            {item.imageURI && (
              <Image source={{ uri: item.imageURI }} style={styles.image} />
            )}
          </View>
          <View
            style={[styles.moodStripe, { backgroundColor: moodColor }]}
          ></View>
        </Pressable>
      </Link>
    </Animated.View>
  );
};

export default GratitudeItem;

const styling = (theme) =>
  StyleSheet.create({
    container: {
      padding: 10,
      backgroundColor: COLORS[theme].grey,
      margin: 10,
      borderRadius: 10,
      overflow: "hidden",
      position: "relative",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    text: {
      fontSize: 18,
      color: COLORS[theme].secondary,
      paddingBottom: 5,
      // zIndex: 1,
      width: "90%",
    },
    id: {
      fontSize: 12,
      textDecorationLine: "underline",
    },
    moodStripe: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      width: 15,
      opacity: 0.75,
    },
    image: {
      height: 100,
      width: 100,
      objectFit: "contain",
      borderRadius: 50,
    },
    highlighted: {
      backgroundColor: COLORS[theme].secondary,
      color: COLORS[theme].backgroundColor,
    },
  });
