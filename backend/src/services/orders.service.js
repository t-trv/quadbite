import prisma from "../libs/prisma.js";
import AppError from "../libs/appError.js";

export const orderPreview = async (req, tx = prisma) => {
  const { orderItems, couponCode, addressId, paymentMethod } = req.body;

  // Kiểm tra đơn hàng
  if (!orderItems || orderItems.length === 0) {
    throw new AppError("Vui lòng thêm món ăn vào đơn hàng", 400);
  }

  // Lấy thông tin món ăn
  const foodIds = orderItems.map((item) => item.id);

  const foods = await tx.foods.findMany({
    where: {
      id: {
        in: foodIds,
      },
    },
  });

  const variants = await tx.variants.findMany({});

  console.log(variants);

  // Tính tổng tiền của đơn hàng
  let totalItemsPrice = 0;

  for (const orderItem of orderItems) {
    const food = foods.find((f) => f.id === orderItem.id);
    if (!food) throw new AppError("Món ăn không tồn tại", 404);
    if (orderItem.quantity === undefined || orderItem.quantity <= 0)
      throw new AppError("Số lượng món ăn không hợp lệ", 400);

    const price = Number(food.price);

    totalItemsPrice += price * orderItem.quantity;
  }

  return totalItemsPrice;
};
