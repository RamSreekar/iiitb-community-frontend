import { initializeApp } from "firebase/app"; 
import { getStorage, ref } from "firebase/storage";

console.log("Storage bucket : " + process.env.REACT_APP_FIREBASE_STORAGE_BUCKET)

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
    measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const PostsStorageRef = ref(storage, `Announcements/Posts/{fileName}`);
export const NotesStorageRef = ref(storage, `Announcements/Notes/{fileName}`);

/*
 apiKey: "AIzaSyCwkPLFn3JrIc_LXqresr1ma12F7NBy0xA",
  authDomain: "community-platform-2d62b.firebaseapp.com",
  projectId: "community-platform-2d62b",
  storageBucket: "community-platform-2d62b.appspot.com",
  messagingSenderId: "137314454156",
  appId: "1:137314454156:web:7295553df83bb64db889a9"
*/