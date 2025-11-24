import { useQuery } from "@tanstack/react-query";
import {
  getStatsSummary,
  getStatsActivity,
  getStatsDecisions,
  getStatsCategories,
} from "../api/stats";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "../components/Card";

export const StatsPage = () => {
  const summaryRequest = useQuery({ queryKey: ["stats-summary"], queryFn: getStatsSummary });
  const activityRequest = useQuery({ queryKey: ["stats-activity"], queryFn: getStatsActivity });
  const decisionsRequest = useQuery({ queryKey: ["stats-decisions"], queryFn: getStatsDecisions });
  const categoriesRequest = useQuery({ queryKey: ["stats-categories"], queryFn: getStatsCategories });

  if (summaryRequest.isLoading || activityRequest.isLoading || decisionsRequest.isLoading || categoriesRequest.isLoading) {
    return <div className="p-4">Загрузка...</div>;
  }

  const summary = summaryRequest.data;
  const activity = activityRequest.data;
  const decisions = decisionsRequest.data;
  const categories = categoriesRequest.data;

  const decisionData = [
    { name: "Одобрено", value: decisions.approved },
    { name: "Отклонено", value: decisions.rejected },
    { name: "На доработку", value: decisions.requestChanges },
  ];

  const categoryData = Object.entries(categories).map(([name, value]) => ({
    name,
    value,
  }));

  const COLORS = ["#4ade80", "#f87171", "#facc15", "#60a5fa", "#a78bfa", "#34d399"];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Статистика модерации</h1>

      {/* Карточки */}
      <div className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-2">
        <Card title="Всего проверено" value={summary.totalReviewed} />
        <Card title="Одобрено" value={summary.approvedPercentage.toFixed(1) + "%"} />
        <Card title="Отклонено" value={summary.rejectedPercentage.toFixed(1) + "%"} />
        <Card title="Среднее время" value={summary.averageReviewTime + " сек"} />
      </div>

      {/* График активности */}
      <h2 className="text-xl font-semibold mb-2">Активность по дням</h2>
      <div className="h-64 mb-10 border rounded-[22px] p-2 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={activity}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="approved" stackId="a" fill="#4ade80" />
            <Bar dataKey="rejected" stackId="a" fill="#f87171" />
            <Bar dataKey="requestChanges" stackId="a" fill="#facc15" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Круговая диаграмма решений */}
      <h2 className="text-xl font-semibold mb-2">Распределение решений</h2>
      <div className="h-64 mb-10 border rounded-[22px] p-2 bg-white flex justify-center">
        <ResponsiveContainer width="60%" height="100%">
          <PieChart>
            <Pie
              data={decisionData}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {decisionData.map((_, i) => (
                <Cell key={i} fill={COLORS[i]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Категории */}
      <h2 className="text-xl font-semibold mb-2">По категориям</h2>
      <div className="h-64 mb-10 border rounded-[22px] p-2 bg-white">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={categoryData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {categoryData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};