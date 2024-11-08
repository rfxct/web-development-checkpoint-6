import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";

import tmdbApi from "../services/tmdb-api";
import { getListByKey, setListByKey } from "../services/storage";

export default function MovieDetail() {
  const { type, id } = useParams();

  const [movieData, setMovieData] = useState(null);
  const [movieTrailer, setMovieTrailer] = useState("");
  const [movieCast, setMovieCast] = useState([]);

  async function fetchData() {
    const [movieData, videoData, castData] = await Promise.all([
      tmdbApi(`/${type}/${id}`),
      tmdbApi(`/${type}/${id}/videos`),
      tmdbApi(`/${type}/${id}/credits`),
    ]);

    setMovieData(movieData);
    setMovieTrailer(videoData.results[0]?.key);
    setMovieCast(castData.cast);
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  function handleAddToList(listKey) {
    return () => {
      const items = getListByKey(listKey);
      if (items.find((item) => item.id === movieData.id)) {
        return alert("Filme já está na lista");
      }

      setListByKey(listKey, [...items, { resource_type: type, ...movieData }]);
      alert("Filme adicionado à lista");
    };
  }

  if (!movieData) {
    return <div>Carregando...</div>;
  }

  return (
    <section className="flex justify-center items-center min-h-screen text-white p-4">
      <div className="max-w-lg w-full rounded-lg shadow-lg overflow-hidden my-8 ">
        <div className="w-full max-h-96 bg-gray-800 flex justify-center items-center">
          <img
            src={`https://image.tmdb.org/t/p/w300${movieData.poster_path}`}
            alt={`Poster de ${movieData.title}`}
            className="w-full max-h-96 object-contain pt-5"
          />
        </div>
        <div className="flex flex-col gap-5 p-4 bg-gray-800 text-white">
          <div>
            <h1 className="text-2xl text-center font-bold mb-2">
              {movieData.title}
            </h1>
            <p>{movieData.overview}</p>
            <br />
            <p>Avaliação: {movieData.vote_average}</p>
            <p>Data de Lançamento: {movieData.release_date}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Elenco:</h2>
            <ul className="list-disc list-inside">
              {movieCast.slice(0, 5).map((actor) => (
                <li key={actor.id}>
                  {actor.name} como {actor.character}
                </li>
              ))}
            </ul>
          </div>

          {movieTrailer && (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${movieTrailer}`}
              title="Trailer"
              allowFullScreen
            ></iframe>
          )}

          <div className="flex justify-between">
            <button
              onClick={handleAddToList("watchlist")}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 mx-1 rounded"
            >
              Assistir mais tarde
            </button>
            <button
              onClick={handleAddToList("watched")}
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 mx-1 rounded"
            >
              Marcar como assistido
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
