import prisma from "../libs/prisma.js";
import * as foodsService from "../services/foods.service.js";

export const getFood = async (req, res) => {
  const result = await foodsService.getFood(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getFoodBySlug = async (req, res) => {
  const result = await foodsService.getFoodBySlug(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getFoods = async (req, res) => {
  const result = await foodsService.getFoods(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getFoodsByMainCategory = async (req, res) => {
  const result = await foodsService.getFoodsByMainCategory(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const createFood = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await foodsService.createFood(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const updateFood = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await foodsService.updateFood(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const deleteFood = async (req, res) => {
  const result = await foodsService.deleteFood(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const checkExistingSlug = async (req, res) => {
  const result = await foodsService.checkExistingSlug(req);

  res.status(200).json({
    exists: result,
  });
};
