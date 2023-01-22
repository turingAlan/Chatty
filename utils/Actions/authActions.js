import { GetFirebaseApp } from "../FirbaseHelper"
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth"
import {child, getDatabase, set,ref, update} from "firebase/database"
import { async } from "validate.js"
import { authenticate, logout } from "../../store/authSlice"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { GetUserData } from "./UserActions"

let timer

export const SignUp =(FirstName,LastName,Email,Password)=>  {
    return async dispatch=>{
        
    
            const app = GetFirebaseApp()
            const auth = getAuth(app)
        
        
        
            try{
                const result =  await createUserWithEmailAndPassword(auth,Email,Password)
                const {uid,stsTokenManager} = result.user
                const {accessToken,expirationTime} = stsTokenManager
                const expiryDate = new Date(expirationTime)
                const timeNow = new Date();
                const millisecondsUntilExpiry = expiryDate - timeNow;
        
                const userData = await createUser(FirstName,LastName,Email,uid)

                dispatch(authenticate({token: accessToken,userData}))
                await saveDataToStorage(accessToken,uid,expiryDate)
                timer = setTimeout(() => {
                    dispatch(userLogout());
                }, millisecondsUntilExpiry);

                
            }
            catch(error){
                const errorMessage = error.code
                let message = "Something went wrong"
                if (errorMessage ==="auth/email-already-in-use"){
                    message = "This email already in use"
                }
                throw new Error(message)
        
            }
        }
    
}

export const SignIn =(Email,Password)=>  {
    return async dispatch=>{
    
            const app = GetFirebaseApp()
            const auth = getAuth(app)
        
        
        
            try{
                const result =  await signInWithEmailAndPassword(auth,Email,Password)
                const {uid,stsTokenManager} = result.user
                const {accessToken,expirationTime} = stsTokenManager
                const expiryDate = new Date(expirationTime)
        
                const userData = await GetUserData(uid)

                dispatch(authenticate({token: accessToken,userData}))
                await saveDataToStorage(accessToken,uid,expiryDate)

                
            }
            catch(error){
                const errorMessage = error.code
                console.log(errorMessage)
                let message = "Wrong email or password"
                if (errorMessage ==="auth/wrong-password"|| errorMessage ==="auth/user-not-found"){
                    message = "This email already in use"
                }
                throw new Error(message)
        
            }
        }
    
}

const createUser = async(FirstName,LastName,Email,userId)=>{
    const firstLast = `${FirstName} ${LastName}`.toLowerCase();
    const userData = {
        FirstName,
        LastName,
        firstLast,
        Email,
        userId,
        signUpDate:new Date().toISOString()
    }
    const dbref  = ref(getDatabase())
    const childRef = child(dbref,`users/${userId}`)
    await set(childRef,userData)
    return userData;

}

export const updateUserData = async(userId,newData)=>{
    const firstLast = `${newData.FirstName} ${newData.LastName}`.toLowerCase();
    newData.firstLast = firstLast
    const dbref  = ref(getDatabase())
    const childRef = child(dbref,`users/${userId}`)
    await update(childRef,newData)

}

export const userLogout = () => {
    return async dispatch => {
        AsyncStorage.clear();
        clearTimeout(timer);
        dispatch(logout());
    }
}

const saveDataToStorage = async (token, userId, expiryDate) => {
  await  AsyncStorage.setItem("userData", JSON.stringify({
        token,
        userId,
        expiryDate: expiryDate.toISOString()
    }));
}
