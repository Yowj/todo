import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";

const useFetchTodo = () => {
  return useQuery({
    queryKey: ["fetchTodo"],
    queryFn: async () => {
      const response = await axiosInstance.get("/todo/fetch-todo");
      return response.data;
    },
    retry: false,
  });
};

export default useFetchTodo;