// src/hooks/useResetData
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/apiConfig";

export const useResetData = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`${API_URL}/reset`),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offices"],
      });
    },
  });
};
