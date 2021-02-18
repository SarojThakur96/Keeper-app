import React, { useState, useEffect } from "react";
import db from "../firebase";
import Note from "./Note";
import { useStateValue } from "../StateProvider";
function Notes() {
  const [notes, setNotes] = useState([]);
  const [{ user }, dispatch] = useStateValue();
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("notes")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setNotes(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setNotes([]);
    }
  }, [user]);

  return (
    <div>
      {notes.map((note) => (
        <Note
          id={note.id}
          title={note.data.title}
          content={note.data.content}
        />
      ))}
    </div>
  );
}

export default Notes;
