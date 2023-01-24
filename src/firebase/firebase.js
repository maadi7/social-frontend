import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyA_0Gj0lMm5CyPclxlAHeaPvUd-zlG2Ti8",
    authDomain: "mern-socialapp-90860.firebaseapp.com",
    projectId: "mern-socialapp-90860",
    storageBucket: "mern-socialapp-90860.appspot.com",
    messagingSenderId: "867509421014",
    appId: "1:867509421014:web:c501878e6971fc42401a77",
    measurementId: "G-HL17PB4HTH"
  };

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default }