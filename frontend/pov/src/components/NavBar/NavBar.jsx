import { Link } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import { Toaster } from "react-hot-toast";
import logo from "../../assets/avatars/logoPov.webp";
import Compass from "../Svg/Compass";
import ChatIcon from "../Svg/ChatIcon";
import { useToken } from "../../hooks/useToken";

const NavBar = () => {
  const { user } = useToken();

  return (
    <div className="w-screen fixed left-0 top-0 px-[24px] 3xl:px-0 bg-white shadow-md z-50">
      <Toaster toastOptions={{ className: "z-10000" }} />
      <nav className="max-w-[1000px] mx-auto p-0 navbar md:relative">
        {/*  Section LOGO */}
        <section className="flex-1">
          <Link to="/home" className="btn btn-ghost px-0 hover:bg-transparent">
            <img
              className="w-[44px] rounded-full"
              src={logo}
              alt="logo image"
            />
          </Link>
        </section>
        {/* COMMANDS */}
        <section className="flex-none gap-4">
          <div className="flex gap-8 items-center">
            <div className="flex gap-8 lg:gap-4">
              {user && (
                <Link
                  to={`/chats/${user.user.id}`}
                  className="btn btn-ghost px-0 hover:bg-transparent"
                >
                  <ChatIcon />
                </Link>
              )}
              {/* COMPASS BUTTON DESKTOP */}
              {/* <Link to="" className="btn btn-ghost px-0 hover:bg-transparent">
                <Compass />
              </Link> */}
              {/* SEARCH */}
              <div className="flex flex-col">
                <SearchBar />
              </div>
            </div>
            {/* USER BUTTON MENU */}
            <Menu />
          </div>
        </section>
      </nav>
    </div>
  );
};

export default NavBar;
