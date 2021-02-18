import React from "react";
import HighlightIcon from "@material-ui/icons/Highlight";
import { Avatar, Button } from "@material-ui/core";
import { auth, provider } from "../firebase";
import { actionTypes } from "../reducer";
import { useStateValue } from "../StateProvider";
function Header() {
  const [{ user }, dispatch] = useStateValue();
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        dispatch({
          type: actionTypes.SET_USER,
          user: result.user,
        });
        console.log(result.user.uid);
      })
      .catch((error) => alert(error.message));
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <header className="header">
      <div className="header__left">
        <h1>
          <HighlightIcon />
          Keeper
        </h1>
      </div>
      <div className="header__right">
        {user ? <h3>Hi, {user?.displayName.split(" ")[0]}</h3> : ""}
        <Avatar src={user?.photoURL} />
        <Button type="submit" onClick={user ? signOut : signIn}>
          <h3>{user ? "Logout" : "Login"}</h3>
        </Button>
      </div>
    </header>
  );
}

export default Header;
