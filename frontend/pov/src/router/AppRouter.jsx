import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
<<<<<<< HEAD
import SignUpForm from "../pages/SignUpForm";
import NavBar from "../components/NavBar/NavBar";
import "../index.css";


const AppRouter = () => {
=======
import Registerlogin from "../pages/regiterlogin/regiterlogin";
import "../index.css";

const AppRouter = () => {
  
  
>>>>>>> 50c40b7bd500541db4e5dcbcdd7e48b797b5a39f
  return (
    <>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/register" element={<SignUpForm />} />
=======
          <Route path="/register" element={<Registerlogin />} />
          <Route path="/login" element={<Registerlogin />} />

>>>>>>> 50c40b7bd500541db4e5dcbcdd7e48b797b5a39f
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
