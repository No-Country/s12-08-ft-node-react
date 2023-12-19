import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slices/login.slice";
import NoAvatar from "../Svg/NoAvatar";
import { useState } from "react";
import { useToken } from "../../hooks/useToken";

const Menu = () => {
  const { token, user = { user: {} } } = useToken();

  let id, profile_picture;

  if (user) {
    id = user.user.id;
    profile_picture = user.user.profile_picture;
  }

  const [isLogin, setIsLogin] = useState(token ? true : false);

  const dispatch = useDispatch();

  const Logout = () => {
    dispatch(logout());
    setIsLogin(false);
    window.location.reload();
  };

  return (
    <div className="dropdown dropdown-end">
      {/* USER BUTTON */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-[44px] rounded-full">
          {isLogin ? (
            <img src={profile_picture} alt="User Avatar" />
          ) : (
            <NoAvatar />
          )}
        </div>
      </label>
      {/* USER MENU */}
      {isLogin ? (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-white"
        >
          <li className="hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
            <Link to={`/profile/${id}`} className="justify-between">
              Configurar Perfil
            </Link>
          </li>
          <li>
            <button
              className="hover:cursor-pointer hover:text-white hover:bg-[#232322]"
              onClick={Logout}
            >
              Cerrar Sesion
            </button>
          </li>
        </ul>
      ) : (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-white"
        >
          <li className="hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
            <Link to="/login" className="justify-between">
              Inicia Sesión
            </Link>
          </li>
          <li className="hover:cursor-pointer hover:text-white hover:bg-[#232322] rounded-lg">
            <Link to="/register" className="justify-between">
              Registra una cuenta
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Menu;
