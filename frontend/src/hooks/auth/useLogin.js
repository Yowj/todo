import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ email, password }) => {
      const response = await axiosInstance.post("/user/login", { email, password });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      toast.success(data.message);
      queryclient.invalidateQueries({ queryKey: ["getAuth"] });
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.response.data.message);
    },
  });

  return {
    loginmutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
  };
};

export default useLogin;
