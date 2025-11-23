import { api } from "./axios";
import type { Ad, AdsResponse, AdsListParams } from "../types/ad";

export const getAds = async (params?: AdsListParams): Promise<AdsResponse> => {
  const res = await api.get("/ads", { params });
  return res.data as AdsResponse;
};

export const getAd = async (id: number): Promise<Ad> => {
  const res = await api.get(`/ads/${id}`);
  return res.data as Ad;
};

export const approveAd = async (id: number) => {
  const res = await api.post(`/ads/${id}/approve`);
  return res.data;
};

export const rejectAd = ({ id, reason, comment }) =>
  api.post(`/ads/${id}/reject`, { reason, comment });

export const requestChanges = ({ id, reason, comment }) =>
  api.post(`/ads/${id}/request-changes`, { reason, comment });
