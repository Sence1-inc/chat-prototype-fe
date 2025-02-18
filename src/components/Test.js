import React, { useEffect, useRef, useState, setState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import ChatPreview from "./ChatPreview";


import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Test = () => {

    const [uuid, setUuid] = useState(localStorage.getItem('uuid')) 

    const [chatRooms, setChats] = useState([]);
 
    useEffect(() => {

        // setUuid(localStorage.getItem('uuid'))

        const fetchData = async () => {

            const q = query(collection(db, "Users"), where("uuid", "==", uuid));
    
            const querySnapshot = await getDocs(q);

            console.log(querySnapshot.docs[0].data())

            setChats(querySnapshot.docs[0].data().chats);
            }
        fetchData();
      }, []);

  return (
    <main className="welcome">
      <h2>Welcome to React Chat.</h2>

      {
        chatRooms.map((chatroom) => (
            <ChatPreview key={chatroom} uuid={uuid} chatId={chatroom}/>
        ))
      }

    </main>
  );
};

export default Test;
