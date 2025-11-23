import { api } from "./axios";

export const getStatsSummary = async () => {
  const res = await api.get("/stats/summary");
  return res.data;
};

export const getStatsActivity = async () => {
  const res = await api.get("/stats/chart/activity");
  return res.data;
};

export const getStatsDecisions = async () => {
  const res = await api.get("/stats/chart/decisions");
  return res.data;
};

export const getStatsCategories = async () => {
  const res = await api.get("/stats/chart/categories");
  return res.data;
};
