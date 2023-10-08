import {
  Pressable,
  StyleSheet,
  ActivityIndicator,
  Text,
  StatusBar,
} from "react-native";
import { Stack } from "expo-router";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GratitudeItem from "../../../components/GratitudeItem";
import Toast from "react-native-toast-message";
import Header from "../../../components/Header";
import COLORS from "../../../constants/COLORS";
import AddGratitude from "../../../components/AddGratitude";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Animated, { SlideInDown, Easing } from "react-native-reanimated";
import { RefreshControl } from "react-native-gesture-handler";
import { ThemeContext } from "../../../context/Contexts";
const index = () => {
  const [gratitude, setGratitude] = useState([]);
  const [selected, setSelected] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchShown, setSearchShown] = useState(false);
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);

  const removeStorage = async () => {
    if (!selected) {
      Toast.show({
        type: "error",
        text1: "Please select a day to delete",
        position: "bottom",
        autoHide: true,
        visibilityTime: 1000,
      });
    } else {
      try {
        await AsyncStorage.removeItem(`${selected}`);
        let list = [];
        gratitude.map((item) => {
          if (selected !== item.id) {
            list.push(item);
          }
        });

        if (list.length === 0) {
          setGratitude([]);
        }

        setGratitude(list);
        setSelected("");

        Toast.show({
          type: "success",
          text1: "Deleted",
          position: "bottom",
          autoHide: true,
          visibilityTime: 1000,
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setSelected("");
    if (!gratitude) {
      getKeys();
    }

    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const handleLongPress = (item) => {
    if (item.id === selected) {
      setSelected("");
    } else {
      setSelected(item.id);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setGratitude([]);
      setSelected("");
    } catch (error) {
      console.log("error");
    }
  };

  const getKeys = async () => {
    try {
      setIsLoading(true);
      let keyValues = [];

      const keys = await AsyncStorage.getAllKeys();

      for (const key of keys) {
        const getKeyValues = await AsyncStorage.getItem(key);
        keyValues.push(JSON.parse(getKeyValues));
      }

      setGratitude(keyValues.reverse());
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const changeStyle = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    getKeys();
    // clearStorage();
  }, []);

  if (isLoading) {
    return (
      <ActivityIndicator
        size={"large"}
        style={{ flex: 1, backgroundColor: COLORS.dark.backgroundColor }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          title: "Daily Gratitude",
          // headerShown: false,
        }}
      />
      <Header searchShown={searchShown} />
      <Animated.FlatList
        data={gratitude}
        keyExtractor={gratitude.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={AddGratitude}
        renderItem={({ item }) => {
          return (
            <GratitudeItem
              item={item}
              handleLongPress={handleLongPress}
              selected={selected}
              mood={item.mood}
            />
          );
        }}
      />
      {selected && (
        <Animated.View
          style={styles.iconContainer}
          entering={SlideInDown.duration(750).easing(Easing.elastic(0.75))}
        >
          <Pressable onPress={removeStorage} style={styles.remove}>
            <MaterialCommunityIcons
              name="delete"
              size={28}
              color={COLORS.dark.light}
            />
          </Pressable>
          <Pressable onPress={clearStorage} style={styles.clear}>
            <MaterialCommunityIcons
              name="archive-remove"
              size={28}
              color="black"
            />
          </Pressable>
        </Animated.View>
      )}
      {/* 
      <Pressable onPress={changeStyle}>
        <Text style={{ color: "white" }}>Update theme</Text>
      </Pressable> */}

      <StatusBar
        backgroundColor={COLORS[theme].backgroundColor}
        barStyle={"light-content"}
      />
    </SafeAreaView>
  );
};

export default index;

const styling = (theme) =>
  StyleSheet.create({
    titleContainer: {
      padding: 20,
      borderBottomWidth: 1,
      paddingBottom: 10,
    },
    titleText: {
      fontSize: 32,
    },

    container: {
      flex: 1,
      backgroundColor: COLORS[theme].backgroundColor,
      position: "relative",
    },
    iconContainer: {
      position: "absolute",
      bottom: 20,
      right: 20,
      flexDirection: "row",
      gap: 10,
    },
    remove: {
      backgroundColor: "red",
      borderRadius: 50,
      padding: 8,
    },
    clear: {
      backgroundColor: "red",
      borderRadius: 50,
      padding: 8,
    },
  });
