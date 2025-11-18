import prisma from "../libs/prisma.js";
import AppError from "../libs/appError.js";

export const getAddresses = async (req, tx = prisma) => {
  const id = parseInt(req.query.userId);

  const userId = id ? id : req.token_userId;

  const addresses = await tx.addresses.findMany({
    where: {
      user_id: userId,
    },
  });

  return addresses;
};

export const createAddress = async (req, tx = prisma) => {
  const { userId, name, phone, addressLine, city, district } = req.body;

  if (!userId || !name || !phone || !addressLine || !city || !district)
    throw new AppError("Vui lòng điền đầy đủ thông tin địa chỉ", 400);

  const existingUser = await tx.users.findFirst({
    where: {
      id: userId,
    },
  });

  if (!existingUser) throw new AppError("Người dùng không tồn tại", 404);

  const quantityOfAddresses = await tx.addresses.count({
    where: {
      user_id: userId,
    },
  });

  if (quantityOfAddresses >= 3) throw new AppError("Bạn chỉ được tạo tối đa 3 địa chỉ", 400);

  const newAddress = await tx.addresses.create({
    data: {
      user_id: userId,
      name: name,
      phone: phone,
      address_line: addressLine,
      city,
      district,
    },
  });

  return newAddress;
};

export const updateAddress = async (req, tx = prisma) => {
  const id = parseInt(req.params.id);
  const { addressLine, city, district } = req.body;

  const existingAddress = await tx.addresses.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingAddress) throw new AppError("Địa chỉ không tồn tại", 404);

  const updatedAddress = await tx.addresses.update({
    where: { id },
    data: {
      address_line: addressLine ?? existingAddress.address_line,
      city: city ?? existingAddress.city,
      district: district ?? existingAddress.district,
      updated_at: new Date(),
    },
  });

  return updatedAddress;
};

export const deleteAddress = async (req, tx = prisma) => {
  const id = parseInt(req.params.id);

  const existingAddress = await tx.addresses.findFirst({
    where: { id: id },
  });

  if (!existingAddress) throw new AppError("Địa chỉ không tồn tại", 404);

  const deletedAddress = await tx.addresses.delete({
    where: { id },
  });

  return deletedAddress;
};
