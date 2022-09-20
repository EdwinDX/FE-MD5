// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsUZVJm53uZPUQYhucSHAAsq4pEK4WnjQ",
  authDomain: "md5-upload.firebaseapp.com",
  projectId: "md5-upload",
  storageBucket: "md5-upload.appspot.com",
  messagingSenderId: "474685105374",
  appId: "1:474685105374:web:be202e83bb64b025854e4f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
