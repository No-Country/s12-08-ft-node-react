import { useLocation, Navigate, Outlet } from 'react-router-dom';

export const RequireAuth = () => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  let ConvertToken = Boolean(token);

  return ConvertToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  ) 
};
