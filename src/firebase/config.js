import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCTT6YjndMuJN_bzxBp1BvFewwg4IL7awY",
  authDomain: "miniblog-e963a.firebaseapp.com",
  projectId: "miniblog-e963a",
  storageBucket: "miniblog-e963a.appspot.com",
  messagingSenderId: "223806556457",
  appId: "1:223806556457:web:c16b95d6f0ffa80e6d0f38",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
