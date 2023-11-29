import { Link } from "react-router-dom";
import Menu from "./Menu";
import SearchBar from "./SearchBar";
import logo from "../../assets/avatars/logoPov.webp";

const NavBar = () => {
  return (
    <div className="w-screen fixed left-0 top-0 px-[24px] 3xl:px-0 bg-white shadow-md z-10">
      <nav className="max-w-[1200px] mx-auto p-0 navbar">
        {/*  Section LOGO */}
        <section className="flex-1">
          <Link to="/" className="btn btn-ghost px-0 hover:bg-transparent">
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
              {/* SEARCH */}
              <SearchBar />
              {/* COMPASS BUTTON DESKTOP */}
              <Link to="" className="btn btn-ghost px-0 hover:bg-transparent">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M22 12C22 17.5228 17.5228 22 12 22M22 12C22 6.47715 17.5228 2 12 2M22 12H20M12 22C6.47715 22 2 17.5228 2 12M12 22V20M2 12C2 6.47715 6.47715 2 12 2M2 12H4M12 2V4M19.0711 19.0711L17.6569 17.6569M6.34315 6.34315L4.92893 4.92893M17.6569 6.34315L19.0711 4.92893M4.92893 19.0711L6.34315 17.6569M8 12L10.5 10.5L12 8L13.5 10.5L16 12L13.5 13.5L12 16L10.5 13.5L8 12Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
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
