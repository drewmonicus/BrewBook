const logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

module.exports = logoutUser;
