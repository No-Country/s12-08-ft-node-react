import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import avatar from "../../assets/avatars/user.webp";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/login.slice";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const Menu = () => {
  const { message } = useSelector((state) => state.login);
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(message);
  const Logout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  useEffect(() => {
    if (message > '') {
      setShowAlert(true);
      toast.loading(message);
      setTimeout(() => {
        navigate('/');
      }, 2000);
    }
  }, [message, showAlert, navigate]);

  return (
   <>
    {showAlert && (
              <>
                <div>
                  <Toaster position="top-center" reverseOrder={false} />
                </div>
              </>
            )}
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
   </>
  );
};

export default Menu;
