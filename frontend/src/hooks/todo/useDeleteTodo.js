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
    onMutate: async (todoId) => {
      await queryClient.cancelQueries({ queryKey: ["fetchTodo"] });
      const previous = queryClient.getQueryData(["fetchTodo"]);
      queryClient.setQueryData(["fetchTodo"], (old) => ({
        ...old,
        todos: old.todos.filter((t) => t._id !== todoId),
      }));
      toast.success("Todo deleted!");
      return { previous };
    },
    onError: (_err, _todoId, context) => {
      queryClient.setQueryData(["fetchTodo"], context.previous);
      toast.error("Failed to delete.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTodo"] });
    },
  });

  return { deleteTodoMutate: mutation.mutate, data: mutation.data, isLoadingTodo: mutation.isPending };
};

export default useDeleteTodo;