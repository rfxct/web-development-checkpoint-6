import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import tmdbApi from "../services/tmdb-api";

export default function Genres() {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    tmdbApi("/genre/movie/list").then((data) => setGenres(data?.genres)).catch;
  }, []);

  return (
    <section className="p-4">
      <h1 className="text-2xl font-bold mb-4">Gêneros</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {genres.length ? (
          genres.map((genre) => (
            <Link
              key={genre.id}
              to={`/genres/${genre.id}`}
              className="block p-4 bg-purple-600 text-white rounded shadow hover:bg-purple-700 transition duration-200"
            >
              <h2 className="text-lg font-semibold">{genre.name}</h2>
            </Link>
          ))
        ) : (
          <p>Nenhum gênero encontrado.</p>
        )}
      </div>
    </section>
  );
}
