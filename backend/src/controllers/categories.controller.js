import * as categoriesService from "../services/categories.service.js";

export const getMainCategories = async (req, res) => {
  const result = await categoriesService.getMainCategories(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getSideCategories = async (req, res) => {
  const result = await categoriesService.getSideCategories(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const createSideCategory = async (req, res) => {
  const result = await categoriesService.createSideCategory(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const updateSideCategory = async (req, res) => {
  const result = await categoriesService.updateSideCategory(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const deleteSideCategory = async (req, res) => {
  const result = await categoriesService.deleteSideCategory(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};
