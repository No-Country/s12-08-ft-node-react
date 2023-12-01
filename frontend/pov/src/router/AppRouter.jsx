import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ChatsUsers } from "../pages/Chats/ChatsUsers";
import Profile from "../pages/Profile";
import Registerlogin from "../pages/regiterlogin/regiterlogin";
import "../index.css";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registerlogin />} />
          <Route path="/register" element={<Registerlogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/chats" element={<ChatsUsers />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
