import { useCallback, useState } from "react";
import { CloseIcon, SearchIcon } from "../Svg/Svgs";
import { Link } from "react-router-dom";
import debounce from "just-debounce-it";
import useSearch from "../../hooks/useSearch";
import useUsers from "../../hooks/useUsers";
import { useToken } from "../../hooks/useToken";
import MiniSpinner from "../Svg/MiniSpinner";

const SearchForm = () => {
  const [open, setOpen] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { loading, users, getUsers } = useUsers({ search });

  // Descargo USER desde localstorage para corroborar las subs del usuario logueado
  const { user: USER } = useToken();
  let isSub;
  const debouncedGetUsers = useCallback(
    debounce((search) => {
      getUsers({ search });
    }, 300),
    [getUsers]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    getUsers({ search });
  };

  const handleChange = (e) => {
    const newInput = e.target.value;
    setSearch(newInput);
    debouncedGetUsers(newInput);
  };

  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative z-50 flex items-center">
        <input
          type="text"
          placeholder="Search"
          className={`${
            error ? "outline-red-700" : "border-emerald-500"
          } input input-bordered bg-white w-full`}
          onChange={handleChange}
          value={search}
        />

        <button
          type="submit"
          tabIndex={0}
          className="btn btn-ghost btn-circle avatar px-0 absolute right-0 hover:bg-transparent"
          onClick={handleClose}
        >
          {open ? <SearchIcon /> : <CloseIcon />}
        </button>
      </form>
      {!open && (
        <>
          {loading ? null : (
            <div className="w-full md:w-[500px] flex flex-col absolute top-[64px] left-0 md:right-0 md:left-auto bg-white shadow-lg rounded-b-xl">
              {error && (
                <p className="py-4 text-red-700 text-xs text-center">{error}</p>
              )}
              {users?.length > 0 &&
                users.map((user) => {
                  return (
                    <div className="p-6 hover:bg-slate-200" key={user.id}>
                      <Link
                        to={`/profile/${user.id}`}
                        className="flex flex-row justify-between items-center"
                      >
                        <div className="flex flex-row justify-center items-center">
                          <img
                            alt={`Profile picture of ${user.name}`}
                            src={user.profile_picture}
                            className="w-24 h-24 rounded-full shadow-lg"
                          />
                          <ul className="pl-5">
                            <li className="font-bold text-lg">{user.name}</li>
                            <li>12 suscriptores</li>
                          </ul>
                        </div>
                        {
                          (isSub = USER?.user.subscribedTo.some(
                            (subs) => subs.beneficiary_id === user.id
                          ))
                        }
                        {isSub ? (
                          <Link className="w-[125px] p-2 bg-[#232322] rounded-full text-white text-center">
                            Desuscribirse
                          </Link>
                        ) : (
                          <Link
                            to={`/sub/${user.id}`}
                            className="w-[125px] p-2 bg-[#232322] rounded-full text-white text-center"
                          >
                            Suscribirse
                          </Link>
                        )}
                      </Link>
                    </div>
                  );
                })}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default SearchForm;
