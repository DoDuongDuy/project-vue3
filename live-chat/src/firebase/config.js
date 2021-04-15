import firebase from "firebase/app";
import "firebase/firestore"
import "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyDvXYsem3qhYSpG13tvcfDWfdxWIYojPJQ",
    authDomain: "duy-blog.firebaseapp.com",
    projectId: "duy-blog",
    storageBucket: "duy-blog.appspot.com",
    messagingSenderId: "320968433903",
    appId: "1:320968433903:web:2fe7d37f131e04d12b3b1a"
  };
//   init firebase
firebase.initializeApp(firebaseConfig)

const projectAuth = firebase.auth()
const projectFirestore = firebase.firestore()
const timestamp = firebase.firestore.FieldValue.serverTimestamp();
export {projectAuth ,projectFirestore, timestamp}
