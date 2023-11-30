import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import { Home } from "../pages/Home";
import Registerlogin from "../pages/regiterlogin/regiterlogin";
import "../index.css";
import { ChatsUsers } from "../components/Chats/ChatsUsers";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registerlogin />} />
          <Route path="/login" element={<Registerlogin />} />
          <Route path="/chats" element={<ChatsUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
