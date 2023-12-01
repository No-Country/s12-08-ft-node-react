import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import Registerlogin from "../pages/regiterlogin/regiterlogin";
import "../index.css";
import Profile from "../pages/Profile";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Registerlogin />} />
          <Route path="/register" element={<Registerlogin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
