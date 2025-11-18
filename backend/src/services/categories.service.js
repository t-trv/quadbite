import AppError from "../libs/appError.js";
import prisma from "../libs/prisma.js";

export const getMainCategories = async (req, tx = prisma) => {
  const { id } = req.query;

  const filter = id ? { id: id } : {};

  const mainCategories = await tx.main_categories.findMany({
    where: {
      ...filter,
    },
    select: {
      id: true,
      name: true,
      sort_order: true,
      path: true,
    },
  });

  return mainCategories;
};

export const getSideCategories = async (req, tx = prisma) => {
  const { main_category_id } = req.query;

  const filter = main_category_id ? { main_category_id: main_category_id } : {};

  const sideCategories = await tx.side_categories.findMany({
    where: {
      ...filter,
    },
    select: {
      id: true,
      main_category_id: true,
      name: true,
    },
  });

  return sideCategories;
};

export const createSideCategory = async (req, tx = prisma) => {
  const { mainCategoryId, id, name } = req.body;

  const existingId = await tx.side_categories.findFirst({
    where: {
      id: id,
    },
  });

  if (existingId) {
    throw new AppError("Id danh mục phụ đã tồn tại", 400);
  }

  const mainCategories = await tx.main_categories.findFirst({
    where: {
      id: mainCategoryId,
    },
  });

  if (!mainCategories) {
    throw new AppError("Danh mục chính không tồn tại", 400);
  }

  const sideCategory = await tx.side_categories.create({
    data: {
      id: id,
      main_category_id: mainCategoryId,
      name: name,
    },
  });

  return sideCategory;
};

export const updateSideCategory = async (req, tx = prisma) => {
  const id = req.params.id;

  const { mainCategoryId, name } = req.body;

  const data = {
    ...(mainCategoryId && { main_category_id: mainCategoryId }),
    ...(name && { name }),
  };

  const existingSideCategory = await tx.side_categories.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingSideCategory) throw new AppError("Danh mục phụ không tồn tại", 400);

  const mainCategories = await tx.main_categories.findFirst({
    where: {
      id: mainCategoryId,
    },
  });

  if (!mainCategories) throw new AppError("Danh mục chính không tồn tại", 400);

  const sideCategory = await tx.side_categories.update({
    where: { id },
    data: {
      ...data,
    },
  });

  return sideCategory;
};

export const deleteSideCategory = async (req, tx = prisma) => {
  const id = req.params.id;

  const existingSideCategory = await tx.side_categories.findFirst({
    where: {
      id: id,
    },
  });

  if (!existingSideCategory) throw new AppError("Danh mục phụ không tồn tại", 400);

  const deletedSideCategory = await tx.side_categories.delete({
    where: { id },
  });

  return deletedSideCategory;
};
