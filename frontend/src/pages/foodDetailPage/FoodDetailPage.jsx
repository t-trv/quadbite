import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useCheckoutStore from "../../hooks/useCheckoutStore";

import apiRequest from "../../utils/apiRequest";
import formatCurrency from "../../utils/formatCurrency";

import Loading from "../../components/ui/Loading";
import VariantList from "./VariantList";
import { ArrowLeftIcon } from "lucide-react";
import Button from "../../components/ui/Button";
import Title from "../../components/ui/Title";

const FoodDetailPage = () => {
  const navigate = useNavigate();
  const { foodSlug } = useParams();
  const [foodQuantity, setFoodQuantity] = useState(1);

  const [selectedVariant, setSelectedVariant] = useState("small");

  const { addOderItem } = useCheckoutStore();

  const {
    data: foodData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["food", foodSlug],
    queryFn: async () => {
      const response = await apiRequest.get(`/foods/slug/${foodSlug}`);
      return response.data.data;
    },
  });

  if (isLoading)
    return (
      <div className="relative min-h-screen">
        <Loading />
      </div>
    );

  return (
    <div className="bg-white p-4 rounded-3xl">
      <div className="flex flex-col justify-between h-full animate-slide-in">
        {/* Content wrapper */}
        {/* Back button */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <Title title="Chi tiết món ăn" variant="secondary" />
            <Button
              variant="outline"
              size="small"
              icon={<ArrowLeftIcon className="w-4 h-4" />}
              onClick={() => navigate(-1)}
            >
              Quay lại trang trước
            </Button>
          </div>

          {/* Food detail */}
          <div className="grid grid-cols-12 gap-4">
            {/* Food image */}
            <div className="col-span-5">
              <img
                src={foodData.image_url}
                alt={foodData.name}
                className="w-full h-full object-cover rounded-3xl aspect-square"
              />
            </div>
            <div className="col-span-7 flex flex-col justify-between">
              {/* Food name and description */}
              <div className="mb-4">
                <h1 className="text-4xl font-bold mb-4">
                  {foodData.name}{" "}
                  <span className="text-sm text-gray-500">({foodData.preparation_time} phút chế biến)</span>
                </h1>
                <p className="text-gray-500 text-justify">
                  {foodData?.description?.length > 1500
                    ? foodData.description.slice(0, 150) + "..."
                    : foodData.description}
                </p>
              </div>

              <div>
                <span className="text-sm font-semibold text-gray-500">KÍCH CỠ</span>
                <VariantList
                  variantIds={foodData.variant_ids}
                  selectedVariant={selectedVariant}
                  setSelectedVariant={setSelectedVariant}
                />
              </div>

              {/* Quantity and Add to orderlist */}
              <div className="mb-4 grid grid-cols-12 gap-4">
                {/* Quantity */}
                <div className="col-span-4 flex items-center gap-3">
                  <button
                    onClick={() => setFoodQuantity((prev) => prev - 1)}
                    className={`w-8 h-8 rounded-full bg-gray-300 text-secondary  flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer select-none ${
                      foodQuantity <= 1 ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    disabled={foodQuantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-lg font-md">{foodQuantity}</span>
                  <button
                    onClick={() => setFoodQuantity((prev) => prev + 1)}
                    className="w-8 h-8 rounded-full bg-gray-300 text-secondary  flex items-center justify-center hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer select-none"
                  >
                    +
                  </button>
                </div>

                {/* Add to orderlist */}
                <div className="col-span-8">
                  <button
                    onClick={() => {
                      addOderItem({
                        id: foodData.id,
                        quantity: foodQuantity,
                        price: foodData.price,
                        imageUrl: foodData.image_url,
                        name: foodData.name,
                        shortDescription: foodData.short_description,
                        preparationTime: foodData.preparation_time,
                        variantId: selectedVariant,
                      });
                    }}
                    className="w-full bg-secondary text-white px-4 py-2 rounded-full flex items-center justify-around cursor-pointer hover:scale-105 transition-all duration-300 active:scale-95"
                  >
                    <span>{formatCurrency(foodData.price * 1)}</span>
                    <span className="border-l h-4 border-white"></span>
                    <span className="text-white">Thêm vào giỏ hàng</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended foods */}
        <div className="pt-20">
          <h2 className="text-lgxl font-bold">Món ăn được gợi ý</h2>
          <p>
            Những món ăn được gợi ý sẽ được hiển thị ở đây và còn nhiều tính năng ở trang này. Tuy nhiên dev khá bận nên
            phải chịu
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPage;
