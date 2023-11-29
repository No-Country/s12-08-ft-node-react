import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import Registerlogin from "../pages/regiterlogin/regiterlogin";
import "../index.css";

const AppRouter = () => {
  
  
  return (
    <>
      <BrowserRouter>
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
