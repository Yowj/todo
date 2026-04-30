import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import { toast } from "react-hot-toast";

const useAddTodo = () => {
  const queryClient = useQueryClient();

  const addTodo = useMutation({
    mutationFn: async (todoData) => {
      const response = await axiosInstance.post("/todo/add-todo", todoData);
      return response.data;
    },
    onMutate: async (todoData) => {
      await queryClient.cancelQueries({ queryKey: ["fetchTodo"] });
      const prev = queryClient.getQueryData(["fetchTodo"]);
      queryClient.setQueryData(["fetchTodo"], (old) => ({
        ...old,
        todos: [...old.todos, todoData],
      }));
      toast.success("Todo Added");
      return { prev };
    },
    onError: (_err, _todoData, context) => {
      queryClient.setQueryData(["fetchTodo"], context.prev);
      toast.error("Failed to add.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["fetchTodo"] });
    },
  });

  return {
    addTodoMutate: addTodo.mutate,
    data: addTodo.data,
    isLoadingTodo: addTodo.isPending,
    isSuccess: addTodo.isSuccess,
    isError: addTodo.isError,
  };
};

export default useAddTodo;
