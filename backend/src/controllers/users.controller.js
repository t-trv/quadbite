import * as usersService from "../services/users.service.js";

export const getUsers = async (req, res) => {
  const result = await usersService.getUsers();

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const getUser = async (req, res) => {
  const result = await usersService.getUser(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const createUser = async (req, res) => {
  const result = await usersService.createUser(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const updateUser = async (req, res) => {
  const result = await usersService.updateUser(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const deleteUser = async (req, res) => {
  const result = await usersService.deleteUser(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};
