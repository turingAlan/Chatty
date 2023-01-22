import { child, getDatabase,ref,get } from "firebase/database"
import { GetFirebaseApp } from "../FirbaseHelper"
export const GetUserData = async(userId)=>{
    const firebaseapp = GetFirebaseApp()
    try {

        const dbref = ref(getDatabase(firebaseapp))
        const userRef = child(dbref,`users/${userId}`)

        const snapshot = await get (userRef)
        return snapshot.val()
        
    } catch (error) {
        console.log(error)
        
    }

}