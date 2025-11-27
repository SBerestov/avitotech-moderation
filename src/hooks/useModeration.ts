import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAd, rejectAd, requestChanges } from "../api/ads";

export const useApproveAd = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: approveAd,
    onSuccess: () => qc.invalidateQueries(),
  });
};

export const useRejectAd = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: rejectAd,
    onSuccess: () => qc.invalidateQueries(),
  });
};

export const useRequestChanges = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: requestChanges,
    onSuccess: () => qc.invalidateQueries(),
  });
};