import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

const useMainCategories = () => {
  const { data: mainCategories, isLoading } = useQuery({
    queryKey: ["mainCategories"],
    queryFn: async () => {
      const response = await apiRequest.get("/categories/main");
      return response.data.data;
    },
  });

  return { mainCategories, isLoading };
};

export default useMainCategories;
