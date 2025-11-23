import Title from "../../components/ui/Title";

import useSideCategories from "../../hooks/useSideCategories";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

import apiRequest from "../../utils/apiRequest";
import FoodMenu from "./FoodMenu";
import Loading from "../../components/ui/Loading";
import Chatbot from "../../components/Chatbot";

const ShoppingPage = () => {
  const { mainCategory } = useParams(); // Lấy tham số từ URL

  // Call api lấy dữ liệu món ăn
  const { data: foods, isLoading: isLoadingFoods } = useQuery({
    queryKey: ["foods", mainCategory],
    queryFn: async () => {
      const response = await apiRequest.get(`/categories/main/${mainCategory}/foods`);
      return response.data.data;
    },
    enabled: !!mainCategory,
  });

  // Call api lấy dữ liệu danh mục phụ
  const { sideCategories, isLoading } = useSideCategories({
    mainCategoryId: mainCategory,
  });

  // Setup selected side category và filtered foods
  const [selectedSideCategory, setSelectedSideCategory] = useState(null);
  const [filteredFoods, setFilteredFoods] = useState([]);

  // Lọc món ăn theo danh mục phụ được chọn
  useEffect(() => {
    if (selectedSideCategory) {
      setFilteredFoods(foods?.filter((food) => food.side_category_id === selectedSideCategory));
    } else {
      setFilteredFoods(foods);
    }
  }, [selectedSideCategory]);

  // Khởi tạo filtered foods khi foods thay đổi
  useEffect(() => {
    if (foods) {
      setFilteredFoods(foods);
    }
  }, [foods]);

  if (isLoading || isLoadingFoods) return <Loading />;

  return (
    <>
      <div className="bg-white p-4 rounded-3xl">
        <Title title="Menu món ăn" variant="secondary" />

        {/* Side Categories */}
        {sideCategories?.length > 0 && (
          <div className="flex gap-1 py-2 overflow-x-auto">
            {sideCategories?.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (selectedSideCategory === item.id) {
                    setSelectedSideCategory(null);
                    return;
                  }
                  setSelectedSideCategory(item.id);
                }}
                className={`text-xs px-3 py-1 rounded-full select-none transition-all duration-300 cursor-pointer
          ${
            selectedSideCategory === item.id
              ? "bg-secondary text-white border border-secondary"
              : "text-secondary border border-secondary"
          }
          `}
              >
                {item.name}
              </div>
            ))}
          </div>
        )}

        {/* Foods */}
        <div className="pt-2">
          <FoodMenu foods={filteredFoods} />
        </div>
      </div>
      <Chatbot />
    </>
  );
};

export default ShoppingPage;
