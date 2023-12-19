import { useCallback } from "react";
import debounce from "just-debounce-it";
import useSearch from "../../hooks/useSearch";
import useUsers from "../../hooks/useUsers";
import { SubscriptionVerified, SuggestionFree } from "../Svg/Svgs";

const SearchForm = () => {
  const { search, setSearch, error } = useSearch();
  const { loading, users, getUsers } = useUsers({ search });
  const user = localStorage.getItem("user");
  const parseUser = JSON.parse(user);

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

  return (
    <>
      <form onSubmit={handleSubmit} className="relative flex items-center">
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
              stroke="#6e6b6b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </form>
      <div className="flex flex-col">
        {error && <p className="text-red-700 p-1">{error}</p>}
        <div className="">
          {loading ? (
            <p>Loading</p>
          ) : (
            <div className="flex flex-col">
              {users?.length > 0 &&
                users.map((user) => {
                  return (
                    <div className="p-6" key={user.id}>
                      <span className="flex flex-row justify-between items-center">
                        <ul className="font-bold">
                          <li>{user.name}</li>
                        </ul>
                        <div className="flex flex-row ">
                          <img
                            alt={`Profile picture of ${user.name}`}
                            src={user.profile_picture}
                            className="w-24 h-24 rounded-full shadow-2xl"
                          />
                          {parseUser?.user?.subscriptions?.length > 0 ? (
                            <SubscriptionVerified />
                          ) : (
                            <SuggestionFree />
                          )}
                        </div>
                      </span>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchForm;
