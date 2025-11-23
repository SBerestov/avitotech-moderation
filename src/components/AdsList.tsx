import { useAds } from "../hooks/useAds";

export function AdsList() {
  const { ads, loading, error } = useAds();

  if (loading) return <div>Загрузка…</div>;
  if (error) return <div>Ошибка: {error}</div>;

  return (
    <ul>
      {ads.map(ad => (
        <li key={ad.id}>
          {ad.title} — {ad.price} ₽
        </li>
      ))}
    </ul>
  );
}
