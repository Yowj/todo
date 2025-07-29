import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const useSignup = () => {
  const queryclient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      const response = await axiosInstance.post("/user/signup", { fullName, email, password });
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Login successful:", data);
      toast.success(data.message);
      queryclient.invalidateQueries(["getAuth"]);
    },
    onError: (error) => {
      console.error("Login failed:", error);
      toast.error(error.response.data.message);
    },
  });

  return {
    signupmutate: mutation.mutate,
    data: mutation.data,
    isLoading: mutation.isPending,
  };
};

export default useSignup;
