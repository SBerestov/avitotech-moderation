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
        <Link to={`/ads/${ad.id}`} className="text-2xl font-semibold hover:underline">
          {ad.title}
        </Link>

        <div className="flex gap-2 mt-2 text-base text-gray-600">
          <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold">{ad.category}</span>
          <span>•</span>
          <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold">{formatDate(ad.createdAt)}</span>
          <span>•</span>
          <span className="bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold">{translateStatus(ad.status)}</span>
          <span className={`inline-block ml-2 px-2 py-0.5 text-xs rounded
            ${ad.priority === 'urgent' ? ' bg-red-100 text-red-700' : ' bg-gray-100 text-gray-700'}`}>
            {translatePriority(ad.priority)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-2xl font-bold">{ad.price.toLocaleString("ru-RU")} ₽</div>
          <div className={`text-sm font-medium ${ad.priority === "urgent" ? "text-red-600" : "text-gray-700"}`}>
            {ad.priority === "urgent" ? "Срочно" : "Обычный"}
          </div>
        </div>
      </div>
    </article>
  );
};
