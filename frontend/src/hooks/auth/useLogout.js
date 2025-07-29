import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axiosInstance from "../../lib/axios";

const useLogout = () => {
  const queryclient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post("/user/logout");
      return response.data;
    },
    onSuccess: (data) => {
      console.log("Logout successful:", data);
      toast.success(data.message);
      queryclient.invalidateQueries({ queryKey: ["getAuth"] });
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      toast.error(error.response.data.message);
    },
  });
  return { logoutmutate: mutation.mutate, data: mutation.data, isLoading: mutation.isPending };
};

export default useLogout;
