// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";
// const firebaseConfig = {
//     apiKey: "AIzaSyAypvICMggxxp_gN9qiIsTKV3H3ccTN6XE",
//     authDomain: "whatsapp-clone-6c485.firebaseapp.com",
//     projectId: "whatsapp-clone-6c485",
//     storageBucket: "whatsapp-clone-6c485.appspot.com",
//     messagingSenderId: "750799602316",
//     appId: "1:750799602316:web:db21672e941750dabd31a9",
//     measurementId: "G-RQ2GMMDGH1"
//   };

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQiphcd5r8WlF_-AHyr_bNOhUMZoNI9iM",
  authDomain: "asad-7f9f6.firebaseapp.com",
  projectId: "asad-7f9f6",
  storageBucket: "asad-7f9f6.appspot.com",
  messagingSenderId: "1043366628568",
  appId: "1:1043366628568:web:9c5ffeae7a7ab1f7d15bad",
  measurementId: "G-2DJ0ES45CQ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };
export default db;