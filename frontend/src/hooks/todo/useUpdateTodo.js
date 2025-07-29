import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";


const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ todoId, completed }) => {
      const response = await axiosInstance.put(`/todo/update-todo/${todoId}`, {completed});
      return response.data;
    },
    onSuccess: (data) => {
      // Invalidate todos list after successful update
      queryClient.invalidateQueries({ queryKey: ["fetchTodo"] });
      toast.success(data.message);
    },
    onError: (error) => {
      console.error("Update todo error:", error);
    },
  });

  return { updateTodoMutate: mutation.mutate, data: mutation.data, isLoadingTodo: mutation.isPending };
};

export default useUpdateTodo;