import * as firebase from "firebase-admin";
export const admin = firebase.initializeApp();
export const database = firebase.firestore(admin);
