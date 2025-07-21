import axios from "axios";
import { use } from "react";
import AuthContext from "./../context/AuthContext";
import Swal from "sweetalert2";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { loginUser, signOutUser } = use(AuthContext);
  const token = loginUser?.accessToken;
  if (!loginUser?.accessToken) {
    return;
  }


  axiosInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  axiosInstance.interceptors.response.use(
    (res) => res,
    (err) => {
      if (err.status === 401 || err.status === 403) {
        signOutUser()
          .then(() => {
            if (err.status === 401) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Logged out Session expired",
                text: `Status ${err.status}`,
                showConfirmButton: true,
                timer: 1500,
              });
            } else if (err.status === 403) {
              Swal.fire({
                position: "center",
                icon: "warning",
                title: "Logged out Unauthorized access",
                text: `Status ${err.status}`,
                showConfirmButton: true,
                timer: 1500,
              });
            }
          })
          .catch((err) => console.log(err));
      }
      return Promise.reject(err);
    }
  );

  return axiosInstance;
};

export default useAxiosSecure;