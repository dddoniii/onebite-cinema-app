import { MovieData } from "@/types";
import style from "./page.module.css";

import MovieDetail from "@/components/movie-detail";
import ReviewEditor from "@/components/review-editor";
import ReviewList from "@/components/review-list";

export const dynamicParams = false;

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie`
    );

    if (!response.ok) {
      throw new Error("오류가 발생했습니다...");
    }

    const movies: MovieData[] = await response.json();

    return movies.map(({ id }) => ({
      id: id.toString(),
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  return (
    <div className={style.container}>
      <MovieDetail movieId={params.id} />
      <ReviewEditor movieId={params.id} />
      <ReviewList movieId={params.id} />
    </div>
  );
}
