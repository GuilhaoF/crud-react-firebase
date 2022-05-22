import firebase from 'firebase/app';
import 'firebase/firestore';

let firebaseConfig = {
    apiKey: "AIzaSyCnE7-b8sb3UFENskEgGftblH9XEmvypKM",
    authDomain: "crud-6c161.firebaseapp.com",
    projectId: "crud-6c161",
    storageBucket: "crud-6c161.appspot.com",
    messagingSenderId: "912311568677",
    appId: "1:912311568677:web:77f667f768f0865256b2cc",
    measurementId: "G-HCSNFETVJH"
  };
  
  if(!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
  }

  // Initialize Firebase
export default firebase