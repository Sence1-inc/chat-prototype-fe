import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
import NavBar from "./components/NavBar";
import ChatBox from "./components/ChatBox";
import Welcome from "./components/Welcome";
import Test from "./components/Test";
import Users from "./components/Users";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
        <NavBar />

    <Routes>
      <Route path="/chats" element={<Test />}> </Route>
      <Route path="/chat/:id" element={<ChatBox/>}></Route>
      <Route path="/users" element={<Users />}> </Route>
      <Route path="/" element={<Home/>}></Route>

    </Routes>
 
 </div>

  );
}
export default App;