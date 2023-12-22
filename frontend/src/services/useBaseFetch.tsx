import { useFetch } from "use-http";

const useBaseFetch = () => {
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const baseUseFetch = useFetch("http://localhost:3000", { headers });
  return baseUseFetch;
};

export default useBaseFetch;
