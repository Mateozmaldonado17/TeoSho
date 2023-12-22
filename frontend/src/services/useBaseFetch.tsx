import { useFetch } from "use-http";

const useBaseFetch = () => {
  const baseUseFetch = useFetch("http://localhost:3000");
  return baseUseFetch;
};

export default useBaseFetch;
