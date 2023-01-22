
import { initializeApp } from "firebase/app";

export const GetFirebaseApp = ()=>{
   
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDripcR-jC3q1oQQDcPaybSLs6hh1titP0",
  authDomain: "whatsapp-1f981.firebaseapp.com",
  projectId: "whatsapp-1f981",
  storageBucket: "whatsapp-1f981.appspot.com",
  messagingSenderId: "74023491228",
  appId: "1:74023491228:web:0c4ca42865177efb95bf59",
  measurementId: "G-5615DZ0CW4",
  databaseURL: "https://whatsapp-1f981-default-rtdb.asia-southeast1.firebasedatabase.app"
};


// Initialize Firebase
return(initializeApp(firebaseConfig));


}