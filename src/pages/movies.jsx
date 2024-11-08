import { useEffect, useState } from "react";
import MovieCard from "../components/movie-card";
import Section from "../components/section";
import tmdbApi from "../services/tmdb-api";

export default function Movies() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    tmdbApi("/movie/popular").then((data) => setMovies(data.results));
  }, []);

  const filteredMovies = movies.filter(({ title }) =>
    title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Veja o catálogo completo de filmes
      </h2>
      <div className="flex justify-center mb-6">
        <input
          className="w-full max-w-md p-2 border border-gray-400 rounded-lg focus:outline-none focus:ring focus:ring-purple-600 text-black"
          type="text"
          id="search"
          placeholder="Buscar filmes..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <Section>
        {filteredMovies.length ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} {...movie} detail />
          ))
        ) : (
          <p className="text-center">Filme não encontrado</p>
        )}
      </Section>
    </div>
  );
}
