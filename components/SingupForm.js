import React, { useCallback, useEffect, useReducer, useState } from "react";
import { StyleSheet, View, Image,Alert, ActivityIndicator } from "react-native";
import Input from "../components/Input";
import SubmitButton from "../components/SubmitButton";
import logo from "../assets/Images/logo.png";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { validateInput } from "../utils/Actions/FormAction";
import { reducer } from "../utils/reducer/FromReducer";
import { SignUp } from "../utils/Actions/authActions";
import colors from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";



const SignupForm = () => {
  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)

  const dispatch = useDispatch()

  
  

  const initalState = {
    inputValues: {
        FirstName: "",
        LastName: "",
        Email: "",
        Password: "",
      },
    inputValidties: {
      FirstName: false,
      LastName: false,
      Email: false,
      Password: false,
    },
    formIsValid: false,
  };
  const [formState, dispatchFormState] = useReducer(reducer,initalState);

  const inputChangedHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({validationResult:result,inputId,inputValue})
  },[dispatchFormState]);

  useEffect(()=>{
   if (error){
    Alert.alert("an error occured",error,[{text:"ok"}])
   }
  },[error])

  const authHandler = useCallback( async()=>{
    try {
      setIsLoading(true)
      const action = SignUp(
        formState.inputValues.FirstName,
        formState.inputValues.LastName,
        formState.inputValues.Email,
        formState.inputValues.Password
    )
    setError(null)
   await dispatch(action)
    
      
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
      
    }

  },[dispatch,formState])

  return (
    <>
      <View style={styles.imageContain}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
      </View>
      <Input
        id="FirstName"
        label="First Name"
        icon="user"
        iconPack={Feather}
        errorText={formState.inputValidties.FirstName}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="LastName"
        label="Last Name"
        icon="user"
        iconPack={Feather}
        errorText={formState.inputValidties.LastName}
        onInputChange={inputChangedHandler}
      />
      <Input
        keyboardType="email-address"
        id="Email"
        label="Email"
        icon="mail"
        iconPack={Feather}
        errorText={formState.inputValidties.Email}
        onInputChange={inputChangedHandler}
      />
      <Input
        autoCapitalize="none"
        secureTextEntry
        id="Password"
        label="Password"
        icon="key-outline"
        iconPack={Ionicons}
        errorText={formState.inputValidties.Password}
        onInputChange={inputChangedHandler}
      />
      {isLoading?<ActivityIndicator size={'small'} color={colors.primary} style = {{marginTop:20}}/>:<SubmitButton
        style={styles.button}
        disabled={!formState.formIsValid}
        title="Sign-up"
        onPress={authHandler}
      />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: "black",
    flex: 1,
    paddingTop: 50,
  },
  authContainer: {
    backgroundColor: "white",
  },
  imageContain: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "50%",
  },
  button: {
    marginVertical: 10,
  },
});

export default SignupForm;
