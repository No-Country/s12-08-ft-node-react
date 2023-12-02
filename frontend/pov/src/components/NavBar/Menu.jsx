import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatars/user.webp";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/login.slice";

const Menu = () => {
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
          <img alt="User Avatar" src={avatar} />
        </div>
      </label>
      {/* USER MENU */}
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
    </div>
  );
};

export default Menu;
