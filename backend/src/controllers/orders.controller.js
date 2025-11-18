import prisma from "../libs/prisma.js";

import * as orderPreviewService from "../services/orders.service.js";

export const orderPreview = async (req, res) => {
  const result = await prisma.$transaction(async (tx) => {
    return await orderPreviewService.orderPreview(req, tx);
  });

  res.status(200).json({
    status: true,
    data: result,
  });
};
