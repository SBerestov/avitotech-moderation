import React, { useMemo, useState } from "react";
import type { AdsListParams } from "../types/ad";

type Props = {
  params: AdsListParams;
  onChange: (p: AdsListParams) => void;
  categories: { id: number; name: string }[];
};

const STATUS_OPTIONS = [
  { value: "pending", label: "На модерации" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
  { value: "draft", label: "Черновик" },
];

export const Filters: React.FC<Props> = ({ params, onChange, categories }) => {
  const [local, setLocal] = useState<AdsListParams>(params);
  React.useEffect(() => setLocal(params), [params]);

  const toggleStatus = (status: string) => {
    const s = new Set(local.status || []);
    if (s.has(status)) s.delete(status);
    else s.add(status);
    const arr = Array.from(s);
    const next = { ...local, status: arr.length ? arr : undefined };
    setLocal(next);
    onChange(next);
  };

  const changeCategory = (categoryId?: number) => {
    const next = { ...local, categoryId: categoryId ?? undefined };
    setLocal(next);
    onChange(next);
  };

  const applyPrice = (min?: number, max?: number) => {
    const next = { ...local, minPrice: min ?? undefined, maxPrice: max ?? undefined };
    setLocal(next);
    onChange(next);
  };

  const onSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const s = f.get("search")?.toString() || undefined;
    const next = { ...local, search: s };
    setLocal(next);
    onChange(next);
  };

  const resetAll = () => {
    const next: AdsListParams = { page: 1, limit: 10, sortBy: "createdAt", sortOrder: "desc" };
    setLocal(next);
    onChange(next);
  };

  return (
    <section className="border p-4 rounded mb-4 bg-white">
      <form onSubmit={onSearch} className="flex gap-2 items-center mb-3">
        <input
          name="search"
          defaultValue={local.search ?? ""}
          placeholder="Поиск по названию..."
          className="flex-1 border rounded px-3 py-2"
        />
        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Найти</button>
        <button type="button" onClick={resetAll} className="px-3 py-2 border rounded ml-2">
          Сбросить
        </button>
      </form>

      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="font-medium mb-2">Статус</div>
          <div className="flex flex-col gap-1">
            {STATUS_OPTIONS.map(opt => (
              <label key={opt.value} className="text-sm">
                <input
                  type="checkbox"
                  checked={(local.status || []).includes(opt.value)}
                  onChange={() => toggleStatus(opt.value)}
                  className="mr-2"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="font-medium mb-2">Категория</div>
          <select
            value={local.categoryId ?? ""}
            onChange={(e) => {
              const v = e.target.value ? Number(e.target.value) : undefined;
              changeCategory(v);
            }}
            className="w-full border rounded px-2 py-2"
          >
            <option value="">Все категории</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <div className="font-medium mb-2">Цена (от — до)</div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="мин"
              defaultValue={local.minPrice ?? ""}
              onBlur={(e) => applyPrice(Number(e.target.value) || undefined, local.maxPrice)}
              className="w-1/2 border rounded px-2 py-2"
            />
            <input
              type="number"
              placeholder="макс"
              defaultValue={local.maxPrice ?? ""}
              onBlur={(e) => applyPrice(local.minPrice, Number(e.target.value) || undefined)}
              className="w-1/2 border rounded px-2 py-2"
            />
          </div>
        </div>
      </div>

      <div className="mt-4">
        <div className="font-medium mb-2">Сортировка</div>
        <div className="flex gap-2 items-center">
          <select
            value={(local.sortBy as string) ?? "createdAt"}
            onChange={(e) => {
              const next = { ...local, sortBy: e.target.value as any };
              setLocal(next);
              onChange(next);
            }}
            className="border rounded px-2 py-2"
          >
            <option value="createdAt">По дате</option>
            <option value="price">По цене</option>
            <option value="priority">По приоритету</option>
          </select>

          <select
            value={(local.sortOrder as string) ?? "desc"}
            onChange={(e) => {
              const next = { ...local, sortOrder: e.target.value as any };
              setLocal(next);
              onChange(next);
            }}
            className="border rounded px-2 py-2"
          >
            <option value="desc">По убыванию</option>
            <option value="asc">По возрастанию</option>
          </select>
        </div>
      </div>
    </section>
  );
};