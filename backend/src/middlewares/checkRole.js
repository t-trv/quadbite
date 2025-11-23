import AppError from "../libs/appError.js";

const checkRole = (requiredRoles) => (req, res, next) => {
  const userRoles = req.token_userRoles || [];

  const allowed = Array.isArray(requiredRoles)
    ? requiredRoles.some((r) => userRoles.includes(r))
    : userRoles.includes(requiredRoles);

  if (!allowed) {
    throw new AppError("Bạn không có quyền thực hiện hành động này", 403);
  }

  next();
};

export default checkRole;
