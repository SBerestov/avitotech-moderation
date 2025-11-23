import { useQuery } from "@tanstack/react-query";
import { getAd } from "../api/ads";

export const useAd = (id: number) =>
  useQuery({
    queryKey: ["ad", id],
    queryFn: () => getAd(id),
  });
