import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../slices/login.slice";

import avatar from "../../assets/avatars/user.webp";
import noUser from "../../assets/avatars/no_user.svg";

const Menu = () => {
  const token = useSelector((state) => state.login.token);
  console.log(token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const Logout = () => {
    console.log("Cerrando Sesión BYE!");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("duration");
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="dropdown dropdown-end">
      {/* USER BUTTON */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-[44px] rounded-full">
          {token ? (
            <img alt="User Avatar" src={avatar} />
          ) : (
            <img alt="Default Avatar" src={noUser} />
          )}
        </div>
      </label>
      {/* USER MENU */}
      {token ? (
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-white"
        >
          <li>
            <Link to="/profile" className="justify-between">
              Ver Perfil
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
