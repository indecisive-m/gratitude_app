import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "expo-router";
import { ThemeContext } from "../../../context/Contexts";
import COLORS from "../../../constants/COLORS";

const quoteScreen = () => {
  const [quote, setQuote] = useState(undefined);
  const [author, setAuthor] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const { theme, setTheme } = useContext(ThemeContext);
  const styles = styling(theme);

  const router = useRouter();

  useEffect(() => {
    const getQuotes = async () => {
      const getQuotes = await fetch("https://zenquotes.io/api/quotes");
      const res = await getQuotes.json();
      const randomNumber = Math.floor(Math.random() * 50);
      const quote = JSON.stringify(res[randomNumber].q);
      const author = JSON.stringify(res[randomNumber].a);

      setQuote(quote);
      setAuthor(author);

      setIsLoading(false);
    };

    getQuotes();

    setTimeout(() => {
      router.replace("/gratitudes");
    }, 5000);
  }, []);

  if (isLoading) {
    return <ActivityIndicator size={"large"} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.quote}>{quote}</Text>
      <Text style={styles.author}>- {author}</Text>
    </View>
  );
};

export default quoteScreen;

const styling = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: COLORS[theme].backgroundColor,
      justifyContent: "center",
      alignItems: "center",
    },
    quote: {
      fontSize: 22,
      color: COLORS[theme].primary,
      marginBottom: 20,
    },
    author: {
      fontSize: 18,
      color: COLORS[theme].secondary,
      alignSelf: "flex-start",
    },
  });
