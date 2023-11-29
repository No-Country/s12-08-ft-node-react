import { useEffect, useState } from "react";
import SearchForm from "./SearchForm";

const SearchBar = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleViewportChange = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleViewportChange);
  }, []);

  return isMobile ? (
    <div className="dropdown static lg:hidden">
      {/* SEARCHBAR MOBILE */}
      <label
        tabIndex={0}
        className="btn btn-ghost btn-circle avatar px-0 hover:bg-transparent"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M21 21L15.0001 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </label>
      {/* SEARCH MOBILE INPUT DROPDOWN */}
      <ul
        tabIndex={0}
        className="left-0 mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-white rounded-box w-screen"
      >
        <SearchForm />
      </ul>
    </div>
  ) : (
    // SEARCHBAR DESKTOP
    <SearchForm />
  );
};

export default SearchBar;
