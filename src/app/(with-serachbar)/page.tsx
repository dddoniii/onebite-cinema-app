import style from "./page.module.css";
import MovieItem from "@/components/movie-item";
import MovieListSkeleton from "@/components/skeleton/movie-list-skeleton";
import { MovieData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

async function AllMovies() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const allMovies: MovieData[] = await response.json();

  return allMovies.map((movie) => (
    <MovieItem key={`all-${movie.id}`} {...movie} />
  ));
}

async function RecoMovies() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/random`,
    { next: { revalidate: 3 } }
  );
  if (!response.ok) {
    return <div>오류가 발생했습니다...</div>;
  }

  const recoMovies: MovieData[] = await response.json();

  return recoMovies.map((movie) => (
    <MovieItem key={`reco-${movie.id}`} {...movie} />
  ));
}

export default function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 가장 추천하는 영화</h3>
        <div className={style.recommand_container}>
          <Suspense fallback={<MovieListSkeleton count={3} />}>
            <RecoMovies />
          </Suspense>
        </div>
      </section>
      <section>
        <h3>등록된 모든 영화</h3>
        <div className={style.all_container}>
          <Suspense fallback={<MovieListSkeleton count={20} />}>
            <AllMovies />
          </Suspense>
        </div>
      </section>
    </div>
  );
}
