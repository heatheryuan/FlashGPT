import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import {getFirestore} from "firebase/firestore";
import fbConfig from "./config";

const app = firebase.initializeApp(fbConfig);

const db = getFirestore(app);

export { app, db };