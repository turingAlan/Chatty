import "react-native-gesture-handler";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import Input from "../components/Input";
import PageTitle from "../components/PageTitle";
import PageContainer from "../components/PageContainer";

import { Feather, Ionicons } from "@expo/vector-icons";
import { useCallback, useReducer, useState } from "react";
import { validateInput } from "../utils/Actions/FormAction";
import { reducer } from "../utils/reducer/FromReducer";
import { useDispatch, useSelector } from "react-redux";
import colors from "../constants/colors";
import SubmitButton from "../components/SubmitButton";
import { updateUserData, userLogout } from "../utils/Actions/authActions";

const ChatSetting = (props) => {

  const dispatch = useDispatch()

  const saveHandler = async () => {
    const updatedValues = formState.inputValues;
    try {
      setIsLoading(true);
      await updateUserData(userData.userId, updatedValues);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const userData = useSelector((state) => state.auth.userData);

  const [isLoading, setIsLoading] = useState(false);

  const initalState = {
    inputValues: {
      FirstName: userData.FirstName || "",
      LastName: userData.LastName || "",
      Email: userData.Email || "",
      About: userData.About || "",
    },
    inputValidties: {
      FirstName: undefined,
      LastName: undefined,
      Email: undefined,
      About: undefined,
    },
    formIsValid: false,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initalState);

  const inputChangedHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({ validationResult: result, inputId, inputValue });
    },
    [dispatchFormState]
  );

  return (
    <PageContainer>
      <PageTitle text="Settings" />
      <Input
        id="FirstName"
        label="First Name"
        icon="user"
        initial={userData.FirstName}
        iconPack={Feather}
        errorText={formState.inputValidties.FirstName}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="LastName"
        label="Last Name"
        icon="user"
        initial={userData.LastName}
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
        initial={userData.Email}
        errorText={formState.inputValidties.Email}
        onInputChange={inputChangedHandler}
      />
      <Input
        id="about"
        label="About"
        icon="user"
        iconPack={Feather}
        initial={userData.about}
        errorText={formState.inputValidties.about}
        onInputChange={inputChangedHandler}
      />

      {isLoading ? (
        <ActivityIndicator
          size={"small"}
          color={colors.primary}
          style={{ marginTop: 20 }}
        />
      ) : (
        <SubmitButton
          style={styles.button}
          disabled={!formState.formIsValid}
          title="Save"
          onPress={saveHandler}
        />
      )}

      <SubmitButton
        style={styles.button}
        
        title="Logout"
        onPress={()=>dispatch(userLogout())}
        color = {colors.red}
      />
    </PageContainer>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChatSetting;
