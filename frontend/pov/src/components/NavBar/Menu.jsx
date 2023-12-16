import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slices/login.slice";
import noUser from "../../assets/avatars/no_user.svg";
import { useState } from "react";
import { useToken } from "../../hooks/useToken";

const Menu = () => {
  const { token, user } = useToken();

  const [isLogin, setIsLogin] = useState(token ? true : false);

  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(logout());
    setIsLogin(false);
  };

  return (
    <div className="dropdown dropdown-end">
      {/* USER BUTTON */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-[44px] rounded-full">
          {isLogin ? (
            <img src={user.user.profile_picture} alt="User Avatar" />
          ) : (
            <img src={noUser} alt="Default Avatar" />
          )}
        </div>
      </label>
      {/* USER MENU */}
      {isLogin ? (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-white"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Configurar Perfil
            </Link>
            <button onClick={Logout}>Cerrar Sesion</button>
          </li>
        </ul>
      ) : (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-white"
        >
          <li>
            <Link to="/login" className="justify-between">
              Inicia Sesión
            </Link>
            <Link to="/register" className="justify-between">
              Registra tu cuenta
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
