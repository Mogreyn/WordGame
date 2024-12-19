// src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, getDocs } from "firebase/firestore";

// Firebase конфигурация
const firebaseConfig = {
  apiKey: "AIzaSyAg-tIQkIvAeoWYmy2C79KO5jLVvB2aiDE",
  authDomain: "wordswipe-c9d98.firebaseapp.com",
  projectId: "wordswipe-c9d98",
  storageBucket: "wordswipe-c9d98.appspot.com",
  messagingSenderId: "389772262649",
  appId: "1:389772262649:web:1c288f9a4f05c0facdb628",
  measurementId: "G-JLE3D3NHRT",
};

// Инициализация Firebase
export const app = initializeApp(firebaseConfig);

// Инициализация Auth
export const auth = getAuth(app);

// Инициализация Firestore
export const db = getFirestore(app);

// Функция для получения слов из Firestore
export const getWords = async () => {
  try {
    const wordsCollection = collection(db, "words");
    const querySnapshot = await getDocs(wordsCollection);
    const wordsList = querySnapshot.docs.map((doc) => doc.data());
    return wordsList;
  } catch (error) {
    console.error("Ошибка при загрузке слов: ", error);
    return [];
  }
};