import bcrypt from "bcrypt";

import prisma from "../libs/prisma.js";
import AppError from "../libs/appError.js";

export const getUsers = async (tx = prisma) => {
  const users = await tx.users.findMany({
    select: {
      id: true,
      username: true,
      name: true,
      avatar_url: true,
      email: true,
      phone: true,
      created_at: true,
      updated_at: true,
      deleted_at: true,
      user_roles: {
        select: {
          roles: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      },
    },
  });

  const usersWithRoles = users.map((user) => {
    return {
      id: user.id,
      username: user.username,
      name: user.name,
      avatar_url: user.avatar_url,
      email: user.email,
      phone: user.phone,
      created_at: user.created_at,
      updated_at: user.updated_at,
      deleted_at: user.deleted_at,
      roles: user.user_roles.map((role) => role.roles.id),
    };
  });

  return usersWithRoles;
};

export const getUser = async (req, tx = prisma) => {
  const userId = req.token_userId;
  const id = parseInt(req.params.id);

  if (userId !== id) {
    throw new AppError("Bạn không có quyền xem thông tin người dùng này", 403);
  }

  const user = await tx.users.findFirst({
    where: {
      id: id,
    },
    include: {
      user_roles: {
        include: {
          roles: true,
        },
      },
    },
  });

  if (!user) {
    throw new AppError("Người dùng không tồn tại", 404);
  }

  return {
    id: user.id,
    username: user.username,
    name: user.name,
    avatar_url: user.avatar_url,
    email: user.email,
    phone: user.phone,
    created_at: user.created_at,
    updated_at: user.updated_at,
    deleted_at: user.deleted_at,
    roles: user.user_roles.map((role) => role.roles.id),
  };
};

export const createUser = async (req, tx = prisma) => {
  const { username, password } = req.body;

  const existingUser = await tx.users.findFirst({
    where: {
      username,
    },
  });
  if (existingUser) {
    throw new AppError("Tên người dùng đã tồn tại, vui lòng sử dụng tên khác", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await tx.users.create({
    data: {
      username,
      hash_password: hashedPassword,
      avatar_url: "https://i.pinimg.com/1200x/a9/a8/c8/a9a8c8258957c8c7d6fcd320e9973203.jpg",
    },
  });

  return {
    id: newUser.id,
    username: newUser.username,
  };
};

export const updateUser = async (req, tx = prisma) => {
  const userId = req.token_userId;
  const id = parseInt(req.params.id);

  if (userId !== id) {
    throw new AppError("Bạn không có quyền cập nhật thông tin người dùng này", 403);
  }

  const { avatar_url, name, email, phone } = req.body;

  const existingUser = await tx.users.findFirst({
    where: {
      id: id,
    },
  });
  if (!existingUser) {
    throw new AppError("Người dùng không tồn tại", 404);
  }

  const user = await tx.users.update({
    where: { id },
    data: {
      ...(avatar_url && { avatar_url }),
      ...(name && { name }),
      ...(email && { email }),
      ...(phone && { phone }),
      updated_at: new Date(),
    },
  });

  const { hash_password, ...userWithoutPassword } = user;

  return userWithoutPassword;
};

export const deleteUser = async (req, tx = prisma) => {
  const userId = req.token_userId;
  const id = parseInt(req.params.id);

  if (userId !== id) {
    throw new AppError("Bạn không có quyền xóa người dùng này", 403);
  }

  const existingUser = await tx.users.findFirst({
    where: {
      id: id,
    },
  });
  if (!existingUser) {
    throw new AppError("Người dùng không tồn tại", 404);
  }

  const deletedUser = await tx.users.delete({
    where: { id },
  });

  const deletedUserRole = await tx.user_roles.deleteMany({
    where: {
      user_id: id,
    },
  });

  return {
    user: deletedUser,
    user_role: deletedUserRole,
  };
};
