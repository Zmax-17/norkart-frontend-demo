// src/hooks/useOfficeById
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import type { Office } from "../types/Office";
import { API_URL } from "../config/apiConfig";

export const useOfficeById = (id: number) => {
  return useQuery({
    queryKey: ["office", id], // unique key
    queryFn: async () => {
      const res = await axios.get<Office>(
        `${API_URL}/offices/${id}`
      );
      return res.data;
    },
    enabled: !!id, // We don't make a request if there is no ID.
  });
};
