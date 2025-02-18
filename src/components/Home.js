import React, { useEffect, useRef, useState, setState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


import ChatPreview from "./ChatPreview";

import { signInWithCustomToken, getAuth } from "firebase/auth";

const Home = () => {

  const auth = getAuth();

  useEffect(() => {
    // fetch('http://localhost:3001').then((response) => response.json())
    // .then((resJson) => signInWithCustomToken(auth, resJson.token))
    // .then(async (userCredential) => {

    //   console.log(auth.currentUser)
    //   const claims = await userCredential.user.getIdTokenResult();
    
    //   await isPresent(claims.claims.user_id, claims.claims.userName)

    // })    
    // .catch(error => console.error(error));
  }, []);


    const navigate = useNavigate();


    const [uuid, setUuid] = useState("");
    const [name, setName] = useState("")

    const [chatRooms, setChats] = useState([]);

    const isPresent = async (userId, username) => {

      console.log(userId, username)
        const docSnap = await getDoc(doc(db, "Users", userId));

        console.log(docSnap)
        if (!docSnap.exists()){
            console.log('user does not exist');
          await setDoc(doc(db, "Users", userId), {
            name: username,
            uuid: userId
          });
        }
      }

    const Register = async(event) =>{
        event.preventDefault();

        // await isPresent(uuid, name);

        // console.log(isPresent)

        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ uuid: uuid, name: name})
        };

        console.log(requestOptions)

        fetch('http://localhost:3001', requestOptions).then((response) => response.json())
        .then((resJson) => signInWithCustomToken(auth, resJson.token))
        .then(async (userCredential) => {
              const claims = await userCredential.user.getIdTokenResult();
        
          await isPresent(claims.claims.user_id, claims.claims.userName)
    
        })    
        .catch(error => console.error(error));

        localStorage.setItem('uuid', uuid);


        navigate("/users");

    }



  return (
    <main className="welcome">
      <h2>Sign in to chat with other people</h2>

    <form onSubmit={(event) => Register(event)}>
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="UUID"
        value={uuid}
        onChange={(e) => setUuid(e.target.value)}
      />
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">Login/Register</button>
    </form>

    </main>
  );
};

export default Home;
