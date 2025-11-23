import React from "react";
import { Link } from "react-router-dom";
import type { Ad } from "../types/ad";
import { translateStatus, translatePriority, formatDate } from "../utils/format";

export const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  return (
    <article className="flex gap-4 border-b py-4">
      <img
        src={ad.images?.[0]}
        alt={ad.title}
        className="w-40 h-28 object-cover rounded"
      />

      <div className="flex-1">
        <Link to={`/ads/${ad.id}`} className="text-lg font-semibold hover:underline">
          {ad.title}
        </Link>

        <div className="mt-1 text-sm text-gray-600">
          <span className="mr-3">{ad.category}</span>
          <span className="mr-3">• {formatDate(ad.createdAt)}</span>
          <span className="mr-3">• {translateStatus(ad.status)}</span>
          <span className="inline-block ml-2 px-2 py-0.5 text-xs rounded
            {ad.priority === 'urgent' ? ' bg-red-100 text-red-700' : ' bg-gray-100 text-gray-700'}">
            {translatePriority(ad.priority)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-xl font-bold">{ad.price.toLocaleString("ru-RU")} ₽</div>
          <div className={`text-sm font-medium ${ad.priority === "urgent" ? "text-red-600" : "text-gray-700"}`}>
            {ad.priority === "urgent" ? "Срочно" : "Обычный"}
          </div>
        </div>
      </div>
    </article>
  );
};
