import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { LoginForm } from "../pages/Login/LoginForm";
import { RegisterForm } from "../pages/Register/RegisterForm";
import { RequireAuth } from "../slices/auth/RequireAuth";
import { ChatProvider } from "../context/ChatContext";
//import Configurations from '../pages/Profile/Configurations';
import ChatContainer from "../pages/Chats/ChatContainer";
import NotFound from "../pages/NotFound/NotFound";
import ProfileContainer from "../pages/Profile/ProfileContainer";
import "../index.css";
import EditProfile from "../pages/Profile/EditProfile";
import { Confirm } from "../pages/Subscription/Confirm";
import { Subscription } from "../pages/Subscription/Subscription";
import { Toaster } from "react-hot-toast";


const AppRouter = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : {};

  return (
    <>
      <ChatProvider user={user}>
        <BrowserRouter>
          <Toaster />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Home />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="register" element={<RegisterForm />} />

            {/* Private routes */}
            <Route element={<RequireAuth />}>
              <Route path="home" element={<Home />} />
              <Route path="config" element={<EditProfile />} />
              <Route path="chats/:id" element={<ChatContainer />} />
              <Route path="profile/:id" element={<ProfileContainer />} />
              <Route path="sub/:id" element={<Subscription />} />
              <Route path="sub/confirm/:id" element={<Confirm />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ChatProvider>
    </>
  );
};

export default AppRouter;
