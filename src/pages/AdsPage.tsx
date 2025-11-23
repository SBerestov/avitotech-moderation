import React, { useMemo, useState } from "react";
import { useAds } from "../hooks/useAds";
import { AdCard } from "../components/AdCard";
import { Filters } from "../components/Filters";
import { Pagination } from "../components/Pagination";
import type { AdsListParams, Ad, AdsResponse } from "../types/ad";

export const AdsPage: React.FC = () => {
  const [params, setParams] = useState<AdsListParams>({ page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" });

  const { data, isLoading, error } = useAds(params);
  const typedData = data as AdsResponse;

  const categories = useMemo(() => {
    const map = new Map<number, string>();
    typedData?.ads.forEach((a: any) => map.set(a.categoryId, a.category));
    return Array.from(map.entries()).map(([id, name]) => ({ id, name }));
  }, [data]);

  const onChangeFilters = (next: AdsListParams) => {
    const merged = { ...next, page: 1, limit: params.limit };
    setParams(merged);
  };

  const onChangePage = (page: number) => {
    setParams((p) => ({ ...p, page }));
  };

  if (isLoading) return <div className="p-4">Загрузка...</div>;
  if (error) return <div className="p-4 text-red-600">Ошибка: {error.message}</div>;
  if (!data) return <div className="p-4">Нет данных</div>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Список объявлений</h1>

      <div className="mb-4 text-sm text-gray-600">
        Всего объявлений: <span className="font-semibold">{typedData.pagination.totalItems}</span>
      </div>

      <Filters params={params} onChange={onChangeFilters} categories={categories} />

      <div className="bg-white border rounded">
        <div className="p-4 border-b">
          <strong>Результаты</strong>
          <span className="ml-2 text-sm text-gray-600">Показано {typedData.ads.length} из {typedData.pagination.itemsPerPage}</span>
        </div>

        <div className="p-4 space-y-2">
          {typedData.ads.map((ad: Ad) => (
            <AdCard key={ad.id} ad={ad} />
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <Pagination
          current={typedData.pagination.currentPage}
          total={typedData.pagination.totalPages}
          onChange={onChangePage}
        />
        <div className="text-sm text-gray-600">
          Страница {typedData.pagination.currentPage} / {typedData.pagination.totalPages}
        </div>
      </div>
    </div>
  );
};
