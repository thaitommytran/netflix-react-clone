import { useState, useEffect } from 'react';
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, updateDoc, onSnapshot } from "firebase/firestore";

export const useSaveShow = () => {
  const [saved, setSaved] = useState(false);
  const [savedShows, setSavedShows] = useState([]);
  const { user } = UserAuth();

  useEffect(() => {
    if (user?.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        if (doc.exists()) {
          setSavedShows(doc.data()?.savedShows || []);
        }
      });
      return () => unsubscribe();
    }
  }, [user?.email]);

  const saveShow = async (item) => {
    if (user?.email) {
      setSaved(true);
      const movieID = doc(db, "users", `${user.email}`);
      const newShow = {
        id: item.id,
        title: item.title || item.name,
        img: item.backdrop_path,
      };
      await updateDoc(movieID, {
        savedShows: [newShow, ...savedShows.filter(show => show.id !== item.id)]
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  const deleteShow = async (id) => {
    if (user?.email) {
      const movieID = doc(db, "users", `${user.email}`);
      const updatedShows = savedShows.filter(show => show.id !== id);
      await updateDoc(movieID, {
        savedShows: updatedShows
      });
    }
  };

  return { saved, saveShow, deleteShow, savedShows };
};
