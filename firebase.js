// Import the functions you need from the SDKs you need
import * as firebase from "firebase";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv9jEHN287hUXWPJI7Sp_wWmM7b_Dobag",
  authDomain: "bankproj-4d725.firebaseapp.com",
  projectId: "bankproj-4d725",
  storageBucket: "bankproj-4d725.appspot.com",
  messagingSenderId: "137497735701",
  appId: "1:137497735701:web:1db4ae81a88ddc9934941c",
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const auth = firebase.auth();

export { auth };
