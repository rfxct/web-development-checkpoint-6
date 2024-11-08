import React from "react";
import MovieCard from "../components/movie-card";
import Section from "../components/section";

export default function Watchlist() {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  return (
    <div className="p-4">
      <Section title="Ver mais tarde">
        {watchlist.length ? (
          watchlist.map((movie) => <MovieCard {...movie} />)
        ) : (
          <p>Nenhum filme na lista.</p>
        )}
      </Section>
    </div>
  );
}
