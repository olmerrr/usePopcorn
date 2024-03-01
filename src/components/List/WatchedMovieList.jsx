import WatchedMovie from "./WatchedMovie";

const WatchedMovieList = ({ watched, onDelete }) => {

  return <ul className="list">
    {watched.map((movie) => (
      <WatchedMovie
        key={movie.imdbID}
        movie={movie}
        onDelete={onDelete}
      />
    ))}
  </ul>
}

export default WatchedMovieList;