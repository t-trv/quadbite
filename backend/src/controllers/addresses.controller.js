import prisma from "../libs/prisma.js";

import * as addressesService from "../services/addresses.service.js";

export const getAddresses = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await addressesService.getAddresses(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const createAddress = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await addressesService.createAddress(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const updateAddress = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await addressesService.updateAddress(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const deleteAddress = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await addressesService.deleteAddress(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};
