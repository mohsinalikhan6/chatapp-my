import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCvyFuVRD02BUS0PJ1bduIxZRrcPYyW3nE",
    authDomain: "chatapp-my.firebaseapp.com",
    projectId: "chatapp-my",
    storageBucket: "chatapp-my.appspot.com",
    messagingSenderId: "624039193312",
    appId: "1:624039193312:web:58a2d6199e4e63087cbe85"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);