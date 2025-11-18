import { PlusIcon } from "lucide-react";

import formatCurrency from "../utils/formatCurrency";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const FoodCard = ({ food }) => {
  const { mainCategory } = useParams();
  const navigate = useNavigate();
  const foodImage = food.image_url || "https://via.placeholder.com/150";

  return (
    <div
      onClick={() => {
        navigate(`/${mainCategory}/${food.slug}`);
      }}
      className="bg-white rounded-xl flex flex-col p-2 border-dashed border-2 border-gray-200 shadow-lg transition-all duration-300 hover:shadow-xl hover:border-secondary cursor-pointer hover:translate-y-[-5px]"
    >
      {/* Food image */}
      <img src={foodImage} alt={food.name} className="w-full object-cover rounded-xl aspect-square select-none" />

      <div className="p-2 h-auto flex flex-col justify-between flex-1">
        {/* Food name and description */}
        <div>
          <h3 className="text-lg font-semibold">{food.name}</h3>
          <p className="text-sm text-gray-500">
            {food.short_description || food.short_description.length > 100
              ? food.short_description.substring(0, 20) + "..."
              : food.short_description}
          </p>
        </div>

        {/* Food price and add to cart button */}
        <div className="flex items-center justify-between py-2">
          <span className="text-md text-primary">{formatCurrency(food.price)}</span>
          <button className="w-7 h-7 rounded-full bg-primary text-white  flex items-center justify-center">
            <PlusIcon className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
