// src/hooks/useOffices
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../config/apiConfig";
import type { Office } from "../types/Office";

export const useOffices = () =>
  useQuery<Office[]>({
    queryKey: ["offices"],
    queryFn: async () => {
      const res = await axios.get<Office[]>(
        `${API_URL}/offices`
      );
      return res.data;
    },
  });
