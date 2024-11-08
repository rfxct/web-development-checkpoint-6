import { Link } from "react-router-dom";

export default function MovieCard({
  id,
  title,
  name,
  vote_average,
  overview,
  poster_path,
  detail,
}) {
  const resolvedName = title ?? name;

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2 flex">
      <div className="max-w-xs flex-1 flex flex-col rounded overflow-hidden shadow-lg mx-auto bg-gray-800">
        <div
          className="h-[410px]"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w300${poster_path})`,
          }}
        ></div>

        <div className="p-3">
          <h2 className="font-bold text-md mb-2 text-center">
            {resolvedName} {` (⭐️ ${vote_average.toFixed(1)})`}
          </h2>
          {detail && <p>{overview.slice(0, 157).padEnd(160, ".")}</p>}
          <Link
            to={`/movies/${id}`}
            className="text-blue-500 hover:text-blue-700 font-semibold text-center block"
          >
            Ver mais »
          </Link>
        </div>
      </div>
    </div>
  );
}
