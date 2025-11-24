import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAd } from "../hooks/useAd";
import { useApproveAd, useRejectAd, useRequestChanges } from "../hooks/useModeration";
import arrowRight from "../assets/right-arrow.svg";
import arrowLeft from "../assets/left-arrow.svg";
import check from "../assets/check.png";
import close from "../assets/close.png";
import reload from "../assets/reload.png";

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

      <h1 className="text-3xl font-bold mb-4">{ad.title}</h1>

      <div className="relative mb-6">
        <img
          src={ad.images[imageIndex]}
          className="w-full h-80 object-cover rounded-[22px] shadow"
          alt="Фото"
        />

        <button
          onClick={prevImage}
          className="absolute top-1/2 left-2 bg-white px-5 py-2 rounded-[22px] shadow"
        >
          <img src={arrowLeft} height={20} width={20} />
        </button>

        <button
          onClick={nextImage}
          className="absolute top-1/2 right-2 bg-white px-5 py-2 rounded-[22px] shadow"
        >
          <img src={arrowRight} height={20} width={20} />
        </button>
      </div>

      <p className="text-gray-800 mb-6">{ad.description}</p>

      <h2 className="text-xl font-semibold mb-2">Характеристики</h2>
      <table className="w-full border rounded mb-6">
        <tbody>
          {Object.entries(ad.characteristics).map(([k, v]) => (
            <tr key={k} className="border-b">
              <td className="p-2 font-medium bg-gray-50 border-r">{k}</td>
              <td className="p-2">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mb-2">Продавец</h2>
      <div className="border rounded-[22px] p-4 mb-6">
        <p><strong>Имя:</strong> {ad.seller.name}</p>
        <p><strong>Рейтинг:</strong> {ad.seller.rating}</p>
        <p><strong>Количество объявлений:</strong> {ad.seller.totalAds}</p>
        <p><strong>Дата регистрации:</strong> {new Date(ad.seller.registeredAt).toLocaleString()}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">История модерации</h2>

      {ad.moderationHistory.length === 0 ? (
        <p className="text-gray-500 mb-6">Нет данных</p>
      ) : (
        <div className="border rounded-[22px] mb-6">
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

      <h2 className="text-xl font-semibold mb-3">Действия модератора</h2>

      <p className="mb-1 text-sm text-gray-600">Укажите причину (обязательно для отклонения/возврата)</p>

      <div className="flex flex-wrap gap-2 mb-3">
        {reasons.map((r) => (
          <button
            key={r}
            onClick={() => setReason(r)}
            className={`px-5 py-2.5 rounded-[22px] ${
              reason === r ? "bg-[#646cff] text-white" : "bg-gray-200"
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Комментарий (необязательно)"
        className="border px-5 py-2 w-full rounded-[22px] mb-4"
      />

      <div className="flex gap-3">
        <button
          onClick={() => approve.mutate(adId)}
          className="px-7 py-2.5 rounded-4xl flex items-center gap-2 bg-[#08F29B] border-b-4  hover:bg-[#07e28c]"
        >
          <img src={check} height={15} width={15} className="mt-1" />
          <span className="text-xl text-black font-bold">Одобрить</span>
        </button>

        <button
          onClick={doReject}
          className="px-7 py-2.5 rounded-4xl flex items-center gap-2 bg-[#FF5656] border-b-4  hover:bg-[#f04c4c]"
        >
          <img src={close} height={15} width={15} className="mt-1" />
          <span className="text-xl text-black font-bold">Отклонить</span>
        </button>

        <button
          onClick={doRequestChanges}
          className="px-7 py-2.5 rounded-4xl flex items-center gap-2 bg-[#FFD856] border-b-4  hover:bg-[#f7ce4c]"
        >
          <img src={reload} height={15} width={15} className="mt-1" />
          <span className="text-xl text-black font-bold">Вернуть на доработку</span>
        </button>
      </div>

      <div className="flex justify-between mt-15 mb-10">
        <button onClick={() => navigate("/list")} className="flex items-center gap-2 px-5 py-2.5 rounded-[22px] bg-gray-200">
          <img src={arrowLeft} height={20} width={20} />
          <span>Назад к списку</span>
        </button>

        <div className="flex gap-4">
          {adId > 1 && (
            <button
              onClick={() => navigate(`/ads/${adId - 1}`)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-[22px] bg-gray-200"
            >
              <img src={arrowLeft} height={20} width={20} />
              <span>Предыдущее</span>
            </button>
          )}

          <button
            onClick={() => navigate(`/ads/${adId + 1}`)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[22px] bg-gray-200"
          >
            <span>Следущее</span>
            <img src={arrowRight} height={20} width={20} />
          </button>
        </div>
      </div>
    </div>
  );
};