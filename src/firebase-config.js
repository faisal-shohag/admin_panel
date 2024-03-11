import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import {getFirestore} from "firebase/fire"
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyAIesgtDcwW11FnCq8p1xgpldvAKztOK7s",
  authDomain: "asd-ml.firebaseapp.com",
  databaseURL: "https://asd-ml-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "asd-ml",
  storageBucket: "asd-ml.appspot.com",
  messagingSenderId: "155290127830",
  appId: "1:155290127830:web:6583da14e3fa9105ab2877",
  measurementId: "G-SS4BNXP7NX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = getAnalytics(app);