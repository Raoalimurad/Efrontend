import {  useContext, useState, createContext } from "react";

const searchContext = createContext();

const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword:"",
    result:[]
  });

  return (
    <searchContext.Provider value={[auth, setAuth]}>
      {children}
    </searchContext.Provider>
  );
};

// CUSTOM hook
const useSearch = () => useContext(searchContext);

export { useSearch, SearchProvider };
