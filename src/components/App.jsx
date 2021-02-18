import React, { useState,useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Notes from "./Notes";
import CreateArea from "./CreateArea";
import {auth, provider} from "../firebase";
import {actionTypes} from "../reducer";
import {useStateValue} from "../StateProvider";

function App() {
  const [{ user },dispatch] = useStateValue();
    useEffect(()=>{
       auth.onAuthStateChanged(authUser => {
         if(authUser){
          dispatch({
            type: actionTypes.SET_USER,
            user: authUser,
        });
         }
         else{
          dispatch({
            type: actionTypes.SET_USER,
            user: null,
           });
         }
       })
    },[])

  return (
    <div>
      <Header />
      <CreateArea />
      <Notes/>
      <Footer />
    </div>
  );
}

export default App;
