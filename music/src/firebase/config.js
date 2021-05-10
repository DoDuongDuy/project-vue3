import firebase from "firebase/app"
import "firebase/firestore"
import "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyA2VeGUdG7nOD46qE1mIGAzV3jJmo5j9k0",
    authDomain: "music-cab24.firebaseapp.com",
    projectId: "music-cab24",
    storageBucket: "music-cab24.appspot.com",
    messagingSenderId: "1010322784862",
    appId: "1:1010322784862:web:882dbb4c06551a8457aacf"
};
// init firebase
firebase.initializeApp(firebaseConfig)
// init services
const projectFirestore = firebase.firestore()
const proejctAuth = firebase.auth()
// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp
export {projectFirestore, proejctAuth , timestamp}