import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";


const useDeleteTodo = () => {
  const queryClient = useQueryClient();

const mutation = useMutation({
    mutationFn: async (todoId) => {
      const response = await axiosInstance.delete(`/todo/delete-todo/${todoId}`);
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate todos list after successful delete
      queryClient.invalidateQueries({ queryKey: ["fetchTodo"] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Delete todo error:", error);
    },
  });

  return { deleteTodoMutate: mutation.mutate, data: mutation.data, isLoadingTodo: mutation.isPending };
};

export default useDeleteTodo;