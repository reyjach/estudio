import firebase from "firebase/app";
import "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCYEqpZ8mgMIIqj8PLOFRkwWP-ywF5XfyI",
  authDomain: "estudio-7bd3f.firebaseapp.com",
  projectId: "estudio-7bd3f",
  storageBucket: "estudio-7bd3f.appspot.com",
  messagingSenderId: "215778096972",
  appId: "1:215778096972:web:bd645ef67b5e2892f281e9"
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);


//    export const firebaseApp = firebase.initializeApp(firebaseConfig)