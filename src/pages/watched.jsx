import React from "react";
import Section from "../components/section";
import MovieCard from "../components/movie-card";

export default function Watched() {
  const watched = JSON.parse(localStorage.getItem("watched")) || [];

  return (
    <div className="p-4">
      {watched.length ? (
        <Section title={"Filmes assistidos"}>
          {watched.map((movie) => (
            <MovieCard key={movie.id} {...movie} />
          ))}
        </Section>
      ) : (
        <p>Nenhum filme assistido.</p>
      )}
    </div>
  );
}
