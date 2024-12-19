import React from "react";
import { db } from "../services/firebase"; 
import { collection, addDoc } from "firebase/firestore";

const words = [
  { "english": "honest", "russian": "честный" },
  { "english": "dishonest", "russian": "нечестный" },
  { "english": "creative", "russian": "креативный" },
  { "english": "boring", "russian": "скучный" },
  { "english": "friendly", "russian": "дружелюбный" },
  { "english": "unfriendly", "russian": "недружелюбный" },
  { "english": "funny", "russian": "смешной" },
  { "english": "serious", "russian": "серьезный" },
  { "english": "warm", "russian": "теплый" },
  { "english": "cool", "russian": "прохладный" },
  { "english": "cold", "russian": "холодный" },
  { "english": "hot", "russian": "горячий" },
  { "english": "wet", "russian": "мокрый" },
  { "english": "dry", "russian": "сухой" },
  { "english": "beautiful", "russian": "красивый" },
  { "english": "ugly", "russian": "уродливый" },
  { "english": "tall", "russian": "высокий" },
  { "english": "short", "russian": "короткий" },
  { "english": "big", "russian": "большой" },
  { "english": "small", "russian": "маленький" },
  { "english": "rich", "russian": "богатый" },
  { "english": "poor", "russian": "бедный" },
  { "english": "easy", "russian": "легкий" },
  { "english": "difficult", "russian": "сложный" },
  { "english": "hard", "russian": "трудный" },
  { "english": "soft", "russian": "мягкий" },
  { "english": "loud", "russian": "громкий" },
  { "english": "silent", "russian": "тихий" },
  { "english": "funny", "russian": "смешной" },
  { "english": "serious", "russian": "серьезный" },
  { "english": "brave", "russian": "смелый" },
  { "english": "cowardly", "russian": "трус" },
  { "english": "fast", "russian": "быстрый" },
  { "english": "slow", "russian": "медленный" },
  { "english": "happy", "russian": "счастливый" },
  { "english": "sad", "russian": "грустный" },
  { "english": "angry", "russian": "злой" },
  { "english": "calm", "russian": "спокойный" },
  { "english": "young", "russian": "молодой" },
  { "english": "old", "russian": "старый" },
  { "english": "new", "russian": "новый" },
  { "english": "ancient", "russian": "древний" }
];


const UploadWords = () => {
  const uploadWords = async () => {
    try {
      const wordsCollection = collection(db, "words");

      for (const word of words) {
        await addDoc(wordsCollection, word);
      }

      console.log("Слова успешно добавлены в Firestore!");
    } catch (error) {
      console.error("Ошибка при добавлении слов в Firestore: ", error);
    }
  };

  return (
    <div>
      <button onClick={uploadWords}>Загрузить слова в Firestore</button>
    </div>
  );
};

export default UploadWords;
