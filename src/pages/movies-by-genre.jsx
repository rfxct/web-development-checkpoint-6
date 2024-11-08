import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../services/tmdb-api";
import MovieCard from "../components/movie-card";
import Section from "../components/section";

export default function MoviesByGenre() {
  const { id } = useParams();
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState({});

  async function fetchData() {
    const [moviesData, genresData] = await Promise.all([
      tmdbApi(`/discover/movie`, { with_genres: id }),
      tmdbApi(`/genre/movie/list`),
    ]);

    setMovies(moviesData.results);
    setGenre(genresData.genres.find((g) => g.id == id));
  }

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{`Filmes de ${genre.name}`}</h1>
      <Section>
        {movies.length ? (
          movies.map((movie) => <MovieCard key={movie.id} {...movie} detail />)
        ) : (
          <p>Nenhum filme encontrado para este gênero.</p>
        )}
      </Section>
    </div>
  );
}
