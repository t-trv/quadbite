import * as authService from "../services/auth.service.js";

export const me = async (req, res) => {
  const result = await authService.me(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const login = async (req, res) => {
  const result = await authService.login(req);

  res
    .cookie("token", result.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 1000 * 60 * 60 * 1, // 1 giờ
    })
    .status(200)
    .json({ status: true, data: result.user });
};

export const register = async (req, res) => {
  const result = await authService.register(req);

  res.status(200).json({
    status: true,
    data: result,
  });
};

export const logout = async (req, res) => {
  res.clearCookie("token").status(200).json({ status: true });
};
