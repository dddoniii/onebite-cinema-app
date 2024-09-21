export default function Page({
  params,
}: {
  params: {
    id: string | string[];
  };
}) {
  return (
    <div>
      <h3>{params.id} 영화 상세페이지</h3>
    </div>
  );
}
