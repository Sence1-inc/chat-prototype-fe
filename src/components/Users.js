import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, docs, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";

const Users = ({chatId}) => {
    const [users, setusers] = useState([]);
    const [uuid, setUuid] = useState(localStorage.getItem('uuid'));
    const [user, setUser] = useState("")
 
    useEffect(() => {
        setUuid(localStorage.getItem('uuid'));
        // setUser(uuid);

        const fetchData = async () => {
            let userArray = [];
            const docRef = collection(db, "Users");

            const q = query(
                docRef,
                where("uuid", "!=", uuid)
            )

            const querySnapshot = await getDocs(q);

            querySnapshot.forEach(element => {
                userArray.push(
                    {
                        name: element.data().name,
                        uuid: element.data().uuid
                    }
                )
            });

            setusers(userArray)

            }
        fetchData();
      }, []);

  return (

    <div>
        {   
            users.map( user => {
                // const user1 = uuid
                // const user2 = user.uuid;
                // const roomId = user1<user2 ? user1+'_'+user2 : user2+'_'+user1
                const roomId = user.uuid
                return (
                    <h3>
                    <NavLink key={user.uuid} to={`/chat/${roomId}`} state={{uuid: uuid}}> {user.name} </NavLink>
                    </h3>
                )

            }

               

            )
        }
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

export default Users;
