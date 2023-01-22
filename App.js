import "react-native-gesture-handler";
import { LogBox, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Font from "expo-font";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AppNavigation from "./navigation/AppNavigator";
import { Provider } from "react-redux";
import { Store } from "./store/store";

AsyncStorage.clear()

LogBox.ignoreLogs(['AsyncStorage has been extracted'])

SplashScreen.preventAutoHideAsync();
export default function App() {
  const [appIsLoaded, setAppIsLoaded] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        await Font.loadAsync({
          black: require("./assets/fonts//Roboto-Black.ttf"),
          blackItalic: require("./assets/fonts/Roboto-BlackItalic.ttf"),
          bold: require("./assets/fonts/Roboto-Bold.ttf"),
          boldItalic: require("./assets/fonts/Roboto-BoldItalic.ttf"),
          italic: require("./assets/fonts/Roboto-Italic.ttf"),
          light: require("./assets/fonts/Roboto-Light.ttf"),
          lightItalic: require("./assets/fonts/Roboto-LightItalic.ttf"),
          medium: require("./assets/fonts/Roboto-Medium.ttf"),
          mediumItalic: require("./assets/fonts/Roboto-MediumItalic.ttf"),
          regular: require("./assets/fonts/Roboto-Regular.ttf"),
          thin: require("./assets/fonts/Roboto-Thin.ttf"),
          thinItalic: require("./assets/fonts/Roboto-ThinItalic.ttf"),
        });
      } catch (error) {
        console.log.error();
      } finally {
        console.log("works");
        setAppIsLoaded(true);
        console.log(appIsLoaded);
      }
    };

    prepare();
  }, []);

  const changeSplash = useCallback(async () => {
    if (appIsLoaded) {
      await SplashScreen.hideAsync();
      console.log("remove");
    }
  }, [appIsLoaded]);

  if (!appIsLoaded) {
    console.log("neww");
    return null;
  }

  return (
   <Provider store={Store}>
     <SafeAreaProvider onLayout={changeSplash} style = {styles.container}>
      <AppNavigation/>
    </SafeAreaProvider>
   </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    fontFamily:"black",
  },
  label: {
    color: "black",
    fontSize: 100,
    fontFamily: "regular",
  },
});
