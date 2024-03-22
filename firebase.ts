import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGOCcrbjW7Dzv2n-TLe7SaakoCK6pIcYM",
  authDomain: "castor-6a97b.firebaseapp.com",
  projectId: "castor-6a97b",
  storageBucket: "castor-6a97b.appspot.com",
  messagingSenderId: "977415046122",
  appId: "1:977415046122:web:5683748c51afa322276893",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
