import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect } from "react"
import { ActivityIndicator, View } from "react-native"
import { useDispatch } from "react-redux"
import colors from "../constants/colors"
import commonStyles from "../constants/commonStyles"
import { authenticate, setDidTryToLogin } from "../store/authSlice"
import { GetUserData } from "../utils/Actions/UserActions"

const StartupScreen = ()=>{
    const dispatch = useDispatch()
    useEffect(()=>{
        const tryToLogin = async()=>{
            const storedAuthInfo = await AsyncStorage.getItem("userData");

            if (!storedAuthInfo){
                dispatch(setDidTryToLogin())
                return
            }
            const parsedData = JSON.parse(storedAuthInfo)
            const {token, userId, expiryDateString} = parsedData
            const expiryDate = new Date(expiryDateString)
            
            if (expiryDate<= new Date||!token||!userId){
                dispatch(setDidTryToLogin)
                return 
            }
            const userData =await GetUserData(userId)
            dispatch(authenticate({token:token,userData}))

        }
        tryToLogin()
        

    },[dispatch])
    
    return(
        <View style ={commonStyles.center}>
            <ActivityIndicator color={colors.primary} size="small"/>
        </View>
    )
}


export default StartupScreen