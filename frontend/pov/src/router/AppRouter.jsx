import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
