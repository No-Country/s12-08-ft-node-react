import { Link } from "react-router-dom";
import user from "../../assets/avatars/user.webp";

const Menu = () => {
  return (
    <div className="dropdown dropdown-end">
      {/* USER BUTTON */}
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-[44px] rounded-full">
          <img alt="User Avatar" src={user} />
        </div>
      </label>
      {/* USER MENU */}
      <ul
        tabIndex={0}
        className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-52 bg-white"
      >
        <li>
          <Link to="/login" className="justify-between">
            Log In
          </Link>
        </li>
        <li>
          <Link to="/register">Registrar Cuenta</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
