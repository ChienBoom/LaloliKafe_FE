
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
const firebaseConfig = {
  apiKey: "AIzaSyDjbDhm6ZJPKSEnfShvxN_va3fmc0fWZ3o",
  authDomain: "lovekafe.firebaseapp.com",
  projectId: "lovekafe",
  storageBucket: "lovekafe.appspot.com",
  messagingSenderId: "911133736027",
  appId: "1:911133736027:web:d8218471a121c0bda2d37e",
  measurementId: "G-QC3PPSLEV3"
};

const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app)