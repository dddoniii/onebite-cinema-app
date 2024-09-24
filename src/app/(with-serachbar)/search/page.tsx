import style from "./page.module.css";
import movies from "@/mock/dummy.json";
import MovieItem from "@/components/movie-item";

export default function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return (
    <div className={style.search_container}>
      {movies.map((movie) => (
        <MovieItem key={movie.id} {...movie} />
      ))}
    </div>
  );
}
