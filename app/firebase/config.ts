import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyC8fR-AU0sULBJt2RYz0pxbMnwUgoETsRQ",
    authDomain: "akademikportal-d3811.firebaseapp.com",
    projectId: "akademikportal-d3811",
    storageBucket: "akademikportal-d3811.firebasestorage.app",
    messagingSenderId: "77140793201",
    appId: "1:77140793201:web:3827bfbe736ca944ad88d0"
};

// ✅ Uygulama daha önce başlatılmadıysa başlat, yoksa mevcut olanı al
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { app };

