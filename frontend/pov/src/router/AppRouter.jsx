<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import  ContainerSubscriptions  from '../components/Subscription/ContainerSubscriptions';
import '../index.css';
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";

import NavBar from "../components/NavBar/NavBar";
import "../index.css";

import Registerlogin from "../pages/regiterlogin/regiterlogin";
>>>>>>> 7aa49a6ba787b8c7a9cc983f18811362e517c113

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/containerSubscriptions" element={<ContainerSubscriptions />} />
=======
          <Route path="/register" element={<Registerlogin />} />
          <Route path="/login" element={<Registerlogin />} />
>>>>>>> 7aa49a6ba787b8c7a9cc983f18811362e517c113
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
