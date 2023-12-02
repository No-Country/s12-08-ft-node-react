import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

export const RequireAuth = () => {
  const { token } = useSelector((state) => state.login);
  const location = useLocation();
  
  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};
