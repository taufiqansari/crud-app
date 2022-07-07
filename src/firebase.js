import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAkgUX2tKASjzR9r4p5RncEu6JWzECWZNI",
  authDomain: "crud-app-c26b4.firebaseapp.com",
  databaseURL: "https://crud-app-c26b4-default-rtdb.firebaseio.com",
  projectId: "crud-app-c26b4",
  storageBucket: "crud-app-c26b4.appspot.com",
  messagingSenderId: "672744835260",
  appId: "1:672744835260:web:245c02892bd15dfb4168b9",
  measurementId: "G-M40RKEPKSF",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth();
