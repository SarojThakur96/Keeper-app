import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import db from "../firebase";
import firebase from "firebase";
import { Modal } from "@material-ui/core";
import { useStateValue } from "../StateProvider";
import useStyles from "./Styles.jsx";

function Note({ key, id, title, content }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [newtitle, setNewTitle] = useState("");
  const [newcontent, setNewContent] = useState("");
  const [{ user }, dispatch] = useStateValue();
  const handleChange = (e) => {
    db.collection("users").doc(user?.uid).collection("notes").doc(id).set(
      {
        title: newtitle,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        content: newcontent,
      },
      { merge: true }
    );
    setOpen(false);
  };
  const clickEdit = (e) => {
    setNewTitle(title);
    setNewContent(content);
    setOpen(true);
  };
  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <form
          style={{ transform: `translate(50%, 50%)` }}
          className={classes.paper}
        >
          <input
            name="title"
            onChange={(e) => setNewTitle(e.target.value)}
            value={newtitle}
            placeholder="New Title"
          />
          <textarea
            name="content"
            onChange={(e) => setNewContent(e.target.value)}
            value={newcontent}
            placeholder="New note..."
          />
          <Fab onClick={handleChange}>
            <AddIcon />
          </Fab>
        </form>
      </Modal>
      <div className="note">
        <h1>{title}</h1>
        <p>{content}</p>
        <button
          onClick={(e) =>
            db
              .collection("users")
              .doc(user?.uid)
              .collection("notes")
              .doc(id)
              .delete()
          }
        >
          <DeleteIcon />
        </button>
        <button onClick={clickEdit}>
          <EditIcon />
        </button>
      </div>
    </>
  );
}

export default Note;
