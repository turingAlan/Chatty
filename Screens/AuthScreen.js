import "react-native-gesture-handler";
import {
    KeyboardAvoidingView,
    ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PageContainer from "../components/PageContainer";
import SignupForm from "../components/SingupForm";
import SigninForm from "../components/SigninForm";
import { useState } from "react";
import colors from "../constants/colors";
const AuthScreen = (props) => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <PageContainer style={styles.authContainer}>
        <ScrollView>
            <KeyboardAvoidingView>
      {isSignUp ? <SignupForm /> : <SigninForm />}
      <TouchableOpacity
        onPress={() => {
          setIsSignUp(!isSignUp);
        }}
        style={styles.switchButton}
      >
        <Text style={styles.switch}>
          {`Switch to ${isSignUp ? "sign-in" : "sign-up"}`}
        </Text>
      </TouchableOpacity>
      </KeyboardAvoidingView>
      </ScrollView>
    </PageContainer>
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
  button: {
    marginVertical: 10,
  },
  switchButton: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
  switch: {
    color: colors.blue,
    fontFamily: "medium",
    letterSpacing: 0.3,
  },
});

export default AuthScreen;
