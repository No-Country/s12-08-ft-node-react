import { useEffect, useRef, useState } from 'react';

function useSearch() {
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);
  const isFirstInput = useRef(true);

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === '';
    }

    if (search === '') {
      setError('No se pueden buscar usuarios vacios');
    }

    if (search.length < 3) {
      setError('Debes ingresar al menos 3 caracteres');
    }

    if (search.match(/^\d+$/)) {
      setError('No se pueden buscar usuarios con numeros');
    }

    return () => {
      setError(null);
    };
  }, [search]);

  return { search, setSearch, error };
}

export default useSearch;
