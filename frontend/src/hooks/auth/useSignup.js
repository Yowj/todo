import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const useSignup = () => {
  const queryclient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: async ({ fullName, email, password }) => {
      const response = await axiosInstance.post("/user/signup", { fullName, email, password });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      queryclient.invalidateQueries({ queryKey: ["getAuth"] });
      navigate("/dashboard");
    },
    onError: (error) => {
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
