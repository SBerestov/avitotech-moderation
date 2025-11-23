import { useParams } from "react-router-dom";
import { useAd } from "../hooks/useAd";

export function AdPage() {
  const { id } = useParams();

  const numericId = id ? Number(id) : null;
  const { ad, loading, error } = useAd(numericId);

  if (loading) return <div>Загрузка…</div>;
  if (error) return <div>Ошибка: {error}</div>;
  if (!ad) return <div>Нет данных</div>;

  return (
    <div>
      <h1>{ad.title}</h1>
      <p>{ad.description}</p>
      <p><b>Цена:</b> {ad.price} ₽</p>
    </div>
  );
}
