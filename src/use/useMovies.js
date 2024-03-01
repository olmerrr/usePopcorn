import { useEffect, useState } from "react";

import { BASE_URL } from "../App";
import Error from "../components/Shared/Error";

const useMovies = (query, callback) => {
  const [ movies, setMovies ] = useState([]);
  const [ isLoading, setLoading ] = useState(false);
  const [ error, setError ] = useState("")

  const type = "all"

  useEffect(() => {
    //  использую футнкцию как парамент в кастомном хуке
    // callback?.();
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        await setLoading(true);
        await setError("");

        const response = await fetch(`${BASE_URL}&s=${query}${type !== "all" ? `&type=${type}` : ""}`,
          { signal: controller.signal });
        if ( !response.ok ) {
          throw new Error("Something went wrong...")
        }
        const data = await response.json();
        if ( data.Response === "False" ) throw new Error("Movie not found")

        await setLoading(false);
        await setMovies(data.Search);
        await setError("");

      } catch ( err ) {
        if ( error.name !== "AbortError" ) {
          await setError(err.message.toString());
        }
      } finally {
        await setLoading(false)
      }
    }
    if ( query.length < 3 ) {
      setMovies([])
      setError("")
      return;
    }
    fetchMovies();

    return () => controller.abort();
  }, [ query ]);
  return { movies, isLoading, error }
}
export default useMovies;