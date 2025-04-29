// backend/lib/firebase.js
import dotenv from "dotenv";
import { cert, initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";
import serviceAccount from "./serviceAccountKey.json" assert { type: "json" };

dotenv.config();

const firebaseApp = initializeApp({
    credential: cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET, // .env'de tanımla
});

const bucket = getStorage().bucket();
export default bucket;