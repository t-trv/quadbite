import prisma from "../libs/prisma.js";

import * as ordersService from "../services/orders.service.js";

export const getOrderById = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await ordersService.getOrderById(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getOrders = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await ordersService.getOrders(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getOrdersByUserId = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await ordersService.getOrdersByUserId(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const orderPreview = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await ordersService.orderPreview(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const createOrder = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await ordersService.createOrder(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const updateOrder = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await ordersService.updateOrder(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};
