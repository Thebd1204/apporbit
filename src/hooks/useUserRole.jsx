import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import AuthContext from "../context/AuthContext";

const useUserRole = () => {
  const { loginUser, loading: authLoading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, error } = useQuery({
    queryKey: ["userRole", loginUser?.email],
    enabled: !authLoading && !!loginUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${loginUser.email}`);
      return res.data.role;
    },
  });

  return { role: data, roleLoading: isLoading, error };
};

export default useUserRole;
