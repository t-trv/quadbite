import prisma from "../libs/prisma.js";

export const assignRoleToUser = async (req, tx = prisma) => {
  const { user_id, role_id } = req.body;

  const user_roles = await tx.user_roles.create({
    data: {
      user_id,
      role_id,
    },
  });

  return user_roles;
};
