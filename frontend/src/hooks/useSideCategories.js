import { useQuery } from "@tanstack/react-query";
import apiRequest from "../utils/apiRequest";

const useSideCategories = ({ mainCategoryId = "" }) => {
  const { data: sideCategories, isLoading } = useQuery({
    queryKey: ["sideCategories", mainCategoryId],
    queryFn: async () => {
      const response = await apiRequest.get(
        `${mainCategoryId !== "" ? `/categories/side?main_category_id=${mainCategoryId}` : "/categories/side"}`
      );
      return response.data.data;
    },
  });

  return { sideCategories, isLoading };
};

export default useSideCategories;
