// src/hooks/useDeleteOffice
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import type { Office } from "../types/Office";
import { API_URL } from "../config/apiConfig";

interface DeleteContext {
  prev: Office[];
}

export const useDeleteOffice = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number, DeleteContext>({
    mutationFn: (id: number) =>
      axios
        .delete(`${API_URL}/offices/${id}`)
        .then(() => {}),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({
        queryKey: ["offices"],
      });

      const prev =
        queryClient.getQueryData<Office[]>(["offices"]) ||
        [];

      queryClient.setQueryData(
        ["offices"],
        prev.filter((o) => o.id !== id)
      );

      return { prev };
    },

    onError: (_err, _id, context) => {
      if (context?.prev) {
        queryClient.setQueryData(["offices"], context.prev);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["offices"],
      });
    },
  });
};
