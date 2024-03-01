import { useRef } from "react";
import { useKey } from "../../../use/useKey";

const Search = ({ query, setQuery }) => {
  const inputEl = useRef(null);

  useKey("enter", () => {
    if ( document.activeElement === inputEl.current ) return;

    inputEl.current.focus();
    setQuery("");
  });

  return <>
    <input
      className="search"
      type="text"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  </>
}

export default Search;