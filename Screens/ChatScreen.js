import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import * as Fonts from "expo-font";
import { createStackNavigator } from "@react-navigation/stack";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from '@expo/vector-icons';

import backgroundImage from "../assets/Images/droplet.jpeg";
import colors from "../constants/colors";

const ChatScreen = (props) => {
  const [messageText, setMessageText] = useState("");
  const sendMessage = useCallback(()=>{
    setMessageText("")

  },[messageText])
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage}
        style={styles.backgroundImage}
      ></ImageBackground>
      <View style={styles.inputContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            stateSend(true);
            console.log(send);
          }}
        >
          <AntDesign name="pluscircleo" size={24} color={colors.blue} />
        </TouchableOpacity>
        <TextInput
          style={styles.textBox}
          value={messageText}
          onChangeText={setMessageText}
          onSubmitEditing ={sendMessage}
        />
        {messageText === "" ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => console.log("pressed")}
          >
            <Ionicons name="camera-outline" size={24} color={colors.blue} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.button]}
            onPress={sendMessage}
          >
            <Feather name="send" size={24} color={colors.blue} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 10,
  },
  backgroundImage: {
    flex: 1,
  },
  inputContainer: {
    paddingTop: 5,
    paddingLeft: 12,
    paddingRight: 12,
    flexDirection: "row",
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textBox: {
    flex: 5,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 10,
  },
});

export default ChatScreen;
