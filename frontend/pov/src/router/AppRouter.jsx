import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "../pages/Home";
import { ChatsUsers } from "../pages/Chats/ChatsUsers";
import Configurations from "../pages/Configurations";
import "../index.css";
import { LoginForm } from "../pages/Login/LoginForm";
import { RegisterForm } from "../pages/Register/RegisterForm";
import { Landing } from "../pages/Landing/Landing";
import { RequireAuth } from "../slices/auth/RequireAuth";
import PostList from "../components/Posts/PostList";

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
            <Route path="profile" element={<Configurations />} />
            <Route path="chats" element={<ChatsUsers />} />
            <Route path="posts" element={<PostList />} />
          </Route>
          <Route path="*" element={<h1>404, ups esta página no existe</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
