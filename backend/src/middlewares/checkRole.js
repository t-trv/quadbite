import AppError from "../libs/AppError.js";

const checkRole = (role) => (req, res, next) => {
  const roles = req.token_userRoles || [];

  if (!roles.includes(role)) {
    throw new AppError("Bạn không có quyền thực hiện hành động này", 403);
  }
  next();
};

export default checkRole;
