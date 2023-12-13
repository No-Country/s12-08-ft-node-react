import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import Configurations from "../pages/Profile/Configurations";
import { LoginForm } from "../pages/Login/LoginForm";
import { RegisterForm } from "../pages/Register/RegisterForm";
import { RequireAuth } from "../slices/auth/RequireAuth";
import ChatContainer from "../pages/Chats/ChatContainer";

import "../index.css";

import NotFound from "../pages/NotFound/NotFound";
import ProfileContainer from "../pages/Profile/ProfileContainer";

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />

          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="home" element={<Home />} />
            <Route path="config" element={<Configurations />} />
            <Route path="chats/:id" element={<ChatContainer />} />
            <Route path="Profile" element={<ProfileContainer />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
