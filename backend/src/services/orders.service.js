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

  // Tính tổng tiền của đơn hàng
  let totalItemsPrice = 0;

  for (const orderItem of orderItems) {
    const food = foods.find((f) => f.id === orderItem.id);
    if (!food) throw new AppError("Món ăn không tồn tại", 404);
    if (orderItem.quantity === undefined || orderItem.quantity <= 0)
      throw new AppError("Số lượng món ăn không hợp lệ", 400);

    const variant = variants.find((v) => v.id === orderItem.variant.id);
    if (!variant) throw new AppError("Biến thể không tồn tại", 404);

    const price = Number(food.price) + Number(variant.price_adjust);

    totalItemsPrice += price * orderItem.quantity;
  }

  // Tính tổng giảm giá của đơn hàng
  let totalDiscount = 0;

  if (couponCode && couponCode.toUpperCase() == "BLACKFRIDAY") {
    totalDiscount = totalItemsPrice * 0.1;
  }

  // Tính tổng tiền của đơn hàng
  const totalPrice = totalItemsPrice - totalDiscount;

  return {
    totalItemsPrice,
    totalDiscount,
    totalPrice,
  };
};

export const createOrder = async (req, tx = prisma) => {
  const userId = req.token_userId;
  const { orderItems, couponCode, addressId, paymentMethod, shippingTime, note } = req.body;

  // Kiểm tra món ăn
  if (!orderItems || orderItems.length === 0) throw new AppError("Vui lòng thêm món ăn vào đơn hàng", 400);

  // Kiểm tra địa chỉ
  const address = await tx.addresses.findFirst({
    where: {
      id: addressId,
    },
  });
  if (!address) throw new AppError("Địa chỉ không tồn tại", 404);

  // Kiểm tra phương thức thanh toán
  if (!paymentMethod) throw new AppError("Vui lòng chọn phương thức thanh toán", 400);

  // Kiểm tra món ăn và tính lại tiền trước khi tạo order
  const orderFoodIds = orderItems.map((item) => item.id);

  const foods = await tx.foods.findMany({
    where: {
      id: {
        in: orderFoodIds,
      },
    },
  });

  const variants = await tx.variants.findMany({});

  // Tính lại tiền trước khi tạo order
  let totalItemsPrice = 0;
  let totalDiscount = 0;

  for (const orderItem of orderItems) {
    const food = foods.find((f) => f.id === orderItem.id);

    if (!food) throw new AppError("Món ăn không tồn tại", 404);
    if (orderItem.quantity === undefined || orderItem.quantity <= 0)
      throw new AppError("Số lượng món ăn không hợp lệ", 400);

    const variant = variants.find((v) => v.id === orderItem.variant.id);
    if (!variant) throw new AppError("Biến thể không tồn tại", 404);

    const price = Number(food.price) + Number(variant.price_adjust);

    totalItemsPrice += price * orderItem.quantity;
  }

  // Tính tổng giảm giá của đơn hàng
  if (couponCode && couponCode.toUpperCase() == "BLACKFRIDAY") {
    totalDiscount = totalItemsPrice * 0.1;
  }

  // Tính tổng tiền của đơn hàng
  const totalPrice = totalItemsPrice - totalDiscount;

  // Tạo đơn hàng
  const newOrder = await tx.orders.create({
    data: {
      user_id: userId,
      total_price: totalPrice,
      order_status_id: "pending",
      payment_status_id: "pending",
      delivery_address_id: address.id,
      payment_method_id: paymentMethod,
      note: note,
    },
  });

  // Tạo item của đơn hàng
  for (const orderItem of orderItems) {
    const food = foods.find((f) => f.id === orderItem.id);

    if (!food) throw new AppError("Món ăn không tồn tại", 404);
    if (orderItem.quantity === undefined || orderItem.quantity <= 0)
      throw new AppError("Số lượng món ăn không hợp lệ", 400);

    const variant = variants.find((v) => v.id === orderItem.variant.id);
    if (!variant) throw new AppError("Biến thể không tồn tại", 404);

    const price = Number(food.price) + Number(variant.price_adjust);

    await tx.order_items.create({
      data: {
        order_id: newOrder.id,
        food_id: food.id,
        variant_id: variant.id,
        quantity: orderItem.quantity,
        price,
      },
    });
  }

  return newOrder;
};

