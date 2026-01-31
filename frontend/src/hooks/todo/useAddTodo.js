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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchTodo"] });
      toast.success(data.message);
    },
    onError: (error) => {
      toast.error("Failed to add task. Please try again.");
      console.error("Add todo error:", error);
    }
  });

  return { 
    addTodoMutate: addTodo.mutate, 
    data: addTodo.data, 
    isLoadingTodo: addTodo.isPending,
    isSuccess: addTodo.isSuccess,
    isError: addTodo.isError
  };
};

export default useAddTodo;