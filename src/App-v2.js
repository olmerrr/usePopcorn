import { useEffect, useState } from "react";

import WatchedMovieList from "./components/List/WatchedMovieList";
import NumResults from "./components/Layout/NavBar/NumResults";
import WatchedSummary from "./components/List/WatchedSummary";
import MovieDetails from "./components/List/MovieDetails";
import Navbar from "./components/Layout/NavBar/Navbar";
import Search from "./components/Layout/NavBar/Search";
import MovieList from "./components/List/MovieList";
import Logo from "./components/Layout/NavBar/Logo";
import Main from "./components/Layout/Main";

import Loader from "./components/Shared/Loader";
import Error from "./components/Shared/Error";
import Box from "./components/Shared/Box";
// api
export const API_KEY = "b2fd5f01";
export const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

export default function App() {
  const [ movies, setMovies ] = useState([]);
  const [ selectedId, setsSelectedId ] = useState(null);

  const [ watched, setWatched ] = useState([]);
  const [ isOpen2, setIsOpen2 ] = useState(true);

  const [ isLoading, setLoading ] = useState(false);
  const [ error, setError ] = useState("")
  const [ tempQuery, setTempQuery ] = useState("");
  const str = "inception";
  const [ query, setQuery ] = useState(str || "");

  const type = "all"

  const handleSelectMovie = (id) => setsSelectedId(selectedId => id === selectedId ? null : id);

  const handleCloseMovie = () => {
    setsSelectedId(null)
  };

  const handleAddWatched = (movie) => {
    setWatched(watched => [ ...watched, movie ])
  }

  const handleDeleteWatched = (id) => setWatched(watched => watched.filter(movie => movie.imdbID !== id));

  // loading movies
  useEffect(() => {
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
    handleCloseMovie()
    fetchMovies();

    return () => controller.abort();
  }, [ query ]);

  return (
    <>
      <Navbar>
        <Logo/>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar>

      {error && isLoading ? <Error msg={error}/> : ""}

      <Main>
        {
          isLoading && !error ? <Loader/> : <Box>
            <MovieList
              movies={movies}
              onSelectMovie={handleSelectMovie}
            />
          </Box>
        }
        <Box>
          {selectedId ? <MovieDetails
            selectedId={selectedId}
            onCloseMovie={handleCloseMovie}
            onAddWatched={handleAddWatched}
            watched={watched}
          /> : <>
            <WatchedSummary watched={watched}/>
            <WatchedMovieList watched={watched} onDelete={handleDeleteWatched}/>
          </>
          }
        </Box>
      </Main>
    </>
  )
}
