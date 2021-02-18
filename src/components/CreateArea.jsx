import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";
import { useStateValue } from "../StateProvider";
import db from "../firebase";
import firebase from "firebase";
function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [{ user }, dispatch] = useStateValue();

  const submitNote = (e) => {
    e.preventDefault();
    db.collection("users").doc(user?.uid).collection("notes").add({
      title: title,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      // profilePic: user.photoURL,
      // username: user.displayName,
      content: content,
    });

    setTitle("");
    setContent("");
  };

  function expand() {
    setExpanded(true);
  }

  return (
    <div>
      <form className="create-note">
        {isExpanded && (
          <input
            name="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Title"
          />
        )}

        <button
          style={{ display: "none" }}
          onClick={(e) => e.preventDefault()}
          type="submit"
        >
          HPost
        </button>

        <textarea
          name="content"
          onClick={expand}
          onChange={(e) => setContent(e.target.value)}
          value={content}
          placeholder="Take a note..."
          rows={isExpanded ? 3 : 1}
        />
        <Zoom in={isExpanded}>
          <Fab onClick={submitNote}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
