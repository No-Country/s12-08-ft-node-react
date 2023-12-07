import { Link } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import logo from "../../assets/avatars/logoPov.webp";
import Compass from "../Svg/Compass";
import { Toaster } from "react-hot-toast";

const NavBar = () => {
  return (
    <div className="w-screen fixed left-0 top-0 px-[24px] 3xl:px-0 bg-white shadow-md z-10">
      <Toaster />
      <nav className="max-w-[1000px] mx-auto p-0 navbar">
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
          <div className="flex gap-4 items-center">
            <div className="flex gap-2 lg:gap-4">
              {/* COMPASS BUTTON DESKTOP */}
              <Link to="" className="btn btn-ghost px-0 hover:bg-transparent">
                <Compass />
              </Link>
              {/* SEARCH */}
              <SearchBar />
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