export const getOrderById = async (req, tx = prisma) => {
  const orderId = parseInt(req.params.orderId);
  const userId = req.token_userId;

  const order = await tx.orders.findUnique({
    where: {
      id: orderId,
    },
    include: {
      order_items: {
        include: {
          foods: true,
          variants: true,
        },
      },
      users: true,
      addresses: true,
      payment_method: true,
      order_statuses: true,
      payment_statuses: true,
    },
  });
  if (!order) throw new AppError("Đơn hàng không tồn tại", 404);

  const serializedOrder = {
    orderId: order.id,
    totalPrice: order.total_price,
    user: {
      id: order.users.id,
      name: order.users.name || order.users.username,
    },
    address: {
      addressName: order.addresses.address_name,
      receiptionName: order.addresses.receiption_name,
      phone: order.addresses.phone,
      addressLine: order.addresses.address_line,
      city: order.addresses.city,
      district: order.addresses.district,
    },
    paymentMethod: {
      id: order.payment_method.id,
      name: order.payment_method.name,
    },
    orderStatus: {
      id: order.order_statuses.id,
      name: order.order_statuses.name,
    },
    paymentStatus: {
      id: order.payment_statuses.id,
      name: order.payment_statuses.name,
    },
    orderItems: order.order_items.map((orderItem) => ({
      id: orderItem.id,
      name: orderItem.foods.name,
      shortDescription: orderItem.foods.short_description,
      variant: orderItem.variants.name,
      quantity: orderItem.quantity,
      price: orderItem.price,
    })),
  };

  if (userId !== serializedOrder.user.id) {
    throw new AppError("Bạn không có quyền xem đơn hàng này", 403);
  }

  return serializedOrder;
};

export const getOrders = async (req, tx = prisma) => {
  const orders = await tx.orders.findMany({
    include: {
      order_items: {
        include: {
          foods: true,
          variants: true,
        },
      },
      users: true,
      addresses: true,
      payment_method: true,
      order_statuses: true,
      payment_statuses: true,
    },
  });
  if (!orders) throw new AppError("Không có đơn hàng nào", 404);

  const serializedOrders = orders.map((order) => {
    return {
      orderId: order.id,
      totalPrice: order.total_price,
      user: {
        id: order.users.id,
        name: order.users.name || order.users.username,
      },
      address: {
        name: order.addresses.address_name,
        receiptionName: order.addresses.receiption_name,
        phone: order.addresses.phone,
        line: order.addresses.address_line,
        city: order.addresses.city,
        district: order.addresses.district,
      },
      orderStatus: {
        id: order.order_statuses.id,
        name: order.order_statuses.name,
      },
      paymentStatus: {
        id: order.payment_statuses.id,
        name: order.payment_statuses.name,
      },
      paymentMethod: {
        id: order.payment_method.id,
        name: order.payment_method.name,
      },
      orderItems: order.order_items.map((orderItem) => ({
        id: orderItem.id,
        name: orderItem.foods.name,
        shortDescription: orderItem.foods.short_description,
        variant: orderItem.variants.name,
        quantity: orderItem.quantity,
        price: orderItem.price,
        imageUrl: orderItem.foods.image_url,
      })),
    };
  });

  return serializedOrders;
};

export const getOrdersByUserId = async (req, tx = prisma) => {
  const userId = parseInt(req.params.id);

  if (userId !== req.token_userId) {
    throw new AppError("Bạn không có quyền làm điều này", 403);
  }

  const orders = await tx.orders.findMany({
    where: {
      user_id: userId,
    },
    include: {
      order_items: {
        include: {
          foods: true,
          variants: true,
        },
      },
      users: true,
      addresses: true,
      payment_method: true,
      order_statuses: true,
      payment_statuses: true,
    },
  });
  if (!orders) throw new AppError("Không có đơn hàng nào", 404);

  const serializedOrders = orders.map((order) => {
    return {
      orderId: order.id,
      totalPrice: order.total_price,
      orderStatus: {
        id: order.order_statuses.id,
        name: order.order_statuses.name,
      },
      paymentStatus: {
        id: order.payment_statuses.id,
        name: order.payment_statuses.name,
      },
      paymentMethod: {
        id: order.payment_method.id,
        name: order.payment_method.name,
      },
      orderItems: order.order_items.map((orderItem) => ({
        id: orderItem.id,
        name: orderItem.foods.name,
        shortDescription: orderItem.foods.short_description,
        variant: orderItem.variants.name,
        quantity: orderItem.quantity,
        price: orderItem.price,
        imageUrl: orderItem.foods.image_url,
      })),
    };
  });

  return serializedOrders;
};

export const updateOrder = async (req, tx = prisma) => {
  const orderId = parseInt(req.params.orderId);

  const updateData = {
    ...(req.body.orderStatusId && { order_status_id: req.body.orderStatusId }),
  };

  const updatedOrder = await tx.orders.update({
    where: { id: orderId },
    data: updateData,
  });

  return updatedOrder;
};
