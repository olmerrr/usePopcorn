import Button from "../Shared/Button";
import WatchedSummary from "../List/WatchedSummary";
import WatchedMovieList from "../List/WatchedMovieList";

const WatchedBox = (
  {
    watched,
    isOpen2,
    setIsOpen2
  }
) => {
  return <>
    <div className="box">
      <Button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </Button>
      {isOpen2 && (
        <>
          <WatchedSummary watched={watched}/>
          <WatchedMovieList watched={watched}/>
        </>

      )}
    </div>
  </>
}

export default WatchedBox;