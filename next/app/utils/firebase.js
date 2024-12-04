// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBGxbrz_FxnYM6pDMKdZnNSjGGoD2wNpFc",
  authDomain: "value-job.firebaseapp.com",
  projectId: "value-job",
  storageBucket: "value-job.firebasestorage.app",
  messagingSenderId: "372887593223",
  appId: "1:372887593223:web:8bee7efe8d9622e0ad65a2",
  measurementId: "G-6J5YSD5P9Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

