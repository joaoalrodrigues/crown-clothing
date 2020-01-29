import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCEioyppa8mATm6yOylcpQf-asT2sGRpIc",
  authDomain: "crown-db-d058b.firebaseapp.com",
  databaseURL: "https://crown-db-d058b.firebaseio.com",
  projectId: "crown-db-d058b",
  storageBucket: "crown-db-d058b.appspot.com",
  messagingSenderId: "1047220120054",
  appId: "1:1047220120054:web:6070b065151c540d9d7fd7",
  measurementId: "G-M3LQWMH3F8"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("erro creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
