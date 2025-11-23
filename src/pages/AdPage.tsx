import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAd } from "../hooks/useAd";
import { useApproveAd, useRejectAd, useRequestChanges } from "../hooks/useModeration";

const reasons = [
  "Запрещенный товар",
  "Неверная категория",
  "Некорректное описание",
  "Проблемы с фото",
  "Подозрение на мошенничество",
  "Другое",
];

export const AdPage = () => {
  const { id } = useParams();
  const adId = Number(id);
  const navigate = useNavigate();

  const { data: ad, isLoading } = useAd(adId);

  const approve = useApproveAd();
  const reject = useRejectAd();
  const changes = useRequestChanges();

  const [imageIndex, setImageIndex] = useState(0);
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  if (isLoading) return <div className="p-4">Загрузка...</div>;
  if (!ad) return <div className="p-4">Объявление не найдено</div>;

  const nextImage = () => {
    setImageIndex((imageIndex + 1) % ad.images.length);
  };

  const prevImage = () => {
    setImageIndex((imageIndex - 1 + ad.images.length) % ad.images.length);
  };

  const doReject = () => {
    if (!reason) {
      alert("Укажите причину отклонения");
      return;
    }
    reject.mutate({ id: adId, reason, comment });
  };

  const doRequestChanges = () => {
    if (!reason) {
      alert("Укажите причину запроса изменений");
      return;
    }
    changes.mutate({ id: adId, reason, comment });
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">

      {/* Навигация */}
      <div className="flex justify-between mb-4">
        <button onClick={() => navigate("/list")} className="text-blue-600">
          ← Назад к списку
        </button>

        <div className="flex gap-4">
          {adId > 1 && (
            <button
              onClick={() => navigate(`/ads/${adId - 1}`)}
              className="text-blue-600"
            >
              ← Предыдущее
            </button>
          )}

          <button
            onClick={() => navigate(`/ads/${adId + 1}`)}
            className="text-blue-600"
          >
            Следующее →
          </button>
        </div>
      </div>

      {/* Заголовок */}
      <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>

      {/* Галерея */}
      <div className="relative mb-6">
        <img
          src={ad.images[imageIndex]}
          className="w-full h-80 object-cover rounded shadow"
          alt="Фото"
        />

        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 bg-white p-2 rounded shadow"
        >
          ←
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 bg-white p-2 rounded shadow"
        >
          →
        </button>
      </div>

      {/* Описание */}
      <p className="text-gray-800 mb-6">{ad.description}</p>

      {/* Характеристики */}
      <h2 className="text-xl font-semibold mb-2">Характеристики</h2>
      <table className="w-full border rounded mb-6">
        <tbody>
          {Object.entries(ad.characteristics).map(([k, v]) => (
            <tr key={k} className="border-b">
              <td className="p-2 font-medium bg-gray-50">{k}</td>
              <td className="p-2">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Блок продавца */}
      <h2 className="text-xl font-semibold mb-2">Продавец</h2>
      <div className="border rounded p-4 bg-gray-50 mb-6">
        <p><strong>Имя:</strong> {ad.seller.name}</p>
        <p><strong>Рейтинг:</strong> {ad.seller.rating}</p>
        <p><strong>Количество объявлений:</strong> {ad.seller.totalAds}</p>
        <p><strong>Дата регистрации:</strong> {new Date(ad.seller.registeredAt).toLocaleString()}</p>
      </div>

      {/* История модерации */}
      <h2 className="text-xl font-semibold mb-2">История модерации</h2>

      {ad.moderationHistory.length === 0 ? (
        <p className="text-gray-500 mb-6">Нет данных</p>
      ) : (
        <div className="border rounded mb-6">
          {ad.moderationHistory.map((h) => (
            <div key={h.id} className="p-3 border-b">
              <p><strong>Модератор:</strong> {h.moderatorName}</p>
              <p><strong>Действие:</strong> {h.action}</p>
              <p><strong>Время:</strong> {new Date(h.timestamp).toLocaleString()}</p>
              {h.comment && <p><strong>Комментарий:</strong> {h.comment}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Панель модерации */}
      <h2 className="text-xl font-semibold mb-3">Действия модератора</h2>

      {/* Причины */}
      <p className="mb-1 text-sm text-gray-600">Укажите причину (обязательно для отклонения/возврата)</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {reasons.map((r) => (
          <button
            key={r}
            onClick={() => setReason(r)}
            className={`px-3 py-1 rounded border ${
              reason === r ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      {/* Комментарий */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий (необязательно)"
        className="border p-2 w-full rounded mb-4"
      />

      {/* Кнопки */}
      <div className="flex gap-3">
        <button
          onClick={() => approve.mutate(adId)}
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Одобрить
        </button>

        <button
          onClick={doReject}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Отклонить
        </button>

        <button
          onClick={doRequestChanges}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Вернуть на доработку
        </button>
      </div>
    </div>
  );
};