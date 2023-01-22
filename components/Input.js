import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../constants/colors";

import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const Input = (props) => {
  const [textValue,setValue] =useState(props.initial)
    onChangeText = (text)=>{
        props.onInputChange(props.id,text)
        setValue(text)

    }
  return (
    <View style={styles.container}>
      <Text style = {styles.label}>{props.label}</Text>
      <View style={styles.inputContainer}>
        <props.iconPack
          name={props.icon}
          size={props.iconSize || 15}
          style={styles.icon}
        />
        <TextInput style = {styles.input} 
        value = {textValue}
        {...props}
        onChangeText={onChangeText}
        />
      </View>
      {props.errorText?<View style = {styles.errorContainer}>
        <Text style = {styles.errorText}>
            {props.errorText}
        </Text>

      </View>:null}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  label: {
    marginVertical: 8,
    fontFamily: "bold",
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  inputContainer: {
    backgroundColor: "teal",
    height:33,
    width: "100%",
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.nearlyWhite,
    flexDirection: "row",
    alignItems:"center"
  },
  input:{
    flex:1,
    color:colors.textColor,
    fontFamily:"regular",
    letterSpacing:0.3,
    paddingTop:0,
  },
  icon: {
    marginRight: 10,
    color: colors.grey,
    justifyContent:"center"
  },
  errorContainer:{
    marginVertical:10,
  },
  errorText:{
    color:"red",
    fontSize:13
  }
});
export default Input;
