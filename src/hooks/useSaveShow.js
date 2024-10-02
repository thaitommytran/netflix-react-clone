import { useState } from 'react';
import { UserAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

export const useSaveShow = () => {
  const [saved, setSaved] = useState(false);
  const { user } = UserAuth();

  const saveShow = async (item) => {
    if (user?.email) {
      setSaved(true);
      const movieID = doc(db, "users", `${user.email}`);
      await updateDoc(movieID, {
        savedShows: arrayUnion({
          id: item.id,
          title: item.title || item.name,
          img: item.backdrop_path,
        }),
      });
    } else {
      alert("Please log in to save a movie");
    }
  };

  return { saved, saveShow };
};
