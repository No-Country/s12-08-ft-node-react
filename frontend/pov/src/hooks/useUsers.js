import { useCallback, useRef, useState } from 'react';


function useUsers({ search }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const previousSearch = useRef(search);

  const getUsers = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return;

    try {
      setLoading(true);
      setError(null);
      previousSearch.current = search;
      const response = await fetch(
        `https://pov.azurewebsites.net/api/users/allUser?searchForm=${search}`
      );
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, users, getUsers };
}

export default useUsers
