import { useCallback, useState } from "react";
import { CloseIcon, SearchIcon } from "../Svg/Svgs";
import { Link } from "react-router-dom";
import debounce from "just-debounce-it";
import useSearch from "../../hooks/useSearch";
import useUsers from "../../hooks/useUsers";
import LoadingSpinner from "../Svg/LoadingSpinner";
import { useToken } from "../../hooks/useToken";

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
            error ? "border-red-700" : "border-emerald-500"
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
      {error && <p className="mt-2 text-red-700">{error}</p>}

      {!open && (
        <>
          {loading ? (
            <LoadingSpinner />
          ) : (
            <div className="w-full lg:w-[500px] flex flex-col absolute mt-16 rounded-lg bg-white shadow-lg">
              {users?.length > 0 &&
                users.map((user) => {
                  return (
                    <ul className="p-6 hover:bg-slate-200" key={user.id}>
                      <span className="flex flex-row justify-between items-center">
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
                      </span>
                    </ul>
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
