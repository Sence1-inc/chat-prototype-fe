import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  doc,
  getDoc,
  addDoc,
  setDoc,
  arrayUnion,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";
import SendMessage from "./SendMessage";
import { useParams, useLocation } from "react-router-dom";

import { getAuth } from "firebase/auth";


const ChatBox = () => {
  const params = useParams();
  const { state } = useLocation()
  const [uuid, setUuid] = useState(localStorage.getItem('uuid'));

  const [member1, setMember1] = useState(`members.${uuid}`);
  const [member2, setMember2] = useState(`members.${params.id}`)

  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState('');

  // const chatId = params.id;
  const scroll = useRef();
  const split_id = chatId.split('_');

  const auth = getAuth();

  const ids = [params.id, uuid];

  // const isPresent = useCallback(async function(){

  //   const que = query(collection(db, "Chats"), where(member1, "==", true), where(member2, '==', true))

  //     const querySnap = await getDocs(que);

  //     setChatId(querySnap.docs[0].id);

  //     if (querySnap.empty){
  //       const members = {
  //         [uuid]: true,
  //         [params.id]: true 
  //       }


  //       const newChat = await addDoc(collection(db, "Chats"), {
  //         members
  //       });

  //       setChatId(newChat.id);

  //       ids.forEach(async element => {

  //         console.log(element)
  //         const q = query(collection(db, "Users"), where("uuid", "==", element))
  //         const querySnapshot = await getDocs(q);

  //         querySnapshot.docs.map((doc) => 
  //           updateDoc(doc.ref, { chats: arrayUnion(newChat.id)})
  //         )
  //       });

  //     }
  // });

  // const getMessages = useCallback(async function() {
  //   const q = query(
  //     collection(db, "Chats", chatId, "Messages"),
  //     limit(50)
  //   );

  //   const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
  //     const fetchedMessages = [];
  //     QuerySnapshot.forEach((doc) => {
  //       fetchedMessages.push({ ...doc.data(), id: doc.id });
  //     });
  //     const sortedMessages = fetchedMessages.sort(
  //       (a, b) => a.timestamp - b.timestamp
  //     );
  //     setMessages(sortedMessages);
  //   });

  // })

  useEffect(() => {

    const isPresent = async () => {
      const que = query(collection(db, "Chats"), where(member1, "==", true), where(member2, '==', true))

      const querySnap = await getDocs(que);

      setChatId(querySnap.docs[0].id);

      console.log(chatId)
      if (querySnap.empty){
        const members = {
          [uuid]: true,
          [params.id]: true 
        }


        const newChat = await addDoc(collection(db, "Chats"), {
          members
        });

        // setChatId(newChat.id);

        ids.forEach(async element => {

          console.log(element)
          const q = query(collection(db, "Users"), where("uuid", "==", element))
          const querySnapshot = await getDocs(q);

          querySnapshot.docs.map((doc) => 
            updateDoc(doc.ref, { chats: arrayUnion(newChat.id)})
          )
        });

      }
    }

    isPresent();


  }, []);

  useEffect(() => {

    // const isPresent = async () => {
    //   const que = query(collection(db, "Chats"), where(member1, "==", true), where(member2, '==', true))

    //   const querySnap = await getDocs(que);

    //   setChatId(querySnap.docs[0].id);

    //   console.log(chatId)
    //   if (querySnap.empty){
    //     const members = {
    //       [uuid]: true,
    //       [params.id]: true 
    //     }


    //     const newChat = await addDoc(collection(db, "Chats"), {
    //       members
    //     });

    //     setChatId(newChat.id);

    //     ids.forEach(async element => {

    //       console.log(element)
    //       const q = query(collection(db, "Users"), where("uuid", "==", element))
    //       const querySnapshot = await getDocs(q);

    //       querySnapshot.docs.map((doc) => 
    //         updateDoc(doc.ref, { chats: arrayUnion(newChat.id)})
    //       )
    //     });

    //   }
    // }

    if (chatId != '') {
      console.log(chatId)
      const q = query(
        collection(db, "Chats", chatId, "Messages"),
        limit(50)
      );
  
  
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        const fetchedMessages = [];
        QuerySnapshot.forEach((doc) => {
          console.log(QuerySnapshot)
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        const sortedMessages = fetchedMessages.sort(
          (a, b) => a.timestamp - b.timestamp
        );
        setMessages(sortedMessages);
      });
  
      // getMessages();
  
      return () => unsubscribe;
    }

    // return () => {

    // } ;


  }, [chatId]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} uuid={uuid} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} uuid={uuid} chatId={chatId} />
    </main>
  );
};

export default ChatBox;