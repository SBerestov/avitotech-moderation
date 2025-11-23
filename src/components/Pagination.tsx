import React from "react";

type Props = {
  current: number;
  total: number;
  onChange: (page: number) => void;
};

export const Pagination: React.FC<Props> = ({ current, total, onChange }) => {
  if (total <= 1) return null;

  const pageWindow = (cur: number, tot: number, size = 5) => {
    const pages = [];
    let start = Math.max(1, cur - Math.floor(size / 2));
    let end = start + size - 1;
    if (end > tot) {
      end = tot;
      start = Math.max(1, end - size + 1);
    }
    for (let p = start; p <= end; p++) pages.push(p);
    return { pages, start, end };
  };

  const { pages } = pageWindow(current, total, 7);

  return (
    <div className="flex items-center gap-2 mt-4">
      <button
        onClick={() => onChange(Math.max(1, current - 1))}
        className="px-3 py-1 border rounded"
        disabled={current === 1}
      >
        Назад
      </button>

      {pages[0] > 1 && (
        <>
          <button className="px-3 py-1 border rounded" onClick={() => onChange(1)}>1</button>
          {pages[0] > 2 && <span className="px-2">…</span>}
        </>
      )}

      {pages.map(p => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className={`px-3 py-1 border rounded ${p === current ? "bg-blue-600 text-white" : ""}`}
        >
          {p}
        </button>
      ))}

      {pages[pages.length - 1] < total && (
        <>
          {pages[pages.length - 1] < total - 1 && <span className="px-2">…</span>}
          <button className="px-3 py-1 border rounded" onClick={() => onChange(total)}>{total}</button>
        </>
      )}

      <button
        onClick={() => onChange(Math.min(total, current + 1))}
        className="px-3 py-1 border rounded"
        disabled={current === total}
      >
        Вперед
      </button>
    </div>
  );
};