import prisma from "../libs/prisma.js";
import AppError from "../libs/appError.js";

import foodSerializer from "../utils/foodSerializer.js";

export const getFood = async (req, tx = prisma) => {
  const id = parseInt(req.params.id);
  const food = await tx.foods.findFirst({
    where: {
      id: id || undefined,
    },
    include: {
      side_categories: true,
    },
  });
  if (!food) throw new AppError("Món ăn không tồn tại", 404);
  return foodSerializer(food);
};

export const getFoodBySlug = async (req, tx = prisma) => {
  const { slug } = req.params;
  const food = await tx.foods.findFirst({
    where: {
      slug: slug,
    },
    include: {
      side_categories: true,
      food_variants: true,
    },
  });
  return foodSerializer(food);
};

export const getFoods = async (req, tx = prisma) => {
  const { sideCategoryId } = req.query;

  const filter = {
    side_category_id: sideCategoryId || undefined,
  };

  const foods = await tx.foods.findMany({
    where: filter,
    include: {
      side_categories: true,
      food_variants: true,
    },
  });

  return foods.map((food) => foodSerializer(food));
};

export const getFoodsByMainCategory = async (req, tx = prisma) => {
  const { mainCategoryId } = req.params;

  const mainCategory = await tx.main_categories.findFirst({
    where: {
      id: mainCategoryId,
    },
    include: {
      side_categories: {
        include: {
          foods: true,
        },
      },
    },
  });

  const foods = mainCategory.side_categories
    .flatMap((sideCategory) => sideCategory.foods)
    .map((food) => ({
      id: food.id,
      side_category_id: food.side_category_id,
      name: food.name,
      slug: food.slug,
      image_url: food.image_url,
      preparation_time: food.preparation_time,
      price: food.price,
      discount: food.discount,
      short_description: food.short_description,
    }));

  return foods;
};

export const createFood = async (req, tx = prisma) => {
  const {
    sideCategoryId,
    name,
    slug,
    imageUrl,
    preparationTime,
    description,
    shortDescription,
    price,
    discount,
    variantIds,
  } = req.body;

  const ENUM_VARIANT_IDS = ["small", "medium", "large", "extra-large"];

  // Kiểm tra thông tin món ăn
  if (
    !sideCategoryId ||
    !name ||
    !slug ||
    !imageUrl ||
    !preparationTime ||
    !description ||
    !shortDescription ||
    !price ||
    discount < 0 ||
    !variantIds
  ) {
    throw new AppError("Vui lòng điền đầy đủ thông tin món ăn", 400);
  }

  // Kiểm tra biến thể
  for (const variantId of variantIds) {
    if (!ENUM_VARIANT_IDS.includes(variantId)) throw new AppError("Biến thể không hợp lệ", 400);
  }

  // Kiểm tra danh mục phụ
  const existingSideCategory = await tx.side_categories.findFirst({
    where: {
      id: sideCategoryId,
    },
  });
  if (!existingSideCategory) {
    throw new AppError("Danh mục phụ không tồn tại", 404);
  }

  // Kiểm tra slug
  const existingFood = await tx.foods.findFirst({
    where: {
      slug: slug,
    },
  });
  if (existingFood) {
    throw new AppError("Slug của món ăn này đã tồn tại", 400);
  }

  // Tạo món ăn
  const newFood = await tx.foods.create({
    data: {
      side_category_id: sideCategoryId,
      name: name,
      slug: slug,
      image_url: imageUrl,
      preparation_time: parseInt(preparationTime),
      description: description,
      short_description: shortDescription,
      price: parseFloat(price),
      discount: parseFloat(discount),
    },
  });

  // Tạo biến thể
  for (const variantId of variantIds) {
    await tx.food_variants.create({
      data: {
        food_id: newFood.id,
        variant_id: variantId,
      },
    });
  }

  return {
    id: newFood.id,
    name: newFood.name,
  };
};

export const updateFood = async (req, tx = prisma) => {
  const id = parseInt(req.params.id);
  const {
    sideCategoryId,
    name,
    slug,
    imageUrl,
    preparationTime,
    description,
    shortDescription,
    price,
    discount,
    isActive,
    variantIds,
  } = req.body || {};

  const existingFood = await tx.foods.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingFood) throw new AppError("Món ăn không tồn tại", 404);

  const updatedFood = await tx.foods.update({
    where: { id },
    data: {
      side_category_id: sideCategoryId ?? existingFood.side_category_id,
      name: name ?? existingFood.name,
      slug: slug ?? existingFood.slug,
      image_url: imageUrl ?? existingFood.image_url,
      preparation_time: preparationTime ?? existingFood.preparation_time,
      description: description ?? existingFood.description,
      short_description: shortDescription ?? existingFood.short_description,
      price: price ?? existingFood.price,
      discount: discount ?? existingFood.discount,
      is_active: isActive ?? existingFood.is_active,
    },
  });

  await tx.food_variants.deleteMany({
    where: {
      food_id: id,
    },
  });

  for (const variantId of variantIds) {
    await tx.food_variants.create({
      data: {
        food_id: id,
        variant_id: variantId,
      },
    });
  }

  return updatedFood;
};

export const deleteFood = async (req, tx = prisma) => {
  const id = parseInt(req.params.id);

  const existingFood = await tx.foods.findFirst({
    where: {
      id: id,
    },
  });
  if (!existingFood) throw new AppError("Món ăn không tồn tại", 404);

  const deletedFood = await tx.foods.delete({
    where: { id },
  });

  return deletedFood;
};

export const checkExistingSlug = async (req, tx = prisma) => {
  const { slug } = req.query;

  const existingSlug = await tx.foods.findFirst({
    where: {
      slug: slug,
    },
  });

  if (existingSlug) {
    return true;
  }

  return false;
};
