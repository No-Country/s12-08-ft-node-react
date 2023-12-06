import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
//import { ChatsUsers } from "../pages/Chats/ChatsUsers";
import Profile from "../pages/Profile";
import "../index.css";
import { LoginForm } from "../pages/Login/LoginForm";
import { RegisterForm } from "../pages/Register/RegisterForm";
//import { Landing } from "../pages/Landing/Landing";
import { RequireAuth } from "../slices/auth/RequireAuth";
import PostList from "../components/Posts/PostList";
import ChatContainer from "../pages/Chats/ChatContainer";

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
            <Route path="profile" element={<Profile />} />
            <Route path="chats" element={<ChatContainer/>} />
            <Route path="posts" element={<PostList />} />
          </Route>
          <Route path="*" element={<h1>404, ups esta página no existe</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
