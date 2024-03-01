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

import useMovies from "./use/useMovies";
import useLocalStorageState from "./use/useLocalStorageState";
// api
export const API_KEY = "b2fd5f01";
export const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`

export default function App() {
  const [ selectedId, setsSelectedId ] = useState(null);
  const [ isOpen2, setIsOpen2 ] = useState(true);
  const [ tempQuery, setTempQuery ] = useState("");

  const str = "inception";

  const [ query, setQuery ] = useState(str || "");


  // localStorage custom-hook
  const [ watched, setWatched ] = useLocalStorageState([], "watched");
  // loading movies with custom-hook
  const { movies, error, isLoading } = useMovies(query);
  const handleSelectMovie = (id) => setsSelectedId(selectedId => id === selectedId ? null : id);
  const handleCloseMovie = () => {
    setsSelectedId(null)
  };

  const handleAddWatched = (movie) => setWatched(watched => [ ...watched, movie ]);
  const handleDeleteWatched = (id) => setWatched(watched => watched.filter(movie => movie.imdbID !== id));
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
  );
}
