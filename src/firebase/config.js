import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration


export const firebaseConfig = {
  apiKey: "AIzaSyAm6k44SpiTPv61CMZ-YJhoskvczrzZMOI",
  authDomain: "eshop-aed59.firebaseapp.com",
  projectId: "eshop-aed59",
  storageBucket: "eshop-aed59.appspot.com",
  messagingSenderId: "212902740194",
  appId: "1:212902740194:web:c679cb2c7b2c6304b8debb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
