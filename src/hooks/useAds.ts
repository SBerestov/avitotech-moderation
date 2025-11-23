import { useQuery } from "@tanstack/react-query";
import { getAds } from "../api/ads";
import type { AdsListParams, AdsResponse } from "../types/ad";

export const useAds = (params: AdsListParams = {}) => {
  const key = ["ads", params];
  return useQuery<AdsResponse, Error>({
    queryKey: key,
    queryFn: () => getAds(params),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 30,
  });
};
