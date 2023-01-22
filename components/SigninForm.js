import React from "react";
import { Image, StyleSheet, View,Alert,ActivityIndicator} from "react-native";
import Input from "../components/Input";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import logo from "../assets/Images/logo.png";
import { useReducer,useCallback,useEffect,useState} from "react";
import { reducer } from "../utils/reducer/FromReducer";
import { SignIn, SignUp } from "../utils/Actions/authActions";

import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


import { validateInput } from "../utils/Actions/FormAction";
import { useDispatch } from "react-redux";

const SigninForm = () => {

  const isTestMode = true

  const [error,setError] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const dispatch = useDispatch()

  const initalState = {
    inputValues: {
        Email: isTestMode?"sarthak0jain@gmail.com":"",
        Password: isTestMode?"Sarthak@09":"",
      },
    inputValidties: {
      Email: isTestMode,
      Password: isTestMode,
    },
    formIsValid: isTestMode,
  };
  const [formState, dispatchFormState] = useReducer(reducer,initalState);

  const inputChangedHandler = useCallback((inputId, inputValue) => {
    const result = validateInput(inputId, inputValue);
    dispatchFormState({validationResult:result,inputId,inputValue})
  },[dispatchFormState]);
  
  const authHandler = useCallback( async()=>{
    try {
      setIsLoading(true)
      const action = SignIn(
        formState.inputValues.Email,
        formState.inputValues.Password
    )
   await dispatch(action)
    setError(null)
      
    } catch (error) {
      setIsLoading(false)
      setError(error.message)
      
    }

  },[dispatch,formState])

  useEffect(()=>{
    if (error){
     Alert.alert("an error occured",error,[{text:"ok"}])
    }
   },[error])

  
  return (
    <>
      <View style={styles.imageContain}>
        <Image source={logo} style={styles.image} resizeMode="contain" />
      </View>
      <Input
        label="Email"
        id="Email"
        onInputChange={inputChangedHandler}
        icon="mail"
        initial= {formState.inputValues.Email}
        iconPack={Feather}
        errorText={formState.inputValidties.Email}
        keyboardType="email-address"
      />
      <Input
        autoCapitalize="none"
        secureTextEntry
        id="Password"
        initial = {formState.inputValues.Password}
        onInputChange={inputChangedHandler}
        label="Password"
        icon="key-outline"
        iconPack={Ionicons}
        errorText={formState.inputValidties.Password}
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

export default SigninForm;
