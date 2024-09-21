export default function Page({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) {
  return (
    <div>
      <h3>검색 페이지 : {searchParams.q}</h3>
    </div>
  );
}
