// src/hooks/useAddOffice
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import { type OfficeForm } from "../types/OfficeForm";

export const useAddOffice = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (form: OfficeForm) => {
      const res = await axios.post(
        `${API_URL}/offices`,
        form
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["offices"],
      });
    },
  });
};
