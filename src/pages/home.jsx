import { useEffect, useState } from "react";
import Section from "../components/section";
import MovieCard from "../components/movie-card";
import tmdbApi from "../services/tmdb-api";
import { getListByKey } from "../services/storage";

export default function Home() {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [forYou, setForYou] = useState([]);

  async function fetchData() {
    const [upcomingData, tvData] = await Promise.all([
      tmdbApi("/movie/upcoming"),
      tmdbApi("/tv/popular"),
    ]);

    const watchedMovies = getListByKey("watched");
    if (watchedMovies?.length) {
      const forYou = await Promise.all(
        watchedMovies.map(async (movie) => {
          const { results } = await tmdbApi(
            `/${movie.resource_type}/${movie.id}/similar`
          );

          return results?.filter((movie) => movie?.poster_path).slice(0, 4);
        })
      );

      setForYou(
        forYou
          .flat()
          .sort(() => 0.5 - Math.random())
          .slice(0, 4)
      );

      console.log({ forYou });
    }

    setUpcomingMovies(upcomingData.results.slice(0, 4));
    setTvShows(tvData.results.slice(0, 4));
  }

  useEffect(() => {
    fetchData();
  }, [localStorage]);

  return (
    <section className="container mx-auto px-4 py-8">
      <Section title="Para você">
        {forYou.length ? (
          forYou.map((movie) => <MovieCard key={movie.id} {...movie} />)
        ) : (
          <p>Nenhuma recomendação</p>
        )}
      </Section>

      <Section title="Novidades">
        {upcomingMovies.map((movie) => (
          <MovieCard key={movie.id} {...movie} />
        ))}
      </Section>

      <Section title="Séries populares">
        {tvShows.map((show) => (
          <MovieCard key={show.id} {...show} type={"tv"} />
        ))}
      </Section>
    </section>
  );
}
