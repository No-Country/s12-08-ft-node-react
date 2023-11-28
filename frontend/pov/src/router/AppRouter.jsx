import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import SignUpForm from "../pages/SignUpForm";
import NavBar from "../components/NavBar/NavBar";
import "../index.css";


const AppRouter = () => {
  return (
    <>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<SignUpForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
