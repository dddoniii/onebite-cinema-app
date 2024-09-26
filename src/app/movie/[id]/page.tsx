import { MovieData } from "@/types";
import style from "./page.module.css";
import { notFound } from "next/navigation";

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

export default async function Page({
  params,
}: {
  params: {
    id: string | string[];
  };
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/movie/${params.id}`,
    { cache: "force-cache" }
  );
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const movie: MovieData = await response.json();

  const {
    id,
    title,
    releaseDate,
    company,
    genres,
    subTitle,
    description,
    runtime,
    posterImgUrl,
  } = movie;

  return (
    <div className={style.container}>
      <div
        className={style.poster_img_container}
        style={{ backgroundImage: `url('${posterImgUrl}')` }}
      >
        <img src={posterImgUrl} />
      </div>

      <div className={style.title}>{title}</div>
      <div>
        {releaseDate} / {genres.join(", ")} / {runtime}분
      </div>
      <div>{company}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.discription}>{description}</div>
    </div>
  );
}
