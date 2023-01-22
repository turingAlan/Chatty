import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./MainNavigator";
import AuthScreen from "../Screens/AuthScreen";
import { useSelector } from "react-redux";
import StartupScreen from "../Screens/StartupScreen";




const AppNavigation = () => {
    const isAuth = useSelector(state  =>state.auth.token!==null&&state.auth.token!=="")
    const didTryToLogin = useSelector(state => state.auth.didTryToLogin)
    
  return (
    <NavigationContainer>
        {isAuth&&<MainNavigator/>}
        {!isAuth&&didTryToLogin&&<AuthScreen/>}
        {!isAuth&&!didTryToLogin&&<StartupScreen/>}
     
    </NavigationContainer>
  );
};

export default AppNavigation
