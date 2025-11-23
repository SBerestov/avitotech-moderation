import { useMutation, useQueryClient } from "@tanstack/react-query";
import { approveAd, rejectAd, requestChanges } from "../api/ads";

export const useApproveAd = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => approveAd(id),
    onSuccess: () => qc.invalidateQueries(),
  });
};

export const useRejectAd = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, reason }: { id: number; reason: string }) =>
      rejectAd(id, reason),
    onSuccess: () => qc.invalidateQueries(),
  });
};

export const useRequestChanges = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, comment }: { id: number; comment: string }) =>
      requestChanges(id, comment),
    onSuccess: () => qc.invalidateQueries(),
  });
};
