import React from "react"

import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from '@expo/vector-icons'; 
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'


import ChatListScreen from "../Screens/ChatListScreen";
import ChatScreen from "../Screens/ChatScreen";
import ChatSetting from "../Screens/SettingScreen";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = ()=>{
  return(
    <Tab.Navigator
    screenOptions={{
      headerTitle:"",
      headerShadowVisible: false
    }}>
      <Tab.Screen name="Home" component={ChatListScreen}
      options ={{
        tabBarLabel:"Chat",
        tabBarIcon: ({color,size})=>(
          <Ionicons name="chatbubble-outline" size={size} color={color}/>
        )
      }}
      />
      <Tab.Screen name="Settings" component={ChatSetting}
       options ={{
         tabBarLabel:"Setting",
         tabBarIcon:({color,size})=>(
          <Ionicons name="settings-outline" size={size} color={color} />
         )
       }}
      />

    </Tab.Navigator>
  )
}
const MainNavigator = ()=>{
    return(
        <Stack.Navigator>
        <Stack.Screen
          name="Chat"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={{ gestureEnabled: true, headerTitle: "" }}
        />
      </Stack.Navigator>

    )
}

export default MainNavigator;