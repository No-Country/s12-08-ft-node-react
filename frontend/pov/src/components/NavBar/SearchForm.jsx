import { useCallback, useState } from 'react';
import { CloseIcon, SearchIcon } from '../Svg/Svgs';
import debounce from 'just-debounce-it';
import useSearch from '../../hooks/useSearch';
import useUsers from '../../hooks/useUsers';
import LoadingSpinner from '../Svg/LoadingSpinner';

const SearchForm = () => {
  const [open, setOpen] = useState(false);
  const { search, setSearch, error } = useSearch();
  const { loading, users, getUsers } = useUsers({ search });

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
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <input
          type="text"
          placeholder="Search"
          className={`${
            error ? 'border-red-700' : 'border-emerald-500'
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
      {error && <p className="text-red-700">{error}</p>}

      {!open && <div className="z-50 relative">
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col">
            {users?.length > 0 &&
              users.map((user) => {
                return (
                  <div className="p-6" key={user.id}>
                    <span className="flex flex-row justify-between items-center">
                      <div className="flex flex-row justify-center items-center">
                        <img
                          alt={`Profile picture of ${user.name}`}
                          src={user.profile_picture}
                          className="w-24 h-24 rounded-full shadow-2xl"
                        />
                        <ul className="pl-5">
                          <li className="font-bold text-lg">{user.name}</li>
                          <li>12 suscriptores</li>
                        </ul>
                      </div>
                      <button className="bg-[#232322] rounded-full w-28 h-7 px-0.5 text-white text-center">
                        Suscribirse
                      </button>
                    </span>
                  </div>
                );
              })}
          </div>
        )}
      </div>}
    </>
  );
};

export default SearchForm;
