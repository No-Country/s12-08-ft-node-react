import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from '../pages/Home';
import { ChatsUsers } from '../pages/Chats/ChatsUsers';
import Profile from '../pages/Profile';
import '../index.css';
import { LoginForm } from '../pages/Login/LoginForm';
import { RegisterForm } from '../pages/Register/RegisterForm';
import { Layout } from './Layout/Layout';
import { RequireAuth } from '../slices/auth/requireAuth';

const AppRouter = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />

            {/* Private routes */}
            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chats" element={<ChatsUsers />} />
            </Route>
            <Route path="*" element={<h1>404, ups esta página no existe</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
