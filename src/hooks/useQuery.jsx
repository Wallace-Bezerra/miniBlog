import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export const useQuery = () => {
  const { search } = useLocation();
  console.log(useLocation());
  return useMemo(() => new URLSearchParams(search), [search]);
};
