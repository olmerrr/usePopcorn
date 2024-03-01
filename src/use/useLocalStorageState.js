import { useEffect, useState } from "react";

const useLocalStorageState = (initialState, key) => {
  const [ value, setValue ] = useState(() => JSON.parse(localStorage.getItem(key)) || initialState);

  useEffect(() => {
    // в локалСТоредж я могу добавить только пару key-value
    localStorage.setItem(key, JSON.stringify(value))
  }, [ value, key ]);

  return [ value, setValue ]
}

export default useLocalStorageState;