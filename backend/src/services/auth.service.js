import bcrypt from "bcrypt";

import * as usersService from "./users.service.js";
import * as rolesService from "./roles.service.js";

import prisma from "../libs/prisma.js";
import AppError from "../libs/appError.js";
import { generateAccessToken } from "../libs/jwt.js";

export const me = async (req) => {
  const userId = req.token_userId;

  const user = await prisma.users.findFirst({
    where: {
      id: userId,
    },
    include: {
      user_roles: {
        select: {
          roles: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });

  const { hash_password, ...userWithoutPassword } = user;

  return {
    id: userWithoutPassword.id,
    username: userWithoutPassword.username,
    name: userWithoutPassword.name,
    avatar_url: userWithoutPassword.avatar_url,
    email: userWithoutPassword.email,
    phone: userWithoutPassword.phone,
    roles: userWithoutPassword.user_roles.map((role) => role.roles.id),
  };
};

export const login = async (req) => {
  const { username, password } = req.body;

  // Tìm người dùng theo username
  const existingUser = await prisma.users.findFirst({
    where: {
      username,
      deleted_at: null,
    },
    include: {
      user_roles: {
        select: {
          roles: {
            select: { id: true, name: true },
          },
        },
      },
    },
  });
  if (!existingUser) throw new AppError("Người dùng không tồn tại", 404);

  // Kiểm tra mật khẩu
  const isPasswordValid = await bcrypt.compare(password, existingUser.hash_password);
  if (!isPasswordValid) throw new AppError("Mật khẩu không chính xác", 404);

  // Tạo thông tin người dùng
  const user = {
    id: existingUser.id,
    username: existingUser.username,
    name: existingUser.name,
    avatar_url: existingUser.avatar_url,
    email: existingUser.email,
    phone: existingUser.phone,
    roles: existingUser.user_roles.map((role) => role.roles.id),
  };

  // Tạo token
  const token = generateAccessToken({ id: user.id, roles: user.roles });

  // Trả về thông tin người dùng và token cho controller
  return {
    user,
    token,
  };
};

export const register = async (req) => {
  // Tạo người dùng mới và gán role user
  const newUser = await prisma.$transaction(async (tx) => {
    const user = await usersService.createUser(req, tx);
    await rolesService.assignRoleToUser({ body: { user_id: user.id, role_id: "user" } }, tx);
    return user;
  });

  return newUser;
};
