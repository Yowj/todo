import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../lib/axios";
import toast from "react-hot-toast";

const useAuthUser = () => {
  const authUser = useQuery({
    queryKey: ["getAuth"],
    queryFn: getAuthUser,
    retry: false,
    onSuccess: (data) => {
      toast.success(data.message);
    },
  });

  return { isLoading: authUser.isLoading, authUser: authUser.data?.user };
};

const getAuthUser = async () => {
  try {
    const response = await axiosInstance.get("/user/me");
    return response.data;
  } catch (error) {
    console.log(error.response.data.message);
    return null;
  }
};

export default useAuthUser;
