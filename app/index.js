import { Redirect } from "expo-router";
import * as NavigationBar from "expo-navigation-bar";
import COLORS from "../constants/COLORS";
import { StatusBar } from "expo-status-bar";

const Index = () => {
  NavigationBar.setBackgroundColorAsync(COLORS.dark.backgroundColor);

  return <Redirect href="/breathing/" />;
};
export default Index;
