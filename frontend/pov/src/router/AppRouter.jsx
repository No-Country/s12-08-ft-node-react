import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";

import NavBar from "../components/NavBar/NavBar";
import "../index.css";

import Registerlogin from "../pages/regiterlogin/regiterlogin";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
  
        <NavBar />
  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Registerlogin />} />
          <Route path="/login" element={<Registerlogin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
