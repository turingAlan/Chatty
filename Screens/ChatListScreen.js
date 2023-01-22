import 'react-native-gesture-handler';
import {NavigationContainer} from "@react-navigation/native"
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from 'react';
import * as Fonts from "expo-font";
import {createStackNavigator} from "@react-navigation/stack"
const ChatListScreen = (props)=>{
    console.log("hell")
    return(
        <View style = {styles.container}>
          <Text>
            Chat List Screen
        </Text>
        <Button title='Go to Chats' onPress={()=>{props.navigation.navigate("ChatScreen")}}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      fontFamily:'black',
      flex: 1,
      justifyContent:"center",
      alignItems:"center"
    }
  });

export default ChatListScreen;