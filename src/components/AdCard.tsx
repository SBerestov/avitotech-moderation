import React from "react";
import { Link } from "react-router-dom";
import type { Ad } from "../types/ad";
import { translateStatus, translatePriority, formatDate } from "../utils/format";
import arrow from "../assets/top-right.png";

export const AdCard: React.FC<{ ad: Ad }> = ({ ad }) => {
  return (
    <article className="flex gap-4 border rounded-[22px] py-4 relative">
      <img
        src={ad.images?.[0]}
        alt={ad.title}
        className="w-40 h-28 ml-4 object-cover rounded-[22px]"
      />

      <div className="flex-1">
        <Link to={`/ads/${ad.id}`} className="text-2xl font-semibold hover:underline">
          {ad.title}
        </Link>

        <div className="flex items-center gap-2 mt-2 text-base text-gray-600">
          <span className=" text-gray-700 rounded-xl  text-sm ">{ad.category}</span>
          <span>•</span>
          <span className=" text-gray-700 rounded-xl  text-sm ">{formatDate(ad.createdAt)}</span>
          <span>•</span>
          <span className=" text-gray-700 rounded-xl  text-sm ">{translateStatus(ad.status)}</span>
          <span className={`bg-gray-200 text-gray-700 rounded-xl px-3 py-0.75 text-sm font-bold
            ${ad.priority === 'urgent' ? ' bg-red-100 text-red-700' : ' bg-gray-100 text-gray-700'}`}>
            {translatePriority(ad.priority)}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="text-2xl font-bold">{ad.price.toLocaleString("ru-RU")} ₽</div>
        </div>

        <Link 
          to={`/ads/${ad.id}`}
          className="absolute bottom-4 right-4 px-7 py-2.5 rounded-4xl flex items-center gap-2 bg-[#08F29B] border-b-4 border-[#06d17a] hover:bg-[#07e28c] active:border-b-0 active:mt-1 active:mb-[-1px] transition-all duration-25"
        >
          <span className="text-xl text-black font-bold">Открыть</span>
          <img src={arrow} height={15} width={15} className="mt-1" />
        </Link>
      </div>
    </article>
  );
};
