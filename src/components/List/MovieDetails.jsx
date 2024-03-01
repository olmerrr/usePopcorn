import { useEffect, useRef, useState } from "react";

import { BASE_URL } from "../../App";

import StarRating from "../Shared/StarRating";
import Loader from "../Shared/Loader";
import { useKey } from "../../use/useKey";

const MovieDetails = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {

  const [ movie, setMovie ] = useState({})
  const [ isLoading, setIsLoading ] = useState(false)
  const [ userRating, setUserRating ] = useState("");
  const isWatched = watched.map(movie => movie.imdbID).includes(selectedId);
  const watchedUserRating = watched.find(movie => movie.imdbID === selectedId)?.userRating

  const countRef = useRef(0);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre
  } = movie;

  // const [ isTop, setIsTop ] = useState(imdbRating > 6);
  // console.log("isTop", isTop, imdbRating);
  //
  // useEffect(() => {
  //   if ( imdbRating > 8 ) setIsTop(true);
  // }, [ imdbRating ]);

  const isTop = imdbRating > 8;
  // const [ avgRating, setAvgRating ] = useState(0);
  const handleAdd = (movie) => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countRatingDecisions: countRef.current
    }
    onAddWatched(newWatchedMovie)
    onCloseMovie();
  };

  useEffect(() => {
    if ( userRating ) countRef.current++;
  }, [ userRating ]);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}&i=${selectedId}`);
        if ( !response.ok ) {
          throw new Error("Something went wrong...")
        }
        setIsLoading(false);
        const data = await response.json();
        setMovie(data);

      } catch ( err ) {
        console.error(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieDetails()
  }, [ selectedId ]);
  // с помощью сайд эфекта изменить тайтл в ДОМе
  // side effect потому что затрагивает другие компоненты и части приложения (возможно и DOM дерева)
  useEffect(() => {
    if ( !title ) return;
    const initialTitle = document.title;
    document.title = `Movie | ${title}`
    return () => document.title = initialTitle;
  }, [ title ]);

  useKey("escape", onCloseMovie);

  if ( isLoading ) return <>
    <Loader/>
  </>
  return <section className="details">
    <header>
      <div className="container-btn-back">
        <button
          className="btn-back"
          onClick={onCloseMovie}
        >&larr;
        </button>
      </div>
      <img src={poster} alt={title}/>
      <div className="details-overview">
        <h2>{title}</h2>
        <p>{year}</p>

        <p>{released} &bull; {runtime}</p>
        <p>{genre}</p>
        <p><span>***</span> {imdbRating} IMBbRating</p>
        {
          userRating > 0 &&
          <button className="btn-add" onClick={() => handleAdd(movie)}>+ Add To List</button>
        }
      </div>
    </header>
    <section>
      {/*<p>{avgRating}</p>*/}
      {
        !isWatched ? <div className="rating">
            <StarRating maxRating={10} onSetRating={setUserRating}/>
          </div>
          : <h2>You rated this movie {watchedUserRating} star</h2>
      }      <p>{plot}</p>
      <p>Starring actors {actors}</p>
      <p>Directed by {director}</p>
    </section>
  </section>
}

export default MovieDetails;