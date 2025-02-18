import React, { useEffect, useRef, useState } from "react";
import GoogleSignin from "../img/btn_google_signin_dark_pressed_web.png";
// import { doc, getDoc, docs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { doc, getDoc, collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";



import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const ChatPreview = ({chatId, uuid}) => {
    const [chatRoomName, setChatroomName] = useState([]);
    const [latestChat, setLatestChat] = useState([]);
 
    useEffect(() => {

        const fetchData = async () => {

            const docRef = doc(db, "Chats", chatId);

            const querySnapshot = await getDoc(docRef);

            let members = querySnapshot.data().members;

            console.log(members)

            // Set the name of the chatroom as the other person's Username
            Object.keys(members).forEach(async (member) => {
                console.log(member)
                if (member != uuid) {
                    const ref = collection(db, "Users");

                    const q = query(
                        ref,
                        where("uuid", '==', member),
                      );

                    const querySnap = await getDocs(q);

                    setChatroomName(querySnap.docs[0].data().name)
                }
            });
            //END Set the name of the chatroom as the other person's Username


            // Get the latest message from the chat
            const ref = collection(db, "Chats", chatId, "Messages");

            const q = query(
                ref,
                orderBy("timestamp", 'desc')
              );

            const qs = await getDocs(q);

            setLatestChat(qs.docs[0].data().message)

            }

            //end Get the latest message from the chat

        fetchData();
      }, []);

  return (

    <div>
        <h3>
            <NavLink to={`/chat/${chatId}`} state={{uuid: uuid}}> {chatRoomName} </NavLink>
        </h3>
        <div>
            {latestChat}
        </div>
    </div>
    // <main className="welcome">
    //   <h2>Welcome to React Chat.</h2>

    //   {
    //     chatRooms.map((chatroom) => (
    //         <div>
    //             {chatroom}
    //         </div>
    //     ))
    //   }

    // </main>
  );
};

export default ChatPreview;
