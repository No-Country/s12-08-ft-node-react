import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import NavBar from "../components/NavBar/NavBar";
import "../index.css";


const AppRouter = () => {
  return (
    <>

      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
